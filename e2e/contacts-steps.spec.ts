import { test, expect } from "@playwright/test";

test.describe("contacts landing form", () => {
  test("full request section shows task field", async ({ page }) => {
    await page.goto("/en/kontakty");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 30_000 });

    await page.locator("#full-form").scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: /Full request/i })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByPlaceholder(/Briefly describe/i)).toBeVisible();
  });
});
