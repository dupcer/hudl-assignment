import type { Locator, Page } from '@playwright/test';

export class MainHeader {
  private readonly page: Page;
  readonly userMenuTrigger: Locator;
  readonly logoutLink: Locator;
  readonly loginDropdownTrigger: Locator;
  readonly loginHudlItem: Locator;
  
  constructor(page: Page) {
    this.page = page;

    this.userMenuTrigger = page.locator('div.hui-globaluseritem')
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
    
    this.loginDropdownTrigger = page.locator('[data-qa-id="login-select"]');
    this.loginHudlItem = page.locator('[data-qa-id="login-hudl"]');
    
  }
  
  async openLogin() {
    await this.loginDropdownTrigger.click();
    await this.loginHudlItem.click();
  }
  
  async openUserMenu() {
    await this.userMenuTrigger.click();
  }
  
  async logout() {
    await this.openUserMenu();
    await this.logoutLink.click();
  }
}