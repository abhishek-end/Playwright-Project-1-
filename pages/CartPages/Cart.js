export class CartPage {
  constructor(page) {
    this.page = page;

    this.productName = this.page.locator('[data-test="inventory-item-name"]');
    this.checkoutBtn = this.page.locator('[data-test="checkout"]');
  }

  // A method to click Checkout.
  async checkOut() {
    await this.checkoutBtn.click();
  }
}
