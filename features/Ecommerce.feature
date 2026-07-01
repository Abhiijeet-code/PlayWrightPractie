Feature: Ecommerce Validation
    @Regression
    Scenario: Placing a Order
        Given a login to Ecommerce application with "abcjj123456@gmail.com" and "IamKing@1234"
        When Add "ZARA COAT 3" to the cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and place the Order
        Then Verify Order and "ZARA COAT 3" is present in the orderHistory
