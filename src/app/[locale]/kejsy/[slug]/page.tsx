import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { localePageAlternates } from "@/lib/hreflang";
import { getCase, CASE_SLUGS } from "@/content/cases";
import { Button } from "@/components/ui/button";
import { BreadcrumbsJsonLd } from "@/components/seo/BreadcrumbsJsonLd";

export function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getCase(locale, slug);
  if (!c) return {};
  const alt = localePageAlternates(locale, `/kejsy/${slug}`);
  return {
    title: c.title,
    description: c.result,
    alternates: alt.alternates,
    openGraph: {
      ...alt.openGraph,
      title: c.title,
      description: c.result
    }
  };
}

export default async function CasePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const c = getCase(locale, slug);
  if (!c) return notFound();

  const t = await getTranslations({ locale, namespace: "caseDetailPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCasesPage = await getTranslations({ locale, namespace: "casesPage" });

  return (
    <section className="tech-bg relative site-container py-10 sm:py-14">
      <BreadcrumbsJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), path: "" },
          { name: tCasesPage("title"), path: "/kejsy" },
          { name: c.title, path: `/kejsy/${slug}` }
        ]}
      />
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-brand-300">{c.niche}</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {c.title}
        </h1>
        <p className="mt-3 text-sm text-white/65 sm:text-base">{c.result}</p>

        <div className="mt-8 glass rounded-3xl p-6">
          <div className="text-sm font-semibold">{t("whatWeDid")}</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {c.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/kontakty" className="w-full sm:w-auto">
            {t("ctaPrimary")}
          </Button>
          <Button href="/kejsy" variant="ghost" className="w-full sm:w-auto">
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>
    </section>
  );
}
