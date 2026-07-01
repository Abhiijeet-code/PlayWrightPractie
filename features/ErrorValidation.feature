Feature: Ecommerce Validation
@Validation
Scenario Outline: login to the application
    Given a login Ecommerce2 application with "<username>" and "<password>"
    Then Verify the error message is displayed

    Examples:
    | username      | password   |
    | rahulshhetty  | pass@123   |
    | abc       | 123        |