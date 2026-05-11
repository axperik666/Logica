"use client";

import { MotionProvider } from "@/components/motion";
import { ScrollDepthAnalytics } from "@/components/ScrollDepthAnalytics";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <ScrollDepthAnalytics />
      {children}
    </MotionProvider>
  );
}
