import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { getSiteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  preload: true
});

/** Заголовки в духе топовых performance-студий: плотный гротеск + кириллица */
const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
  preload: true
});

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = new URL(getSiteUrl());

  return {
    metadataBase,
    icons: {
      icon: "/logo.png"
    },
    openGraph: {
      type: "website",
      siteName: "LOGICA Marketing"
    },
    twitter: {
      card: "summary_large_image"
    }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className={`${inter.className} tech-bg min-h-dvh font-sans antialiased relative`}>
        <GoogleAnalytics />
        <SiteJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
