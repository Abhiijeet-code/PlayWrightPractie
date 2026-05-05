import { test, expect, request } from '@playwright/test';

const requestPayload = { userEmail: "abcjj123456@gmail.com", userPassword: "IamKing@1234" };
const orderPayload = { orders: [{ country: "Australia", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let token;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: requestPayload }
    );

    expect((loginResponse).ok()).toBeTruthy();
    const responseJson = await loginResponse.json();
    token = responseJson.token;
    console.log(token);

    const createOrder = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        }
    );
    const orderResponse = await createOrder.json();
    console.log(orderResponse);
    orderId = orderResponse.orders[0];

}
)

test("Client app", async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody tr").first().waitFor();
    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const orderIds = (await rows.nth(i).locator("th").textContent()).trim();
        if (orderId.includes(orderIds)) {
            await rows.nth(i).locator(".btn-primary").click();
            break;
        }
    }
    await page.pause();
    const orderdetails = (await page.locator(".col-text").textContent()).trim();
    expect(orderId.includes(orderdetails)).toBeTruthy();

}
)