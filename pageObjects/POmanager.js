const { loginPage } = require("./loginPage");
const { DashboardPage } = require("./DashboardPage");
const { CartPage } = require("./CartPage");
const { PaymentPage } = require("./PaymentPage");
const { OrderConfirmPage } = require("./OrderConfirmPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");

class POmanager {

    constructor(page) {
        this.page = page;
        this.loginPage = new loginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartpage = new CartPage(this.page);
        this.paymentpage = new PaymentPage(this.page);
        this.orderConfirmPage = new OrderConfirmPage(this.page);
        this.orderhistorypage = new OrderHistoryPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartpage() {
        return this.cartpage;
    }
    getPaymentPage() {
        return this.paymentpage;
    }
    getOrderConfirmPage() {
        return this.orderConfirmPage;
    }
    getOrderHistoryPage() {
        return this.orderhistorypage;
    }
}
module.exports = { POmanager };