import { test, expect, Page } from "@playwright/test";
import { POmanager } from "../pageObjects_ts/POmanager";
//json -> string -> js object ... we parse it  because it will be easy for js to directly read
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTextData.json")));

import { customtest } from "../utils_ts/test-base";
//test.describe.configure({ mode: 'parellel' }) -> It will run the test at test level in parellel mode
//test.describe.configure({ mode: 'serial' }) -> 
// By default the test is running in serial mode
//   but by using this it will pause the further execution after the failure of one test
// it helps if the tests are interconnected.
//  For instance if the second test in a serial execution depends on the success 
// of the first test,
//  then if the first test fails, the second test will not be executed.
for (const data of dataset) {
    test(`@Web Client App for ${data.productName}`, async ({ page }) => {

        const pomanager = new POmanager(page);
        let loginpage = pomanager.getLoginPage();
        await loginpage.goto();
        await loginpage.validLogin(data.username, data.password);


        //  await page.waitForLoadState("networkidle");

        let dashboard = pomanager.getDashboardPage();
        await dashboard.searchProduct(data.productName);
        await dashboard.goToCart();


        let cartpage = pomanager.getCartpage()
        await cartpage.verifyProductIsDisplayed(data.productName);
        await cartpage.Checkout();

        let paymentPage = pomanager.getPaymentPage();
        await paymentPage.enterCreditCardDetails("07", "26", "123", "abcxyz");
        await paymentPage.selectCountry("ind", "India");
        await paymentPage.submitOrder();



        const OrderConfirmPage = pomanager.getOrderConfirmPage();
        await OrderConfirmPage.verifyConfirmation();

        const ordernum = await OrderConfirmPage.getOrderNum();
        console.log(ordernum);

        await OrderConfirmPage.goToMyOrders();

        let orderHistoryPage = pomanager.orderhistorypage;
        await orderHistoryPage.verifyOrderHistory(ordernum, data.productName);

        await page.pause();
    }

    )
}

customtest(`Client App login`, async ({ page, testDataForOrder }) => {

    const pomanager = new POmanager(page);
    let loginpage = pomanager.getLoginPage();
    await loginpage.goto();
    await loginpage.validLogin(testDataForOrder.username, testDataForOrder.password);

}
)