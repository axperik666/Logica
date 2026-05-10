import { getLocale, getTranslations } from "next-intl/server";
import { HOME_CASE_IDS } from "@/content/homeCases";
import { getSiteUrl } from "@/lib/site";
import { localizedPath } from "@/lib/localePath";

type ServiceCard = {
  title: string;
  desc: string;
  href: string;
};

/** Rich results: WebPage sections + услуги + кейсы (CreativeWork с URL якоря). */
export async function HomePageJsonLd() {
  const locale = await getLocale();
  const base = getSiteUrl().replace(/\/+$/, "");
  const pageUrl = `${base}${localizedPath(locale, "")}`;

  const tServices = await getTranslations({ locale, namespace: "services" });
  const tCases = await getTranslations({ locale, namespace: "cases" });
  const tSec = await getTranslations({ locale, namespace: "sectionsSeo" });
  const cards = tServices.raw("cards") as ServiceCard[];

  const sectionAnchors: { key: string; hash: string }[] = [
    { key: "hero", hash: "#hero" },
    { key: "platforms", hash: "#platforms" },
    { key: "whyUs", hash: "#why-us" },
    { key: "process", hash: "#process" },
    { key: "services", hash: "#services" },
    { key: "clients", hash: "#clients" },
    { key: "cases", hash: "#cases" },
    { key: "testimonials", hash: "#testimonials" },
    { key: "homeFaq", hash: "#faq" },
    { key: "cta", hash: "#contact" }
  ];

  const hasPart = sectionAnchors.map((s) => ({
    "@type": "WebPageElement",
    "@id": `${pageUrl}${s.hash}`,
    name: tSec(`${s.key}.metaTitle`),
    description: tSec(`${s.key}.metaDescription`),
    url: `${pageUrl}${s.hash}`
  }));

  const serviceItems = cards.map((card, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: card.title,
      description: card.desc,
      url: `${base}${localizedPath(locale, card.href)}`,
      provider: { "@id": `${base}/#organization` },
      areaServed: "Worldwide"
    }
  }));

  const caseItems = HOME_CASE_IDS.map((id, i) => {
    const frag = `#case-${id}`;
    return {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${pageUrl}${frag}`,
        url: `${pageUrl}${frag}`,
        name: `${tCases(`items.${id}.client`)} — ${tCases(`items.${id}.niche`)}`,
        headline: tCases(`items.${id}.result`),
        abstract: tCases(`items.${id}.summary`),
        creator: { "@id": `${base}/#organization` }
      }
    };
  });

  const graph = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: tSec("hero.metaTitle"),
      description: tSec("hero.metaDescription"),
      isPartOf: { "@id": `${base}/#website` },
      hasPart
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#homepage-services`,
      name: tServices("title"),
      numberOfItems: serviceItems.length,
      itemListElement: serviceItems
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#homepage-cases`,
      name: tCases("titleBrand"),
      numberOfItems: caseItems.length,
      itemListElement: caseItems
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
