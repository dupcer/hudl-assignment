import { test, expect } from '@fixtures/baseTest';

const USERNAME = process.env.LOGIN_USERNAME!;
const PASSWORD = process.env.LOGIN_PASSWORD!;

test.describe('Login', () => {
  test('positive: user can log in with valid credentials', async ({homePage, loginPage, header }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginPage.login(USERNAME, PASSWORD);
    await header.openUserMenu();
    await expect(header.logoutLink).toBeVisible();
  });
  
  test('negative: username required', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginPage.continueWithUsername();
    await expect(loginPage.usernameRequiredError).toBeVisible();
    await expect(loginPage.usernameRequiredError).toHaveText(/Enter an email address/i);
  });
  
  test('negative: password required', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginPage.continueWithUsername(USERNAME);
    await loginPage.submitPassword();
    await expect(loginPage.passwordRequiredError).toBeVisible();
    await expect(loginPage.passwordRequiredError).toHaveText(/Enter your password/i);
  });
});

