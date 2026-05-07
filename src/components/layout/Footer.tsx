"use client";

import Image from "next/image";
import { Mail, MessageCircle, Send } from "lucide-react";
import { ScrollRevealSection } from "@/components/ScrollRevealSection";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { CONTACTS } from "@/lib/contacts";

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

              <div className="mt-6 grid gap-3 sm:max-w-lg sm:grid-cols-2">
                <a
                  href={CONTACTS.telegramHttps}
                  className="group flex items-center gap-4 rounded-2xl border border-primary/25 bg-primary/10 p-4 shadow-[0_12px_40px_rgba(0,191,255,0.12)] transition hover:border-primary/45 hover:bg-primary/15 hover-lift"
                  aria-label={f("ariaTelegram")}
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-dark/50">
                    <Send className="h-8 w-8 text-primary" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-xs font-medium uppercase tracking-wide text-white/55">
                      {f("telegramLabel")}
                    </span>
                    <span className="mt-0.5 block text-base font-semibold tracking-tight text-white">
                      {CONTACTS.telegramDisplay}
                    </span>
                  </span>
                </a>
                <a
                  href={CONTACTS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 shadow-[0_12px_40px_rgba(16,185,129,0.1)] transition hover:border-emerald-400/40 hover:bg-emerald-500/15 hover-lift"
                  aria-label={f("ariaWhatsapp")}
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-dark/50">
                    <MessageCircle className="h-8 w-8 text-emerald-400" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-xs font-medium uppercase tracking-wide text-white/55">
                      {f("whatsappLabel")}
                    </span>
                    <span className="mt-0.5 block text-base font-semibold tracking-tight text-white">
                      {CONTACTS.whatsappDisplay}
                    </span>
                  </span>
                </a>
              </div>

              <a
                href={CONTACTS.mailto}
                className="mt-4 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover-lift sm:inline-flex"
                aria-label={f("ariaEmail")}
              >
                <Mail className="h-5 w-5 shrink-0 text-primary" />
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
              <div className="mt-4 grid gap-3 text-sm text-white/70">
                <a
                  href={CONTACTS.telegramHttps}
                  className="flex items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 transition hover:border-primary/35 hover:bg-primary/10 hover-lift"
                >
                  <Send className="h-9 w-9 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <div className="text-xs text-white/55">{f("telegramLabel")}</div>
                    <div className="mt-1 text-lg font-semibold tracking-tight text-white">
                      {CONTACTS.telegramDisplay}
                    </div>
                  </div>
                </a>
                <a
                  href={CONTACTS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5 transition hover:border-emerald-400/35 hover:bg-emerald-500/15 hover-lift"
                >
                  <MessageCircle className="h-9 w-9 shrink-0 text-emerald-400" />
                  <div className="min-w-0">
                    <div className="text-xs text-white/55">{f("whatsappLabel")}</div>
                    <div className="mt-1 text-lg font-semibold tracking-tight text-white">
                      {CONTACTS.whatsappDisplay}
                    </div>
                  </div>
                </a>
                <a
                  href={CONTACTS.mailto}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 hover-lift"
                >
                  <Mail className="h-9 w-9 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <div className="text-xs text-white/55">{f("emailLabel")}</div>
                    <div className="mt-1 text-lg font-semibold tracking-tight text-white truncate">
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
