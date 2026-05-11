import { getLocale, getTranslations } from "next-intl/server";
import { getSiteUrl } from "@/lib/site";
import { localizedPath } from "@/lib/localePath";

type FaqItem = { q: string; a: string };

/** FAQPage для маршрута `/faq` (контент совпадает с блоком homeFaq). */
export async function FaqStandaloneJsonLd() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "homeFaq" });
  const raw = t.raw("items");
  const items = Array.isArray(raw) ? (raw as FaqItem[]) : [];

  const base = getSiteUrl().replace(/\/+$/, "");
  const pageUrl = `${base}${localizedPath(locale, "/faq")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faqpage`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
