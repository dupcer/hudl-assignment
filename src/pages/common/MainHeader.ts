import type { Locator, Page } from '@playwright/test';

export class MainHeader {
  private readonly page: Page;
  readonly desktopUserMenuTrigger: Locator;
  readonly mobileUserMenuTrigger: Locator;
  readonly logoutLink: Locator;
  readonly loginDropdownTrigger: Locator;
  readonly loginHudlItem: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    this.desktopUserMenuTrigger = page.locator('div.hui-globaluseritem');
    // Support both possible mobile classes if needed
    this.mobileUserMenuTrigger = page.locator(
      '.hui-secondarynav__menu-icon'
    );
    
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
    this.loginDropdownTrigger = page.locator('[data-qa-id="login-select"]');
    this.loginHudlItem = page.locator('[data-qa-id="login-hudl"]');
  }
  
  async openLogin() {
    await this.loginDropdownTrigger.click();
    await this.loginHudlItem.click();
  }
  
  async openUserMenu() {
    if (await this.mobileUserMenuTrigger.first().isEnabled()) {
      await this.mobileUserMenuTrigger.first().click();
      return;
    }

    const desktopTrigger = this.desktopUserMenuTrigger.first();
    if (await desktopTrigger.isEnabled()) {
      await desktopTrigger.click();
      return;
    }
    
    const desktopTrigger2 = this.desktopUserMenuTrigger.last();
    if (await desktopTrigger2.isVisible()) {
      await desktopTrigger2.click();
      return;
    }
  }
  
  async logout() {
    await this.openUserMenu();
    await this.logoutLink.click();
  }
}