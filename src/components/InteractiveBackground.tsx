"use client";

import { useEffect, useRef } from "react";
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
const ATTRACT_FORCE = 0.085;
const DAMPING = 0.93;
const HOME_SPRING = 0.042;

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
    let x = Math.sin(s * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 0; i < n; i++) {
    const bx = rng(i * 7 + 1) * w;
    const by = rng(i * 13 + 2) * h;
    const r = 1.3 + rng(i * 3) * 1.5;
    out.push({ baseX: bx, baseY: by, x: bx, y: by, vx: 0, vy: 0, r });
  }
  return out;
}

export type InteractiveBackgroundProps = {
  className?: string;
  particleCount?: number;
};

export default function InteractiveBackground({
  className,
  particleCount = DEFAULT_COUNT
}: InteractiveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const dimsRef = useRef({ w: 0, h: 0, dpr: 1 });
  const rafRef = useRef<number>(0);
  const isMobileRef = useRef(false);
  const countRef = useRef(particleCount);

  countRef.current = Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, Math.floor(particleCount)));

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const syncCanvasSize = () => {
      const rect = container.getBoundingClientRect();
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

    const refreshMobile = () => {
      isMobileRef.current =
        window.matchMedia("(max-width: 767px)").matches ||
        window.matchMedia("(pointer: coarse)").matches;
    };
    refreshMobile();

    syncCanvasSize();
    requestAnimationFrame(() => syncCanvasSize());

    const ro = new ResizeObserver(() => {
      refreshMobile();
      syncCanvasSize();
    });
    ro.observe(container);

    window.addEventListener("resize", refreshMobile);

    /** Window + rect canvas: работает поверх градиента/aurora (они pointer-events-none), не блокирует CTA hero */
    const updateMouse = (e: PointerEvent) => {
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

    const clearMouse = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("pointermove", updateMouse, { passive: true });
    window.addEventListener("pointerdown", updateMouse, { passive: true });
    window.addEventListener("pointerup", clearMouse, { passive: true });
    window.addEventListener("pointercancel", clearMouse, { passive: true });
    window.addEventListener("blur", clearMouse);

    const animate = () => {
      const { w, h } = dimsRef.current;
      if (w < 1 || h < 1) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const isMobile = isMobileRef.current;

      ctx.clearRect(0, 0, w, h);

      if (mouse.active && !isMobile) {
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
      } else {
        for (const p of particles) {
          p.vx += (p.baseX - p.x) * HOME_SPRING * 1.5;
          p.vy += (p.baseY - p.y) * HOME_SPRING * 1.5;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        }
      }

      const t = performance.now() * 0.00035;
      const idleAmp = isMobile ? 0.8 : 1.2;

      if (mouse.active) {
        ctx.save();
        const radius = isMobile ? MOBILE_GLOW_RADIUS : CURSOR_GLOW_RADIUS;
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius);
        g.addColorStop(0, "rgba(0,191,255,0.35)");
        g.addColorStop(0.5, "rgba(0,191,255,0.08)");
        g.addColorStop(1, "rgba(0,191,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }

      ctx.shadowBlur = SHADOW_BLUR;
      ctx.shadowColor = ACCENT;

      const n = particles.length;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = particles[i]!;
          const b = particles[j]!;
          const ax = a.x + Math.sin(t + a.baseX * 0.01) * idleAmp;
          const ay = a.y + Math.cos(t * 0.95 + a.baseY * 0.008) * idleAmp;
          const bx = b.x + Math.sin(t + b.baseX * 0.01) * idleAmp;
          const by = b.y + Math.cos(t * 0.95 + b.baseY * 0.008) * idleAmp;
          const d = Math.hypot(ax - bx, ay - by);
          if (d >= LINK_DIST) continue;

          const alpha = clampOpacity(0.15 + (1 - d / LINK_DIST) * 0.7);
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const maxDist = isMobile ? MOBILE_GLOW_RADIUS : ATTRACT_DIST;
        for (const p of particles) {
          const px = p.x + Math.sin(t + p.baseX * 0.01) * idleAmp;
          const py = p.y + Math.cos(t * 0.95 + p.baseY * 0.008) * idleAmp;
          const d = Math.hypot(mouse.x - px, mouse.y - py);
          if (d >= maxDist) continue;

          const alpha = clampOpacity(0.25 + (1 - d / maxDist) * 0.65);
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const ox = Math.sin(t + p.baseX * 0.01) * idleAmp;
        const oy = Math.cos(t * 0.95 + p.baseY * 0.008) * idleAmp;
        const px = p.x + ox;
        const py = p.y + oy;

        let rad = p.r;
        let alpha = 0.4;

        if (mouse.active) {
          const d = Math.hypot(mouse.x - px, mouse.y - py);
          const maxR = isMobile ? MOBILE_GLOW_RADIUS : ATTRACT_DIST;
          if (d < maxR) {
            const falloff = 1 - d / maxR;
            alpha = clampOpacity(0.2 + falloff * 0.75);
            rad = p.r * (1 + falloff * (isMobile ? 1.1 : 0.7));
          }
        }

        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", refreshMobile);
      window.removeEventListener("pointermove", updateMouse);
      window.removeEventListener("pointerdown", updateMouse);
      window.removeEventListener("pointerup", clearMouse);
      window.removeEventListener("pointercancel", clearMouse);
      window.removeEventListener("blur", clearMouse);
    };
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" style={{ pointerEvents: "none" }} />
    </div>
  );
}
