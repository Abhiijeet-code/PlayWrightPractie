const { expect } = require("@playwright/test");
class OrderConfirmPage {

    constructor(page) {
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
module.exports = { OrderConfirmPage };