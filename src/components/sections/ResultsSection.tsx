"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { casesData } from "@/lib/casesData";

const COUNTER_1_END = 87;
const COUNTER_3_END = 45;

function AnimatedCounter({
  end,
  suffix = "",
  className
}: {
  end: number;
  suffix?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, end, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.floor(v))
    });
    return () => ctrl.stop();
  }, [inView, end]);

  return (
    <motion.div ref={ref} className={className}>
      <div className="text-5xl font-bold tabular-nums text-primary sm:text-6xl md:text-7xl">
        {count}
        {suffix}
      </div>
    </motion.div>
  );
}

export default function ResultsSection() {
  const t = useTranslations("sectionsDs.results");
  const caseCount = casesData.length;

  return (
    <section className="bg-dark-900 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          <div className="text-center">
            <AnimatedCounter end={COUNTER_1_END} suffix="+" />
            <p className="mt-3 text-sm text-gray-400 md:mt-4 md:text-lg">{t("counter1Label")}</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold tabular-nums text-primary sm:text-6xl md:text-7xl">{t("counter2Display")}</div>
            <p className="mt-3 text-sm text-gray-400 md:mt-4 md:text-lg">{t("counter2Label")}</p>
          </div>
          <div className="text-center">
            <AnimatedCounter end={COUNTER_3_END} suffix={t("counter3Suffix")} />
            <p className="mt-3 text-sm text-gray-400 md:mt-4 md:text-lg">{t("counter3Label")}</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold tabular-nums text-primary sm:text-6xl md:text-7xl">{caseCount}</div>
            <p className="mt-3 text-sm text-gray-400 md:mt-4 md:text-lg">{t("counter4Label", { count: caseCount })}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
