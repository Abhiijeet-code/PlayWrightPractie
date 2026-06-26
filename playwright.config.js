// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  timeout: 10 * 1000,

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: !!process.env.CI,
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
});

module.exports = config;
