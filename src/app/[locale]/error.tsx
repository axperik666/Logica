"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function LocaleError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="tech-bg relative site-container py-20">
      <div className="glass mx-auto max-w-lg rounded-3xl p-8 text-center">
        <p className="text-sm font-semibold text-brand-300">{t("brand")}</p>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-white">
          {t("title")}
        </h1>
        <p className="mt-3 text-sm text-white/65">{t("body")}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-cta-premium inline-flex min-h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/14 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {t("home")}
          </Link>
        </div>
      </div>
    </section>
  );
}
