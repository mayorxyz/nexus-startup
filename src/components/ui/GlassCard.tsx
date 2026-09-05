import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
};

/**
 * Frosted-glass surface. The recipe is fixed:
 * rgba(255,255,255,0.04) bg · rgba(255,255,255,0.08) border · blur(12px) · 16px radius.
 * `hoverGlow` adds the indigo border + shadow transition.
 */
export default function GlassCard({ children, className = "", hoverGlow = true }: GlassCardProps) {
  return (
    <div className={`glass rounded-2xl ${hoverGlow ? "glass-hover" : ""} ${className}`}>
      {children}
    </div>
  );
}
