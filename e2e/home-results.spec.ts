import { test, expect } from "@playwright/test";

test.describe("home results metrics", () => {
  test("results section shows animated metrics", async ({ page }) => {
    await page.goto("/ru");
    const section = page.locator("#results");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible({ timeout: 30_000 });
    await expect(section.getByText(/47\+|47 \+/)).toBeVisible({ timeout: 15_000 });
    await expect(section.getByText(/380\s*%|380%/)).toBeVisible();
  });
});
