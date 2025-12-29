import type { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class LoginPage extends BasePage {
  readonly url = 'identity.hudl.com';
  
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  
  constructor(page: Page) {
    super(page);
    
    this.usernameInput = page.locator('#username, [aria-labelledby="username-label"]');
    this.passwordInput = page.locator('#password, [aria-labelledby="password-label"]');
    this.submitButton = page.locator('button[type="submit"][name="action"]');
  }
  
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.submitButton.click();
    
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
    
    await this.submitButton.click();
  }
}