import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cases, getCase } from "@/content/cases";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.result,
    openGraph: {
      title: c.title,
      description: c.result
    }
  };
}

export default async function CasePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return notFound();

  return (
    <section className="tech-bg relative container-px py-10 sm:py-14">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-brand-300">{c.niche}</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {c.title}
        </h1>
        <p className="mt-3 text-sm text-white/65 sm:text-base">{c.result}</p>

        <div className="mt-8 glass rounded-3xl p-6">
          <div className="text-sm font-semibold">Что сделали</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {c.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/kontakty" className="w-full sm:w-auto">
            Хочу такой же результат
          </Button>
          <Button href="/kejsy" variant="ghost" className="w-full sm:w-auto">
            Назад к кейсам
          </Button>
        </div>
      </div>
    </section>
  );
}

