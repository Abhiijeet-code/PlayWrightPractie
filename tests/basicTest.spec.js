const { test, expect } = require('@playwright/test');

test('First test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await browser.newPage();

    await page.goto("https://www.amazon.com");
}
);

test('second test', async ({ page }) => {
    await page.goto("https://www.flipkart.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!");
}

);

test.only('third test ', async ({ page }) => {

    const userName = page.locator('#user-name');
    const password = page.locator('#password');
    const submit_btn = page.locator("[type = 'submit']");

    await page.goto("https://www.saucedemo.com/");
    await userName.fill("dwdsd");
    await password.fill("secret_sauce");
    await submit_btn.click();

    console.log(await page.locator("[class *= 'error-message']").textContent());

    await expect(page.locator("[class *= 'error-message']")).toContainText("Username and password");

    await userName.fill("");
    await userName.fill("standard_user");
    await password.fill("secret_sauce");
    await submit_btn.click();

    console.log(await page.locator('.inventory_item_label a').first().textContent());
    console.log(await page.locator('.inventory_item_label a').nth(1).inputValue());

}
);