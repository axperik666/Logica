import { defineRouting } from "next-intl/routing";

/**
 * Все языки с префиксом в URL — удобно шарить ссылки:
 * `/en/...`, `/ru/...`, `/it/...` (корень `/` редиректит на `/en`).
 */
export const routing = defineRouting({
  locales: ["ru", "en", "it"],
  defaultLocale: "en",
  localePrefix: "always"
});
