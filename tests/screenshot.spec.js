const { test, expect } = require("@playwright/test");

test("Screenshot", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#displayed-text").screenshot({ path: "TempSS.png" });

    await page.screenshot({ Path: "SS.png" })
})