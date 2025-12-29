import { test, expect } from '@fixtures/baseTest';

const USERNAME = process.env.LOGIN_USERNAME!;
const PASSWORD = process.env.LOGIN_PASSWORD!;

test.describe('Login', () => {
  test('positive: user can log in with valid credentials', async ({
                                                                    homePage,
                                                                    loginPage,
                                                                    header
                                                                  }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginPage.login(USERNAME, PASSWORD);
    await header.openUserMenu();
    await expect(header.logoutLink).toBeVisible();
  });
});