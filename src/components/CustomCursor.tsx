import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "link" | "label";

/**
 * Custom cursor: a violet dot glued to the pointer + a spring-lagged ring.
 * Expands over links/buttons; shows a word label over elements with [data-cursor="..."].
 * Only activates on fine pointers, and never under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.55 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );
      if (t) {
        const cursor = t.getAttribute("data-cursor");
        setLabel(cursor ?? "");
        setVariant(cursor ? "label" : "link");
      } else {
        setVariant("default");
      }
    };
    const onLeave = () => setVariant("default");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* dot — glued to the pointer */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-violet shadow-[0_0_12px_rgba(139,92,246,0.9)]" />
      </motion.div>

      {/* ring — spring-lagged, morphs by context */}
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: variant === "label" ? 2.7 : variant === "link" ? 1.7 : 1,
          opacity: variant === "default" ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <div
          className={`flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-colors duration-300 ${
            variant === "label"
              ? "border-violet bg-violet/15"
              : variant === "link"
                ? "border-violet/70 bg-transparent"
                : "border-paper/30 bg-transparent"
          }`}
        >
          {variant === "label" && (
            <span className="font-mono text-[9px] font-medium tracking-[0.22em] text-paper">
              {label.toUpperCase()}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
