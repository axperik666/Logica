import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localePageAlternates } from "@/lib/hreflang";
import { Button } from "@/components/ui/button";
import { AboutTeam } from "@/components/about/AboutTeam";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";

type Principle = { title: string; desc: string };

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...localePageAlternates(locale, "/o-nas")
  };
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const principlesRaw = t.raw("principles");
  const principles = Array.isArray(principlesRaw)
    ? (principlesRaw as Principle[])
    : [];
  const stepsRaw = t.raw("steps");
  const steps = Array.isArray(stepsRaw) ? (stepsRaw as string[]) : [];

  return (
    <>
      <section className="tech-bg relative site-container py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("title")}
            </h1>
            <p className="mt-3 text-sm text-white/65 sm:text-base">{t("intro")}</p>

            <div className="mt-8 space-y-4">
              {principles.map((x) => (
                <div key={x.title} className="glass rounded-2xl p-5">
                  <div className="text-sm font-semibold">{x.title}</div>
                  <p className="mt-2 text-sm text-white/65">{x.desc}</p>
                </div>
              ))}
            </div>

            <AboutTeam />
          </div>

          <aside className="lg:col-span-5">
            <div className="glass rounded-3xl p-6">
              <div className="text-sm font-semibold">{t("sidebarTitle")}</div>
              <ol className="mt-4 space-y-2 text-sm text-white/70">
                {steps.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ol>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/kontakty" className="w-full sm:w-auto">
                  {t("ctaPlan")}
                </Button>
                <Button href="/uslugi" variant="ghost" className="w-full sm:w-auto">
                  {t("ctaServices")}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <WhyUs />
      <Process />
    </>
  );
}
