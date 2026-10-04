import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("Login with valid username and valid password", async ({ page }) => {
  // now create object
  const loginObj = new LoginPage(page);
  await loginObj.gotoUrl("https://www.saucedemo.com/");
  await loginObj.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.getByText("Products")).toBeVisible();
});

test("Login with valid username and invalid password", async ({ page }) => {
  const loginObj = new LoginPage(page);

  await loginObj.gotoUrl("https://www.saucedemo.com/");

  await loginObj.login("standard_user", "invalidPassword");
  await expect(loginObj.errorMsg).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Login with invalid username and valid password", async ({ page }) => {
  const loginObj = new LoginPage(page);

  await loginObj.gotoUrl("https://www.saucedemo.com/");

  await loginObj.login("invalid Username", "secret_sauce");

  await expect(loginObj.errorMsg).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});
test("Login with invalid username and invalid password", async ({ page }) => {
  const loginObj = new LoginPage(page);

  await loginObj.gotoUrl("https://www.saucedemo.com/");
  await loginObj.login("asjdbkasbda", "asadnadsa");

  await expect(loginObj.errorMsg).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Login with blanks username and valid password", async ({ page }) => {
  const loginObj = new LoginPage(page);

  await loginObj.gotoUrl("https://www.saucedemo.com/");
  await loginObj.login("", "secret_sauce");

  await expect(loginObj.errorMsg).toHaveText(
    "Epic sadface: Username is required",
  );
});
test("Login with valid  username and blank  password", async ({ page }) => {
  const loginObj = new LoginPage(page);

  await loginObj.gotoUrl("https://www.saucedemo.com/");
  await loginObj.login("standard_user", "");
  await expect(loginObj.errorMsg).toHaveText(
    "Epic sadface: Password is required",
  );
});
test("Login with blank username and blank password", async ({ page }) => {
  const loginObj = new LoginPage(page);

  await loginObj.gotoUrl("https://www.saucedemo.com/");
  await loginObj.login("", "");

  await expect(loginObj.errorMsg).toHaveText(
    "Epic sadface: Username is required",
  );
});
