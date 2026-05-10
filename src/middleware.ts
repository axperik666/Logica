import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false
});

/**
 * Production: если открыли проект по заводскому `*.vercel.app`, перенаправляем на
 * кастомный домен из NEXT_PUBLIC_SITE_URL с тем же путём и query (в т.ч. `/it`).
 * Preview (`VERCEL_ENV=preview`) не трогаем.
 */
function canonicalHostRedirect(request: NextRequest): NextResponse | null {
  if (process.env.VERCEL_ENV !== "production") return null;
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  let canonicalHost: string;
  try {
    canonicalHost = new URL(raw).hostname;
  } catch {
    return null;
  }
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
