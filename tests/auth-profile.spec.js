const { test, expect } = require("@playwright/test");

const BASE_URL = "http://localhost:3000";

const TEST_EMAIL = "sherbakov12342@gmail.com";
const TEST_PASSWORD = "@sA9892%";

test.describe("Auth & Profile flow", () => {
  test("Login flow and profile access – user can log in and access profile page", async ({ page }) => {
    await page.goto(`${BASE_URL}/user/signin?returnUrl=/user/profile`);

    await page.getByPlaceholder("name@example.com").fill(TEST_EMAIL);
    await page.locator('input[name="password"]').fill(TEST_PASSWORD);

    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page).toHaveURL(`${BASE_URL}/user/profile`);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /profile/i
    );
  });

  test("Protected profile redirects unauthenticated user to Sign In page", async ({ page }) => {
    await page.goto(`${BASE_URL}/user/profile`);

    await expect(page).toHaveURL(
      new RegExp(`${BASE_URL}/user/signin\\?returnUrl=`)
    );

    await expect(
      page.getByRole("heading", { level: 1, name: "Sign In" })
    ).toBeVisible();
  });
});
