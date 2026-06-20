class loginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator('[type = "submit"]');
        this.username = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    async validLogin(email, password) {
        await this.username.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
        await this.page.locator(".card-body b").first().waitFor();
    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
}

module.exports = { loginPage };