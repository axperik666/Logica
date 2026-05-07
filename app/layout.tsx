import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { getSiteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  preload: true
});

const OG_IMAGE = (base: string) => `${base}/logo.png`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });
  const base = getSiteUrl().replace(/\/+$/, "");

  const titleDefault = t("title");
  const description = t("description");

  const ogLocale =
    locale === "ru" ? "ru_RU" : locale === "it" ? "it_IT" : "en_US";
  const altLocales = ["ru_RU", "en_US", "it_IT"].filter((l) => l !== ogLocale);

  const keywords = t("keywords")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const verification: Metadata["verification"] = {};
  if (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) {
    verification.google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  }
  if (process.env.NEXT_PUBLIC_YANDEX_VERIFICATION) {
    verification.yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
  }

  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_SITE?.trim();
  const twitterCreator = twitterHandle
    ? twitterHandle.startsWith("@")
      ? twitterHandle
      : `@${twitterHandle}`
    : undefined;

  return {
    metadataBase: new URL(base),
    title: {
      default: titleDefault,
      template: t("titleTemplate")
    },
    description,
    applicationName: "LOGICA Marketing",
    authors: [{ name: "LOGICA Marketing", url: base }],
    creator: "LOGICA Marketing",
    publisher: "LOGICA Marketing",
    category: "marketing",
    keywords,
    icons: {
      icon: [
        { url: "/logo.png", sizes: "32x32", type: "image/png" },
        { url: "/logo.png", sizes: "192x192", type: "image/png" }
      ],
      apple: [
        { url: "/logo.png", sizes: "180x180", type: "image/png" }
      ]
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: altLocales,
      siteName: "LOGICA Marketing",
      title: titleDefault,
      description,
      images: [
        {
          url: OG_IMAGE(base),
          width: 1200,
          height: 630,
          alt: titleDefault,
          type: "image/png"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      ...(twitterCreator
        ? { site: twitterCreator, creator: twitterCreator }
        : {}),
      title: titleDefault,
      description,
      images: [OG_IMAGE(base)]
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    formatDetection: {
      telephone: false,
      email: false,
      address: false
    },
    ...(Object.keys(verification).length > 0 ? { verification } : {}),
    referrer: "strict-origin-when-cross-origin",
    appleWebApp: {
      capable: true,
      title: "LOGICA Marketing",
      statusBarStyle: "black-translucent"
    }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060b18" },
    { color: "#060b18" }
  ],
  colorScheme: "dark"
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
      </head>
      <body className={`${inter.className} tech-bg min-h-dvh font-sans relative`}>
        <SiteJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
