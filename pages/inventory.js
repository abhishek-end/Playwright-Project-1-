export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addProductToCart(productName) {
    const product = this.page
      .locator(".inventory_item")
      .filter({ hasText: productName });
    await product.locator('button[id^="add-to-cart"]').click();
  }
  async removeProductFromTheCart(productName) {
    const product = this.page
      .locator(".inventory_item")
      .filter({ hasText: productName });
    await product.locator('button[id^="remove"]').click();
  }
}
