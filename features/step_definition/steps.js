const { Given, When, Then } = require("@cucumber/cucumber");


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