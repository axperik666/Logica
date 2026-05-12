"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const logos = [
  { src: "/logos/tiktok.svg", alt: "TikTok", offsetX: -140, offsetY: -90 },
  { src: "/logos/meta.svg", alt: "Meta", offsetX: 110, offsetY: -110 },
  { src: "/logos/vk.svg", alt: "VK", offsetX: -160, offsetY: 130 },
  { src: "/logos/yandex.svg", alt: "Yandex", offsetX: 130, offsetY: 100 }
];

export default function FloatingPlatformLogos() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [dims, setDims] = useState({ w: 1920, h: 1080 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const readDims = () =>
      setDims({ w: Math.max(1, window.innerWidth), h: Math.max(1, window.innerHeight) });
    readDims();

    const handleMove = (e: PointerEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("resize", readDims);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", readDims);
    };
  }, []);

  const cx = dims.w / 2;
  const cy = dims.h / 2;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      {logos.map((logo) => (
        <motion.div
          key={logo.src}
          className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 opacity-80 md:h-20 md:w-20"
          style={{
            left: `calc(50% + ${logo.offsetX}px)`,
            top: `calc(50% + ${logo.offsetY}px)`
          }}
          animate={
            reduceMotion
              ? { x: 0, y: 0, rotate: 0 }
              : {
                  x: (mouse.x - cx) * 0.035,
                  y: (mouse.y - cy) * 0.035,
                  rotate: (mouse.x - cx) * 0.008
                }
          }
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        >
          <Image
            src={logo.src}
            alt=""
            width={80}
            height={80}
            className="drop-shadow-2xl"
          />
        </motion.div>
      ))}
    </div>
  );
}
