import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Magnetic, MagneticLink } from "./ui/Magnetic";

const LINKS = [
  { to: "/", label: "HOME" },
  { to: "/product", label: "PRODUCT" },
  { to: "/solutions", label: "SOLUTIONS" },
  { to: "/company", label: "COMPANY" },
  { to: "/pricing", label: "PRICING" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock smooth scroll + body scroll while the overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (window.__lenis) {
      if (open) window.__lenis.stop();
      else window.__lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled ? "border-b border-paper/10 bg-obsidian/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-8">
          <Link
            to="/"
            className="font-display text-xl font-bold tracking-tight text-paper"
            data-cursor="home"
          >
            NEXUS<span className="text-violet">®</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative font-mono text-[11px] tracking-[0.22em] transition-colors duration-300 ${
                    isActive ? "text-paper" : "text-muted hover:text-paper"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-2 left-0 h-px w-full bg-violet shadow-[0_0_8px_rgba(139,92,246,0.9)]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:block">
            <MagneticLink to="/contact" variant="ghost" className="!px-5 !py-2.5">
              Start a project
            </MagneticLink>
          </div>

          {/* burger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[75] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-[2px] w-6 bg-paper transition-transform duration-300 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-paper transition-transform duration-300 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[72] flex flex-col justify-between bg-obsidian/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
              className="flex flex-col gap-2"
            >
              {[...LINKS, { to: "/contact", label: "CONTACT" }].map((l, i) => (
                <motion.div
                  key={l.to}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <Link
                    to={l.to}
                    className="flex items-baseline gap-4 font-display text-4xl font-bold tracking-tight text-paper transition-colors hover:text-violet sm:text-5xl"
                  >
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className="font-mono text-xs tracking-[0.2em] text-faint">
              HELLO@NEXUS.DEV — SF · TYO · BER
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-paper/10 px-5 pb-8 pt-16 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <Link
          to="/"
          data-cursor="top"
          className="block overflow-hidden font-display text-[clamp(4rem,15vw,13rem)] font-bold leading-[0.85] tracking-tight"
        >
          <span className="text-outline transition-colors duration-500 hover:text-paper">
            NEXUS®
          </span>
        </Link>

        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.25em] text-faint">MENU</h3>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted transition-colors hover:text-violet">
                    {l.label.charAt(0) + l.label.slice(1).toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.25em] text-faint">CONNECT</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {["X / TWITTER", "GITHUB", "LINKEDIN"].map((s) => (
                <li key={s}>
                  <a
                    href={`https://${s.split(" ")[0].toLowerCase()}.com/nexus`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted transition-colors hover:text-cyan"
                  >
                    {s} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.25em] text-faint">OFFICES</h3>
            <ul className="mt-4 space-y-2.5 font-mono text-xs text-muted">
              <li>SAN FRANCISCO — HQ</li>
              <li>TOKYO — APAC</li>
              <li>BERLIN — EMEA</li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.25em] text-faint">CONTACT</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="mailto:hello@nexus.dev" className="text-muted transition-colors hover:text-violet">
                  hello@nexus.dev
                </a>
              </li>
              <li className="font-mono text-xs text-faint">+1 (415) 555-0134</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-6 font-mono text-[11px] tracking-[0.18em] text-faint md:flex-row md:items-center md:justify-between">
          <span>© 2026 NEXUS SYSTEMS, INC.</span>
          <span className="flex items-center gap-2">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
            ALL SYSTEMS OPERATIONAL
          </span>
          <span>BUILT ON NEXUS, OBVIOUSLY</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* scroll progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-violet to-cyan"
      />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
