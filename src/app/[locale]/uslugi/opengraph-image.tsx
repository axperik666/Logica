import { getTranslations } from "next-intl/server";
import { createPageOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "LOGICA Marketing — Services";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return createPageOgImage({
    eyebrow: "LOGICA",
    headline: t("title"),
    subline: t("description")
  });
}
