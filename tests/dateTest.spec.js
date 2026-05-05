import { test, expect } from '@playwright/test';

test("Date test", async ({ page }) => {

    const year = "2030";
    const month = "6";
    const day = "15";

    const expectedList = [month, day, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();

    await page.getByRole("button", { name: "" + year + "", exact: true }).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    await page.locator("//abbr[text()='" + day + "']").click();


    const inputs = page.locator(".react-date-picker__inputGroup__input");
    for (let i = 0; i < expectedList.length; i++) {
        const obsList = await inputs.nth(i).inputValue();
        expect(obsList).toEqual(expectedList[i]);
    }

    await page.pause();

}

)