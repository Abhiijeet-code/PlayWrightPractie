import { Page } from "@playwright/test";
import { loginPage } from "./loginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { PaymentPage } from "./PaymentPage";
import { OrderConfirmPage } from "./OrderConfirmPage";
import { OrderHistoryPage } from "./OrderHistoryPage";

export class POmanager {
    page: Page;
    loginPage: loginPage;
    dashboardPage: DashboardPage;
    cartpage: CartPage;
    paymentpage: PaymentPage;
    orderConfirmPage: OrderConfirmPage;
    orderhistorypage: OrderHistoryPage;

    constructor(page: Page) {
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