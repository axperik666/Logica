import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { BreadcrumbsJsonLd } from "@/components/seo/BreadcrumbsJsonLd";
import { localePageAlternates } from "@/lib/hreflang";
import { Benefits } from "@/components/landing/Benefits";
import { ContactForm } from "@/components/landing/ContactForm";
import { ContactHero } from "@/components/landing/ContactHero";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { TrustBar } from "@/components/landing/TrustBar";

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
    <>
      <BreadcrumbsJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), path: "" },
          { name: t("title"), path: "/kontakty" }
        ]}
      />
      <main className="min-h-screen overflow-x-hidden bg-[#020617] text-white">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <Link href="/" className="shrink-0">
              <Image src="/logo.png" alt="LOGICA Marketing" width={180} height={48} className="h-9 w-auto" priority />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              <span aria-hidden>←</span>
              {t("landingBackHome")}
            </Link>
          </div>
        </nav>

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
