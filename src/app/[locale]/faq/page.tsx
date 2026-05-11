import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FAQ } from "@/components/sections/FAQ";
import { FaqStandaloneJsonLd } from "@/components/seo/FaqStandaloneJsonLd";
import { BreadcrumbsJsonLd } from "@/components/seo/BreadcrumbsJsonLd";
import { localePageAlternates } from "@/lib/hreflang";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...localePageAlternates(locale, "/faq")
  };
}

export default async function FaqPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "faqPage" });

  return (
    <>
      <BreadcrumbsJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), path: "" },
          { name: t("metaTitle"), path: "/faq" }
        ]}
      />
      <FaqStandaloneJsonLd />
      <FAQ />
    </>
  );
}
