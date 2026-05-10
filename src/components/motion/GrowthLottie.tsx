"use client";

import dynamic from "next/dynamic";

const Player = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false, loading: () => null }
);

type Props = {
  /** JSON в `public/lottie/…` */
  src: string;
  className?: string;
};

/** Lottie для микро-анимаций роста (график и т.п.). Установка: `npm i` после обновления package.json. */
export function GrowthLottie({ src, className }: Props) {
  return (
    <div className={className} aria-hidden>
      <Player loop autoplay src={src} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
