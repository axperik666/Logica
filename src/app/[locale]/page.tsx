import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import InteractiveBackground from "@/components/InteractiveBackground";
import { SiteSplash } from "@/components/SiteSplash";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TrustBar } from "@/components/sections/TrustBar";
import { Platforms } from "@/components/sections/Platforms";
import { Services } from "@/components/sections/Services";
import { Results } from "@/components/sections/Results";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Team } from "@/components/sections/Team";
import { HomeBelowFold } from "@/components/sections/HomeBelowFold";
import { HomePageJsonLd } from "@/components/seo/HomePageJsonLd";
import { absoluteLocalizedUrl, languageAlternates } from "@/lib/hreflang";

/** ISR: переводы и кейсы обновляются раз в час без force-dynamic. */
export const revalidate = 3600;

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
      <SiteSplash />
      <Hero>
        <InteractiveBackground
          className="absolute inset-0 z-[1] min-h-full min-w-full max-md:opacity-[0.82] md:opacity-[0.42]"
          particleCount={84}
        />
      </Hero>
      <TrustStrip />
      <TrustBar />
      <Platforms />
      <Services />
      <Results />
      <Process />
      <Team />
      <WhyUs />
      <HomeBelowFold />
    </>
  );
}
