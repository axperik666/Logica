import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { HOME_CASE_IDS } from "@/content/homeCases";
import { RevealSection } from "@/components/motion/RevealSection";

const SPOTLIGHT_ID = HOME_CASE_IDS[0];

export async function HomeSpotlightCase() {
  const t = await getTranslations("homeSpotlight");
  const tc = await getTranslations("cases");
  const client = tc(`items.${SPOTLIGHT_ID}.client`);
  const result = tc(`items.${SPOTLIGHT_ID}.result`);
  const summary = tc(`items.${SPOTLIGHT_ID}.summary`);

  return (
    <RevealSection
      id="spotlight-case"
      className="border-t border-white/[0.08] bg-[linear-gradient(180deg,#101624_0%,#0d1424_100%)] py-14 md:py-20"
    >
      <div className="site-container">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-10 md:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/85">
            {t("kicker")}
          </p>
          <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            {t("headline", { client, result })}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            {summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/kejsy"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_28px_rgba(0,180,255,0.35)] transition hover:brightness-110"
            >
              {t("cta")}
            </Link>
            <p className="max-w-md text-xs leading-relaxed text-white/45 sm:text-right">
              {t("note")}
            </p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
