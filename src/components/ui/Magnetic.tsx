import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/** Wrapper that physically pulls its child toward the cursor. Inert on touch / reduced motion. */
export function Magnetic({ children, strength = 0.32, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 190, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 190, damping: 14, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { x: sx, y: sy }}
      className={`inline-block ${className}`}
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

type MagneticLinkProps = {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "solid" | "ghost";
  cursor?: string;
  className?: string;
};

/** Magnetic CTA — solid violet or ghost outline. */
export function MagneticLink({
  to,
  href,
  onClick,
  children,
  variant = "solid",
  cursor = "explore",
  className = "",
}: MagneticLinkProps) {
  const classes = `inline-flex items-center gap-3 px-7 py-4 font-mono text-xs tracking-[0.22em] uppercase transition-colors duration-300 ${
    variant === "solid"
      ? "bg-violet text-obsidian hover:bg-paper"
      : "border border-paper/25 text-paper hover:border-violet hover:text-violet"
  } ${className}`;

  return (
    <Magnetic>
      {to ? (
        <Link to={to} onClick={onClick} data-cursor={cursor} className={classes}>
          {children}
        </Link>
      ) : (
        <a href={href} onClick={onClick} data-cursor={cursor} className={classes}>
          {children}
        </a>
      )}
    </Magnetic>
  );
}
