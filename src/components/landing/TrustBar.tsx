"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ICON_CHAR: Record<string, string> = {
  arrow: "↳",
  check: "✓",
  spark: "✦",
  fire: "🔥"
};

type StripBold = {
  kind: "boldMid";
  before: string;
  bold: string;
  icon: string;
};

type StripPlain = {
  kind: "plain";
  text: string;
  icon: string;
};

type StripItem = StripBold | StripPlain;

export function TrustBar() {
  const t = useTranslations("contactsPage");
  const raw = t.raw("trustStripItems");
  const items: StripItem[] = Array.isArray(raw) ? (raw as StripItem[]) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-y border-white/10 bg-white/5 py-6"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-white/70">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xl text-[#00b4ff]" aria-hidden>
                {ICON_CHAR[item.icon] ?? "•"}
              </span>
              {item.kind === "boldMid" ? (
                <span>
                  {item.before}
                  <span className="font-semibold text-white">{item.bold}</span>
                </span>
              ) : (
                <span>{item.text}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
