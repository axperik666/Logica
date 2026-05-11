import { test, expect } from "@playwright/test";

test.describe("contacts form steps", () => {
  test("step validation then step 2", async ({ page }) => {
    await page.goto("/en/kontakty");
    await expect(
      page.getByRole("heading", { level: 1, name: /Contact/i })
    ).toBeVisible({ timeout: 30_000 });

    await page.getByRole("button", { name: /Continue/i }).click();
    await expect(page.getByRole("alert")).toBeVisible();

    await page.getByPlaceholder(/How should we address you/i).fill("Playwright");
    await page.getByPlaceholder(/Telegram \/ WhatsApp \/ Email/i).fill("@test");
    await page.getByRole("button", { name: /Continue/i }).click();

    await expect(page.getByPlaceholder(/Briefly:/i)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("button", { name: /Back/i })).toBeVisible();
  });
});
