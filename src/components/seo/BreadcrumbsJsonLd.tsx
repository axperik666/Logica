import { getSiteUrl } from "@/lib/site";
import { localizedPath } from "@/lib/localePath";

type Crumb = { name: string; path: string };

export function BreadcrumbsJsonLd({
  locale,
  items
}: {
  locale: string;
  items: Crumb[];
}) {
  const base = getSiteUrl().replace(/\/+$/, "");
  const list = items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${base}${localizedPath(locale, item.path)}`
  }));

  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
