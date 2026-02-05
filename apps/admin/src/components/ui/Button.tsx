import { motion, type MotionProps } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    variant?: ButtonVariant;
  };

const baseClasses =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-navy-900)]";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--color-electric)] text-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-bloom)]",
  secondary:
    "border border-white/20 bg-white/10 text-white shadow-[var(--shadow-soft)] hover:bg-white/20",
  ghost: "bg-transparent text-white/80 hover:text-white",
};

const sheenClasses =
  "after:absolute after:inset-0 after:-translate-x-[120%] after:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)] after:transition-transform after:duration-700 group-hover:after:translate-x-[120%]";

const Button = ({
  className = "",
  variant = "primary",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sheenClasses} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export { Button };
