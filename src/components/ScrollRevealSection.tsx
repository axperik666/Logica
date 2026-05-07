"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Использовать для футера */
  as?: "section" | "footer";
};

/**
 * Плавное появление секции при скролле (useInView + Framer Motion).
 */
export function ScrollRevealSection({
  id,
  className,
  children,
  as = "section"
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.08,
    /** Срабатывает раньше — меньше «пустого» футера на мобилке при скролле */
    margin: "0px 0px 140px 0px"
  });

  const Tag = as === "footer" ? motion.footer : motion.section;

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
      }
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </Tag>
  );
}
