import Lenis from "lenis";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  window.__lenis?.scrollTo(0, { immediate: true, force: true });
}

/**
 * Wraps the app in Lenis for buttery inertial scrolling.
 * Skipped entirely for prefers-reduced-motion users, and jumps to top on route change.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const { pathname, search, hash, key } = useLocation();

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    const resetSameRouteLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank") return;

      const linkUrl = new URL(link.href, window.location.href);
      if (linkUrl.origin !== window.location.origin || linkUrl.hash.startsWith("#http")) return;

      const linkPath = linkUrl.hash.startsWith("#/")
        ? linkUrl.hash.slice(1).split(/[?#]/)[0] || "/"
        : linkUrl.pathname;

      if (linkPath === pathname) scrollToTop();
    };

    document.addEventListener("click", resetSameRouteLink, true);
    return () => document.removeEventListener("click", resetSameRouteLink, true);
  }, [pathname]);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, smoothWheel: true });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reduced]);

  useLayoutEffect(() => {
    scrollToTop();
  }, [pathname, search, hash, key]);

  return <>{children}</>;
}

/** Programmatic smooth scroll that cooperates with Lenis. */
export function smoothScrollTo(target: string | number) {
  if (window.__lenis) window.__lenis.scrollTo(target as never, { offset: -70, duration: 1.4 });
  else if (typeof target === "string")
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: target, behavior: "smooth" });
}
