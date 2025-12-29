import type { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  
  // Each page defines its own relative URL (e.g. '/', '/login')
  abstract readonly url: string;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async goto() {
    await this.page.goto(this.url);
  }
}