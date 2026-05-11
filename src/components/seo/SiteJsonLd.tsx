import { getLocale, getMessages } from "next-intl/server";
import { CONTACTS } from "@/lib/contacts";
import { getSiteUrl } from "@/lib/site";

type JsonLdMessages = {
  description: string;
  country: string;
  faq: { q: string; a: string }[];
};

export async function SiteJsonLd() {
  const base = getSiteUrl().replace(/\/+$/, "");
  const logoUrl = `${base}/logo.png`;
  const locale = await getLocale();
  const messages = await getMessages();
  const jd = messages.jsonLd as JsonLdMessages;

  const inLanguage =
    locale === "ru" ? "ru-RU" : locale === "it" ? "it-IT" : "en-US";

  const serviceTypes = [
    "Performance marketing",
    "SEO",
    "Paid media",
    "Social media marketing",
    "Lead generation",
    "Digital strategy",
    "Analytics & attribution"
  ];

  const graph = [
    {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: "LOGICA Marketing",
      alternateName: ["Logica Marketing", "LOGICA"],
      url: base,
      logo: {
        "@type": "ImageObject",
        "@id": `${base}/#logo`,
        url: logoUrl,
        caption: "LOGICA Marketing"
      },
      description: jd.description,
      email: CONTACTS.email,
      sameAs: [CONTACTS.telegramHttps, CONTACTS.whatsappHref],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: CONTACTS.email,
          availableLanguage: ["Russian", "English", "Italian"]
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: CONTACTS.telegramHttps,
          availableLanguage: ["Russian", "English", "Italian"]
        }
      ],
      areaServed: {
        "@type": "Country",
        name: jd.country
      },
      knowsAbout: [
        "LOGICA Marketing",
        "performance marketing",
        "SEO продвижение",
        "таргетированная реклама",
        "SMM",
        "digital marketing agency",
        "увеличение продаж",
        "ROAS",
        "lead generation"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": `${base}/#professional-service`,
      name: "LOGICA Marketing",
      url: base,
      image: logoUrl,
      description: jd.description,
      provider: { "@id": `${base}/#organization` },
      priceRange: "$$$",
      serviceType: serviceTypes,
      areaServed: [{ "@type": "Country", name: jd.country }],
      knowsAbout: [
        "performance marketing",
        "SEO",
        "paid social",
        "conversion optimization"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: base,
      name: "LOGICA Marketing",
      description: jd.description,
      inLanguage,
      publisher: { "@id": `${base}/#organization` }
    },
    {
      "@type": "FAQPage",
      "@id": `${base}/#faq`,
      mainEntity: jd.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a
        }
      }))
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
