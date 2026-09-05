import { useRef, type CSSProperties } from "react";
import { useMotionValueEvent, useScroll, useTransform, useVelocity } from "framer-motion";

type MarqueeProps = {
  items: string[];
  duration?: number;
  className?: string;
};

/**
 * Infinite horizontal marquee. Scroll velocity feeds a CSS variable
 * that divides the animation duration — the strip speeds up as you scroll.
 */
export default function Marquee({ items, duration = 30, className = "" }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const speed = useTransform(velocity, [0, 900], [1, 2.6], { clamp: true });

  useMotionValueEvent(speed, "change", (v) => {
    trackRef.current?.style.setProperty("--speed", String(Math.max(1, Math.abs(v))));
  });

  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-display text-2xl font-semibold tracking-tight text-muted transition-colors duration-300 hover:text-paper md:text-4xl">
            {item}
          </span>
          <span className="text-violet">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="marquee-track"
        style={{ "--marquee-dur": `${duration}s` } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
