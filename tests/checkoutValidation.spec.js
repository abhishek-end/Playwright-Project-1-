import { test, expect } from "../fixtures/baseFixtures";
import { CartPage } from "../pages/CartPages/Cart";
import { InventoryPage } from "../pages/inventory";
import { AddToCartData, detailsInfo } from "../test_data/inventoryData";
import { CartPage as Cart } from "../pages/CartPages/CheckOut";
import { CheckoutOverviewPage } from "../pages/CartPages/CheckoutOverviewPage";

test.beforeEach(async ({ page, loginObj }) => {
  await loginObj.login("standard_user", "secret_sauce");
  await expect(page.getByText("Swag Labs")).toBeVisible();
});

test("Checkout with valid customer details", async ({ page }) => {
  for (const element of AddToCartData) {
    const inventoryCart = new InventoryPage(page);
    for (const el of element.products) {
      await inventoryCart.addProductToCart(el);
    }
    await expect(inventoryCart.shoppingCartBadge).toHaveText(
      element.badgeCount,
    );
    await inventoryCart.clickOnCart();
    // verify the added products

    const cartProducts = new CartPage(page);
    await expect(cartProducts.productName).toHaveText(element.products);

    //Click Checkout.
    await cartProducts.checkOut();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    // Enter valid first name, last name, and postal code.
    const cartDetails = new Cart(page);
    for (const data of detailsInfo) {
      await cartDetails.checkOutDetails(data);
    }
    //click continue
    await cartDetails.continue();
    //Verify the checkout overview page.
    const overviewCart = new CheckoutOverviewPage(page);
    await expect(overviewCart.productName).toHaveText(element.products);
    const totalCal = await overviewCart.totalCal();
    const displayedTotal = await overviewCart.totalFunc();
    expect(totalCal).toBeCloseTo(displayedTotal, 2);
    await overviewCart.clickFinish();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
  }
});
