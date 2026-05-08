import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "Logica Marketing: подход, процесс, принципы и то, как мы делаем рост предсказуемым."
};

export default function AboutPage() {
  return (
    <section className="tech-bg relative container py-10 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            О нас
          </h1>
          <p className="mt-3 text-sm text-white/65 sm:text-base">
            Мы соединяем UX, смысл, скорость и перфоманс-маркетинг. Делать “красиво”
            умеют многие. Наша цель — чтобы сайт и реклама давали измеримый результат.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                t: "Сначала экономика",
                d: "Считаем юнит-экономику, целевой CPL/CPA и окупаемость."
              },
              {
                t: "Системные тесты",
                d: "Планируем гипотезы: креативы, офферы, аудитории, посадочные."
              },
              {
                t: "Скорость и UX",
                d: "Mobile-first, Core Web Vitals, понятный путь пользователя."
              }
            ].map((x) => (
              <div key={x.t} className="glass rounded-2xl p-5">
                <div className="text-sm font-semibold">{x.t}</div>
                <p className="mt-2 text-sm text-white/65">{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="glass rounded-3xl p-6">
            <div className="text-sm font-semibold">Как начнём</div>
            <ol className="mt-4 space-y-2 text-sm text-white/70">
              <li>1) Бриф на 10–15 минут</li>
              <li>2) Аудит сайта/воронки/рекламы</li>
              <li>3) План действий на 2–4 недели</li>
            </ol>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/kontakty" className="w-full sm:w-auto">
                Получить план
              </Button>
              <Button href="/uslugi" variant="ghost" className="w-full sm:w-auto">
                Услуги
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

