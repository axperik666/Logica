"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import {
  sectionRevealVariants,
  sectionRevealViewport,
  sectionRevealTransition
} from "@/lib/sectionReveal";

type Props = HTMLMotionProps<"section"> & {
  /** Доп. задержка перед анимацией секции */
  revealDelay?: number;
};

export const RevealSection = forwardRef<HTMLElement, Props>(function RevealSection(
  { children, revealDelay = 0, variants, viewport, ...rest },
  ref
) {
  const v =
    variants ??
    ({
      hidden: sectionRevealVariants.hidden,
      show: {
        opacity: 1,
        y: 0,
        transition: sectionRevealTransition(revealDelay)
      }
    } as const);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={viewport ?? sectionRevealViewport}
      variants={v}
      {...rest}
    >
      {children}
    </motion.section>
  );
});
