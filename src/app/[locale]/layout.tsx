import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DocumentLang } from "@/components/DocumentLang";
import { CookieConsent } from "@/components/CookieConsent";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  const template = t("titleTemplate");
  const keywordsRaw = t("keywords");
  const keywords = keywordsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const ogLocale =
    locale === "ru" ? "ru_RU" : locale === "it" ? "it_IT" : "en_US";

  return {
    title: { default: title, template },
    description,
    ...(keywords.length ? { keywords } : {}),
    openGraph: {
      locale: ogLocale,
      title,
      description
    },
    twitter: {
      title,
      description
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DocumentLang />
      <Navbar />
      <main className="relative z-10 min-h-[calc(100dvh-var(--header-h)-env(safe-area-inset-top,0px))] overflow-x-clip pt-[calc(var(--header-h)+env(safe-area-inset-top,0px))]">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}
