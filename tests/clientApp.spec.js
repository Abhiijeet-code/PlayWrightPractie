const { test, expect } = require("@playwright/test");

test("Client App", async ({ page }) => {

    const productName = "ZARA COAT 3";


    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator('#userEmail').fill("abcjj123456@gmail.com");
    await page.locator('#userPassword').fill("IamKing@1234");
    await page.locator('[type = "submit"]').click();

    await page.waitForLoadState("networkidle");
    //  await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    const alltitles = await page.locator(".card-body b").allTextContents();
    console.log(alltitles);
    const products = page.locator(".card-body");
    const count = await products.count();

    for (let i = 0; i < count; i++) {

        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }

    }
    await page.locator("//button[@routerlink='/dashboard/cart']").click();

    await page.locator('div li').first().waitFor();
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();

    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();

    await page.locator('.item__title').waitFor();


    const month = page.locator('select.input.ddl').first();
    await month.pressSequentially("07");

    const year = page.locator('select.input.ddl').last();
    await year.pressSequentially("26");



    await page.locator('.field [type="text"]').nth(1).fill("123");
    await page.locator('.field [type="text"]').nth(2).fill("abcxyz");
    // await page.locator('.field [type="text"]').nth(3).fill("1234567890");
    // await page.locator('[type="submit"]').click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });

    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();

    for (let i = 0; i < optionCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();

        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await page.locator(".action__submit").click();

    const msg = await page.locator(".hero-primary");

    expect(msg).toContainText("Thankyou");

    const ordernum = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).trim();
    console.log(ordernum);

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody tr").first().waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const orderIds = (await rows.nth(i).locator("th").textContent()).trim();
        if (ordernum.includes(orderIds)) {
            await rows.nth(i).locator(".btn-primary").click();
            break;
        }
    }

    const orderid = (await page.locator(".col-text").textContent()).trim();
    expect(ordernum.includes(orderid)).toBeTruthy();

    const product_name = await page.locator('.title').textContent();
    expect(product_name).toContain(productName);
    await page.pause();
}

)