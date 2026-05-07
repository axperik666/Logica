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
    amount: 0.12,
    margin: "0px 0px -8% 0px"
  });

  const Tag = as === "footer" ? motion.footer : motion.section;

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
      }
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </Tag>
  );
}
