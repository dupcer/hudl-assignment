import type { Locator, Page } from '@playwright/test';

export class MainHeader {
  private readonly page: Page;
  readonly desktopUserMenuTrigger: Locator;
  readonly desktopUserMenuFallbackTrigger: Locator;
  readonly mobileUserMenuTrigger: Locator;
  readonly accountTrigger: Locator;
  readonly logoutLink: Locator;
  readonly loginDropdownTrigger: Locator;
  readonly loginHudlItem: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    const topNav = page.getByRole('navigation').first();

    const desktopIcon = topNav
      .locator('[aria-labelledby="uiexpandregionverticalTitle"]:visible')
      .first();

    this.desktopUserMenuTrigger = desktopIcon.locator(
      'xpath=ancestor-or-self::*[self::button or self::a or @role="button" or contains(@class,"hui-globaluseritem")][1]'
    );

    this.desktopUserMenuFallbackTrigger = topNav.locator('div.hui-globaluseritem:visible').first();

    this.mobileUserMenuTrigger = topNav.locator(
      '.hui-secondarynav__open-menu:visible, .hui-secondarynav__menu-icon:visible'
    ).first();

    this.accountTrigger = topNav.getByText(/your account/i);
    
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
    this.loginDropdownTrigger = page.locator('[data-qa-id="login-select"]');
    this.loginHudlItem = page.locator('[data-qa-id="login-hudl"]');
  }
  
  async openLogin() {
    await this.loginDropdownTrigger.click();
    await this.loginHudlItem.click();
  }
  
  async openUserMenu() {
    const desktopTrigger = this.desktopUserMenuTrigger.first();
    const desktopFallback = this.desktopUserMenuFallbackTrigger.first();
    const mobileTrigger = this.mobileUserMenuTrigger.first();
    const accountTrigger = this.accountTrigger.first();

    const triggers: Locator[] = [desktopTrigger, desktopFallback, mobileTrigger, accountTrigger];

    const deadline = Date.now() + 15_000;

    while (Date.now() < deadline) {
      if (await this.logoutLink.isVisible().catch(() => false)) {
        return;
      }

      for (const trigger of triggers) {
        const visible = await trigger.isVisible().catch(() => false);
        if (!visible) continue;

        await trigger.scrollIntoViewIfNeeded().catch(() => {});

        const clicked = await trigger.click({ timeout: 2000 }).then(() => true).catch(() => false);
        if (!clicked) continue;

        await this.logoutLink.waitFor({ state: 'visible', timeout: 4000 }).catch(() => {});
        if (await this.logoutLink.isVisible().catch(() => false)) {
          return;
        }
      }

      await this.page.waitForTimeout(250);
    }

    throw new Error('Unable to open user menu: no visible trigger found');
  }
  
  async logout() {
    await this.openUserMenu();
    await this.logoutLink.click();
  }
}