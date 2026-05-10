import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FAQ } from "@/components/sections/FAQ";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription")
  };
}

export default function FaqPage() {
  return <FAQ />;
}
