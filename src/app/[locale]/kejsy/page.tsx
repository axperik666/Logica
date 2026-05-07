import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { cases } from "@/content/cases";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casesPage" });
  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function CasesListingPage() {
  const t = await getTranslations("casesPage");

  return (
    <section className="tech-bg relative container-px py-10 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-white/65 sm:text-base">
        {t("intro")}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cases.map((c) => (
          <Link
            key={c.slug}
            href={`/kejsy/${c.slug}`}
            className="glass rounded-2xl p-5 transition hover:border-white/20 hover:translate-y-[-2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
          >
            <div className="text-xs font-semibold text-brand-300">{c.niche}</div>
            <div className="mt-1 text-sm font-semibold">{c.title}</div>
            <p className="mt-2 text-sm text-white/65">{c.result}</p>
            <div className="mt-4 text-sm font-semibold text-brand-300">
              {t("readMore")}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
