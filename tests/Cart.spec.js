import { test, expect } from "../fixtures/baseFixtures.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/inventory.js";
test("add one product in to cart", async ({ page, loginObj }) => {
  await loginObj.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  const InventPage = new InventoryPage(page);
  await InventPage.addProductToCart("Sauce Labs Backpack");

  await InventPage.clickOnCart();
  await expect(page).toHaveURL(/cart.html/);

  await expect(page.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Backpack",
  );
});
