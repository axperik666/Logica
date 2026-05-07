import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.short,
    openGraph: {
      title: service.name,
      description: service.short
    }
  };
}

export default async function ServicePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return notFound();

  return (
    <section className="tech-bg relative container-px py-10 sm:py-14">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {service.name}
          </h1>
          <p className="mt-3 text-sm text-white/65 sm:text-base">
            {service.short}
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold">Результат</div>
              <p className="mt-2 text-sm text-white/65">{service.outcome}</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold">Кому подходит</div>
              <ul className="mt-2 space-y-1 text-sm text-white/65">
                {service.forWhom.map((x) => (
                  <li key={x}>— {x}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">
              Что входит
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.includes.map((x) => (
                <div
                  key={x}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"
                >
                  {x}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">Процесс</h2>
            <ol className="mt-4 space-y-3">
              {service.process.map((p, idx) => (
                <li key={p.title} className="glass rounded-2xl p-5">
                  <div className="text-xs font-semibold text-brand-300">
                    Шаг {idx + 1}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{p.title}</div>
                  <p className="mt-2 text-sm text-white/65">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
            <div className="mt-4 space-y-3">
              {service.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold">{f.q}</div>
                  <p className="mt-2 text-sm text-white/65">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="glass sticky top-24 rounded-3xl p-6">
            <div className="text-sm font-semibold">Быстрый старт</div>
            <p className="mt-2 text-sm text-white/65">
              Ответьте на 5 вопросов — и я предложу план: сайт/воронка/реклама/креативы.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Button href="/kontakty" className="w-full">
                Написать и получить план
              </Button>
              <Button href="/uslugi" variant="ghost" className="w-full">
                Назад к услугам
              </Button>
            </div>
            <div className="mt-5 text-xs text-white/55">
              Обычно отвечаем в течение рабочего дня.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

