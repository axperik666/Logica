import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { RevealSection } from "@/components/motion/RevealSection";

export async function BlogSection() {
  const t = await getTranslations("nav");

  const cards = [
    {
      href: "/faq",
      title: t("guidesCardFaqTitle"),
      desc: t("guidesCardFaqDesc"),
      insight: t("guidesCardFaqInsight")
    },
    {
      href: "/kejsy",
      title: t("guidesCardCasesTitle"),
      desc: t("guidesCardCasesDesc"),
      insight: t("guidesCardCasesInsight")
    },
    {
      href: "/kontakty",
      title: t("guidesCardContactTitle"),
      desc: t("guidesCardContactDesc"),
      insight: t("guidesCardContactInsight")
    }
  ] as const;

  return (
    <RevealSection
      id="guides"
      className="border-t border-white/[0.08] bg-[linear-gradient(180deg,#0a0d18_0%,#070a12_100%)] py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center md:max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {t("guidesSectionTitle")}
          </h2>
          <p className="mt-4 text-base text-white/65 md:text-lg">{t("guidesSectionLead")}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_24px_56px_rgba(0,180,255,0.12)] md:p-7"
            >
              <h3 className="text-lg font-semibold text-white md:text-xl">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
                {card.desc}
              </p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-white/45 md:text-sm">
                {card.insight}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 transition group-hover:gap-2">
                {t("guidesCardCta")}
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
