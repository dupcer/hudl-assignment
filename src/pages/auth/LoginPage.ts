import type { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class LoginPage extends BasePage {
  readonly url = 'identity.hudl.com';
  
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  
  readonly usernameRequiredError: Locator;
  readonly passwordRequiredError: Locator;
  
  constructor(page: Page) {
    super(page);
    
    this.usernameInput = page.locator('#username, [aria-labelledby="username-label"]');
    this.passwordInput = page.locator('#password, [aria-labelledby="password-label"]');
    this.submitButton = page.locator('button[type="submit"][name="action"]');
    
    this.usernameRequiredError = page.locator('#error-cs-username-required');
    this.passwordRequiredError = page.locator('#error-cs-password-required');
  }
  
  async continueWithUsername(username?: string) {
    if (username !== undefined) {
      await this.usernameInput.fill(username);
    }
    await this.submitButton.click();
  }
  
  async submitPassword(password?: string) {
    await this.passwordInput.waitFor({ state: 'visible' });
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
    await this.submitButton.click();
  }
  
  async login(username: string, password: string) {
    await this.continueWithUsername(username);
    await this.submitPassword(password);
  }
}