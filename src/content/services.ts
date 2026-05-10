import type { Service } from "./serviceTypes";
export type { Service, ServiceContent } from "./serviceTypes";
import { routing } from "@/i18n/routing";
import { servicePack as packRu } from "./locales/services.ru";
import { servicePack as packEn } from "./locales/services.en";
import { servicePack as packIt } from "./locales/services.it";

const packs = { ru: packRu, en: packEn, it: packIt } as const;
type PackLocale = keyof typeof packs;

function normalizeLocale(locale: string): PackLocale {
  return locale in packs ? (locale as PackLocale) : (routing.defaultLocale as PackLocale);
}

export const SERVICE_SLUGS = [
  "sozdanie-lendinga",
  "nastrojka-reklamy-meta",
  "nastrojka-reklamy-google",
  "nastrojka-reklamy-tiktok",
  "sozdanie-kreativov"
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export function getService(locale: string, slug: string): Service | null {
  const body = packs[normalizeLocale(locale)][slug];
  if (!body) return null;
  return { slug, ...body };
}

export function listServices(locale: string): Service[] {
  return SERVICE_SLUGS.map((slug) => getService(locale, slug)).filter(
    (s): s is Service => s !== null
  );
}
