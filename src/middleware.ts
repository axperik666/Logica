import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { getProductionCanonicalHostname } from "@/lib/site";

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false
});

/**
 * Production: запрос к `*.vercel.app` → кастомный домен (NEXT_PUBLIC_SITE_URL или
 * https://logicamarketing.pro), путь и query сохраняются (в т.ч. `/it`).
 * Preview не трогаем.
 */
function canonicalHostRedirect(request: NextRequest): NextResponse | null {
  const canonicalHost = getProductionCanonicalHostname();
  if (!canonicalHost) return null;
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (!host || host === canonicalHost) return null;
  if (!host.endsWith(".vercel.app")) return null;

  const url = request.nextUrl.clone();
  url.hostname = canonicalHost;
  url.protocol = "https:";
  return NextResponse.redirect(url, 308);
}

export default function middleware(request: NextRequest) {
  const redirect = canonicalHostRedirect(request);
  if (redirect) return redirect;
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
  ]
};
