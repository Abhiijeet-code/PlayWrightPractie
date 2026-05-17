const { test, expect, request } = require("@playwright/test");
const yahooLogin = { email: "abdhdfe@yahoo.com", password: "IamKing@1234" };
const gmailLogin = { email: "abcjj123456@gmail.com", password: "IamKing@1234" };
const url = "https://api.eventhub.rahulshettyacademy.com/api";
const apiContext = request.newContext();

let token;
let eventid;



async function loginAs(page, payload) {

    const loginResponse = await (await apiContext).post(`${url}/auth/login`,
        {
            data: payload
        }
    );

    expect(loginResponse.ok()).toBeTruthy();
    const responseJson = await loginResponse.json();
    token = responseJson.token;
    console.log(token);

}


test("Network calls", async ({ page }) => {

    await loginAs(page, yahooLogin);

    const eventResponse = await (await apiContext).get(`${url}/events`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    expect(eventResponse.ok()).toBeTruthy();
    const eventJson = await eventResponse.json();
    eventid = eventJson.data[0].id;
    console.log(eventid);

    const bookingDetails = {
        customerName: "abc12", customerEmail: yahooLogin.email,
        customerPhone: "1234567890", quantity: 1, eventId: eventid
    }
    const bookingResponse = await (await apiContext).post(`${url}/bookings`,
        {
            headers: { Authorization: `Bearer ${token}` },
            data: bookingDetails
        }
    );
    expect(bookingResponse.ok()).toBeTruthy();
    const bookingId = (await bookingResponse.json()).data.id;
    console.log(bookingId);

    await loginAs(page, gmailLogin);

    await page.addInitScript(value => {
        window.localStorage.setItem("eventhub_token", value);
    }, token
    );

    await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${bookingId}`, { waitUntil: "networkidle" });
    await expect(page.getByText("Access Denied")).toBeVisible();
    await expect(page.getByText("You are not authorized to view this booking.")).toBeVisible();

}
)