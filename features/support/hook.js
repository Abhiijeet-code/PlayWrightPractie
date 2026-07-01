const { Before, After, BeforeStep, AfterStep, Status, setDefaultTimeout } = require("@cucumber/cucumber");
const { POmanager } = require("../../pageobjects/POmanager");
const { chromium } = require("playwright");

setDefaultTimeout(60 * 1000); // 60 seconds



Before(async function () {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.pomanager = new POmanager(this.page);


})

BeforeStep(function () {
    console.log("Before step");
})

AfterStep({ tags: "@Validation" }, async function ({ result }) {
    console.log("After step" + result.status);
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: "screenshot/error.png" });
    }
})

After(async function () {
    await this.page.close();

})