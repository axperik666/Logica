"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Использовать для футера */
  as?: "section" | "footer";
};

/**
 * Плавное появление секции при скролле (whileInView — меньше лишних подписок, чем ручной useInView).
 */
export function ScrollRevealSection({
  id,
  className,
  children,
  as = "section"
}: Props) {
  const reduced = useReducedMotion();
  const Tag = as === "footer" ? motion.footer : motion.section;

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px 100px 0px" }}
      transition={{
        duration: 0.26,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </Tag>
  );
}
