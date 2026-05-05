const { test, expect } = require("@playwright/test");

test("Client App", async ({ page }) => {

    const productName = "ZARA COAT 3";

    // page.route("**/*.{jpg,png,jpeg}", route => route.abort());
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator('#userEmail').fill("abcjj123456@gmail.com");
    await page.locator('#userPassword').fill("IamKing@1234");
    await page.locator('[type = "submit"]').click();
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    const alltitles = await page.locator(".card-body b").allTextContents();
    console.log(alltitles);
}
)