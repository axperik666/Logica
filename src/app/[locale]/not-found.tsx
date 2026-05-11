import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,180,255,0.14),transparent_55%),radial-gradient(ellipse_50%_45%_at_100%_30%,rgba(139,92,246,0.08),transparent_50%)]"
        aria-hidden
      />
      <div className="site-container relative">
        <div className="relative mx-auto max-w-lg overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10 md:max-w-xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/12 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl"
          />
          <div className="relative text-center">
            <div className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
              {t("badge")}
            </div>
            <h1 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              {t("description")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button href="/" className="w-full sm:w-auto">
                {t("home")}
              </Button>
              <Button href="/uslugi" variant="ghost" className="w-full sm:w-auto">
                {t("services")}
              </Button>
              <Button href="/kejsy" variant="ghost" className="w-full sm:w-auto">
                {t("cases")}
              </Button>
            </div>
            <div className="mt-8 text-xs leading-relaxed text-white/50">
              {t("contactHint")}{" "}
              <Link
                className="font-medium text-cyan-300 underline decoration-cyan-400/35 underline-offset-4 hover:text-cyan-200"
                href="/kontakty"
              >
                {t("contactLink")}
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
