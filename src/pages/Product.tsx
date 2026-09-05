import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import TextReveal from "../components/ui/TextReveal";
import { MagneticLink } from "../components/ui/Magnetic";

/* ================= MOCKUP CHROME ================= */

function MockupFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-paper/10 bg-[#0b0b0c] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-1.5 border-b border-paper/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
        <span className="ml-3 font-mono text-[11px] text-faint">{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ================= MOCKUP 01 — UNIFIED CONTEXT ================= */

const NODES = [
  { label: "SLACK", x: 52, y: 40 },
  { label: "JIRA", x: 268, y: 40 },
  { label: "GITHUB", x: 52, y: 160 },
  { label: "FIGMA", x: 268, y: 160 },
];

function ContextMockup() {
  return (
    <MockupFrame title="context.graph — live">
      <div className="p-5 md:p-6">
        <svg viewBox="0 0 320 200" className="w-full">
          {NODES.map((n) => (
            <line
              key={n.label}
              x1={160}
              y1={100}
              x2={n.x}
              y2={n.y}
              stroke="rgba(139,92,246,0.45)"
              strokeWidth="1"
              className="dash-line"
            />
          ))}
          {NODES.map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r="17" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.5)" />
              <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="7" fill="#A1A1AA" fontFamily="JetBrains Mono, monospace">
                {n.label}
              </text>
            </g>
          ))}
          <circle cx="160" cy="100" r="26" fill="rgba(6,182,212,0.08)" stroke="#06B6D4" strokeWidth="1.2" />
          <text x="160" y="97" textAnchor="middle" fontSize="8" fill="#06B6D4" fontFamily="JetBrains Mono, monospace">
            NEXUS
          </text>
          <text x="160" y="108" textAnchor="middle" fontSize="7" fill="#52525B" fontFamily="JetBrains Mono, monospace">
            CORE
          </text>
        </svg>

        <div className="mt-4 border-t border-paper/10 pt-4">
          {[
            "PR #4821 → INC-114 → #pay-team → checkout.flow v2",
            "RFC-092 → JIRA-3310 → figma/checkout-redesign",
            "deploy 2026-02-11 → grafana/p99 → #incidents",
          ].map((row) => (
            <p key={row} className="truncate py-1 font-mono text-[11px] text-muted">
              <span className="mr-2 text-cyan">⛓</span>
              {row}
            </p>
          ))}
        </div>

        <p className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-faint">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan" />
          GRAPH SYNCED · 214 SERVICES · 1.2M EDGES
        </p>
      </div>
    </MockupFrame>
  );
}

/* ================= MOCKUP 02 — PREDICTIVE AI ================= */

function AIMockup() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setShow((s) => !s), 3800);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <MockupFrame title="nexus-2 — review agent">
      <div className="p-5 font-mono text-[12px] leading-relaxed md:p-6">
        <p className="text-faint">
          <span className="mr-3 select-none text-faint/60">118</span>pool := NewPool(cfg.MaxConn)
        </p>
        <p className="bg-cyan/10 text-cyan">
          <span className="mr-3 select-none">+</span>pool.SetIdleTimeout(30 * time.Second)
        </p>
        <p className="text-muted line-through">
          <span className="mr-3 select-none text-faint/60">−</span>pool.SetIdleTimeout(5 * time.Minute)
        </p>
        <p className="text-faint">
          <span className="mr-3 select-none text-faint/60">121</span>return pool
        </p>

        <div className="relative mt-5 min-h-[120px]">
          <AnimatePresence>
            {show && (
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-help rounded-lg border border-violet/40 bg-violet/10 p-4"
                data-cursor="why?"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[11px] tracking-[0.18em] text-violet">
                    NEXUS-2 · RISK: <span className="text-paper">HIGH</span>
                  </p>
                  <span className="text-[10px] text-faint">hover for reasoning</span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-paper">
                  pay-svc will exhaust its connection pool under Black-Friday-scale load.
                  This change fixes 1 of 3 causes.
                </p>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="mt-3 border-t border-violet/25 pt-3 text-[11px] leading-relaxed text-muted">
                      <p className="text-cyan">├─ incident INC-114 had identical signature (2025-11-28)</p>
                      <p className="text-cyan">├─ load test: 4.8k rps saturates pool at t+6m</p>
                      <p className="text-cyan">└─ owner @mara approved similar fix in pay-svc#4102</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ================= MOCKUP 03 — ZERO-LATENCY SYNC ================= */

const CURSORS = [
  { cls: "cursor-a", name: "mara", color: "#8B5CF6", left: "12%", top: "18%" },
  { cls: "cursor-b", name: "aiko", color: "#06B6D4", left: "74%", top: "62%" },
  { cls: "cursor-c", name: "you", color: "#F4F4F5", left: "44%", top: "78%" },
];

function SyncMockup() {
  const reduced = useReducedMotion();
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setLatency(Math.floor(Math.random() * 3)), 900);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <MockupFrame title="pair-session — 3 online">
      <div className="flex items-center justify-between border-b border-paper/10 px-5 py-2.5">
        <div className="flex -space-x-2">
          {["MV", "AT", "YOU"].map((init, i) => (
            <span
              key={init}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-obsidian font-mono text-[8px]"
              style={{
                background:
                  i === 0
                    ? "linear-gradient(135deg,#8B5CF6,#6d28d9)"
                    : i === 1
                      ? "linear-gradient(135deg,#06B6D4,#0e7490)"
                      : "#3f3f46",
              }}
            >
              {init}
            </span>
          ))}
        </div>
        <span className="font-mono text-[11px] text-cyan">~{latency}MS</span>
      </div>

      <div
        className="relative h-72 overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,244,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,245,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        {/* shared artifact */}
        <div className="absolute left-1/2 top-1/2 w-44 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-paper/15 bg-obsidian/80 p-3 font-mono text-[10px] text-muted backdrop-blur">
          <p className="mb-2 text-paper">checkout.flow</p>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-paper/10" />
            <div className="h-1.5 w-3/4 bg-paper/10" />
            <div className="h-1.5 w-5/6 bg-cyan/30" />
          </div>
        </div>

        {CURSORS.map((c) => (
          <div key={c.name} className={`absolute ${c.cls}`} style={{ left: c.left, top: c.top }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={c.color}>
              <path d="M4 2l16 8-7 2-3 7z" />
            </svg>
            <span
              className="ml-3 block w-max px-1.5 py-0.5 font-mono text-[9px] text-obsidian"
              style={{ background: c.color }}
            >
              {c.name}
            </span>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

/* ================= CHAPTERS ================= */

const CHAPTERS = [
  {
    num: "01",
    title: "UNIFIED CONTEXT",
    body: "Slack threads, Jira tickets, pull requests, Figma frames and Notion docs usually live in five parallel universes. NEXUS indexes them into a single context graph — every entity linked to the code, people and decisions it touches. Ask “what broke after the payments refactor?” and get an answer with receipts, not archaeology.",
    mockup: <ContextMockup />,
  },
  {
    num: "02",
    title: "PREDICTIVE AI",
    body: "NEXUS-2 is fine-tuned on your graph, not the public internet. It reads each diff against 90 days of incident history, ownership patterns and test coverage — then tells you what will break, who should review it, and why. Hover the suggestion to inspect its reasoning.",
    mockup: <AIMockup />,
  },
  {
    num: "03",
    title: "ZERO-LATENCY SYNC",
    body: "Presence, cursors and edits propagate in under 40 milliseconds — faster than your monitor refreshes. Pair across Tokyo and Berlin like you're sharing one keyboard. No merge theatre, no “pull before you push”.",
    mockup: <SyncMockup />,
  },
];

function MockupBlock({ children, index }: { children: ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <div
      ref={ref}
      className="border-t border-paper/10 px-5 py-16 md:px-8 lg:flex lg:h-[115vh] lg:items-center lg:border-t-0 lg:px-0 lg:py-0"
    >
      <div className="mb-8 lg:hidden">
        <p className="font-mono text-xs text-violet">{CHAPTERS[index].num}</p>
        <h3 className="mt-2 font-display text-3xl font-bold tracking-tight">
          {CHAPTERS[index].title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{CHAPTERS[index].body}</p>
      </div>
      <motion.div style={reduced ? undefined : { y }} className="w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* ================= PAGE ================= */

const SPECS = [
  { k: "MODEL", v: "NEXUS-2 · 70B, fine-tuned per org" },
  { k: "P99 LATENCY", v: "< 40 ms, globally" },
  { k: "SECURITY", v: "SOC 2 Type II · SSO/SAML · BYO-VPC" },
  { k: "INTEGRATIONS", v: "40+ native, open graph API" },
  { k: "CONTEXT WINDOW", v: "Your entire repository" },
  { k: "DEPLOYMENT", v: "Cloud, hybrid or fully on-prem" },
];

export default function Product() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(2, Math.floor(v * 3)));
  });

  const chapter = CHAPTERS[active];

  return (
    <div className="overflow-x-clip">
      {/* header */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 pt-32 md:px-8 md:pt-40">
        <p className="font-mono text-[11px] tracking-[0.25em] text-violet">01 — THE PRODUCT</p>
        <h1 className="mt-6 max-w-4xl font-display font-bold leading-[0.95] tracking-tight text-[clamp(2.6rem,7.5vw,6rem)]">
          <TextReveal text="SOFTWARE THAT" className="block" />
          <TextReveal text="UNDERSTANDS WORK." delay={0.12} className="block text-outline" />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg"
        >
          Most tools record what happened. NEXUS understands why it happened — and what
          happens next. Scroll through the three systems underneath.
        </motion.p>
      </section>

      {/* scrollytelling */}
      <section ref={trackRef} className="relative lg:grid lg:grid-cols-2">
        {/* sticky left — desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-screen flex-col justify-center border-r border-paper/10 pr-16 pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.num}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-[7rem] font-bold leading-none text-outline-violet">
                  {chapter.num}
                </p>
                <h2 className="mt-4 font-display text-4xl font-bold tracking-tight xl:text-5xl">
                  {chapter.title}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                  {chapter.body}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex gap-2">
              {CHAPTERS.map((c, i) => (
                <span
                  key={c.num}
                  className={`h-1 w-10 transition-colors duration-500 ${
                    i === active ? "bg-violet" : "bg-paper/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* scrolling right */}
        <div className="lg:py-[6vh] lg:pr-8">
          {CHAPTERS.map((c, i) => (
            <MockupBlock key={c.num} index={i}>
              {c.mockup}
            </MockupBlock>
          ))}
        </div>
      </section>

      {/* specs */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8">
        <p className="mb-8 font-mono text-[11px] tracking-[0.25em] text-faint">
          TECHNICAL SPECIFICATION
        </p>
        <div className="grid grid-cols-1 gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {SPECS.map((s) => (
            <div key={s.k} className="group bg-obsidian p-7 transition-colors duration-300 hover:bg-[#0b0b0c]">
              <p className="font-mono text-[10px] tracking-[0.22em] text-faint">{s.k}</p>
              <p className="mt-3 font-display text-lg font-semibold text-paper transition-colors duration-300 group-hover:text-cyan">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="border-t border-paper/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-8 md:py-20">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Convinced? The math is on the <span className="text-violet">pricing page.</span>
          </h2>
          <MagneticLink to="/pricing" cursor="math">
            See the math <span aria-hidden>→</span>
          </MagneticLink>
        </div>
      </section>
    </div>
  );
}
