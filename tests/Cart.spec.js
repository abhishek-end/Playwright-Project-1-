import { test, expect } from "../fixtures/baseFixtures.js";
import { InventoryPage } from "../pages/inventory.js";
import { CartPage } from "../pages/CartPages/Cart.js";
import { CartPage as CartInfo } from "../pages/CartPages/CheckOut.js";
import { CheckoutOverviewPage } from "../pages/CartPages/CheckoutOverviewPage.js";
import { AddToCartData, detailsInfo } from "../test_data/inventoryData.js";

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
      // Extract and sum product prices
      const inventPrice = await overviewCart.itemPrice.allTextContents();
      const numbers = inventPrice.map((price) =>
        parseFloat(price.replace("$", "")),
      );
      const itemTotal = numbers.reduce(
        (sum, currentValue) => sum + currentValue,
        0,
      );
      // Extract and sum tax
      const taxText = await overviewCart.taxText.allTextContents();
      const taxNumbers = taxText.map((price) =>
        Number(parseFloat(price.replace("Tax: $", "")).toFixed(2)),
      );
      const taxItem = taxNumbers.reduce(
        (sum, currentValue) => sum + currentValue,
        0,
      );
      // Extract displayed total from page
      const totalAmount = await overviewCart.totalPrice.allTextContents();
      const totalNumbers = totalAmount.map((price) =>
        Number(parseFloat(price.replace("Total: $", "")).toFixed(2)),
      );
      // Calculate expected total and assert
      const calculatedTotal = itemTotal + taxItem;
      expect(Number(calculatedTotal.toFixed(2))).toBeCloseTo(
        totalNumbers[0],
        2,
      );
      await overviewCart.clickFinish();
      await expect(page).toHaveURL(/checkout-complete.html/);
      await expect(page.getByText("Thank you for your order!")).toBeVisible();
    });
  });
}
