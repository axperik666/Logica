"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Send } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { CONTACTS } from "@/lib/contacts";
import { cn } from "@/lib/cn";

type Member = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  photo?: string;
};

function InitialsFill({ initials }: { initials: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full text-lg font-bold tracking-wide text-white/90",
        "bg-[radial-gradient(circle_at_30%_25%,rgba(0,191,255,0.35)_0%,transparent_55%),radial-gradient(circle_at_70%_75%,rgba(139,92,246,0.22)_0%,transparent_55%),linear-gradient(160deg,rgba(8,12,28,0.95)_0%,rgba(4,8,20,0.9)_100%)]"
      )}
    >
      {initials}
    </div>
  );
}

export function Team() {
  const t = useTranslations("homeTeam");
  const tSec = useTranslations("sectionsSeo");
  const tContact = useTranslations("contactsPage");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08, margin: "0px 0px 80px 0px" });

  const raw = t.raw("members");
  const members = Array.isArray(raw) ? (raw as Member[]) : [];

  return (
    <MotionSection
      ref={ref}
      id="team"
      className="full-bleed relative overflow-x-clip border-t border-white/[0.06] py-24 lg:py-28"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.03 } }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,180,255,0.09),transparent_55%)]"
        aria-hidden
      />
      <div className="site-container relative">
        <div className="sr-only">
          <p>{tSec("team.metaTitle")}</p>
          <p>{tSec("team.metaDescription")}</p>
        </div>

        <MotionDiv
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/85">{t("badge")}</p>
          <h2 className="brand-glow mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm text-white/72 sm:text-base">{t("subtitle")}</p>
        </MotionDiv>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 xl:gap-6">
          {members.map((m, i) => (
            <MotionDiv
              key={m.name + i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                }
              }}
            >
              <motion.article
                className="group relative h-full rounded-[1.75rem] border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_20px_64px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-cyan-400/35 hover:shadow-[0_0_48px_rgba(34,211,238,0.18)] sm:p-7"
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 420, damping: 22 }
                }}
              >
                <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                  <div
                    className={cn(
                      "relative h-[5.25rem] w-[5.25rem] shrink-0 overflow-hidden rounded-full ring-2 ring-cyan-400/35",
                      "shadow-[0_0_28px_rgba(0,191,255,0.2)] transition duration-500 group-hover:shadow-[0_0_44px_rgba(34,211,238,0.45)]"
                    )}
                  >
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 84px, 84px"
                      />
                    ) : (
                      <InitialsFill initials={m.initials} />
                    )}
                  </div>
                  <div className="mt-4 min-w-0 sm:ml-5 sm:mt-0">
                    <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/90">{m.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{m.bio}</p>
                  </div>
                </div>
                <div className="relative mt-5 flex items-center justify-center gap-3 sm:justify-start">
                  <a
                    href={CONTACTS.telegramHttps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
                    aria-label={tContact("ariaTelegram")}
                  >
                    <Send className="h-4 w-4" aria-hidden />
                  </a>
                  <a
                    href={CONTACTS.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-emerald-200/90 transition hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-white"
                    aria-label={tContact("ariaWhatsapp")}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </motion.article>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
