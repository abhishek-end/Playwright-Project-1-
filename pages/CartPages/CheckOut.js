export class CartPage {
  constructor(page) {
    this.page = page;

    this.name = this.page.getByPlaceholder("First Name");
    this.lastName = this.page.getByPlaceholder("Last Name");
    this.zipCode = this.page.getByPlaceholder("Zip/Postal Code");

    this.continueBtn = this.page.locator('[data-test="continue"]');
  }

  //a method fill the details
  async checkOutDetails({ fName, lName, zipCode }) {
    await this.name.fill(fName);
    await this.lastName.fill(lName);
    await this.zipCode.fill(zipCode);
  }
  // method to click continue
  async continue() {
    await this.continueBtn.click();
  }
}
