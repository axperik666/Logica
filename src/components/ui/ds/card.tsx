import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type DsSurfaceCardProps = HTMLAttributes<HTMLDivElement>;

export function DsSurfaceCard({ className, ...props }: DsSurfaceCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-dark-800 p-8 transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10",
        className
      )}
      {...props}
    />
  );
}
