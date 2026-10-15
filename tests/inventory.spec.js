import { test, expect } from "../fixtures/baseFixtures.js";
import { AddToCartData } from "../test_data/inventoryData.js";
import { InventoryPage } from "../pages/inventory.js";

test.beforeEach(async ({ loginObj }) => {
  await loginObj.login("standard_user", "secret_sauce");
});
for (const data of AddToCartData) {
  test(data.name, async ({ page }) => {
    const inventPage = new InventoryPage(page);

    for (const element of data.products) {
      await inventPage.addProductToCart(element);
    }
    await expect(inventPage.shoppingCartBadge).toHaveText(data.badgeCount);

    for (const element of data.products) {
      await inventPage.removeProductFromTheCart(element);
    }
    await expect(inventPage.shoppingCartBadge).toBeHidden();
  });
}
