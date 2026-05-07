import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

/** Без автоопределения по Accept-Language: первый заход на `/` → русский (defaultLocale). */
export default createMiddleware({
  ...routing,
  localeDetection: false
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
