export class StaticPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigateTo(path) {
      await this.page.goto(`https://carshare.yomafleet.com${path}`, { waitUntil: 'domcontentloaded' });
    }
  
    async verifyPageContainsText(expectedText) {
      const locator = this.page.locator(`text=${expectedText}`);
      await locator.first().isVisible();
    }
  }