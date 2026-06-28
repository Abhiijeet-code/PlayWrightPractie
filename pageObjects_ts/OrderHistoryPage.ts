import { expect, Locator, Page } from "@playwright/test";
export class OrderHistoryPage {

    page: Page;
    table: Locator;
    rows: any;
    orderid: any;
    productname: any;

    constructor(page: Page) {
        this.page = page;
        this.table = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderid = page.locator(".col-text");
        this.productname = page.locator('.title');
    }
    async verifyOrderHistory(ordernum: any, productName: string) {
        await this.table.waitFor();

        for (let i = 0; i < await this.rows.count(); i++) {
            const orderIds = (await this.rows.nth(i).locator("th").textContent()).trim();
            if (ordernum.includes(orderIds)) {
                await this.rows.nth(i).locator(".btn-primary").click();
                break;
            }
        }

        const orderid = (await this.orderid.textContent()).trim();
        expect(ordernum.includes(orderid)).toBeTruthy();

        const product_name = await this.productname.textContent();
        expect(product_name).toContain(productName);

    }
}