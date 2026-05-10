/** Кастомный домен продакшена (если в Vercel не задан NEXT_PUBLIC_SITE_URL). */
export const PRODUCTION_SITE_ORIGIN = "https://logicamarketing.pro";

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  if (process.env.VERCEL_ENV === "production") {
    return PRODUCTION_SITE_ORIGIN;
  }

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`.replace(/\/+$/, "");

  return "http://localhost:3000";
}

/**
 * Hostname для редиректа `*.vercel.app` → ваш домен (только Vercel Production).
 */
export function getProductionCanonicalHostname(): string | null {
  if (process.env.VERCEL_ENV !== "production") return null;
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    try {
      return new URL(explicit).hostname;
    } catch {
      return null;
    }
  }
  try {
    return new URL(PRODUCTION_SITE_ORIGIN).hostname;
  } catch {
    return null;
  }
}

