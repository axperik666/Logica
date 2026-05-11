import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { listServices } from "@/content/services";
import { Card } from "@/components/ui/card";
import { homeContactLink, type ContactServiceKey } from "@/lib/contactHref";
import { BreadcrumbsJsonLd } from "@/components/seo/BreadcrumbsJsonLd";

/** Префилл заявки по slug страницы услуги */
const SLUG_TO_SERVICE: Record<string, ContactServiceKey> = {
  "sozdanie-lendinga": "web",
  "nastrojka-reklamy-meta": "smm",
  "nastrojka-reklamy-google": "performance",
  "nastrojka-reklamy-tiktok": "performance",
  "sozdanie-kreativov": "performance"
};

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

export default async function ServicesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tSvc = await getTranslations({ locale, namespace: "services" });
  const services = listServices(locale);

  return (
    <section className="tech-bg relative site-container py-10 sm:py-14">
      <BreadcrumbsJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), path: "" },
          { name: t("title"), path: "/uslugi" }
        ]}
      />
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-white/65 sm:text-base">
        {t("intro")}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {services.map((s) => {
          const svc = SLUG_TO_SERVICE[s.slug];
          return (
            <Card
              key={s.slug}
              title={s.name}
              text={s.short}
              href={`/uslugi/${s.slug}`}
              linkHint={tSvc("moreLink")}
              orderHref={svc ? homeContactLink({ service: svc }) : homeContactLink()}
              orderLabel={tSvc("orderBtn")}
            />
          );
        })}
      </div>
    </section>
  );
}
