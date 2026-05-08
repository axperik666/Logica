import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

/** Без автоопределения по Accept-Language: первый заход на `/` → русский (defaultLocale). */
export default createMiddleware({
  ...routing,
  localeDetection: false
});

export const config = {
  matcher: [
    /**
     * Корень `/` обязателен отдельной строкой: шаблон ниже не всегда матчит пустой путь,
     * тогда middleware не делает rewrite на `[locale]` → 404 на главной.
     */
    "/",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
  ]
};
