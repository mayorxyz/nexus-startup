import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import TextReveal from "../components/ui/TextReveal";
import Marquee from "../components/ui/Marquee";
import Counter from "../components/ui/Counter";
import { MagneticLink } from "../components/ui/Magnetic";

/* ---------- live terminal ---------- */

const TERMINAL_LINES = [
  { p: "$", t: "nexus link --repo acme/platform", c: "text-paper" },
  { p: "✓", t: "3 repos · 214 services indexed in 4.1s", c: "text-cyan" },
  { p: "$", t: "nexus ask “why did checkout latency spike?”", c: "text-paper" },
  { p: "▸", t: "correlating: grafana · datadog · #inc-482", c: "text-violet" },
  { p: "▸", t: "root cause: connection pool in pay-svc (PR #4821)", c: "text-muted" },
];

function Terminal() {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? TERMINAL_LINES.length : 0);

  useEffect(() => {
    if (reduced) return;
    if (count >= TERMINAL_LINES.length) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), 700);
    return () => window.clearTimeout(id);
  }, [count, reduced]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-paper/10 bg-[#0b0b0c] shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-paper/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
        <span className="ml-3 font-mono text-[11px] text-faint">nexus — zsh</span>
      </div>
      <div className="min-h-[168px] p-4 font-mono text-[12px] leading-relaxed md:p-5 md:text-[13px]">
        {TERMINAL_LINES.slice(0, count).map((l, i) => (
          <p key={i} className={`${l.c} break-all sm:break-normal`}>
            <span className="mr-2 select-none text-faint">{l.p}</span>
            {l.t}
          </p>
        ))}
        <span className="blink inline-block h-4 w-2 translate-y-0.5 bg-violet" />
      </div>
    </div>
  );
}

/* ---------- scroll-highlighted statement ---------- */

function HighlightWords({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <p className="max-w-5xl font-display text-[clamp(1.8rem,5.4vw,4.3rem)] font-semibold leading-[1.08] tracking-tight">
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ color: reduced ? "#F4F4F5" : "#3f3f46" }}
          whileInView={{ color: "#F4F4F5" }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.045 }}
          className="mr-[0.25em] inline-block will-change-colors"
        >
          {w}
        </motion.span>
      ))}
    </p>
  );
}

/* ---------- data ---------- */

const LAWS = [
  {
    n: "01",
    title: "CONTEXT OVER CHAOS",
    desc: "Every signal from every tool, linked into one queryable graph.",
  },
  {
    n: "02",
    title: "PREDICTION OVER REACTION",
    desc: "Risk, blockers and burnout — surfaced before they ship.",
  },
  {
    n: "03",
    title: "FLOW OVER FRICTION",
    desc: "Zero-latency collaboration that feels like one brain, many hands.",
  },
];

const METRICS = [
  { value: 12400, suffix: "+", label: "TEAMS ON NEXUS", format: (n: number) => Math.round(n).toLocaleString() + "+" },
  { value: 38, suffix: "%", label: "FASTER RELEASE CYCLES", format: (n: number) => Math.round(n) + "%" },
  { value: 4.2, suffix: "M", label: "AI REVIEWS EVERY MONTH", format: (n: number) => n.toFixed(1) + "M" },
  { value: 99.95, suffix: "%", label: "UPTIME, LAST 12 MONTHS", format: (n: number) => n.toFixed(2) + "%" },
];

const PARTNERS = [
"STRIPE", "VERCEL", "NOTION", "LINEAR", "FIGMA",
"RAMP", "RETOOL", "SUPABASE", "RAYCAST", "ARC",
];

export default function Home() {
  return (
    <div className="w-full overflow-x-clip bg-obsidian text-paper">
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-svh flex-col overflow-hidden">
        {/* rotating mesh gradients */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[85vw] w-[85vw] max-h-[900px] max-w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-50">
          <div className="mesh-blob h-full w-full" />
        </div>
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] opacity-25">
          <div className="mesh-blob h-full w-full" style={{ animationDuration: "34s" }} />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-5 pb-10 pt-24 md:px-8 md:pb-14 md:pt-32">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] text-faint">
            <span>NEXUS — COGNITIVE OS</span>
            <span className="hidden sm:inline">V3.2.1 · PUBLIC BUILD</span>
          </div>

          <div className="py-12 md:py-16">
            <h1 className="font-display font-bold leading-[0.9] tracking-tight text-[clamp(2.75rem,10.5vw,8.75rem)]">
              <TextReveal text="THE" delay={0.1} className="block" />
              <span className="block">
                <TextReveal text="COGNITIVE" delay={0.22} className="gradient-text" />
              </span>
              <span className="block">
                <TextReveal text="OS FOR" delay={0.34} />
                <TextReveal text="MODERN TEAMS." delay={0.46} className="text-outline ml-2 sm:ml-4" />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
              className="mt-6 max-w-md text-base leading-relaxed text-muted md:mt-8 md:text-lg"
            >
              One context graph across your code, tickets, docs and conversations —
              with prediction running on top. Stop coordinating. Start thinking.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex w-full flex-wrap gap-4 sm:w-auto">
              <MagneticLink to="/product" cursor="explore">
                Explore the product <span aria-hidden>→</span>
              </MagneticLink>
              <MagneticLink to="/pricing" variant="ghost" cursor="see">
                See pricing
              </MagneticLink>
            </div>
            <div className="hidden items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-faint md:flex">
              <span className="relative h-10 w-px overflow-hidden bg-paper/15">
                <motion.span
                  className="absolute left-0 top-0 h-4 w-px bg-violet"
                  animate={{ y: [-16, 40] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                />
              </span>
              SCROLL
            </div>
          </motion.div>
        </div>
      </section>


      {/* ============ MARQUEE ============ */}
      <section className="border-y border-paper/10 py-6 md:py-8">
        <p className="mb-4 px-5 font-mono text-[11px] tracking-[0.25em] text-faint md:mb-6 md:px-8">
          TEAMS RUNNING ON NEXUS
        </p>
        <Marquee items={PARTNERS} />
      </section>

      {/* ============ STATEMENT ============ */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-40">
        <HighlightWords text="We don’t just connect your tools. We make them think." />
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-md self-start"
          >
            <p className="text-base leading-relaxed text-muted md:text-lg">
              NEXUS builds a live context graph across your repos, tickets, docs and
              conversations — then runs prediction on top of it. Your team asks a
              question; the answer arrives before the standup does.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5 font-mono text-[11px] tracking-[0.18em] sm:gap-3">
              {["SOC 2 TYPE II", "FULL-REPO CONTEXT", "<40MS P99"].map((chip) => (
                <span key={chip} className="border border-paper/15 px-3 py-1.5 text-muted">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            className="w-full"
          >
            <Terminal />
          </motion.div>
        </div>
      </section>

      {/* ============ THE THREE LAWS ============ */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-8 md:pb-28">
        <div className="mb-4 flex items-baseline justify-between">
          <p className="font-mono text-[11px] tracking-[0.25em] text-faint">THE THREE LAWS</p>
          <Link
            to="/product"
            className="font-mono text-[11px] tracking-[0.2em] text-muted transition-colors hover:text-violet"
          >
            HOW IT WORKS ↗
          </Link>
        </div>
        <div className="border-t border-paper/10">
          {LAWS.map((law, i) => (
            <motion.div
              key={law.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            >
              <Link
                to="/product"
                data-cursor="read"
                className="group flex flex-col gap-3 border-b border-paper/10 py-8 md:flex-row md:items-center md:gap-8 md:py-12"
              >
                <span className="font-mono text-xs text-faint">{law.n}</span>
                <h3 className="font-display text-2xl font-bold tracking-tight transition-all duration-300 group-hover:text-violet sm:text-3xl md:text-5xl md:group-hover:translate-x-3">
                  {law.title}
                </h3>
                <span className="text-sm leading-relaxed text-muted md:ml-auto md:max-w-xs md:text-right">
                  {law.desc}
                </span>
                <span
                  aria-hidden
                  className="hidden text-2xl text-violet opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:inline-block"
                >
                  ↗
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ METRICS ============ */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-8 md:pb-28">
        <div className="grid grid-cols-1 gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-obsidian p-6 sm:p-8 md:p-10">
              <Counter
                to={m.value}
                format={m.format}
                className="font-display text-4xl font-bold tracking-tight text-paper md:text-6xl"
              />
              <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-faint md:text-[11px]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden border-t border-paper/10">
        <div className="pointer-events-none absolute -right-32 top-1/2 h-[480px] w-[480px] -translate-y-1/2 opacity-25">
          <div className="mesh-blob h-full w-full" style={{ animationDuration: "30s" }} />
        </div>
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-36">
          <h2 className="font-display font-bold leading-[0.92] tracking-tight text-[clamp(2.4rem,8vw,6.5rem)]">
            <TextReveal text="STOP COORDINATING." className="block" />
            <TextReveal text="START THINKING." delay={0.15} className="block text-outline-violet" />
          </h2>
          <div className="mt-8 flex flex-wrap gap-4 md:mt-12">
            <MagneticLink to="/pricing" cursor="start">
              Start free <span aria-hidden>→</span>
            </MagneticLink>
            <MagneticLink to="/contact" variant="ghost" cursor="talk">
              Talk to us
            </MagneticLink>
          </div>
        </div>
      </section>
    </div>
  );
}