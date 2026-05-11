import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { localePageAlternates } from "@/lib/hreflang";
import { Button } from "@/components/ui/button";
import { homeContactLink } from "@/lib/contactHref";

/** Иллюстрации направлений (Unsplash, уже разрешены в next.config) */
const SHOWCASE_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
];

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "websitesPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...localePageAlternates(locale, "/sozdanie-sajta")
  };
}

export default async function SozdanieSajtaPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "websitesPage" });
  const bulletsRaw = t.raw("approachBullets");
  const captionsRaw = t.raw("caseCaptions");
  const bullets = Array.isArray(bulletsRaw) ? (bulletsRaw as string[]) : [];
  const captions = Array.isArray(captionsRaw) ? (captionsRaw as string[]) : [];

  return (
    <section className="tech-bg site-container py-10 sm:py-14">
          <h1 className="brand-glow text-2xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/75 sm:text-base">{t("intro")}</p>

          <div
            id="landing"
            className="scroll-anchor mt-10"
          >
            <h2 className="text-lg font-semibold">{t("approachTitle")}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {bullets.map((b, i) => (
                <li key={i} className="glass rounded-2xl p-5 text-sm text-white/80">
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div
            id="multipage"
            className="scroll-anchor mt-14"
          >
            <h2 className="text-lg font-semibold">{t("casesTitle")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SHOWCASE_IMAGES.map((src, i) => (
                <figure key={src} className="glass overflow-hidden rounded-2xl">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={src}
                      alt={captions[i] ?? `Case ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <figcaption className="border-t border-white/10 px-4 py-3 text-xs text-white/65">
                    {captions[i] ?? ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div
            id="corporate"
            className="scroll-anchor mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href={homeContactLink({ service: "web" })} className="hover-lift px-8 py-3">
              {t("ctaLabel")}
            </Button>
            <p className="text-sm text-white/55">{t("ctaHint")}</p>
          </div>
        </section>
  );
}
