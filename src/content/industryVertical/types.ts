import { INDUSTRY_KEYS, type IndustryKey } from "./keys";

/** Ссылки на существующие разделы сайта (кейсы, контакты, FAQ и т.д.). */
export type IndustryCaseLink =
  | { href: string }
  | { pathname: "/"; hash: string };

export type IndustryTextCase = {
  title: string;
  result: string;
  summary: string;
} & IndustryCaseLink;

export type IndustryVerticalPageCopy = {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  videoEyebrow: string;
  textHeading: string;
  textCases: IndustryTextCase[];
};

export type IndustryVerticalBundle = Record<
  IndustryKey,
  IndustryVerticalPageCopy
>;

export function isIndustryKey(k: string): k is IndustryKey {
  return (INDUSTRY_KEYS as readonly string[]).includes(k);
}

/** Для `next-intl` Link: строка или главная с якорем `#cases`. */
export function industryCaseLinkHref(
  item: IndustryTextCase
): string | { pathname: "/"; hash: string } {
  if ("pathname" in item) {
    return { pathname: "/", hash: item.hash };
  }
  return item.href;
}
