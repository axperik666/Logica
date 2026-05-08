import { defineRouting } from "next-intl/routing";

/** Локали и дефолт: английская версия без префикса для `/` при `localePrefix: "as-needed"` + `localeDetection: false` в middleware. */
export const routing = defineRouting({
  locales: ["ru", "en", "it"],
  defaultLocale: "en",
  localePrefix: "as-needed"
});
