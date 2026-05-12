"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const ACCENT = "#00bfff";
const LINK_DIST = 130;
const ATTRACT_DIST = 180;
const MOBILE_GLOW_RADIUS = 220;
const CURSOR_GLOW_RADIUS = 140;
const DEFAULT_COUNT = 100;
const MIN_PARTICLES = 80;
const MAX_PARTICLES = 120;

const SHADOW_BLUR = 12;
const ATTRACT_FORCE = 0.08;
const DAMPING = 0.94;
const HOME_SPRING = 0.038;

function clampOpacity(t: number): number {
  return Math.min(0.85, Math.max(0.15, t));
}

function hexToRgb(hex: string) {
  const n = hex.replace("#", "");
  const v = parseInt(n.length === 3 ? n.split("").map((c) => c + c).join("") : n, 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}

const rgb = hexToRgb(ACCENT);

type Particle = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

function initParticles(w: number, h: number, count: number): Particle[] {
  const n = Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, Math.floor(count)));
  const out: Particle[] = [];
  const rng = (s: number) => {
    let x = Math.sin(s * 12.9898 + w) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 0; i < n; i++) {
    const bx = rng(i * 7 + 1) * w;
    const by = rng(i * 13 + 2) * h;
    const r = 1.2 + rng(i * 3) * 1.6;
    out.push({ baseX: bx, baseY: by, x: bx, y: by, vx: 0, vy: 0, r });
  }
  return out;
}

function mobileGlowOnly(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as Window & { ontouchstart?: unknown };
  return w.ontouchstart !== undefined || window.screen.width < 768;
}

export type InteractiveBackgroundProps = {
  className?: string;
  particleCount?: number;
};

export default function InteractiveBackground({
  className,
  particleCount = DEFAULT_COUNT
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const countRef = useRef(particleCount);
  const dimsRef = useRef({ w: 0, h: 0, dpr: 1 });
  const rafRef = useRef(0);
  const mobileStaticRef = useRef(false);
  const reducedMotion = useReducedMotion();

  countRef.current = Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, Math.floor(particleCount)));

  useEffect(() => {
    mobileStaticRef.current = mobileGlowOnly();
    const onResizeCheck = () => {
      mobileStaticRef.current = mobileGlowOnly();
    };
    window.addEventListener("resize", onResizeCheck);
    return () => window.removeEventListener("resize", onResizeCheck);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
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

    syncCanvasSize();
    const ro = new ResizeObserver(syncCanvasSize);
    ro.observe(canvas);

    const updateMouseFromEvent = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        mouseRef.current.active = false;
        return;
      }
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const onPointerDown = (e: PointerEvent) => updateMouseFromEvent(e);
    const onPointerMove = (e: PointerEvent) => updateMouseFromEvent(e);
    const onPointerUp = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("blur", onPointerUp);

    const animate = () => {
      const { w, h } = dimsRef.current;
      if (w < 1 || h < 1) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const glowOnly = mobileStaticRef.current;

      ctx.clearRect(0, 0, w, h);

      if (!mouse.active) {
        for (const p of particles) {
          p.vx += (p.baseX - p.x) * HOME_SPRING * 1.4;
          p.vy += (p.baseY - p.y) * HOME_SPRING * 1.4;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        }
      } else if (glowOnly) {
        for (const p of particles) {
          p.x = p.baseX;
          p.y = p.baseY;
          p.vx = 0;
          p.vy = 0;
        }
      } else {
        for (const p of particles) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < ATTRACT_DIST && dist > 0.5) {
            p.vx += dx * ATTRACT_FORCE;
            p.vy += dy * ATTRACT_FORCE;
          }
          p.vx += (p.baseX - p.x) * HOME_SPRING;
          p.vy += (p.baseY - p.y) * HOME_SPRING;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        }
      }

      if (mouse.active) {
        ctx.save();
        const g = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          CURSOR_GLOW_RADIUS
        );
        g.addColorStop(0, "rgba(0,191,255,0.35)");
        g.addColorStop(0.45, "rgba(0,191,255,0.08)");
        g.addColorStop(1, "rgba(0,191,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, CURSOR_GLOW_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.shadowBlur = SHADOW_BLUR;
      ctx.shadowColor = ACCENT;

      const n = particles.length;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = particles[i]!;
          const b = particles[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= LINK_DIST) continue;
          const t = 1 - d / LINK_DIST;
          const alpha = clampOpacity(0.15 + t * 0.7);
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const linkDist = glowOnly ? MOBILE_GLOW_RADIUS : ATTRACT_DIST;
        for (const p of particles) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d >= linkDist) continue;
          const t = 1 - d / linkDist;
          const alpha = clampOpacity(0.2 + t * 0.65);
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.lineWidth = 2 + (1 - d / linkDist) * 4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        let rad = p.r;
        let alpha = 0.35;
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          const nearR = glowOnly ? MOBILE_GLOW_RADIUS : ATTRACT_DIST;
          if (d < nearR) {
            const falloff = 1 - d / nearR;
            alpha = clampOpacity(0.18 + falloff * 0.67);
            rad = p.r * (1 + falloff * (glowOnly ? 0.85 : 0.65));
          }
        }
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", onPointerUp);
    };
  }, [reducedMotion, particleCount]);

  useEffect(() => {
    if (!reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
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
      ctx.shadowBlur = SHADOW_BLUR;
      ctx.shadowColor = ACCENT;
      const n = particles.length;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = particles[i]!;
          const b = particles[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= LINK_DIST) continue;
          const t = 1 - d / LINK_DIST;
          const alpha = clampOpacity(0.15 + t * 0.55);
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const p of particles) {
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [reducedMotion, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 block h-full w-full", className)}
      style={{
        pointerEvents: "none",
        zIndex: -1
      }}
      aria-hidden
    />
  );
}
