import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Cases } from "@/components/sections/Cases";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { HomePageJsonLd } from "@/components/seo/HomePageJsonLd";
import { absoluteLocalizedUrl, languageAlternates } from "@/lib/hreflang";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });
  const canonical = absoluteLocalizedUrl(locale, "");

  return {
    alternates: {
      canonical,
      languages: languageAlternates("")
    },
    openGraph: {
      url: canonical,
      title: t("title"),
      description: t("description")
    }
  };
}

export default function HomePage() {
  return (
    <>
      <HomePageJsonLd />
      <Header />
      <main className="relative z-10 min-h-screen overflow-x-clip">
        <Hero />
        <Services />
        <Cases />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

