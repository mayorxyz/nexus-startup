import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type CounterProps = {
  to: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
};

/** Counts up to `to` whenever it changes — used for metrics and the ROI calculator. */
export default function Counter({ to, format, duration = 1.1, className = "" }: CounterProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (reduced) {
      setDisplay(to);
      return;
    }
    const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [to, duration, reduced, mv]);

  useMotionValueEvent(mv, "change", (v) => setDisplay(v));

  return (
    <span className={className}>
      {format ? format(display) : Math.round(display).toLocaleString()}
    </span>
  );
}
