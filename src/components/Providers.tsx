"use client";

import { MotionProvider } from "@/components/motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionProvider>{children}</MotionProvider>;
}
