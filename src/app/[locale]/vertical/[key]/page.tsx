import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { localePageAlternates } from "@/lib/hreflang";
import { casesData } from "@/lib/casesData";
import {
  getIndustryVerticalPage,
  INDUSTRY_FEATURED_VIDEO_CASE_ID,
  INDUSTRY_KEYS,
  industryCaseLinkHref,
  isIndustryKey
} from "@/content/industryVertical";
import { BreadcrumbsJsonLd } from "@/components/seo/BreadcrumbsJsonLd";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return INDUSTRY_KEYS.map((key) => ({ key }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; key: string }>;
}): Promise<Metadata> {
  const { locale, key } = await params;
  if (!isIndustryKey(key)) return {};
  const copy = getIndustryVerticalPage(locale, key);
  if (!copy) return {};
  const alt = localePageAlternates(locale, `/vertical/${key}`);
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    ...alt
  };
}

export default async function IndustryVerticalPage({
  params
}: {
  params: Promise<{ locale: string; key: string }>;
}) {
  const { locale, key } = await params;
  if (!isIndustryKey(key)) return notFound();

  const copy = getIndustryVerticalPage(locale, key);
  if (!copy) return notFound();

  const videoId = INDUSTRY_FEATURED_VIDEO_CASE_ID[key];
  const videoCase = casesData.find((c) => c.id === videoId);
  if (!videoCase) return notFound();

  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCases = await getTranslations({ locale, namespace: "cases" });

  const nicheLabel = tCases(
    `filterLabels.${videoCase.nicheKey}` as "filterLabels.medicine"
  );

  return (
    <section className="tech-bg relative min-h-[60vh] py-10 sm:py-14">
      <BreadcrumbsJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), path: "" },
          { name: copy.heading, path: `/vertical/${key}` }
        ]}
      />
      <div className="site-container max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/85">
          {copy.videoEyebrow}
        </p>
        <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/72 sm:text-base">
          {copy.intro}
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
            <video
              src={videoCase.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute left-4 top-4 rounded-2xl bg-black/75 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-primary/95 sm:text-xs">
              {nicheLabel}
            </div>
            <div className="absolute bottom-0 left-0 w-full space-y-2 p-5 sm:p-8">
              <p className="font-mono text-xs tracking-wider text-primary sm:text-sm">
                {tCases(`gridCards.${videoCase.id}.result` as "gridCards.1.result")}
              </p>
              <p className="text-xl font-semibold text-white sm:text-2xl">
                {videoCase.client}
              </p>
              <p className="max-w-2xl text-sm text-white/70">
                {tCases(
                  `gridCards.${videoCase.id}.description` as "gridCards.1.description"
                )}
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-14 text-lg font-semibold tracking-tight text-white sm:text-xl">
          {copy.textHeading}
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {copy.textCases.map((item) => (
            <li key={item.title}>
              <Link
                href={industryCaseLinkHref(item)}
                className={cn(
                  "group flex min-h-[7.5rem] flex-col justify-between rounded-2xl border border-white/[0.1]",
                  "bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)]",
                  "px-4 py-4 backdrop-blur-md transition duration-300",
                  "hover:border-cyan-400/35 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80"
                )}
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-300/90">
                    {item.result}
                  </p>
                  <p className="mt-2 text-base font-semibold leading-snug text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {item.summary}
                  </p>
                </div>
                <span className="mt-3 text-xs font-semibold text-primary transition group-hover:text-cyan-200">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
