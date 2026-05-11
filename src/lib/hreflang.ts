import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";
import { localizedPath } from "@/lib/localePath";

/** Для `<link rel="alternate" hreflang>` и поля `alternates.languages` в Metadata. */
export function languageAlternates(path: string): Record<string, string> {
  const base = getSiteUrl().replace(/\/+$/, "");
  const map: Record<string, string> = {};
  for (const locale of routing.locales) {
    const suffix = localizedPath(locale, path);
    const url = `${base}${suffix === "/" ? "" : suffix}`;
    const hrefLang =
      locale === "ru" ? "ru-RU" : locale === "it" ? "it-IT" : "en-US";
    map[hrefLang] = url;
  }
  const defSuffix = localizedPath(routing.defaultLocale, path);
  map["x-default"] = `${base}${defSuffix === "/" ? "" : defSuffix}`;
  return map;
}

export function absoluteLocalizedUrl(locale: string, path: string): string {
  const base = getSiteUrl().replace(/\/+$/, "");
  const suffix = localizedPath(locale, path);
  return `${base}${suffix === "/" ? "" : suffix}`;
}

/** Canonical + hreflang + `openGraph.url` для страниц под `[locale]`. */
export function localePageAlternates(
  locale: string,
  path: string
): Pick<Metadata, "alternates" | "openGraph"> {
  const canonical = absoluteLocalizedUrl(locale, path);
  return {
    alternates: {
      canonical,
      languages: languageAlternates(path)
    },
    openGraph: { url: canonical }
  };
}
