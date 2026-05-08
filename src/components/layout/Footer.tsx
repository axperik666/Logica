"use client";

import Image from "next/image";
import { Mail, MessageCircle, Send } from "lucide-react";
import { ScrollRevealSection } from "@/components/ScrollRevealSection";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { CONTACTS } from "@/lib/contacts";

/** Футер: TG/WA — только иконки визуально; подписи только для скринридеров (sr-only). */
export function Footer() {
  const t = useTranslations("nav");
  const f = useTranslations("footer");
  const tSeo = useTranslations("seo");

  const quickLinks = [
    { href: "/#services", label: t("services") },
    { href: "/#cases", label: t("cases") },
    { href: "/#testimonials", label: t("testimonials") },
    { href: "/o-nas", label: t("about") },
    { href: "/#contact", label: t("contact") }
  ];

  return (
    <ScrollRevealSection
      as="footer"
      className="tech-bg relative py-20 border-t border-white/10"
    >
      <div className="container-px">
        <div className="glass overflow-hidden rounded-[2rem] p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 hover-lift">
                  <Image
                    src="/logo.png"
                    alt={tSeo("logoAlt")}
                    fill
                    sizes="56px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight brand-glow">
                    LOGICA Marketing
                  </div>
                  <div className="mt-1 text-sm text-white/65">{f("subtitle")}</div>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
                {f("about")}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CONTACTS.telegramHttps}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={f("ariaTelegram")}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/35 bg-primary/10 shadow-[0_12px_40px_rgba(0,191,255,0.12)] transition hover:border-primary/55 hover:bg-primary/18 hover-lift"
                >
                  <span className="sr-only">{f("telegramLabel")}</span>
                  <Send className="h-7 w-7 text-primary pointer-events-none" aria-hidden />
                </a>
                <a
                  href={CONTACTS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={f("ariaWhatsapp")}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/12 shadow-[0_12px_40px_rgba(16,185,129,0.1)] transition hover:border-emerald-400/45 hover:bg-emerald-500/18 hover-lift"
                >
                  <span className="sr-only">{f("whatsappLabel")}</span>
                  <MessageCircle className="h-7 w-7 text-emerald-400 pointer-events-none" aria-hidden />
                </a>
              </div>

              <a
                href={CONTACTS.mailto}
                className="mt-4 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover-lift sm:inline-flex"
                aria-label={f("ariaEmail")}
              >
                <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span className="truncate">{CONTACTS.email}</span>
              </a>
            </div>

            <div className="lg:col-span-3">
              <div className="text-sm font-semibold">{f("quickLinks")}</div>
              <div className="mt-4 grid gap-2 text-sm">
                {quickLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-xl px-3 py-2 text-white/70 transition hover:bg-white/5 hover:text-white hover-lift"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="text-sm font-semibold">{f("contactsTitle")}</div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={CONTACTS.telegramHttps}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={f("ariaTelegram")}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/8 shadow-[0_8px_28px_rgba(0,191,255,0.1)] transition hover:border-primary/45 hover:bg-primary/14 hover-lift"
                >
                  <span className="sr-only">{f("telegramLabel")}</span>
                  <Send className="h-7 w-7 text-primary pointer-events-none" aria-hidden />
                </a>
                <a
                  href={CONTACTS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={f("ariaWhatsapp")}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/22 bg-emerald-500/10 transition hover:border-emerald-400/40 hover:bg-emerald-500/16 hover-lift"
                >
                  <span className="sr-only">{f("whatsappLabel")}</span>
                  <MessageCircle className="h-7 w-7 text-emerald-400 pointer-events-none" aria-hidden />
                </a>
                <a
                  href={CONTACTS.mailto}
                  className="inline-flex min-h-[3.5rem] flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10 hover-lift sm:min-w-[220px] sm:flex-none"
                  aria-label={f("ariaEmail")}
                >
                  <Mail className="h-9 w-9 shrink-0 text-primary" aria-hidden />
                  <div className="min-w-0 text-left">
                    <div className="text-xs text-white/55">{f("emailLabel")}</div>
                    <div className="mt-0.5 text-sm font-semibold tracking-tight text-white truncate sm:text-base">
                      {CONTACTS.email}
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-5 text-xs text-white/55">{f("copyright")}</div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="text-center text-xs tracking-[0.22em] text-white/40">
              {f("marquee")}
            </div>
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
