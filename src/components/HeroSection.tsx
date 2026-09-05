import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, GitMerge } from "lucide-react";
import GradientBadge from "./ui/GradientBadge";
import GradientButton from "./ui/GradientButton";

const words = ["faster", "smarter", "cleaner", "together", "better"];

const wordVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const avatars = [
  { initials: "S", bg: "linear-gradient(135deg, #6366F1, #22D3EE)" },
  { initials: "V", bg: "linear-gradient(135deg, #22D3EE, #6366F1)" },
  { initials: "N", bg: "linear-gradient(135deg, #475569, #6366F1)" },
  { initials: "L", bg: "linear-gradient(135deg, #0D1117, #22D3EE)" },
  { initials: "A", bg: "linear-gradient(135deg, #6366F1, #0D1117)" },
];

/* tiny syntax-highlight helpers for the code mockup (palette colors only) */
const Kw = ({ children }: { children: ReactNode }) => (
  <span className="text-accent">{children}</span>
);
const Str = ({ children }: { children: ReactNode }) => (
  <span className="text-highlight">{children}</span>
);
const Cm = ({ children }: { children: ReactNode }) => (
  <span className="text-faint">{children}</span>
);
const Prop = ({ children }: { children: ReactNode }) => (
  <span className="text-ink">{children}</span>
);

function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      setIndex((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="word-swap">
      {/* invisible sizers reserve the width of the longest word — zero layout shift */}
      {words.map((w) => (
        <span key={w} aria-hidden="true" className="invisible gradient-text whitespace-nowrap">
          {w}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          variants={wordVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="gradient-text whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CodeWindow() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="relative"
    >
      <div className="glass overflow-hidden rounded-2xl text-left shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-xs text-faint">nexus.config.ts</span>
        </div>

        {/* code */}
        <div className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-7 text-muted">
          <div>
            <Cm>{"// nexus.config.ts"}</Cm>
          </div>
          <div>
            <Kw>import</Kw> {"{ defineWorkspace }"} <Kw>from</Kw> <Str>"@nexus/core"</Str>;
          </div>
          <div>&nbsp;</div>
          <div>
            <Kw>export default</Kw> defineWorkspace({"{"}
          </div>
          <div className="pl-5">
            <Prop>ai</Prop>: {"{"} <Prop>review</Prop>: <Str>"on-pull-request"</Str>,{" "}
            <Prop>model</Prop>: <Str>"nexus-1-turbo"</Str> {"}"},
          </div>
          <div className="pl-5">
            <Prop>standups</Prop>: {"{"} <Prop>sources</Prop>: [<Str>"prs"</Str>,{" "}
            <Str>"tickets"</Str>, <Str>"commits"</Str>] {"}"},
          </div>
          <div className="pl-5">
            <Prop>deploy</Prop>: {"{"} <Prop>riskThreshold</Prop>: <Str>0.05</Str>,{" "}
            <Prop>notify</Prop>: <Str>"#ships"</Str> {"}"},
          </div>
          <div>{"});"}</div>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between border-t border-white/5 px-5 py-3 font-mono text-xs">
          <span className="flex items-center gap-2 text-faint">
            <span className="text-highlight">●</span> deploy #4213 cleared · risk 0.02
          </span>
          <span className="flex items-center gap-1 text-faint">
            nexus-1-turbo <span className="cursor-blink text-accent">▍</span>
          </span>
        </div>
      </div>

      {/* floating proof chips */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.6 }}
        className="glass absolute -right-12 top-14 hidden items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs text-muted lg:flex"
      >
        <Check size={14} className="text-highlight" /> CI passed · 42s
      </motion.div>
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.2 }}
        className="glass absolute -left-14 bottom-16 hidden items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs text-muted lg:flex"
      >
        <GitMerge size={14} className="text-accent" /> 3 PRs merged
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-28 text-center"
    >
      {/* ambient layers */}
      <div aria-hidden="true" className="hero-glow absolute inset-0" />
      <div aria-hidden="true" className="dot-grid absolute inset-0" />

      <motion.div {...fadeUp} transition={{ delay: 0, duration: 0.7, ease: "easeOut" }}>
        <GradientBadge>🚀 Now in public beta — join 12,000+ teams</GradientBadge>
      </motion.div>

      <motion.h1
        {...fadeUp}
        transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
        className="mt-8 font-display text-[44px] font-extrabold leading-[1.05] tracking-tight text-ink md:text-[72px] lg:text-[84px]"
      >
        <span className="block">Build the future</span>
        <span className="block">
          10× <CyclingWord />
        </span>
      </motion.h1>

      <motion.p
        {...fadeUp}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        className="mx-auto mt-6 max-w-[560px] text-lg leading-relaxed text-muted"
      >
        NEXUS connects your codebase, team, and AI in one intelligent workspace. Stop
        context-switching. Start shipping.
      </motion.p>

      <motion.div
        {...fadeUp}
        transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <GradientButton size="lg" href="#get-access">
          Get Early Access — It&rsquo;s Free
        </GradientButton>
        <GradientButton size="lg" variant="outline" href="#demo">
          Watch Demo <span aria-hidden="true">▶</span>
        </GradientButton>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <div className="flex">
          {avatars.map((a, i) => (
            <span
              key={a.initials}
              style={{ background: a.bg, marginLeft: i === 0 ? 0 : -8 }}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-void font-mono text-[10px] font-medium text-ink/90"
            >
              {a.initials}
            </span>
          ))}
        </div>
        <p className="text-[13px] text-muted">
          Trusted by teams at <span className="text-ink/80">Stripe</span>,{" "}
          <span className="text-ink/80">Vercel</span>, <span className="text-ink/80">Notion</span>,
          and 500+ startups.
        </p>
      </motion.div>

      <motion.div
        id="demo"
        {...fadeUp}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mt-16 hidden w-full max-w-[600px] scroll-mt-28 md:block"
      >
        <CodeWindow />
      </motion.div>

      <motion.a
        href="#features"
        aria-label="Scroll to features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-faint transition-colors hover:text-muted md:block"
      >
        <ChevronDown size={20} className="animate-bounce motion-reduce:animate-none" />
      </motion.a>
    </section>
  );
}
