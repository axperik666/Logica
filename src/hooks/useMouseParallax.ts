"use client";

import { type RefObject, useEffect } from "react";
import {
  type MotionValue,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform
} from "framer-motion";

export type MouseParallaxLayers = {
  backX: MotionValue<number>;
  backY: MotionValue<number>;
  midX: MotionValue<number>;
  midY: MotionValue<number>;
  frontX: MotionValue<number>;
  frontY: MotionValue<number>;
};

/**
 * Интерактивный параллакс по позиции курсора внутри элемента.
 * При уходе курсора с области — плавный возврат в центр.
 */
export function useMouseParallax(
  containerRef: RefObject<HTMLElement | null>,
  options?: { maxPx?: number }
): MouseParallaxLayers {
  const reduceMotion = useReducedMotion();
  const maxPx = options?.maxPx ?? 22;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 52, damping: 32, mass: 0.35 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const backX = useTransform(x, (v) => v * 0.38);
  const backY = useTransform(y, (v) => v * 0.38);
  const midX = useTransform(x, (v) => v * 0.22);
  const midY = useTransform(y, (v) => v * 0.22);
  const frontX = useTransform(x, (v) => v * 0.55);
  const frontY = useTransform(y, (v) => v * 0.55);

  useEffect(() => {
    if (reduceMotion) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / Math.max(r.width, 1) - 0.5;
      const ny = (e.clientY - r.top) / Math.max(r.height, 1) - 0.5;
      rawX.set(nx * 2 * maxPx);
      rawY.set(ny * 2 * maxPx);
    };

    const reset = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [containerRef, maxPx, rawX, rawY, reduceMotion]);

  return { backX, backY, midX, midY, frontX, frontY };
}
