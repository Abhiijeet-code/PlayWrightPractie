const { test, expect } = require("@playwright/test");

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('div li').first();
        this.checkoutBtn = page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName) {
        await this.cartItems.waitFor();
        const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        expect(bool).toBeTruthy();
    }

    async Checkout() {
        await this.checkoutBtn.click();
    }
}
module.exports = { CartPage }