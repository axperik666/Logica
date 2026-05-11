import { test, expect } from "@playwright/test";

test.describe("home", () => {
  test("loads default locale and shows hero", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({
      timeout: 30_000
    });
    await expect(page.locator("#hero")).toBeVisible();
  });

  test("trust strip under hero", async ({ page }) => {
    await page.goto("/en");
    await expect(
      page.getByText(/Why teams choose us/i).first()
    ).toBeVisible({ timeout: 30_000 });
  });

  test("guides section lists FAQ and cases", async ({ page }) => {
    await page.goto("/ru");
    const guides = page.locator("#guides");
    await expect(guides.getByRole("heading", { level: 2 })).toBeVisible({
      timeout: 30_000
    });
    await expect(guides.getByRole("link", { name: /FAQ/i })).toBeVisible();
    await expect(guides.getByRole("link", { name: /Кейсы/i })).toBeVisible();
  });
});
