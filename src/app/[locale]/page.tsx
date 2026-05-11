import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";

/** Свежие кейсы и переводы без устаревшего статического снимка страницы. */
export const dynamic = "force-dynamic";
import { Platforms } from "@/components/sections/Platforms";
import { Services } from "@/components/sections/Services";
import { HomeGrowthBento } from "@/components/sections/HomeGrowthBento";
import { Cases } from "@/components/sections/Cases";
import { BlogSection } from "@/components/sections/BlogSection";
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
      <Hero />
      <TrustStrip />
      <Platforms />
      <Services />
      <HomeGrowthBento />
      <Cases />
      <BlogSection />
      <CTA />
    </>
  );
}
