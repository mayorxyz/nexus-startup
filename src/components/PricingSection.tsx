import { motion } from "framer-motion";
import { Check } from "lucide-react";
import GradientBadge from "./ui/GradientBadge";
import GradientButton from "./ui/GradientButton";

type Tier = {
  name: string;
  price: string;
  suffix: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "Free",
    suffix: "forever",
    features: ["Up to 3 users", "5 projects", "AI review 100/month", "Community support"],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$29",
    suffix: "/user/month",
    features: [
      "Unlimited projects",
      "Unlimited AI",
      "Smart Standups",
      "Deploy Intelligence",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    suffix: "pricing",
    features: ["SSO", "SLA", "Audit logs", "On-premise option", "Dedicated CSM"],
    cta: "Talk to Sales",
  },
];

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const card = (
    <div
      className={`glass flex h-full flex-col rounded-2xl p-8 ${
        tier.popular ? "border-transparent bg-[rgba(13,17,23,0.55)]" : ""
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{tier.name}</p>
      <p className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-5xl font-extrabold tracking-tight text-ink">
          {tier.price}
        </span>
        <span className="text-sm text-muted">{tier.suffix}</span>
      </p>

      <div className="my-6 h-px w-full bg-white/10" />

      <ul className="flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
            <Check size={16} className="mt-0.5 shrink-0 text-highlight" strokeWidth={2.4} />
            {f}
          </li>
        ))}
      </ul>

      <GradientButton
        href="#get-access"
        variant={tier.popular ? "primary" : "outline"}
        className="mt-8 w-full"
      >
        {tier.cta}
      </GradientButton>
    </div>
  );

  // mobile order: Pro first
  const orderClass =
    index === 1 ? "order-1 lg:order-2" : index === 0 ? "order-2 lg:order-1" : "order-3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className={orderClass}
    >
      {tier.popular ? (
        <div className="relative h-full lg:scale-[1.04]">
          <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
            <GradientBadge pulse={false} className="whitespace-nowrap">
              <span className="gradient-text font-semibold">Most Popular</span>
            </GradientBadge>
          </div>
          {/* gradient ring wrapper: gradient bg + 2px padding, dark card inside */}
          <div className="h-full rounded-2xl bg-gradient-to-br from-accent to-highlight p-[2px] shadow-[0_20px_60px_rgba(99,102,241,0.22)]">
            {card}
          </div>
        </div>
      ) : (
        <div className="h-full">{card}</div>
      )}
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 border-y border-white/5 bg-navy px-5 py-24 md:py-[100px]"
    >
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <span className="eyebrow">Pricing</span>
          <h2 className="mx-auto mt-4 max-w-[620px] font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Simple pricing. No surprises.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-5">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
