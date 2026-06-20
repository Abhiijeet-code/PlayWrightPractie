const { test, expect } = require("@playwright/test");
const { POmanager } = require("../pageObjects/POmanager.js");
const { CartPage } = require("../pageObjects/CartPage.js");

test("Client App", async ({ page }) => {

    const productName = "ZARA COAT 3";
    const pomanager = new POmanager(page);
    let loginpage = pomanager.getLoginPage();
    await loginpage.goto();
    await loginpage.validLogin("abcjj123456@gmail.com", "IamKing@1234");


    //  await page.waitForLoadState("networkidle");

    let dashboard = pomanager.getDashboardPage();
    await dashboard.searchProduct(productName);
    await dashboard.goToCart();


    let cartpage = pomanager.getCartpage()
    await cartpage.verifyProductIsDisplayed(productName);
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
    await orderHistoryPage.verifyOrderHistory(ordernum, productName);

    await page.pause();
}

)