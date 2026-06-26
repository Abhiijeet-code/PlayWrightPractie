const { test: base } = require("@playwright/test");

exports.customtest = base.extend(
    {
        testDataForOrder: {
            username: "abcjj123456@gmail.com",
            password: "IamKing@1234",
            productName: "ZARA COAT 3"
        }
    }
)