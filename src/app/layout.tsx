import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";

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

export const metadata: Metadata = {
  title: "LOGICA Marketing | Performance Marketing with Real ROI",
  description:
    "3–7× ROI. Мы помогаем бизнесу расти через Performance Marketing. Кейсы с видео.",
  icons: {
    icon: "/logo.png"
  }
};

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
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body className={`${inter.className} tech-bg min-h-dvh font-sans antialiased relative`}>
        <SiteJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
