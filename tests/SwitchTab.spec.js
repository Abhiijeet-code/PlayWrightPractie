const { test, expect } = require("@playwright/test");

test("Switch tab", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newpage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),
        ]
    )

    const text = await newpage.locator(".red").textContent();
    const arraytext = text.split("@");
    const email = arraytext[1].split(" ")[0];
    console.log(email);

    await page.locator("#username").fill(email);
    console.log(await page.locator("#username").inputValue());
}
)