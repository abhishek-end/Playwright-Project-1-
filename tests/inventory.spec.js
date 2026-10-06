import { test, expect } from "../fixtures/baseFixtures.js";

test("add one product", async ({ page, loginObj }) => {
  await loginObj.login("standard_user", "secret_sauce");

  await expect(page.getByText("Products")).toBeVisible();

  const name = page.getByText("Sauce Labs Backpack").first();
  await expect(name).toBeVisible();

  const addToCart = page.getByRole("button", { name: "Add to cart" }).first();
  await expect(addToCart).toBeVisible();
  await addToCart.click();

  await expect(page.locator("[data-test=shopping-cart-badge]")).toHaveText("1");
});
