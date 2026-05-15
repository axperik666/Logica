import { test, expect } from "@playwright/test";

test.describe("CTA lead form", () => {
  test("submits with mocked API", async ({ page }) => {
    await page.route("**/api/lead", async (route) => {
      if (route.request().method() !== "POST") {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true })
      });
    });

    await page.goto("/en");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    await page.locator('input[name="name"]').fill("E2E Test");
    await page.locator('input[name="phone"]').fill("+1 509 780 3788");
    await page.locator('form').filter({ has: page.locator('input[name="name"]') }).getByRole("button").click();

    await expect(page.getByText(/You're all set|Всё отправлено|Tutto pronto/i).first()).toBeVisible({
      timeout: 15_000
    });
  });
});
