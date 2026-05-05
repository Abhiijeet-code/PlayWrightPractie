const { test, expect } = require("@playwright/test");

test("Client app", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('.login-wrapper-footer-text a').click();
    await page.locator('#firstName').fill("Abhijeet");
    await page.locator('#lastName').fill("llmm");

    await page.locator('#userEmail').fill("email@example.com");
    await page.locator('#userMobile').fill("1234567890");

    await page.locator('select.custom-select').selectOption('Student');
    await page.locator('[type="radio"]').first().check();

    await page.locator('#userPassword').fill("djeejfjefuj#123");
    await page.locator('#confirmPassword').fill("djeejfjefuj#123");

    // await page.locator('[type ="chekbox"]').check();

    await expect(page.locator('[type="radio"]').first()).toBeChecked();
    console.log(await page.locator('[type="radio"]').first().isChecked());

    await page.locator('#login').click();

    await page.pause();
}
)