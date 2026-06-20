const { expect } = require("@playwright/test");
class PaymentPage {
    constructor(page) {
        this.page = page;
        this.title = this.page.locator('.item__title');
        this.month = this.page.locator('select.input.ddl').first();
        this.year = this.page.locator('select.input.ddl').last();
        this.cvv = this.page.locator('.field [type="text"]').nth(1);
        this.name = this.page.locator('.field [type="text"]').nth(2);
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = this.page.locator(".action__submit");
        this.country = this.page.locator("[placeholder*='Country']");
        this.dropdown = this.page.locator(".ta-results");
    }

    async enterCreditCardDetails(month, year, cvv, name) {
        await this.title.waitFor();
        await this.month.pressSequentially(month);
        await this.year.pressSequentially(year);
        await this.cvv.fill(cvv);
        await this.name.fill(name);
    }

    async selectCountry(countryCode, countryName) {
        await this.country.pressSequentially(countryCode, { delay: 150 });
        await this.dropdown.waitFor();
        const optionCount = await this.dropdown.locator("button").count();

        for (let i = 0; i < optionCount; i++) {
            const text = await this.dropdown.locator("button").nth(i).textContent();

            if (text.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async verifyEmail(userName) {
        await expect(this.emailId).toHaveText(userName);
    }

    async submitOrder() {
        await this.submit.click();
    }
}
module.exports = { PaymentPage };