import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BreadcrumbsJsonLd } from "@/components/seo/BreadcrumbsJsonLd";
import { localePageAlternates } from "@/lib/hreflang";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiesPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...localePageAlternates(locale, "/cookies")
  };
}

export default async function CookiesPolicyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "cookiesPage" });
  const categoriesRaw = t.raw("categories");
  const categories = Array.isArray(categoriesRaw)
    ? (categoriesRaw as { title: string; body: string }[])
    : [];

  return (
    <section className="tech-bg relative site-container py-10 sm:py-14">
      <BreadcrumbsJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), path: "" },
          { name: t("title"), path: "/cookies" }
        ]}
      />
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t("title")}
      </h1>
      <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-white/70">
        <p>{t("intro")}</p>
        <ul className="list-disc space-y-4 pl-5">
          {categories.map((c) => (
            <li key={c.title}>
              <strong className="text-white/90">{c.title}</strong>
              <span className="mt-1 block font-normal">{c.body}</span>
            </li>
          ))}
        </ul>
        <p>{t("control")}</p>
        <p>{t("outro")}</p>
      </div>
    </section>
  );
}
