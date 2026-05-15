import { test, expect } from "@playwright/test";

test.describe("home", () => {
  test("loads default locale and shows hero", async ({ page }) => {
    await page.goto("/ru");
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

  test("contacts page loads and shows form heading", async ({ page }) => {
    await page.goto("/en/kontakty");
    await expect(
      page.getByRole("heading", { level: 1, name: /Contact/i })
    ).toBeVisible({ timeout: 30_000 });
  });

  test("home spotlight block after scroll", async ({ page }) => {
    await page.goto("/en");
    await page.locator("#spotlight-case").scrollIntoViewIfNeeded();
    await expect(page.locator("#spotlight-case")).toBeVisible({
      timeout: 30_000
    });
  });

  test("cookie policy page", async ({ page }) => {
    await page.goto("/en/cookies");
    await expect(
      page.getByRole("heading", { level: 1, name: /Cookie policy/i })
    ).toBeVisible({ timeout: 30_000 });
  });
});
