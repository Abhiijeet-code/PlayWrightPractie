const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");


Given('a login to Ecommerce application with {string} and {string}', async function (username, password) {


    let loginpage = this.pomanager.getLoginPage();
    await loginpage.goto();
    await loginpage.validLogin(username, password);
});

When('Add {string} to the cart', async function (productName) {
    let dashboard = this.pomanager.getDashboardPage();
    await dashboard.searchProduct(productName);
    await dashboard.goToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    let cartpage = this.pomanager.getCartpage()
    await cartpage.verifyProductIsDisplayed(productName);
    await cartpage.Checkout();
});

When('Enter valid details and place the Order', async function () {
    let paymentPage = this.pomanager.getPaymentPage();
    await paymentPage.enterCreditCardDetails("07", "26", "123", "abcxyz");
    await paymentPage.selectCountry("ind", "India");
    await paymentPage.submitOrder();

});

Then('Verify Order and {string} is present in the orderHistory', async function (productName) {
    const OrderConfirmPage = this.pomanager.getOrderConfirmPage();
    await OrderConfirmPage.verifyConfirmation();

    const ordernum = await OrderConfirmPage.getOrderNum();
    console.log(ordernum);

    await OrderConfirmPage.goToMyOrders();

    let orderHistoryPage = this.pomanager.orderhistorypage;
    await orderHistoryPage.verifyOrderHistory(ordernum, productName);
});

Given('a login Ecommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator('#user-name');
    const Password = this.page.locator('#password');
    const submit_btn = this.page.locator("[type = 'submit']");

    await this.page.goto("https://www.saucedemo.com/");
    await userName.fill(username);
    await Password.fill(password);
    await submit_btn.click();

});

Then('Verify the error message is displayed', async function () {
    console.log(await this.page.locator("[class *= 'error-message']").textContent());

    await expect(this.page.locator("[class *= 'error-message']")).toContainText("Username and password");
});