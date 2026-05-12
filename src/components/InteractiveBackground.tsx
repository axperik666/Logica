"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const ACCENT = "#00bfff";
const MAX_LINK_DIST = 120;
const ATTRACT_DIST = 180;
const CURSOR_GLOW_RADIUS = 120;
const DEFAULT_PARTICLE_COUNT = 96;
const ATTRACT_STRENGTH = 0.055;
/** Spring toward rest — higher = smoother follow without snapping */
const SPRING_HOME = 0.12;
const POINTER_THROTTLE_MS = 12;
const PARTICLE_MIN = 40;
const PARTICLE_MAX = 200;

const SHADOW_LINK = 8;
const SHADOW_CURSOR_LINE = 25;
const SHADOW_PARTICLE_HALO = 20;

function clampOpacity(a: number): number {
  return Math.min(0.9, Math.max(0.2, a));
}

type Particle = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
  /** Last pointer was touch — particles stay fixed; glow-only interaction */
  isTouch: boolean;
};

function hexToRgb(hex: string) {
  const n = hex.replace("#", "");
  const v = parseInt(n.length === 3 ? n.split("").map((c) => c + c).join("") : n, 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}

const accentRgb = hexToRgb(ACCENT);

function initParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = [];
  const rng = (s: number) => {
    let x = Math.sin(s * 12.9898 + width) * 43758.5453;
    return x - Math.floor(x);
  };
  const n = Math.min(PARTICLE_MAX, Math.max(PARTICLE_MIN, Math.floor(count)));
  for (let i = 0; i < n; i++) {
    const bx = rng(i * 7 + 1) * width;
    const by = rng(i * 13 + 2) * height;
    const r = 1.2 + rng(i * 3) * 1.8;
    particles.push({
      baseX: bx,
      baseY: by,
      x: bx,
      y: by,
      radius: r
    });
  }
  return particles;
}

export type InteractiveBackgroundProps = {
  className?: string;
  particleCount?: number;
  style?: CSSProperties;
};

const MotionCanvas = motion.canvas;

function InteractiveBackground({ className, particleCount = DEFAULT_PARTICLE_COUNT, style }: InteractiveBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false, isTouch: false });
  const coarseRef = useRef(false);
  const rafRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimsRef = useRef({ w: 0, h: 0, dpr: 1 });
  const throttleNextRef = useRef(0);
  const countRef = useRef(particleCount);

  const reducedMotion = useReducedMotion();

  countRef.current = Math.min(PARTICLE_MAX, Math.max(PARTICLE_MIN, Math.floor(particleCount)));

  useEffect(() => {
    const canvas = canvasRef.current;
    const el = rootRef.current;
    if (!canvas || !el || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const mq = window.matchMedia("(pointer: coarse)");
    const syncCoarse = () => {
      coarseRef.current = mq.matches;
    };
    syncCoarse();
    mq.addEventListener("change", syncCoarse);

    const resize = () => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      dimsRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = initParticles(w, h, countRef.current);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const clientToCanvas = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const { w, h } = dimsRef.current;
      const x = ((clientX - rect.left) / Math.max(rect.width, 1)) * w;
      const y = ((clientY - rect.top) / Math.max(rect.height, 1)) * h;
      return { x, y };
    };

    const updatePointerFromEvent = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        pointerRef.current = { ...pointerRef.current, active: false };
        return;
      }

      const now = performance.now();
      if (now < throttleNextRef.current) return;
      throttleNextRef.current = now + POINTER_THROTTLE_MS;

      const { x, y } = clientToCanvas(e.clientX, e.clientY);
      coarseRef.current = mq.matches;

      pointerRef.current = {
        x,
        y,
        active: true,
        isTouch: e.pointerType === "touch"
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointerFromEvent(e);
    };

    const clearPointer = () => {
      pointerRef.current = { ...pointerRef.current, active: false, isTouch: false };
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true, capture: true });
    document.addEventListener("pointerup", clearPointer, { capture: true });
    document.addEventListener("pointercancel", clearPointer, { capture: true });
    window.addEventListener("blur", clearPointer);

    const tick = () => {
      const { w, h } = dimsRef.current;
      if (w < 1 || h < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const particles = particlesRef.current;
      const ptr = pointerRef.current;
      const coarse = coarseRef.current;
      const touchGlowMul = ptr.isTouch ? 2 : 1;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!ptr.active) {
          const dx = p.baseX - p.x;
          const dy = p.baseY - p.y;
          const distHome = Math.hypot(dx, dy);
          const u = Math.min(1, distHome / 140);
          const easeOut = 1 - (1 - u) ** 3;
          const k = SPRING_HOME * (0.72 + 0.28 * easeOut);
          p.x += dx * k;
          p.y += dy * k;
          continue;
        }

        if (ptr.isTouch) {
          p.x = p.baseX;
          p.y = p.baseY;
          continue;
        }

        const dxp = ptr.x - p.x;
        const dyp = ptr.y - p.y;
        const dist = Math.hypot(dxp, dyp);

        if (coarse) {
          p.x += (p.baseX - p.x) * SPRING_HOME;
          p.y += (p.baseY - p.y) * SPRING_HOME;
        } else {
          if (dist < ATTRACT_DIST && dist > 0.5) {
            p.x += dxp * ATTRACT_STRENGTH;
            p.y += dyp * ATTRACT_STRENGTH;
          }
          p.x += (p.baseX - p.x) * SPRING_HOME;
          p.y += (p.baseY - p.y) * SPRING_HOME;
        }
      }

      if (ptr.active) {
        ctx.save();
        const g = ctx.createRadialGradient(
          ptr.x,
          ptr.y,
          0,
          ptr.x,
          ptr.y,
          CURSOR_GLOW_RADIUS
        );
        g.addColorStop(0, "rgba(0,191,255,0.25)");
        g.addColorStop(1, "rgba(0,191,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(ptr.x, ptr.y, CURSOR_GLOW_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const n = particles.length;

      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = particles[i]!;
          const b = particles[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d >= MAX_LINK_DIST) continue;
          const t = 1 - d / MAX_LINK_DIST;
          const alpha = clampOpacity(0.2 + t * 0.65);
          ctx.save();
          ctx.shadowBlur = SHADOW_LINK * touchGlowMul;
          ctx.shadowColor = ACCENT;
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      if (ptr.active) {
        for (const p of particles) {
          const d = Math.hypot(ptr.x - p.x, ptr.y - p.y);
          if (d >= ATTRACT_DIST) continue;
          const t = 1 - d / ATTRACT_DIST;
          const alpha = clampOpacity(0.22 + t * 0.58);
          const lw = 3 + (1 - d / ATTRACT_DIST) * 3;
          ctx.save();
          ctx.shadowBlur = SHADOW_CURSOR_LINE * touchGlowMul;
          ctx.shadowColor = ACCENT;
          ctx.lineWidth = lw;
          ctx.strokeStyle = `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(ptr.x, ptr.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      for (const p of particles) {
        const d = ptr.active ? Math.hypot(ptr.x - p.x, ptr.y - p.y) : ATTRACT_DIST + 1;
        let r = p.radius;
        let alpha = 0.28;
        const near = d < ATTRACT_DIST;

        if (ptr.active && near) {
          const scale = 1 + (ATTRACT_DIST - d) / 80;
          alpha = clampOpacity(0.24 + (1 - d / ATTRACT_DIST) * 0.52);
          r = p.radius * scale;
        }

        ctx.save();
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
        ctx.fillStyle = `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        if (near && ptr.active) {
          const haloAlpha = clampOpacity(alpha * (ptr.isTouch ? 0.42 : 0.38) * touchGlowMul);
          ctx.shadowBlur = SHADOW_PARTICLE_HALO * touchGlowMul;
          ctx.shadowColor = ACCENT;
          ctx.fillStyle = `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},${haloAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 1.55, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      mq.removeEventListener("change", syncCoarse);
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("pointermove", onPointerMove, true);
      document.removeEventListener("pointerup", clearPointer, true);
      document.removeEventListener("pointercancel", clearPointer, true);
      window.removeEventListener("blur", clearPointer);
      ctxRef.current = null;
    };
  }, [reducedMotion, particleCount]);

  useEffect(() => {
    if (!reducedMotion) return;
    const canvas = canvasRef.current;
    const el = rootRef.current;
    if (!canvas || !el) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawStatic = () => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const particles = initParticles(w, h, countRef.current);
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 1;
      const n = particles.length;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = particles[i]!;
          const b = particles[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= MAX_LINK_DIST) continue;
          const t = 1 - d / MAX_LINK_DIST;
          const alpha = 0.12 + t * 0.35;
          ctx.strokeStyle = `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.35)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawStatic();
    const ro = new ResizeObserver(drawStatic);
    ro.observe(el);
    return () => ro.disconnect();
  }, [reducedMotion, particleCount]);

  return (
    <div ref={rootRef} className={cn(className)} style={style} aria-hidden>
      <MotionCanvas
        ref={canvasRef}
        className="block h-full w-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default InteractiveBackground;
