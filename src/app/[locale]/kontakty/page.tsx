import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BreadcrumbsJsonLd } from "@/components/seo/BreadcrumbsJsonLd";
import { Benefits } from "@/components/landing/Benefits";
import { ContactForm } from "@/components/landing/ContactForm";
import { ContactHero } from "@/components/landing/ContactHero";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { TrustBar } from "@/components/landing/TrustBar";
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

export default async function KontaktyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "contactsPage" });

  return (
    <>
      <BreadcrumbsJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), path: "" },
          { name: t("title"), path: "/kontakty" }
        ]}
      />

      <main className="overflow-x-hidden bg-[#020617] text-white">
        <ContactHero />
        <TrustBar />
        <Benefits />
        <ProcessSteps />

        <section id="full-form" className="scroll-mt-[calc(var(--header-h)+1rem)]">
          <ContactForm />
        </section>

        <footer className="border-t border-white/10 bg-black py-12 text-sm text-white/60">
          <div className="mx-auto max-w-7xl px-6 text-center">{t("landingFooterLine")}</div>
        </footer>
      </main>
    </>
  );
}
