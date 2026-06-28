import { expect, Locator, Page } from "@playwright/test";
export class OrderConfirmPage {

    page: Page;
    msg: Locator;
    orderNum: any;
    myorder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.msg = page.locator(".hero-primary");
        this.orderNum = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myorder = page.locator("button[routerlink*='myorders']");
    }

    async verifyConfirmation() {
        await expect(this.msg).toContainText("Thankyou");
    }
    async getOrderNum() {
        return (await this.orderNum.textContent()).trim();
    }

    async goToMyOrders() {
        await this.myorder.click();
    }
}