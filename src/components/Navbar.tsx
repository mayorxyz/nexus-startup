import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import GradientButton from "./ui/GradientButton";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#demo" },
  { label: "Blog", href: "#get-access" },
];

function LogoMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-accent to-highlight shadow-[0_0_14px_rgba(99,102,241,0.55)]"
    />
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open ? "nav-glass" : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display text-xl font-bold tracking-wide text-ink"
            onClick={() => setOpen(false)}
          >
            <LogoMark />
            NEXUS
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <GradientButton size="sm" href="#get-access">
              Get Early Access
            </GradientButton>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-muted transition-colors hover:text-ink md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[rgba(8,11,20,0.94)] backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                className="font-display text-3xl font-bold text-ink transition-colors hover:text-highlight"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.35 }}
            >
              <GradientButton size="lg" href="#get-access" onClick={() => setOpen(false)}>
                Get Early Access
              </GradientButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
