import type { ComponentProps } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type LinkHref = ComponentProps<typeof Link>["href"];

type Props = {
  title: string;
  text: string;
  href?: LinkHref;
  /** Вторая кнопка — заявка с префиллом */
  orderHref?: LinkHref;
  orderLabel?: string;
  className?: string;
  linkHint?: string;
};

export function Card({
  title,
  text,
  href,
  orderHref,
  orderLabel,
  className,
  linkHint
}: Props) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-5 transition",
        "hover:border-white/20 hover:translate-y-[-2px]",
        className
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-2 text-sm text-white/65">{text}</p>

      {href || orderHref ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {href ? (
            <Link
              href={href}
              className="text-sm font-semibold text-brand-300 underline-offset-4 transition hover:text-white hover:underline"
            >
              {linkHint ?? "Подробнее →"}
            </Link>
          ) : (
            <span className="min-w-[1px]" aria-hidden />
          )}
          {orderHref ? (
            <Button href={orderHref} className="hover-lift px-4 py-2 text-xs">
              {orderLabel ?? "Заказать"}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
