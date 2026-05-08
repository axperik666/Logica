import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { services } from "@/content/services";
import { Card } from "@/components/ui/card";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("servicesPage");
  const tSvc = await getTranslations("services");

  return (
    <section className="tech-bg relative container py-10 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-white/65 sm:text-base">
        {t("intro")}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <Card
            key={s.slug}
            title={s.name}
            text={s.short}
            href={`/uslugi/${s.slug}`}
            linkHint={tSvc("moreLink")}
          />
        ))}
      </div>
    </section>
  );
}
