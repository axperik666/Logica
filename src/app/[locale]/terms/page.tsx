import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия",
  description: "Условия использования сайта Logica Marketing."
};

export default function TermsPage() {
  return (
    <section className="tech-bg relative container py-10 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Условия
      </h1>
      <div className="mt-6 max-w-3xl space-y-3 text-sm text-white/70">
        <p>
          Этот текст — шаблон. Перед публикацией замените на ваши реальные условия.
        </p>
        <p>
          Материалы на сайте носят информационный характер и не являются публичной
          офертой, если прямо не указано иное.
        </p>
      </div>
    </section>
  );
}

