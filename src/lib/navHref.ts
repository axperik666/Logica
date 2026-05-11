/**
 * Якорные ссылки на главную — объект для next-intl Link (корректный префикс локали).
 */
export function homeSectionHref(
  section: "hero" | "services" | "cases" | "testimonials" | "clients" | "contact"
): { pathname: "/"; hash: string } {
  return { pathname: "/", hash: section };
}

/** Произвольный hash на главной (например `blog`). */
export function homeHashHref(hash: string): { pathname: "/"; hash: string } {
  return { pathname: "/", hash };
}
