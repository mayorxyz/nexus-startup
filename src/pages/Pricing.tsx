import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import TextReveal from "../components/ui/TextReveal";
import Counter from "../components/ui/Counter";
import { MagneticLink } from "../components/ui/Magnetic";

/* ---------- ROI calculator ---------- */

function RoiCalculator() {
  const [team, setTeam] = useState(12);
  const hours = team * (14 + 0.2 * team);
  const value = hours * 75;
  const returnX = value / (team * 29);

  return (
    <div className="rounded-xl border border-paper/10 bg-[#0b0b0c] p-5 sm:p-8 md:p-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-sm">
          <p className="font-mono text-[11px] tracking-[0.25em] text-faint">ROI CALCULATOR</p>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            How many engineers?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Drag the slider. Watch the leverage appear — recomputed live.
          </p>
        </div>
        <div className="flex-1">
          <p className="font-display text-[clamp(3rem,10vw,7rem)] font-bold leading-none text-paper">
            {team}
            <span className="ml-3 align-middle font-mono text-xs tracking-[0.2em] text-faint">
              ENGINEERS
            </span>
          </p>
          {/* Added py-3 to drastically increase the touch target height for mobile users */}
          <div className="mt-8 py-3">
            <input
              type="range"
              min={5}
              max={50}
              step={1}
              value={team}
              onChange={(e) => setTeam(parseInt(e.target.value, 10))}
              className="roi-slider w-full"
              aria-label="Team size"
              data-cursor="drag"
            />
            <div className="mt-2 flex justify-between font-mono text-[11px] text-faint">
              <span>5</span>
              <span>50</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-12 grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-3">
        <div className="bg-obsidian p-5 sm:p-7">
          <Counter
            to={hours}
            duration={0.5}
            format={(n) => Math.round(n).toLocaleString()}
            className="font-display text-3xl sm:text-4xl font-bold text-paper md:text-5xl"
          />
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-faint">
            HOURS SAVED / MONTH
          </p>
        </div>
        <div className="bg-obsidian p-5 sm:p-7">
          <Counter
            to={value}
            duration={0.5}
            format={(n) => "$" + Math.round(n).toLocaleString()}
            className="font-display text-3xl sm:text-4xl font-bold text-cyan md:text-5xl"
          />
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-faint">
            VALUE RECOVERED / MONTH
          </p>
        </div>
        <div className="bg-obsidian p-5 sm:p-7">
          <Counter
            to={returnX}
            duration={0.5}
            format={(n) => n.toFixed(0) + "×"}
            className="gradient-text font-display text-3xl sm:text-4xl font-bold md:text-5xl"
          />
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-faint">
            ESTIMATED RETURN ON NEXUS PRO
          </p>
        </div>
      </div>

      <p className="mt-6 font-mono text-[11px] leading-relaxed text-faint">
        MODEL: (14 + 0.2 × ENGINEERS) FOCUSED HOURS RECLAIMED PER ENGINEER / MONTH ·
        $75 LOADED HOURLY COST · $29 / SEAT PRO PRICING
      </p>
    </div>
  );
}

/* ---------- tiers ---------- */

type Tier = {
  name: string;
  price: string;
  note: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

const TIERS: Tier[] = [
  {
    name: "STARTER",
    price: "$0",
    note: "FOREVER",
    cta: "Start free",
    features: [
      "Up to 3 seats",
      "5 projects",
      "100 AI reviews / month",
      "7-day context retention",
      "Community support",
    ],
  },
  {
    name: "PRO",
    price: "$29",
    note: "/ SEAT / MONTH",
    cta: "Start free trial",
    featured: true,
    features: [
      "Unlimited seats & projects",
      "Unlimited AI reviews",
      "Smart Standups",
      "Deploy Intelligence",
      "Full context retention",
      "Priority support — 4h response",
    ],
  },
  {
    name: "ENTERPRISE",
    price: "CUSTOM",
    note: "LET'S TALK",
    cta: "Talk to sales",
    features: [
      "Everything in Pro",
      "SSO / SAML & SCIM",
      "99.99% uptime SLA",
      "Audit logs & data residency",
      "On-prem or BYO-VPC deploy",
      "Dedicated CSM + custom fine-tuning",
    ],
  },
];

function TierBand({ tier, index }: { tier: Tier; index: number }) {
  const [open, setOpen] = useState(tier.featured ? true : false);

  const inner = (
    <div className="rounded-[13px] bg-obsidian">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group flex w-full items-center gap-3 sm:gap-6 px-4 py-5 text-left sm:px-6 sm:py-7 md:px-10 md:py-9"
      >
        <span className="font-mono text-xs text-faint">0{index + 1}</span>
        <span
          className={`font-display font-bold tracking-tight transition-colors duration-300 group-hover:text-violet min-w-0 ${
            tier.featured ? "text-2xl sm:text-3xl md:text-5xl" : "text-xl sm:text-2xl md:text-4xl"
          }`}
        >
          {tier.name}
        </span>
        {tier.featured && (
          <span className="hidden font-mono text-[10px] tracking-[0.22em] text-cyan sm:inline">
            ● MOST POPULAR
          </span>
        )}
        <span className="ml-auto text-right shrink-0">
          <span className="block font-display text-lg sm:text-xl font-bold text-paper md:text-2xl">
            {tier.price}
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-faint">{tier.note}</span>
        </span>
        <Plus
          size={20}
          className={`shrink-0 text-muted transition-transform duration-400 sm:size-[22px] ${
            open ? "rotate-45 text-violet" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 border-t border-paper/10 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 md:grid-cols-[1fr_260px] md:px-10">
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-cyan" strokeWidth={2.4} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-start gap-3">
                <MagneticLink
                  to={tier.name === "ENTERPRISE" ? "/contact" : "/contact"}
                  variant={tier.featured ? "solid" : "ghost"}
                  cursor="go"
                  className="flex w-full justify-center md:w-auto"
                >
                  {tier.cta}
                </MagneticLink>
                <p className="font-mono text-[10px] tracking-[0.15em] text-faint">
                  {tier.featured ? "14-DAY TRIAL · NO CARD" : "NO OBLIGATION"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return tier.featured ? (
    <div className="animate-gradient rounded-xl bg-gradient-to-r from-violet via-cyan to-violet p-[1.5px] shadow-[0_0_24px_rgba(139,92,246,0.2)] sm:shadow-[0_0_50px_rgba(139,92,246,0.25)]">
      {inner}
    </div>
  ) : (
    <div className="rounded-xl border border-paper/10 transition-colors duration-300 hover:border-paper/25">
      {inner}
    </div>
  );
}

/* ---------- page ---------- */

const INCLUDED = [
  "SOC 2 TYPE II",
  "END-TO-END ENCRYPTION",
  "40+ INTEGRATIONS",
  "UNLIMITED VIEWERS",
  "HUMAN SUPPORT",
];

export default function Pricing() {
  return (
    <div className="overflow-x-clip">
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-24 sm:pb-16 sm:pt-32 md:px-8 md:pt-40">
        <p className="font-mono text-[11px] tracking-[0.25em] text-violet">04 — PRICING</p>
        <h1 className="mt-6 max-w-4xl font-display font-bold leading-[0.95] tracking-tight text-[clamp(2.25rem,8vw,6rem)]">
          <TextReveal text="THE MATH" className="block" />
          <TextReveal text="IS OBVIOUS." delay={0.12} className="block gradient-text" />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-6 sm:mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg"
        >
          No seat-minimum theatre, no &ldquo;contact us to learn what it costs.&rdquo;
          Run your own numbers first — then pick a tier.
        </motion.p>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 md:px-8">
        <RoiCalculator />
      </section>

      <section className="mx-auto max-w-[1400px] space-y-4 px-5 py-16 sm:py-24 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.25em] text-faint">
          TIERS — CLICK TO EXPAND
        </p>
        {TIERS.map((tier, i) => (
          <TierBand key={tier.name} tier={tier} index={i} />
        ))}

        <div className="pt-8 sm:pt-10">
          <p className="font-mono text-[11px] tracking-[0.25em] text-faint">
            EVERY PLAN SHIPS WITH
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
            {INCLUDED.map((item) => (
              <span
                key={item}
                className="border border-paper/15 px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[11px] tracking-[0.15em] text-muted transition-colors duration-300 hover:border-cyan hover:text-cyan"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}