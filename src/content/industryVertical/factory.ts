import type { IndustryTextCase, IndustryVerticalPageCopy } from "./types";

const LINK_CYCLE: ReadonlyArray<
  { href: string } | { pathname: "/"; hash: string }
> = [
  { href: "/kejsy/meta-performance" },
  { href: "/kejsy/b2b-leadgen" },
  { href: "/kejsy" },
  { href: "/kontakty" },
  { pathname: "/", hash: "cases" },
  { href: "/faq" }
];

type Row = readonly [string, string, string];

export function buildIndustryVerticalPage(
  metaTitle: string,
  metaDescription: string,
  heading: string,
  intro: string,
  videoEyebrow: string,
  textHeading: string,
  rows: readonly [Row, Row, Row, Row, Row, Row]
): IndustryVerticalPageCopy {
  const textCases = LINK_CYCLE.map((link, i) => {
    const [title, result, summary] = rows[i];
    const base = { title, result, summary };
    if ("href" in link) {
      return { ...base, href: link.href } as IndustryTextCase;
    }
    return {
      ...base,
      pathname: link.pathname,
      hash: link.hash
    } as IndustryTextCase;
  });

  return {
    metaTitle,
    metaDescription,
    heading,
    intro,
    videoEyebrow,
    textHeading,
    textCases
  };
}
