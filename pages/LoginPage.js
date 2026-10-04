class LoginPage {
  constructor(page) {
    this.page = page;

    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.btn = page.getByRole("button", { name: /login/i });
    this.errorMsg = page.locator('[data-test="error"]');
  }
  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.btn.click();
  }
  async gotoUrl(url) {
    await this.page.goto(url);
  }
}

export { LoginPage };
