import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "outline";
type Size = "sm" | "md" | "lg";

type GradientButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-sans font-semibold transition-[box-shadow,background-color,border-color] duration-300 select-none";

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-accent to-highlight text-ink shadow-[0_8px_28px_rgba(99,102,241,0.35)] hover:shadow-[0_10px_40px_rgba(99,102,241,0.5)]",
  outline:
    "border border-white/20 bg-white/5 text-ink hover:border-accent hover:bg-white/10",
};

/** Spring-physics CTA. Renders an anchor when `href` is supplied, otherwise a button. */
export default function GradientButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: GradientButtonProps) {
  const classes = `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
    </motion.button>
  );
}
