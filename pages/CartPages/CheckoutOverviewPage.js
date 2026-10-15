export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;

    this.productName = this.page.locator('[data-test="inventory-item-name"]');
    this.itemPrice = this.page.locator('[data-test="inventory-item-price"]');
    this.taxText = this.page.locator('[data-test="tax-label"]');
    this.totalPrice = this.page.locator('[data-test="total-label"]');
    this.finishBtn = this.page.locator('[data-test="finish"]');
  }

  async itemPriceFn() {
    const inventPrice = await this.itemPrice.allTextContents();
    const numbers = inventPrice.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    const itemTotal = numbers.reduce(
      (sum, currentValue) => sum + currentValue,
      0,
    );
    return itemTotal;
  }

  async tax() {
    const taxText = await this.taxText.allTextContents();
    const taxNumbers = taxText.map((price) =>
      Number(parseFloat(price.replace("Tax: $", "")).toFixed(2)),
    );
    const taxItem = taxNumbers.reduce(
      (sum, currentValue) => sum + currentValue,
      0,
    );
    return taxItem;
  }

  async totalFunc() {
    // Extract displayed total from page
    const totalAmount = await this.totalPrice.allTextContents();
    const totalNumbers = totalAmount.map((price) =>
      Number(parseFloat(price.replace("Total: $", "")).toFixed(2)),
    );
    return totalNumbers[0];
  }
  async totalCal() {
    // Calculate expected total and assert
    const itemTotal = await this.itemPriceFn();
    const taxItem = await this.tax();
    return itemTotal + taxItem;
  }

  async clickFinish() {
    await this.finishBtn.click();
  }
}
