import { test, expect } from "../fixtures/baseFixtures";
import { CartPage } from "../pages/CartPages/Cart";
import { InventoryPage } from "../pages/inventory";
import { AddToCartData, detailsInfo } from "../test_data/inventoryData";
import { CartPage as Cart } from "../pages/CartPages/CheckOut";
import { CheckoutOverviewPage } from "../pages/CartPages/CheckoutOverviewPage";
//made repeated code at one place
const navigateToCheckout = async (page, element) => {
  const inventoryCart = new InventoryPage(page);
  for (const el of element.products) {
    await inventoryCart.addProductToCart(el);
  }
  await expect(inventoryCart.shoppingCartBadge).toHaveText(element.badgeCount);
  await inventoryCart.clickOnCart();
  // verify the added products

  const cartProducts = new CartPage(page);
  await expect(cartProducts.productName).toHaveText(element.products);

  //Click Checkout.
  await cartProducts.checkOut();
  await expect(page).toHaveURL(/checkout-step-one.html/);
};

test.beforeEach(async ({ page, loginObj }) => {
  await loginObj.login("standard_user", "secret_sauce");
  await expect(page.getByText("Swag Labs")).toBeVisible();
});

test.afterEach(async ({}, testInfo) => {
  console.log(testInfo.status);
  console.log(testInfo.duration);
  console.log(testInfo.title);
  console.log(testInfo.retry);
});
let startTime;

test.beforeAll(async () => {
  startTime = Date.now();
  console.log("Starting SauceDemo Checkout Validation Suite");
  console.log("startTime", new Date(startTime).toLocaleTimeString());
});

test.afterAll(async () => {
  let endTime = Date.now();
  let duration = (endTime - startTime) / 1000;
  // Print "SauceDemo Checkout Validation Suite Completed".
  console.log("SauceDemo Checkout Validation Suite Completed");
  // Record the suite's end time.
  console.log("end time", new Date(endTime).toLocaleTimeString());
  console.log("Total Duration:", duration.toFixed(2));
});
for (const element of AddToCartData) {
  test(`Checkout Full valid checkout - ${element.name}`, async ({ page }) => {
    await navigateToCheckout(page, element);
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
  });
}
for (const element of AddToCartData) {
  test(`Empty first name - ${element.name}`, async ({ page }) => {
    await navigateToCheckout(page, element);
    // Enter valid first name, last name, and postal code.
    const cartDetails = new Cart(page);
    for (const data of detailsInfo) {
      await cartDetails.checkOutDetails({
        ...data,
        fName: "",
      });
    }
    await cartDetails.continue();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Error: First Name is required",
    );
  });
}
for (const element of AddToCartData) {
  test(`Empty Zipcode  - ${element.name}`, async ({ page }) => {
    await navigateToCheckout(page, element);
    const cartDetails = new Cart(page);
    for (const element of detailsInfo) {
      await cartDetails.checkOutDetails({
        ...element,
        zipCode: "",
      });
    }
    await cartDetails.continue();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Error: Postal Code is required",
    );
  });
}
for (const element of AddToCartData) {
  test(`Empty last name - ${element.name}`, async ({ page }) => {
    await navigateToCheckout(page, element);
    const cartDetails = new Cart(page);
    for (const element of detailsInfo) {
      await cartDetails.checkOutDetails({
        ...element,
        lName: "",
      });
    }
    await cartDetails.continue();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Error: Last Name is required",
    );
  });
}
