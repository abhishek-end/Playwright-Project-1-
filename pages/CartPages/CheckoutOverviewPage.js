export default class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;

    this.productName = this.page.locator('[data-test="inventory-item-name"]');
    this.itemPrice = this.page.locator('[data-test="inventory-item-price"]');
    this.totalPrice = this.page.locator('[data-test="total-label"]');
    this.finishBtn = this.page.locator('[data-test="finish"]');
  }

  async clickFinish() {
    await this.finishBtn.click();
  }
}
