const { test, expect } = require("@playwright/test");

const BASE_URL = "http://localhost:3000";

test.describe("Navigation", () => {
  test("navigation to Sign In page works", async ({ page }) => {
    await page.goto(BASE_URL);

    await page
      .getByRole("banner")
      .getByRole("link", { name: "Sign In" })
      .click();

    await expect(page).toHaveURL(`${BASE_URL}/user/signin`);

    await expect(
      page.getByRole("heading", { level: 1, name: "Sign In" })
    ).toBeVisible();
  });
});
