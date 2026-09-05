import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Wraps the app in Lenis for buttery inertial scrolling.
 * Skipped entirely for prefers-reduced-motion users, and jumps to top on route change.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, smoothWheel: true });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reduced]);

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}

/** Programmatic smooth scroll that cooperates with Lenis. */
export function smoothScrollTo(target: string | number) {
  if (window.__lenis) window.__lenis.scrollTo(target as never, { offset: -70, duration: 1.4 });
  else if (typeof target === "string")
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: target, behavior: "smooth" });
}
