import { defineRouting } from "next-intl/routing";

/** Локали и дефолт: русская версия для `/` при `localePrefix: "as-needed"` + `localeDetection: false` в middleware. */
export const routing = defineRouting({
  locales: ["ru", "en", "it"],
  defaultLocale: "ru",
  localePrefix: "as-needed"
});
