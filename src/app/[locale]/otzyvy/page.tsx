import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Testimonials } from "@/components/sections/Testimonials";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "testimonialsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription")
  };
}

export default function TestimonialsPage() {
  return <Testimonials />;
}
