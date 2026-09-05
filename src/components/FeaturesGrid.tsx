import { motion } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  Code2,
  Layers,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react";
import GlassCard from "./ui/GlassCard";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: Code2,
    title: "AI Code Review",
    description:
      "Real-time suggestions that understand your codebase, not just syntax. Fewer bugs, faster PRs.",
  },
  {
    icon: BrainCircuit,
    title: "Smart Standups",
    description:
      "Automated daily summaries pulled from your PRs, tickets, and commits. No more status theater.",
  },
  {
    icon: Users,
    title: "Live Collaboration",
    description:
      "Pair on code in real-time across time zones. Cursor-level presence. Zero latency.",
  },
  {
    icon: Layers,
    title: "Unified Context",
    description:
      "Every PR, issue, doc, and Slack thread — linked and searchable in one place.",
  },
  {
    icon: Rocket,
    title: "Deploy Intelligence",
    description:
      "Predict deployment risk before you push. Ship with confidence, not anxiety.",
  },
  {
    icon: BarChart3,
    title: "Team Analytics",
    description:
      "See where your team moves fast and where it gets stuck. No surveillance. Just signal.",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="relative scroll-mt-20 px-5 py-24 md:py-[100px]">
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <span className="eyebrow">What we do</span>
          <h2 className="mx-auto mt-4 max-w-[680px] font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Everything your team needs. Nothing it doesn&rsquo;t.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const accent = i % 2 === 0 ? "text-accent" : "text-highlight";
            const iconBg = i % 2 === 0 ? "bg-accent/10" : "bg-highlight/10";
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              >
                <GlassCard className="group relative h-full p-7">
                  <span
                    aria-hidden="true"
                    className="absolute right-6 top-6 font-mono text-xs text-faint/80 transition-colors duration-300 group-hover:text-muted"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={22} className={accent} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
