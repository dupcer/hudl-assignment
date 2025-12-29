import type { Page } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { MainHeader } from '@pages/common/MainHeader';

export class HomePage extends BasePage {
  readonly url = '/';
  
  readonly header: MainHeader;
  
  constructor(page: Page) {
    super(page);
    this.header = new MainHeader(page);
  }
  
  async openLogin() {
    await this.header.openLogin();
  }
}