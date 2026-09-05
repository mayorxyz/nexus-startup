import type { ReactNode } from "react";

type GradientBadgeProps = {
  children: ReactNode;
  className?: string;
  /** subtle pulsing glow on the gradient ring */
  pulse?: boolean;
};

/** Pill badge with a gradient ring (padding-box/border-box trick) and optional pulse. */
export default function GradientBadge({ children, className = "", pulse = true }: GradientBadgeProps) {
  return (
    <span
      className={`gradient-border inline-flex items-center gap-2 rounded-3xl px-4 py-1.5 font-mono text-xs text-muted ${
        pulse ? "badge-pulse" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}
