import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { localePageAlternates } from "@/lib/hreflang";
import { getService, SERVICE_SLUGS } from "@/content/services";
import { Button } from "@/components/ui/button";
import { BreadcrumbsJsonLd } from "@/components/seo/BreadcrumbsJsonLd";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(locale, slug);
  if (!service) return {};
  const alt = localePageAlternates(locale, `/uslugi/${slug}`);
  return {
    title: service.name,
    description: service.short,
    alternates: alt.alternates,
    openGraph: {
      ...alt.openGraph,
      title: service.name,
      description: service.short
    }
  };
}

export default async function ServicePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getService(locale, slug);
  if (!service) return notFound();

  const t = await getTranslations({ locale, namespace: "serviceDetailPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tSvcPage = await getTranslations({ locale, namespace: "servicesPage" });

  return (
    <section className="tech-bg relative site-container py-10 sm:py-14">
      <BreadcrumbsJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), path: "" },
          { name: tSvcPage("title"), path: "/uslugi" },
          { name: service.name, path: `/uslugi/${slug}` }
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {service.name}
          </h1>
          <p className="mt-3 text-sm text-white/65 sm:text-base">
            {service.short}
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold">{t("outcome")}</div>
              <p className="mt-2 text-sm text-white/65">{service.outcome}</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold">{t("forWhom")}</div>
              <ul className="mt-2 space-y-1 text-sm text-white/65">
                {service.forWhom.map((x) => (
                  <li key={x}>— {x}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("includes")}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.includes.map((x) => (
                <div
                  key={x}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"
                >
                  {x}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">{t("process")}</h2>
            <ol className="mt-4 space-y-3">
              {service.process.map((p, idx) => (
                <li key={p.title} className="glass rounded-2xl p-5">
                  <div className="text-xs font-semibold text-brand-300">
                    {t("stepLabel", { step: idx + 1 })}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{p.title}</div>
                  <p className="mt-2 text-sm text-white/65">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">{t("faq")}</h2>
            <div className="mt-4 space-y-3">
              {service.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold">{f.q}</div>
                  <p className="mt-2 text-sm text-white/65">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="glass sticky top-24 rounded-3xl p-6">
            <div className="text-sm font-semibold">{t("quickStart")}</div>
            <p className="mt-2 text-sm text-white/65">{t("quickStartBody")}</p>
            <div className="mt-5 flex flex-col gap-3">
              <Button href="/kontakty" className="w-full">
                {t("ctaContact")}
              </Button>
              <Button href="/kejsy" variant="ghost" className="w-full">
                {t("ctaCases")}
              </Button>
              <Button href="/uslugi" variant="ghost" className="w-full">
                {t("ctaBack")}
              </Button>
            </div>
            <div className="mt-5 text-xs text-white/55">{t("asideNote")}</div>
          </div>
        </aside>
      </div>
    </section>
  );
}
