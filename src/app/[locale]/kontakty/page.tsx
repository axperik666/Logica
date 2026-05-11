import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactsPagePremium } from "@/components/contacts/ContactsPagePremium";
import { BreadcrumbsJsonLd } from "@/components/seo/BreadcrumbsJsonLd";
import { localePageAlternates } from "@/lib/hreflang";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...localePageAlternates(locale, "/kontakty")
  };
}

export default async function ContactsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "contactsPage" });

  return (
    <section className="tech-bg relative min-h-[60vh] overflow-hidden">
      <BreadcrumbsJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), path: "" },
          { name: t("title"), path: "/kontakty" }
        ]}
      />
      <ContactsPagePremium />
    </section>
  );
}
