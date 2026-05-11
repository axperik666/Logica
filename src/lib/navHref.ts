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

/** Страница «Создание сайта» с якорём (см. id на `sozdanie-sajta/page.tsx`). */
export function websiteOfferHref(
  section: "landing" | "multipage" | "corporate"
): { pathname: "/sozdanie-sajta"; hash: string } {
  return { pathname: "/sozdanie-sajta", hash: section };
}
