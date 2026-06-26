// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker } from 'node:cluster';
import { permission } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  // retries: 1, --> It is used to retry the test if it fails.
  // workers: 3,  -> It is used to run tests in parallel.
  timeout: 30 * 1000, // --> It is used to define the timeout for the test.

  reporter: 'html',
  /* Run tests in files in parallel */
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',

        headless: !!process.env.CI,
        screenshot: 'on',
        trace: 'retain-on-failure', //on , off
        ignoreHttpsErrors: true,
        permission: ['geolocation']
      }
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',

        headless: true,
        screenshot: 'on',
        trace: 'retain-on-failure', //on , off
        //viewport: { width: 1000, height: 1000 }  --> it is used to define our own viewport size or resolution for the browser.
      }
    }

  ]

});

module.exports = config

