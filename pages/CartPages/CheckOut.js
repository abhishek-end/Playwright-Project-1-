export default class CartPage {
  constructor(page) {
    this.page = page;

    this.name = this.page.getByPlaceholder("First Name");
    this.lastName = this.page.getByPlaceholder("Last Name");
    this.zipCode = this.page.getByPlaceholder("Zip/Postal Code");

    this.continueBtn = this.page.locator('[data-test="continue"]');
  }

  //a method fill the details
  async checkOutDetails() {
    await this.name.fill("David");
    await this.lastName.fill("Cha");
    await this.zipCode.fill("123456");
  }
  // method to click continue
  async continue() {
    await this.continueBtn.click();
  }
}
