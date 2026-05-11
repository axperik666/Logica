import type { ComponentProps, MouseEventHandler } from "react";
import { Link } from "@/navigation";
import { cn } from "@/lib/cn";

type LinkHref = ComponentProps<typeof Link>["href"];

type Props = {
  href?: LinkHref;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  /** Только для варианта без `href` (нативная кнопка). */
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-50 disabled:pointer-events-none transform-gpu transition-transform hover:scale-[1.02] active:scale-[0.99]";
  const styles =
    variant === "primary"
      ? "btn-cta-premium bg-primary text-dark hover:brightness-110"
      : "bg-white/0 text-white hover:bg-white/10 border border-white/12";

  if (href) {
    return (
      <Link href={href} className={cn(base, styles, className)}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(base, styles, className)}
    >
      {children}
    </button>
  );
}

