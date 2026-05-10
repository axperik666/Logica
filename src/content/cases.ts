import type { CaseStudy } from "./caseTypes";
export type { CaseStudy, CaseStudyContent } from "./caseTypes";
import { routing } from "@/i18n/routing";
import { casePack as packRu } from "./locales/cases.ru";
import { casePack as packEn } from "./locales/cases.en";
import { casePack as packIt } from "./locales/cases.it";

const packs = { ru: packRu, en: packEn, it: packIt } as const;
type PackLocale = keyof typeof packs;

function normalizeLocale(locale: string): PackLocale {
  return locale in packs ? (locale as PackLocale) : (routing.defaultLocale as PackLocale);
}

export const CASE_SLUGS = ["b2b-leadgen", "meta-performance"] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

export function getCase(locale: string, slug: string): CaseStudy | null {
  const body = packs[normalizeLocale(locale)][slug];
  if (!body) return null;
  return { slug, ...body };
}

export function listCases(locale: string): CaseStudy[] {
  return CASE_SLUGS.map((slug) => getCase(locale, slug)).filter(
    (c): c is CaseStudy => c !== null
  );
}
