import { Link } from "@/navigation";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  text: string;
  href?: string;
  className?: string;
  linkHint?: string;
};

export function Card({ title, text, href, className, linkHint }: Props) {
  const inner = (
    <div
      className={cn(
        "glass rounded-2xl p-5 transition",
        "hover:border-white/20 hover:translate-y-[-2px]",
        className
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-2 text-sm text-white/65">{text}</p>
      {href ? (
        <div className="mt-4 text-sm font-semibold text-brand-300">
          {linkHint ?? "Подробнее →"}
        </div>
      ) : null}
    </div>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 rounded-2xl">
      {inner}
    </Link>
  );
}

