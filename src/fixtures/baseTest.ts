import { test as base, expect } from '@playwright/test';
import { HomePage } from '@pages/home/HomePage';
import { LoginPage } from '@pages/auth/LoginPage';
import { MainHeader } from '@pages/common/MainHeader';

const test = base.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
  header: MainHeader;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  header: async ({ page }, use) => {
    const header = new MainHeader(page);
    await use(header);
  }
});

export { test, expect };