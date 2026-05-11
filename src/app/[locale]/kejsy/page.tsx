import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localePageAlternates } from "@/lib/hreflang";
import { Link } from "@/navigation";
import { listCases } from "@/content/cases";
import CasesGrid from "@/components/cases/CasesGrid";
import { BreadcrumbsJsonLd } from "@/components/seo/BreadcrumbsJsonLd";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casesPage" });
  return {
    title: t("title"),
    description: t("description"),
    ...localePageAlternates(locale, "/kejsy")
  };
}

export default async function CasesListingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casesPage" });
  const cases = listCases(locale);

  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <BreadcrumbsJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), path: "" },
          { name: t("title"), path: "/kejsy" }
        ]}
      />
      <section className="tech-bg relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-40%,rgba(0,180,255,0.14),transparent_55%)]"
          aria-hidden
        />
        <div className="site-container relative py-10 sm:py-14 md:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t("intro")}
          </p>
        </div>
      </section>

      <CasesGrid showTitle={false} className="pt-2 pb-6 md:pb-10" />

      <section className="border-t border-white/[0.07] bg-[linear-gradient(180deg,#05070f_0%,#03050a_100%)] py-14 md:py-20">
        <div className="site-container">
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {t("writtenTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/60 sm:text-base">{t("writtenIntro")}</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {cases.map((c) => (
              <Link
                key={c.slug}
                href={`/kejsy/${c.slug}`}
                className="group glass rounded-2xl border border-white/[0.07] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
                  {c.niche}
                </div>
                <div className="mt-2 text-base font-semibold text-white sm:text-lg">{c.title}</div>
                <p className="mt-2 text-sm text-white/65">{c.result}</p>
                <div className="mt-5 text-sm font-semibold text-cyan-300 transition group-hover:text-cyan-200">
                  {t("readMore")}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
