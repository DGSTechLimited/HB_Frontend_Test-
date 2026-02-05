import type { HTMLAttributes } from "react";

type BadgeVariant = "success" | "warning" | "info";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-200 border-amber-500/30",
  info: "bg-sky-500/15 text-sky-200 border-sky-500/30",
};

const Badge = ({
  className = "",
  variant = "info",
  ...props
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};

export { Badge };
