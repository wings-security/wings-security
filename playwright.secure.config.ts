import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: '**/secure-forms.spec.ts', timeout: 60000, workers: 1,
  reporter: [['list']], use: { baseURL: 'http://127.0.0.1:4176', browserName: 'chromium', channel: 'chrome', screenshot: 'only-on-failure' },
  webServer: {
    command: 'VITE_SALES_FORM_PROVIDER=server VITE_CAREERS_FORM_PROVIDER=server VITE_TURNSTILE_SITE_KEY=test-public-sitekey npm run build && npm run preview -- --host 127.0.0.1 --port 4176 --strictPort',
    url: 'http://127.0.0.1:4176', reuseExistingServer: false, timeout: 120000,
  },
});
