import { test, expect } from "../fixtures/baseFixtures.js";
import { LoginTestCaseData } from "../test_data/LoginData.js";

for (const data of LoginTestCaseData) {
  test(data.name, async ({ page, loginObj }) => {
    await loginObj.login(data.username, data.password);

    if (data.error) {
      await expect(loginObj.errorMsg).toHaveText(data.error);
    } else {
      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.getByText("Product")).toBeVisible();
    }
  });
}
