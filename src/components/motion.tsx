"use client";

import { forwardRef } from "react";
import type { ReactNode } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps, MotionStyle } from "framer-motion";

function mergeMotionStyle(style?: MotionStyle): MotionStyle {
  return { ...style };
}

export const MotionDiv = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  function MotionDiv(props, ref) {
    const { style, ...rest } = props;
    return (
      <motion.div ref={ref} style={mergeMotionStyle(style)} {...rest} />
    );
  }
);

export const MotionSection = forwardRef<
  HTMLElement,
  HTMLMotionProps<"section">
>(function MotionSection(props, ref) {
  const { style, ...rest } = props;
  return (
    <motion.section ref={ref} style={mergeMotionStyle(style)} {...rest} />
  );
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <MotionConfig reducedMotion={reduced ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
