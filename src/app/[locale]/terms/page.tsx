import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "termsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription")
  };
}

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "termsPage" });

  return (
    <section className="tech-bg relative site-container py-10 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t("title")}
      </h1>
      <div className="mt-6 max-w-3xl space-y-3 text-sm text-white/70">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
      </div>
    </section>
  );
}
