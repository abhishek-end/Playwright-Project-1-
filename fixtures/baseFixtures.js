import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

export const test = base.extend({
  loginObj: async ({ page }, use) => {
    const loginObject = new LoginPage(page);
    await loginObject.gotoUrl();
    await use(loginObject);
  },
});

export { expect } from "@playwright/test";
