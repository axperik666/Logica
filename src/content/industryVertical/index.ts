import { routing } from "@/i18n/routing";
import { INDUSTRY_KEYS, type IndustryKey } from "./keys";
import type { IndustryVerticalPageCopy } from "./types";
import { isIndustryKey } from "./types";
import { industryVerticalEn } from "./locales/en";
import { industryVerticalRu } from "./locales/ru";
import { industryVerticalIt } from "./locales/it";

const bundles: Record<
  (typeof routing.locales)[number],
  Record<IndustryKey, IndustryVerticalPageCopy>
> = {
  en: industryVerticalEn,
  ru: industryVerticalRu,
  it: industryVerticalIt
};

export function getIndustryVerticalPage(
  locale: string,
  key: string
): IndustryVerticalPageCopy | null {
  if (!isIndustryKey(key)) return null;
  const pack =
    locale in bundles
      ? bundles[locale as keyof typeof bundles]
      : bundles[routing.defaultLocale as keyof typeof bundles];
  return pack[key];
}

export { INDUSTRY_KEYS, INDUSTRY_FEATURED_VIDEO_CASE_ID } from "./keys";
export type { IndustryKey } from "./keys";
export type {
  IndustryVerticalPageCopy,
  IndustryTextCase,
  IndustryCaseLink
} from "./types";
export { isIndustryKey, industryCaseLinkHref } from "./types";
