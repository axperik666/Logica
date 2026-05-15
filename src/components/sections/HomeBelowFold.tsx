import dynamic from "next/dynamic";
import { HomeGrowthBento } from "@/components/sections/HomeGrowthBento";
import { HomeSpotlightCase } from "@/components/sections/HomeSpotlightCase";
import { Certifications } from "@/components/sections/Certifications";
import { Industries } from "@/components/sections/Industries";

const CasesSection = dynamic(() => import("@/components/sections/CasesSection"));
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const LatestInsights = dynamic(() =>
  import("@/components/sections/LatestInsights").then((m) => ({ default: m.LatestInsights }))
);
const ROICalculator = dynamic(() =>
  import("@/components/sections/ROICalculator").then((m) => ({ default: m.ROICalculator }))
);
const CTA = dynamic(() => import("@/components/sections/CTA").then((m) => ({ default: m.CTA })));

export async function HomeBelowFold() {
  return (
    <>
      <Certifications />
      <Industries />
      <HomeGrowthBento />
      <HomeSpotlightCase />
      <CasesSection />
      <Testimonials limit={6} />
      <LatestInsights />
      <ROICalculator />
      <CTA />
    </>
  );
}
