import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Testimonials } from "@/components/sections/Testimonials";
import { localePageAlternates } from "@/lib/hreflang";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "testimonialsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...localePageAlternates(locale, "/otzyvy")
  };
}

export default function TestimonialsPage() {
  return <Testimonials />;
}
