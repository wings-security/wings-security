import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { publicPaths } from '../src/data/site';

test.beforeEach(async ({ page }): Promise<void> => {
  await page.route('https://api.web3forms.com/**', (route) => route.fulfill({
    status: 200, contentType: 'application/json', body: '{"success":true}',
  }));
  await page.route('https://script.google.com/**', (route) => route.fulfill({
    status: 200, contentType: 'application/json', body: '{"success":true}',
  }));
});

test('every public page has its own rendered content, metadata and working internal links', async ({ page, request }): Promise<void> => {
  const titles: Set<string> = new Set<string>();
  const internalLinks: Set<string> = new Set<string>();
  const errors: string[] = [];
  page.on('pageerror', (error: Error): void => { errors.push(error.message); });
  await page.setViewportSize({ width: 320, height: 844 });
  for (const path of publicPaths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(await response.text(), path).toMatch(/<h1[\s>]/);
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://wingssecurity.ie' + path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true);
    titles.add(await page.title());
    const links: string[] = await page.locator('a[href]').evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('href') || '').filter((href) => href.startsWith('/') && !href.startsWith('//')));
    links.forEach((href: string): void => { internalLinks.add(href.split(/[?#]/)[0] || '/'); });
  }
  expect(titles.size).toBe(publicPaths.length);
  internalLinks.forEach((href: string): void => { expect(publicPaths.includes(href), href).toBe(true); });
  expect(errors).toEqual([]);
});

test('responsive hero, images, navigation and reduced-motion preference', async ({ page }): Promise<void> => {
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), String(width)).toBe(true);
    await expect(page.locator('.hero-photo')).toBeVisible();
    await expect(page.locator('.hero-photo')).toHaveAttribute('src', '/images/hero-guarding-branded.webp');
    expect(await page.locator('.hero-photo').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator('.hero-buttons').getByRole('link', { name: 'Get a quote' })).toBeVisible();
    await expect(page.locator('.circle-word')).toHaveCount(1);
    const phoneAlignment: number = await page.locator('.nav-phone').evaluate((link: HTMLAnchorElement): number => {
      const icon: DOMRect = link.querySelector('svg')!.getBoundingClientRect();
      const bounds: DOMRect = link.getBoundingClientRect();
      return Math.abs(icon.top + icon.height / 2 - bounds.top - bounds.height / 2);
    });
    expect(phoneAlignment, `Phone alignment at ${width}px`).toBeLessThan(1);
    await expect(page.locator('.licence-identity')).toContainText('14161');
    const licenceOverlap: boolean = await page.locator('.licence-inner').evaluate((strip: HTMLElement): boolean => {
      const items: DOMRect[] = Array.from(strip.children).map((item: Element): DOMRect => item.getBoundingClientRect());
      return items.some((first: DOMRect, index: number): boolean => items.slice(index + 1).some((second: DOMRect): boolean =>
        first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top));
    });
    expect(licenceOverlap, `Licence strip at ${width}px`).toBe(false);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Close menu', exact: true })).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toHaveAttribute('aria-expanded', 'false');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.locator('.hero-content .circle-word ellipse').evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
});

test('favicon displays the green original symbol on a transparent background', async ({ page }): Promise<void> => {
  await page.goto('/');
  await expect(page.locator('link[rel=icon][sizes="32x32"]')).toHaveAttribute('href', '/favicon-32-v3.png');
  const pixels = await page.evaluate(async (): Promise<{ cornerAlpha: number; greenWidth: number }> => {
    const image: HTMLImageElement = new Image();
    image.src = '/favicon-32-v3.png';
    await image.decode();
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    context.drawImage(image, 0, 0);
    const data: Uint8ClampedArray = context.getImageData(0, 0, 32, 32).data;
    const greenColumns: number[] = Array.from({ length: 1024 }, (_, index: number): number => index * 4)
      .filter((index: number): boolean => data[index + 3] > 200 && data[index + 1] > 100 && data[index] < 30)
      .map((index: number): number => index / 4 % 32);
    return { cornerAlpha: data[3], greenWidth: Math.max(...greenColumns) - Math.min(...greenColumns) + 1 };
  });
  expect(pixels.cornerAlpha).toBe(0);
  expect(pixels.greenWidth).toBeGreaterThan(24);
});

test('sector imagery is distinct and loads for every use case', async ({ page, request }): Promise<void> => {
  await page.goto('/sectors');
  const sources: string[] = await page.locator('.sector-gallery img').evaluateAll((images) => images.map((image) => image.getAttribute('src')!));
  expect(sources.length).toBe(12);
  expect(new Set(sources).size).toBe(sources.length);
  for (const src of sources) {
    const response = await request.get(src);
    expect(response.status(), src).toBe(200);
    expect(response.headers()['content-type'], src).toContain('image/webp');
    expect((await response.body()).length, src).toBeGreaterThan(1000);
  }
});

test('contact preselection, optional phone, validation, error recovery and success', async ({ page }): Promise<void> => {
  let count: number = 0;
  await page.route('https://api.web3forms.com/**', async (route): Promise<void> => {
    count += 1;
    await route.fulfill({ status: count === 1 ? 400 : 200, contentType: 'application/json',
      body: JSON.stringify({ success: count !== 1, message: 'Provider test rejection' }) });
  });
  await page.goto('/contact?service=Business%20partnership%20%2F%20subcontracting&sector=retail');
  await expect(page.locator('select[name=service]')).toHaveValue('Business partnership / subcontracting');
  await expect(page.locator('.enquiry-context')).toContainText('Retail');
  expect(await page.locator('input[name=phone]').getAttribute('required')).toBeNull();
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  expect(count).toBe(0);
  await page.locator('[name=fullName]').fill('Website test');
  await page.locator('[name=email]').fill('test@example.com');
  await page.locator('[name=message]').fill('Intercepted browser test; no real email is sent.');
  await page.locator('[name=consent]').check();
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Provider test rejection');
  await expect(page.locator('[name=fullName]')).toHaveValue('Website test');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your enquiry has been sent.' })).toBeVisible();
});

async function fillApplication(page: Page): Promise<void> {
  await page.locator('[name=fullName]').fill('Website application test');
  await page.locator('[name=email]').fill('test@example.com');
  await page.locator('[name=phone]').fill('+353 87 000 0000');
  await page.locator('[name=county]').fill('Dublin');
  await page.locator('[name=role]').selectOption('Static Security Guard');
  await page.locator('[name=consent]').check();
}

test('careers invalid-file handling, rejected attachment and JSON submission', async ({ page }): Promise<void> => {
  const contentTypes: string[] = [];
  let count: number = 0;
  await page.route('https://api.web3forms.com/**', async (route): Promise<void> => {
    count += 1;
    contentTypes.push(route.request().headers()['content-type']);
    await route.fulfill({ status: count === 1 ? 400 : 200, contentType: 'application/json',
      body: JSON.stringify({ success: count !== 1, message: 'Uploads unavailable on test account' }) });
  });
  await page.goto('/careers');
  await fillApplication(page);
  await expect(page.locator('select[name=role]')).not.toContainText('Partnership');
  await page.locator('[type=file]').setInputFiles({ name: 'invalid.exe', mimeType: 'application/octet-stream', buffer: Buffer.from('test') });
  expect(await page.locator('[type=file]').evaluate((element: HTMLInputElement) => element.files?.length)).toBe(0);
  await expect(page.getByRole('alert')).toContainText('PDF, DOC or DOCX');
  await page.locator('[type=file]').setInputFiles({ name: 'test.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 Test fixture') });
  await page.getByRole('button', { name: 'Submit application' }).click();
  await expect(page.getByRole('alert')).toContainText('remove the attachment');
  await expect(page.locator('[name=fullName]')).toHaveValue('Website application test');
  await page.locator('[type=file]').setInputFiles([]);
  await page.getByRole('button', { name: 'Submit application' }).click();
  await expect(page.getByRole('heading', { name: 'Application received.' })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('email your CV');
  expect(contentTypes[0]).toContain('multipart/form-data');
  expect(contentTypes[1]).toBe('application/json');
});

test('map loads only on request, breadcrumbs and legacy routes retain context', async ({ page }): Promise<void> => {
  await page.route('https://maps.google.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<p>Map test</p>' }));
  await page.goto('/contact');
  await expect(page.locator('.contact-map iframe')).toHaveCount(0);
  await page.getByRole('button', { name: 'Load Google Maps' }).click();
  await expect(page.locator('.contact-map iframe')).toHaveAttribute('src', /maps\.google\.com/);
  await page.goto('/services/event-security');
  await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toContainText('Event security');
  await page.goto('/#contact');
  await expect(page).toHaveURL(/\/contact$/);
  await page.goto('/#careers');
  await expect(page).toHaveURL(/\/careers$/);
  await page.goto('/not-a-page');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex, follow');
});

test('accepted CV application reports a separate tracking failure without resubmitting', async ({ page }): Promise<void> => {
  let applicationRequests: number = 0;
  await page.route('https://api.web3forms.com/**', async (route): Promise<void> => {
    applicationRequests += 1;
    expect(route.request().headers()['content-type']).toContain('multipart/form-data');
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
  });
  await page.route('https://script.google.com/**', async (route): Promise<void> => {
    expect(route.request().headers()['content-type']).toContain('text/plain');
    expect(JSON.parse(route.request().postData()!)).toMatchObject({
      name: 'Website application test', source: 'Careers Form - wingssecurity.ie',
    });
    await route.fulfill({ status: 404, contentType: 'text/plain', body: 'Deployment unavailable' });
  });
  await page.goto('/careers');
  await fillApplication(page);
  await page.locator('[type=file]').setInputFiles({ name: 'qa-cv.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 Test fixture') });
  await page.getByRole('button', { name: 'Submit application' }).click();
  await expect(page.getByRole('status')).toContainText('attached CV were accepted');
  await expect(page.getByRole('status')).toContainText('tracking update could not be confirmed');
  await expect(page.getByRole('status')).toContainText('please do not submit it again');
  expect(applicationRequests).toBe(1);
});

test('production security policy permits the intended page and form requests', async ({ page }): Promise<void> => {
  const configuration: { headers: { headers: { key: string; value: string }[] }[] } = JSON.parse(await readFile('vercel.json', 'utf8'));
  const headers: Record<string, string> = Object.fromEntries(configuration.headers[0].headers.map((header) => [header.key, header.value]));
  const violations: string[] = [];
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (event: SecurityPolicyViolationEvent): void => {
      console.error('CSP violation: ' + event.violatedDirective);
    });
  });
  page.on('console', (message): void => { if (message.text().startsWith('CSP violation:')) violations.push(message.text()); });
  await page.route('**/contact', async (route): Promise<void> => {
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), ...headers } });
  });
  await page.goto('/contact');
  await page.locator('[name=fullName]').fill('Policy test');
  await page.locator('[name=email]').fill('test@example.com');
  await page.locator('[name=message]').fill('Intercepted security-policy browser test.');
  await page.locator('[name=consent]').check();
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your enquiry has been sent.' })).toBeVisible();
  expect(violations).toEqual([]);
});
