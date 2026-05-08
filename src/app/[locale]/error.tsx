"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LocaleError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="tech-bg relative container-px py-20">
      <div className="glass mx-auto max-w-lg rounded-3xl p-8 text-center">
        <p className="text-sm font-semibold text-brand-300">
          LOGICA Marketing
        </p>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-white">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm text-white/65">
          Попробуйте обновить страницу. Если ошибка повторяется — напишите нам в
          Telegram или WhatsApp с главной страницы.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-cta-premium inline-flex min-h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/14 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            На главную
          </Link>
        </div>
      </div>
    </section>
  );
}
