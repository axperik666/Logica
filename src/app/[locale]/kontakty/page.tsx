import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactsPagePremium } from "@/components/contacts/ContactsPagePremium";

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

export default function ContactsPage() {
  return (
    <section className="tech-bg relative min-h-[60vh] overflow-hidden">
      <ContactsPagePremium />
    </section>
  );
}
