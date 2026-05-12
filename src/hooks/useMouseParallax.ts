"use client";

import { type RefObject, useEffect, useRef } from "react";
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
 * Интерактивный параллакс по позиции указателя (мышь и тач) внутри элемента.
 * При уходе / отпускании — плавный возврат в центр.
 */
export function useMouseParallax(
  containerRef: RefObject<HTMLElement | null>,
  options?: { maxPx?: number }
): MouseParallaxLayers {
  const reduceMotion = useReducedMotion();
  const maxPx = options?.maxPx ?? 22;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 58, damping: 28, mass: 0.32 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const backX = useTransform(x, (v) => v * 0.38);
  const backY = useTransform(y, (v) => v * 0.38);
  const midX = useTransform(x, (v) => v * 0.22);
  const midY = useTransform(y, (v) => v * 0.22);
  const frontX = useTransform(x, (v) => v * 0.55);
  const frontY = useTransform(y, (v) => v * 0.55);

  const moveRaf = useRef<number | null>(null);
  const pending = useRef({ x: 0, y: 0 });
  const coarsePtr = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const mq = window.matchMedia("(pointer: coarse)");
    const syncCoarse = () => {
      coarsePtr.current = mq.matches;
    };
    syncCoarse();
    mq.addEventListener("change", syncCoarse);

    const flushMove = () => {
      moveRaf.current = null;
      rawX.set(pending.current.x);
      rawY.set(pending.current.y);
    };

    const handleMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / Math.max(r.width, 1) - 0.5;
      const ny = (e.clientY - r.top) / Math.max(r.height, 1) - 0.5;
      const px = nx * 2 * maxPx;
      const py = ny * 2 * maxPx;

      if (coarsePtr.current) {
        pending.current = { x: px, y: py };
        if (moveRaf.current == null) {
          moveRaf.current = requestAnimationFrame(flushMove);
        }
      } else {
        rawX.set(px);
        rawY.set(py);
      }
    };

    const reset = () => {
      if (moveRaf.current != null) {
        cancelAnimationFrame(moveRaf.current);
        moveRaf.current = null;
      }
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("pointermove", handleMove, { passive: true });
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointerup", reset);
    el.addEventListener("pointercancel", reset);

    return () => {
      mq.removeEventListener("change", syncCoarse);
      if (moveRaf.current != null) cancelAnimationFrame(moveRaf.current);
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointerup", reset);
      el.removeEventListener("pointercancel", reset);
    };
  }, [containerRef, maxPx, rawX, rawY, reduceMotion]);

  return { backX, backY, midX, midY, frontX, frontY };
}
