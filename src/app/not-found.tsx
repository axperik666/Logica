import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { routing } from "@/i18n/routing";

export default async function NotFound() {
  setRequestLocale(routing.defaultLocale);
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "notFound"
  });

  const btn =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transform-gpu hover:scale-[1.02] active:scale-[0.99]";
  const btnPrimary = `${btn} btn-cta-premium bg-primary text-dark hover:brightness-110`;
  const btnGhost = `${btn} bg-white/0 text-white hover:bg-white/10 border border-white/12`;

  return (
    <section className="tech-bg relative site-container py-16">
      <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
        <div className="text-sm font-semibold text-brand-300">{t("badge")}</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-3 text-sm text-white/65">{t("description")}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className={`${btnPrimary} w-full sm:w-auto`}>
            {t("home")}
          </Link>
          <Link href="/uslugi" className={`${btnGhost} w-full sm:w-auto`}>
            {t("services")}
          </Link>
        </div>
        <div className="mt-6 text-xs text-white/55">
          {t("contactHint")}{" "}
          <Link
            className="text-white underline underline-offset-4"
            href="/kontakty"
          >
            {t("contactLink")}
          </Link>
          .
        </div>
      </div>
    </section>
  );
}
