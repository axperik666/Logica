import { test, expect } from "@playwright/test";

test.describe("cookie consent and analytics gating", () => {
  test("no gtag before accept; localStorage set after accept", async ({
    page,
    context
  }) => {
    await context.addInitScript(() => {
      try {
        window.localStorage.removeItem("logica_cookie_consent_v1");
      } catch {
        /* ignore */
      }
    });
    await context.clearCookies();
    await page.goto("/en", { waitUntil: "domcontentloaded" });

    const gtag = page.locator('script[src*="googletagmanager.com/gtag/js"]');
    await expect(gtag).toHaveCount(0);

    const dialog = page.getByRole("dialog", { name: /cookie/i });
    await expect(dialog).toBeVisible({ timeout: 30_000 });

    await page.getByRole("button", { name: /Accept/i }).click();
    await expect(dialog).toBeHidden({ timeout: 10_000 });

    const stored = await page.evaluate(() =>
      window.localStorage.getItem("logica_cookie_consent_v1")
    );
    expect(stored).toBe("1");

    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      await expect(gtag.first()).toBeVisible({ timeout: 20_000 });
    }
  });
});
