import { test as base } from "@playwright/test";

export type TestDataForOrder = {
    username: string;
    password: string;
    productName: string;
}

export const customtest = base.extend<{ testDataForOrder: TestDataForOrder }>(
    {
        testDataForOrder: {
            username: "abcjj123456@gmail.com",
            password: "IamKing@1234",
            productName: "ZARA COAT 3"
        }
    }
)