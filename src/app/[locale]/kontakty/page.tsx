import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CONTACTS } from "@/lib/contacts";
import { KontaktyForm } from "@/components/contacts/KontaktyForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription")
  };
}

export default async function ContactsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactsPage" });

  return (
    <section className="tech-bg relative site-container py-10 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-sm text-white/65 sm:text-base">{t("intro")}</p>

          <div className="mt-8 grid gap-4">
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold">{t("emailLabel")}</div>
              <div className="mt-2 text-sm text-white/70">{CONTACTS.email}</div>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold">{t("telegramLabel")}</div>
              <div className="mt-2 text-sm text-white/70">{t("telegramHandle")}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="glass rounded-3xl p-6 sm:p-7">
            <div className="text-sm font-semibold">{t("quickRequest")}</div>
            <p className="mt-2 text-sm text-white/65">{t("formNote")}</p>

            <KontaktyForm />
          </div>
        </div>
      </div>
    </section>
  );
}
