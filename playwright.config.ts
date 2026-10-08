import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,          // reintentar tests fallidos 1 vez
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    // Se conserva el baseURL de DemoBlaze: las Clases 1-4 lo necesitan
    baseURL: 'https://www.demoblaze.com',
    headless: false,
    screenshot: 'on',  // 'on' | 'off' | 'only-on-failure'
    video: 'on',       // 'on' | 'off' | 'retain-on-failure'
    trace: 'on',       // 'on' | 'off' | 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },
  ],
  workers: 1, // con headless: false, varias ventanas en paralelo causan timeouts
});
