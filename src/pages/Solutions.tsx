import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import TextReveal from "../components/ui/TextReveal";
import { MagneticLink } from "../components/ui/Magnetic";

type Category = "all" | "engineering" | "design" | "operations";

const FILTERS: { id: Category; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "engineering", label: "ENGINEERING" },
  { id: "design", label: "DESIGN" },
  { id: "operations", label: "OPERATIONS" },
];

type Case = {
  title: string;
  cat: Exclude<Category, "all">;
  span: string;
  metric: string;
  detail: string;
  shape: number;
};

const CASES: Case[] = [
  {
    title: "PLATFORM TEAMS",
    cat: "engineering",
    span: "md:col-span-4",
    metric: "−40% PR REVIEW TIME",
    detail: "NEXUS routes every diff to the reviewer whose context graph overlaps it most. At Ramp, review cycles fell from 3 days to 4 hours.",
    shape: 0,
  },
  {
    title: "FRONTEND CREWS",
    cat: "engineering",
    span: "md:col-span-2",
    metric: "3.1× DEPLOY FREQUENCY",
    detail: "Predictive risk scoring turns deploy approval from a meeting into a green check.",
    shape: 1,
  },
  {
    title: "SECURITY & COMPLIANCE",
    cat: "engineering",
    span: "md:col-span-2",
    metric: "92% FEWER ESCALATIONS",
    detail: "Every change is pre-screened against your threat model before a human ever sees it.",
    shape: 2,
  },
  {
    title: "PRODUCT DESIGN",
    cat: "design",
    span: "md:col-span-2",
    metric: "−57% HANDOFF TIME",
    detail: "Figma frames stay linked to the tickets and code they spawn — specs never go stale.",
    shape: 3,
  },
  {
    title: "DESIGN SYSTEMS",
    cat: "design",
    span: "md:col-span-2",
    metric: "2× TOKEN ADOPTION",
    detail: "NEXUS flags off-token components in review, with the correct token one click away.",
    shape: 4,
  },
  {
    title: "DATA & ANALYTICS",
    cat: "operations",
    span: "md:col-span-2",
    metric: "6H SAVED / ANALYST / WK",
    detail: "Definitions, dashboards and the Slack debates around them — one searchable surface.",
    shape: 5,
  },
  {
    title: "IT & INFRASTRUCTURE",
    cat: "operations",
    span: "md:col-span-2",
    metric: "99.99% CHANGE SUCCESS",
    detail: "Change requests carry their full blast radius automatically. Auditors love it.",
    shape: 0,
  },
  {
    title: "CUSTOMER OPERATIONS",
    cat: "operations",
    span: "md:col-span-2",
    metric: "−38% TICKET BACKLOG",
    detail: "Support asks; the context graph answers with the exact PR, config and owner.",
    shape: 1,
  },
];

function Shape({ variant }: { variant: number }) {
  const common = "h-24 w-24 text-violet/50 transition-all duration-700 group-hover:rotate-45 group-hover:text-cyan/70";
  switch (variant % 6) {
    case 0:
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="34" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="16" strokeWidth="1" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none" stroke="currentColor">
          <rect x="22" y="22" width="56" height="56" strokeWidth="1.5" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none" stroke="currentColor">
          <path d="M50 18 L84 78 L16 78 Z" strokeWidth="1.5" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none" stroke="currentColor">
          <path d="M14 72 Q35 20 50 50 T86 30" strokeWidth="1.5" />
          <path d="M14 84 Q35 32 50 62 T86 42" strokeWidth="1" />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none" stroke="currentColor">
          <path d="M20 20h60M20 50h60M20 80h60M20 20v60M50 20v60M80 20v60" strokeWidth="1" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none" stroke="currentColor">
          <circle cx="32" cy="50" r="18" strokeWidth="1.5" />
          <circle cx="68" cy="50" r="18" strokeWidth="1.5" />
        </svg>
      );
  }
}

export default function Solutions() {
  const [filter, setFilter] = useState<Category>("all");
  const visible = CASES.filter((c) => filter === "all" || c.cat === filter);

  return (
    <div className="overflow-x-clip">
      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-32 md:px-8 md:pt-40">
        <p className="font-mono text-[11px] tracking-[0.25em] text-violet">02 — SOLUTIONS</p>
        <h1 className="mt-6 max-w-4xl font-display font-bold leading-[0.95] tracking-tight text-[clamp(2.6rem,7.5vw,6rem)]">
          <TextReveal text="BUILT FOR THE WAY" className="block" />
          <TextReveal text="YOU ACTUALLY WORK." delay={0.12} className="block text-outline" />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg"
        >
          Pick a discipline. The grid reshapes itself around teams like yours —
          hover any card for the number that matters.
        </motion.p>
      </section>

      {/* filter pills */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-8">
        <LayoutGroup>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  aria-pressed={isActive}
                  className={`relative rounded-full border px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] transition-colors duration-300 ${
                    isActive
                      ? "border-transparent text-obsidian"
                      : "border-paper/15 text-muted hover:border-paper/40 hover:text-paper"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-violet shadow-[0_0_24px_rgba(139,92,246,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              );
            })}
          </div>

          {/* morphing grid */}
          <div className="mt-10 grid grid-cols-1 gap-4 pb-28 md:grid-cols-6">
            <AnimatePresence mode="popLayout">
              {visible.map((c) => (
                <motion.article
                  layout
                  key={c.title}
                  initial={{ opacity: 0, scale: 0.9, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -16 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  data-cursor="hover"
                  className={`group relative h-[300px] overflow-hidden rounded-xl border border-paper/10 bg-[#0b0b0c] p-7 transition-colors duration-400 hover:border-violet/50 md:h-[340px] ${c.span}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-faint">
                      {c.cat.toUpperCase()}
                    </span>
                    <Shape variant={c.shape} />
                  </div>
                  <h3 className="mt-6 max-w-[12ch] font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                    {c.title}
                  </h3>

                  {/* hidden metric — slides up on hover */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-obsidian via-obsidian/98 to-transparent p-7 pt-14 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
                    <p className="font-display text-xl font-bold text-cyan">{c.metric}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </section>

      {/* case study band */}
      <section className="border-t border-paper/10">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:px-8 md:py-28">
          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] text-faint">CASE STUDY — RAMP</p>
            <p className="mt-6 font-display font-bold leading-none tracking-tight text-[clamp(3rem,9vw,7rem)]">
              <TextReveal text="3 DAYS" className="block" />
              <span className="block">
                <TextReveal text="→ 4 HOURS" delay={0.12} className="gradient-text" />
              </span>
            </p>
          </div>
          <div className="max-w-md">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              “We pointed NEXUS at 40 repos on a Tuesday. By Friday, code review was no
              longer a bottleneck — it was a formality. The context graph does the
              detective work that used to eat our senior engineers alive.”
            </p>
            <p className="mt-6 font-mono text-xs tracking-[0.18em] text-faint">
              — VP ENGINEERING, RAMP
            </p>
            <div className="mt-10">
              <MagneticLink to="/contact" variant="ghost" cursor="yours?">
                Make yours next <span aria-hidden>→</span>
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
