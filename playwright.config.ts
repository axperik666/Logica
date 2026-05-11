import { defineConfig, devices } from "@playwright/test";

const isCi = !!process.env.CI;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 2 : 0,
  workers: isCi ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry"
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: isCi ? "npm run start" : "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !isCi,
    timeout: isCi ? 180_000 : 120_000,
    env: {
      ...process.env,
      ...(isCi
        ? {
            NEXT_PUBLIC_GA_MEASUREMENT_ID:
              process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-TESTE2E1"
          }
        : {})
    }
  }
});
