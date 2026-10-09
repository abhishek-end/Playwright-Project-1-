import { test, expect } from "../fixtures/baseFixtures.js";
import { InventoryPage } from "../pages/inventory.js";
import { CartPage } from "../pages/CartPages/Cart.js";
import { CartPage as CartInfo } from "../pages/CartPages/CheckOut.js";
import { CheckoutOverviewPage } from "../pages/CartPages/CheckoutOverviewPage.js";

test("Full Add to cart and checkout flow", async ({ page, loginObj }) => {
  await loginObj.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/inventory.html/);

  await test.step("Add product and open cart", async () => {
    const InventPage = new InventoryPage(page);
    await InventPage.addProductToCart("Sauce Labs Backpack");
    await InventPage.clickOnCart();
    await expect(page).toHaveURL(/cart.html/);
  });

  await test.step("verify the title and click on checkout", async () => {
    const CartListing = new CartPage(page);
    await expect(CartListing.productName).toHaveText("Sauce Labs Backpack");
    await CartListing.checkOut();
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  await test.step("Fill the checkout details", async () => {
    const checkoutInfo = new CartInfo(page);
    await checkoutInfo.checkOutDetails({
      fName: "David",
      lName: "Cha",
      zipCode: "1234567",
    });
    await checkoutInfo.continue();
    await expect(page).toHaveURL(/checkout-step-two.html/);
  });
  //overview of the cart
  await test.step("Check the overview of the cart", async () => {
    const overviewCart = new CheckoutOverviewPage(page);
    await expect(overviewCart.productName).toHaveText("Sauce Labs Backpack");
    await expect(overviewCart.itemPrice).toHaveText("$29.99");
    await expect(overviewCart.totalPrice).toHaveText("Total: $32.39");
    await overviewCart.clickFinish();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
  });
});
