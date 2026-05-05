import { test } from '@playwright/test';

test("POP up ", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://testautomationpractice.blogspot.com/");
    // await page.goBack();
    // await page.goForward();
    // await page.reload();

    await page.locator("#confirmbtn").click();
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#mousehover").hover();

    const framepages = page.frameLocator("#courses-iframe");
    await framepages.locator("li a[href*='lifetime-access']:visible").click();
    const text = await framepages.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);

}
)
