import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { services } from "@/content/services";
import { routing } from "@/i18n/routing";
import { languageAlternates } from "@/lib/hreflang";
import { getSiteUrl } from "@/lib/site";
import { localizedPath } from "@/lib/localePath";

const STATIC_PATHS = [
  "",
  "/uslugi",
  "/kejsy",
  "/o-nas",
  "/kontakty",
  "/privacy",
  "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/+$/, "");
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      const suffix = localizedPath(locale, path);
      const url = `${base}${suffix === "/" ? "" : suffix}`;
      const priority =
        path === ""
          ? 1
          : path.startsWith("/uslugi/") || path.startsWith("/kejsy/")
            ? 0.75
            : 0.82;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority,
        alternates: {
          languages: languageAlternates(path)
        }
      });
    }
  }

  for (const s of services) {
    const path = `/uslugi/${s.slug}`;
    for (const locale of routing.locales) {
      const suffix = localizedPath(locale, path);
      const url = `${base}${suffix}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.72,
        alternates: {
          languages: languageAlternates(path)
        }
      });
    }
  }

  for (const c of cases) {
    const path = `/kejsy/${c.slug}`;
    for (const locale of routing.locales) {
      const suffix = localizedPath(locale, path);
      const url = `${base}${suffix}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.72,
        alternates: {
          languages: languageAlternates(path)
        }
      });
    }
  }

  return entries;
}
