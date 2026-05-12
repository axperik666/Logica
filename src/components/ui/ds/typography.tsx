import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DsH1({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cn("section-header", className)}>{children}</h1>;
}

export function DsH2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-4xl font-bold tracking-tighter text-white md:text-5xl", className)}>
      {children}
    </h2>
  );
}
