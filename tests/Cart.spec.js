import { test, expect } from "../fixtures/baseFixtures.js";
import { InventoryPage } from "../pages/inventory.js";
import { CartPage } from "../pages/CartPages/Cart.js";
import { CartPage as CartInfo } from "../pages/CartPages/CheckOut.js";
import { CheckoutOverviewPage } from "../pages/CartPages/CheckoutOverviewPage.js";
import { AddToCartData, detailsInfo } from "../test_data/inventoryData.js";
import { beforeEach } from "node:test";

// test.beforeEach(async ({ loginObj }) => {});

for (const data of AddToCartData) {
  test(`Full Checkout Flow ${data.name}`, async ({ page, loginObj }) => {
    const InventPage = new InventoryPage(page);
    const CartListing = new CartPage(page);
    const checkoutInfo = new CartInfo(page);
    const overviewCart = new CheckoutOverviewPage(page);

    await loginObj.login("standard_user", "secret_sauce");

    await test.step("Add products and open cart", async () => {
      for (const element of data.products) {
        await InventPage.addProductToCart(element);
      }
      await expect(InventPage.shoppingCartBadge).toHaveText(data.badgeCount);
      await InventPage.clickOnCart();
      await expect(page).toHaveURL(/cart.html/);
    });

    await test.step("verify the title and click on checkout", async () => {
      await expect(CartListing.productName).toHaveText(data.products);
      await CartListing.checkOut();
      await expect(page).toHaveURL(/checkout-step-one.html/);
    });

    await test.step("Fill the checkout details", async () => {
      for (const details of detailsInfo) {
        await checkoutInfo.checkOutDetails(details);
        await checkoutInfo.continue();
        await expect(page).toHaveURL(/checkout-step-two.html/);
      }
    });

    await test.step("Check the overview of the cart", async () => {
      await expect(overviewCart.productName).toHaveText(data.products);
      const totalCal = await overviewCart.totalCal();
      const displayedTotal = await overviewCart.totalFunc();
      expect(totalCal).toBeCloseTo(displayedTotal, 2);
      await overviewCart.clickFinish();
      await expect(page).toHaveURL(/checkout-complete.html/);
      await expect(page.getByText("Thank you for your order!")).toBeVisible();
    });
  });
}
