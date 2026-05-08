"use client";

import { useRef, useId } from "react";
import type { CSSProperties, FC } from "react";
import { useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { Link } from "@/navigation";
import { homeContactLink } from "@/lib/contactHref";

type PlatformKey = "google" | "meta" | "tiktok" | "telegram";

const PLATFORM_ORDER: PlatformKey[] = ["google", "meta", "tiktok", "telegram"];

type PlatformVisual = {
  /** Три числа через пробел — для rgb(var(--platform-rgb) / α) в CSS */
  rgb: string;
  ring: string;
  nameHover: string;
};

const PLATFORM_VISUAL: Record<PlatformKey, PlatformVisual> = {
  google: {
    rgb: "66 133 244",
    ring: "group-hover:border-[#4285F4]/55",
    nameHover: "group-hover:text-[#8AB4F8]"
  },
  meta: {
    rgb: "0 104 224",
    ring: "group-hover:border-[#0668E1]/55",
    nameHover: "group-hover:text-[#7AB8FF]"
  },
  tiktok: {
    rgb: "37 244 238",
    ring: "group-hover:border-[#25F4EE]/45",
    nameHover: "group-hover:text-[#6DF7F2]"
  },
  telegram: {
    rgb: "38 165 228",
    ring: "group-hover:border-[#26A5E4]/55",
    nameHover: "group-hover:text-[#7FD4FA]"
  }
};

type PlatformCopy = { name: string; caption: string };

function LogoGoogle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C44.98 37.98 48 31.79 48 24c0-1.64-.14-3.29-.38-4.85z"
      />
      <path
        fill="#FBBC05"
        d="M6.52 14.77A23.99 23.99 0 0 0 0 24c0 3.95 1.08 7.65 2.96 10.82l7.98-6.19A14.44 14.44 0 0 1 7.5 24c0-1.42.24-2.77.66-4.03z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.22C6.51 42.62 14.62 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}

function LogoMeta({ className }: { className?: string }) {
  const gid = useId();
  const gradId = `meta-grad-${gid.replace(/:/g, "")}`;
  return (
    <svg className={className} viewBox="0 0 120 80" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0064E0" />
          <stop offset="100%" stopColor="#0082FB" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradId})`}
        d="M95 15c-12 0-22 9-24 20-2-11-12-20-24-20-14 0-25 11-25 25 0 22 28 38 49 55 21-17 49-33 49-55 0-14-11-25-25-25z"
      />
    </svg>
  );
}

function LogoTikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#25F4EE"
        d="M34 12v8.2c-3.5-.7-7 0-9.6 2V34h-6V18h6v3.4c1.6-2.8 5.6-4 9.6-3.4z"
      />
      <path
        fill="#FE2C55"
        d="M34 20.2V28c-2.6-.5-5.4.2-7.6 1.8v10h-6V22.8c2.6-2.6 7-3.5 10.6-2.6z"
      />
      <path
        fill="#000"
        d="M20.4 34v-9.4c-4.8-1.4-9.8 2-9.8 7.2 0 5 5 8.6 10 7.4 3.8-.8 6.5-4.2 6.8-8h-7z"
        opacity=".35"
      />
    </svg>
  );
}

function LogoYandex({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#FC3F1D" />
      <path
        fill="#fff"
        d="M26.5 14h-8v20h4v-6.5l3.8 6.5h4.7l-4.8-7.2c2.6-.8 4.4-3 4.4-5.8 0-3.5-2.8-6-6.1-6z"
      />
    </svg>
  );
}

function LogoVk({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="10" fill="#0077FF" />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fill="#fff"
        fontSize="17"
        fontWeight="700"
        fontFamily="system-ui, Segoe UI, sans-serif"
      >
        vk
      </text>
    </svg>
  );
}

function LogoTelegram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#26A5E4" />
      <path
        fill="#fff"
        d="M34.5 14.2 13.8 23.4c-1.2.5-1.1 1-.2 1.3l5.2 1.6 12-7.6c.6-.4 1.1-.2.7.3l-9.7 9.2-.4 5.5c.5 0 .7-.2 1-.6l2.4-2.4 5 3.7c.9.5 1.6.4 1.8-.7l3.3-15.6c.3-1.4-.5-2-1.4-1.6z"
      />
    </svg>
  );
}

const LOGOS: Record<PlatformKey, FC<{ className?: string }>> = {
  google: LogoGoogle,
  meta: LogoMeta,
  tiktok: LogoTikTok,
  telegram: LogoTelegram
};

export function Platforms() {
  const t = useTranslations("platforms");
  const tSec = useTranslations("sectionsSeo");
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px 80px 0px"
  });

  const itemsRaw = t.raw("items");
  const items =
    itemsRaw && typeof itemsRaw === "object"
      ? (itemsRaw as Record<PlatformKey, PlatformCopy>)
      : ({} as Record<PlatformKey, PlatformCopy>);

  return (
    <MotionSection
      ref={ref}
      id="platforms"
      className="full-bleed tech-bg relative overflow-x-clip border-y border-white/[0.06] py-24 sm:py-28 lg:py-28"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.07, delayChildren: 0.03 }
        }
      }}
    >
      <div className="site-container">
      <div className="sr-only">
        <p>{tSec("platforms.metaTitle")}</p>
        <p>{tSec("platforms.metaDescription")}</p>
      </div>

      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,191,255,0.22)] bg-[rgba(0,191,255,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#7AE0FF]">
          <Sparkles className="h-4 w-4" aria-hidden />
          {t("badge")}
        </div>
        <h2 className="brand-glow mt-4 text-balance text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm font-medium tracking-wide text-white/65 sm:text-base">
          {t("subtitle")}
        </p>
      </MotionDiv>

      <MotionDiv
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08, delayChildren: 0.12 }
          }
        }}
        className="mx-auto mt-10 max-w-5xl"
      >
        <div className="glass rounded-[2rem] border border-white/12 px-4 py-9 backdrop-blur-xl sm:px-8 sm:py-11">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {PLATFORM_ORDER.map((key) => {
              const Logo = LOGOS[key];
              const visual = PLATFORM_VISUAL[key];
              const copy = items[key];
              const name = copy?.name ?? key;
              const caption = copy?.caption ?? "";
              return (
                <MotionDiv
                  key={key}
                  variants={{
                    hidden: { opacity: 0, y: 18, scale: 0.96 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                    }
                  }}
                  className="platform-card group relative"
                >
                  <Link
                    href={homeContactLink({ platform: key })}
                    className="block rounded-2xl outline-none ring-offset-2 ring-offset-[rgba(5,9,24,0.96)] transition-shadow focus-visible:ring-2 focus-visible:ring-[#00BFFF]/70"
                  >
                  <div
                    className={cn(
                      "platform-card-surface relative flex min-h-[9rem] flex-col items-center justify-start gap-3 rounded-2xl border border-white/[0.12] bg-[rgba(5,9,24,0.72)] px-3 pb-5 pt-6 backdrop-blur-xl transition-all duration-300 ease-out will-change-transform sm:min-h-[9.5rem]",
                      "hover:-translate-y-2 hover:scale-[1.05] hover:border-[#00BFFF]/60",
                      "hover:shadow-[0_22px_62px_rgba(0,0,0,0.55),0_0_46px_rgba(0,191,255,0.62),0_0_82px_rgba(0,191,255,0.22)]",
                      visual.ring
                    )}
                    style={
                      {
                        ["--platform-rgb" as string]: visual.rgb
                      } as CSSProperties
                    }
                  >
                    <div
                      className={cn(
                        "flex h-[3.25rem] w-full max-w-[9rem] items-center justify-center transition-all duration-[400ms] ease-out",
                        "grayscale brightness-[0.88] opacity-[0.72]",
                        "group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-[1.08]",
                        "group-hover:[filter:drop-shadow(0_0_20px_rgb(var(--platform-rgb)/0.55))]"
                      )}
                    >
                      <Logo className="h-[3.25rem] w-auto max-w-full sm:h-14" />
                    </div>

                    <div className="flex w-full flex-col items-center gap-1 px-1 pb-0.5 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45 group-hover:text-[#9AE8FF]/75 transition-colors duration-300">
                        {key === "google"
                          ? "Google Ads"
                          : key === "meta"
                            ? "Meta"
                            : key === "tiktok"
                              ? "TikTok Ads"
                              : "Telegram Ads"}
                      </span>
                      <span
                        className={cn(
                          "text-[13px] font-semibold leading-tight text-white/88 transition-colors duration-300 sm:text-sm",
                          visual.nameHover
                        )}
                      >
                        {name}
                      </span>
                      {caption ? (
                        <span className="text-[10px] leading-snug text-white/42 transition-colors duration-300 group-hover:text-white/58 sm:text-[11px]">
                          {caption}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  </Link>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </MotionDiv>
      </div>
    </MotionSection>
  );
}
