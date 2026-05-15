import { test, expect } from "@playwright/test";

test.describe("desktop locale switcher", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("switches RU to EN on home", async ({ page }) => {
    await page.goto("/ru");
    await expect(page).toHaveURL(/\/ru/);
    const enLink = page.getByRole("link", { name: "EN" }).first();
    await expect(enLink).toBeVisible({ timeout: 30_000 });
    await enLink.click();
    await expect(page).toHaveURL(/\/en/, { timeout: 15_000 });
  });

  test("root redirects to default locale", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/(ru|en|it)(\/|$)/, { timeout: 15_000 });
  });
});
