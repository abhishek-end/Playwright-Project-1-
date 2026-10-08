export default class CartPage {
  constructor(page) {
    this.page = page;

    this.productName = this.page.locator('[data-test="inventory-item-name"]');
    this.checkoutBtn = this.page.locator('[data-test="checkout"]');
    this.checkOutBtn = this.page.locator('[data-test="continue"]');
  }

  // A method to click Checkout.
  async checkOut() {
    await this.checkoutBtn.click();
  }
  //a method fill the details
  async checkOutDetails() {
    await this.name.fill("David");
    await this.lastName.fill("Cha");
    await this.zipCode.fill("123456");
  }
}
