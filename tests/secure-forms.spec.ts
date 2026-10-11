import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { FormSubmission } from '../server/schema';

async function securityFixture(page: Page): Promise<void> {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', (route) => route.fulfill({ contentType: 'application/javascript', body:
    `window.turnstile = { render: function(element, options) { window.testChallengeOptions = options; element.textContent = 'Security check fixture'; options.callback('fixture-valid-token'); return 'fixture-widget'; }, reset: function() { window.testChallengeOptions.callback('fixture-fresh-token'); }, remove: function() {} };` }));
  await page.route('https://api.web3forms.com/**', () => { throw new Error('Secure mode must not fall back to Web3Forms'); });
  await page.route('https://script.google.com/**', () => { throw new Error('Google helper must never be called from the browser'); });
}
test('sales keeps its request ID on uncertain failure and records source context after a fresh challenge', async ({ page }): Promise<void> => {
  await securityFixture(page); const submissions: FormSubmission[] = [];
  await page.route('**/api/forms', async (route): Promise<void> => {
    submissions.push(route.request().postDataJSON() as FormSubmission);
    await route.fulfill({ status: submissions.length === 1 ? 503 : 201, contentType: 'application/json',
      body: submissions.length === 1 ? '{"code":"SAVE_NOT_CONFIRMED"}' : '{"leadId":"sales-reference","notification":"pending","cvStored":false}' });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/contact?source=%2Fservices%2Fevent-security&service=Event%20security');
  await page.locator('[name=fullName]').fill('Secure form QA');
  await page.locator('[name=email]').fill('test@example.com');
  await page.locator('[name=message]').fill('Fixture enquiry, no real email is sent.');
  await page.locator('[name=consent]').check();
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('alert')).toContainText('not confirm');
  await expect(page.locator('[name=fullName]')).toHaveValue('Secure form QA');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('status')).toContainText('Your enquiry has been saved.');
  expect(submissions[0].requestId).toBe(submissions[1].requestId);
  expect(submissions[0].token).not.toBe(submissions[1].token);
  expect(submissions[1].sourcePage).toBe('/services/event-security');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
test('careers uses a PDF-only private upload path and receives a saved application reference', async ({ page }): Promise<void> => {
  await securityFixture(page);
  let submission: FormSubmission | null = null;
  await page.route('**/api/forms', async (route): Promise<void> => {
    submission = route.request().postDataJSON() as FormSubmission;
    await route.fulfill({ status: 201, contentType: 'application/json', body: '{"leadId":"careers-reference","notification":"sent","cvStored":true}' });
  });
  await page.goto('/careers');
  await expect(page.locator('[type=file]')).toHaveAttribute('accept', '.pdf');
  await page.locator('[name=fullName]').fill('Recruitment QA');
  await page.locator('[name=email]').fill('test@example.com');
  await page.locator('[name=phone]').fill('0000000');
  await page.locator('[name=county]').fill('Dublin');
  await page.locator('[name=role]').selectOption('Other');
  await page.locator('[name=consent]').check();
  await page.locator('[type=file]').setInputFiles({ name: 'fixture.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 Fixture only') });
  await page.getByRole('button', { name: 'Submit application' }).click();
  await expect(page.getByRole('status')).toContainText('saved securely');
  await expect(page.getByRole('status')).toContainText('careers-reference');
  expect(submission).toMatchObject({ kind: 'careers', sourcePage: '/careers', data: { cv: { name: 'fixture.pdf' } } });
});
