"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-[#0099d9]",
        outline: "border border-white/30 text-white hover:border-white/70",
        ghost: "text-white hover:bg-white/10"
      },
      size: {
        default: "gap-3 px-8 py-4 text-lg",
        sm: "gap-2 px-5 py-3 text-base",
        lg: "gap-3 px-10 py-5 text-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export type DsButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const DsButton = forwardRef<HTMLButtonElement, DsButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
DsButton.displayName = "DsButton";
