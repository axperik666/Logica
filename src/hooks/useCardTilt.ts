"use client";

import { type PointerEvent, useRef } from "react";
import { useReducedMotion, useSpring } from "framer-motion";

type Options = {
  /** Макс. наклон по осям в градусах */
  maxDeg?: number;
  /** Пружина — чем ниже stiffness, тем «тяжелее» карточка */
  stiffness?: number;
};

/**
 * Лёгкий 3D-tilt по курсору внутри карточки (desktop / fine pointer).
 */
export function useCardTilt(options?: Options) {
  const maxDeg = options?.maxDeg ?? 7;
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: options?.stiffness ?? 220, damping: 22 });
  const rotateY = useSpring(0, { stiffness: options?.stiffness ?? 220, damping: 22 });

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / Math.max(r.width, 1) - 0.5;
    const ny = (e.clientY - r.top) / Math.max(r.height, 1) - 0.5;
    rotateY.set(nx * maxDeg * 2);
    rotateX.set(-ny * maxDeg * 2);
  };

  const onPointerLeave = () => reset();

  return {
    ref,
    rotateX: reduceMotion ? 0 : rotateX,
    rotateY: reduceMotion ? 0 : rotateY,
    onPointerMove,
    onPointerLeave,
    disabled: Boolean(reduceMotion)
  };
}
