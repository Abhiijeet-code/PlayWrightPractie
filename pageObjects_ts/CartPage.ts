import { test, expect, Locator, Page } from "@playwright/test";

export class CartPage {

    page: Page;
    cartItems: Locator;
    checkoutBtn: Locator

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('div li').first();
        this.checkoutBtn = page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName: string) {
        await this.cartItems.waitFor();
        const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        expect(bool).toBeTruthy();
    }

    async Checkout() {
        await this.checkoutBtn.click();
    }
}
module.exports = { CartPage }