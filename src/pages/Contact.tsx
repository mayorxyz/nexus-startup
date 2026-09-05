import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Loader2 } from "lucide-react";
import TextReveal from "../components/ui/TextReveal";

/* ---------- stylized dark map ---------- */

function DarkMap() {
  return (
    <svg viewBox="0 0 400 220" className="w-full rounded-xl border border-paper/10">
      <defs>
        <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0v20" fill="none" stroke="rgba(244,244,245,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="220" fill="#0b0b0c" />
      <rect width="400" height="220" fill="url(#mapgrid)" />

      <path d="M70 130 Q140 40 215 75" fill="none" stroke="rgba(139,92,246,0.4)" className="dash-line" />
      <path d="M215 75 Q280 60 330 105" fill="none" stroke="rgba(139,92,246,0.4)" className="dash-line" />

      {[
        { x: 70, y: 130, label: "SAN FRANCISCO — HQ" },
        { x: 215, y: 75, label: "BERLIN — EMEA" },
        { x: 330, y: 105, label: "TOKYO — APAC" },
      ].map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="rgba(6,182,212,0.5)" className="pulse-dot" />
          <circle cx={p.x} cy={p.y} r="3" fill="#06B6D4" />
          <text x={p.x + 12} y={p.y + 3} fontSize="7.5" fill="#52525B" fontFamily="JetBrains Mono, monospace">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- animated field ---------- */

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
  type?: string;
  optional?: boolean;
};

function Field({ label, value, onChange, error, textarea, type = "text", optional }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const shared =
    "w-full border-b border-paper/15 bg-transparent pb-3 pt-4 text-base text-paper focus:outline-none";

  return (
    <div>
      <div className="relative">
        <label
          className={`pointer-events-none absolute left-0 font-mono tracking-[0.2em] transition-all duration-300 ${
            active ? "-top-2 text-[10px] text-violet" : "top-4 text-sm text-faint"
          }`}
        >
          {label}
          {optional ? " (OPTIONAL)" : ""}
        </label>
        {textarea ? (
          <textarea
            rows={3}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${shared} resize-none`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={shared}
          />
        )}
        <motion.span
          aria-hidden="true"
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-violet to-cyan"
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pt-2 font-mono text-[11px] tracking-[0.1em] text-cyan"
          >
            ▲ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- page ---------- */

type Status = "idle" | "sending" | "sent";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | null>(null);

  const set = (key: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;

    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "We need a name to say hi to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "That email won't route. Check it?";
    if (form.message.trim().length < 10) next.message = "Give us at least a sentence.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    timer.current = window.setTimeout(() => {
      setStatus("sent");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduced) {
        confetti({
          particleCount: 130,
          spread: 80,
          origin: { x: 0.75, y: 0.5 },
          colors: ["#8B5CF6", "#06B6D4", "#F4F4F5"],
        });
        window.setTimeout(
          () =>
            confetti({
              particleCount: 70,
              spread: 100,
              origin: { x: 0.3, y: 0.6 },
              colors: ["#8B5CF6", "#06B6D4", "#F4F4F5"],
            }),
          220
        );
      }
    }, 1300);
  };

  return (
    <div className="overflow-x-clip">
      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 pb-28 pt-32 md:px-8 md:pt-40 lg:grid-cols-2 lg:gap-24">
        {/* left — info */}
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] text-violet">05 — CONTACT</p>
          <h1 className="mt-6 font-display font-bold leading-[0.95] tracking-tight text-[clamp(2.6rem,7vw,5.5rem)]">
            <TextReveal text="LET'S BUILD" className="block" />
            <TextReveal text="SOMETHING" delay={0.12} className="block text-outline" />
            <TextReveal text="UNREASONABLE." delay={0.24} className="block gradient-text" />
          </h1>

          <motion.a
            href="mailto:hello@nexus.dev"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            data-cursor="write"
            className="group mt-10 inline-block font-mono text-sm tracking-[0.12em] text-muted transition-colors hover:text-violet md:text-base"
          >
            HELLO@NEXUS.DEV
            <span className="block h-px w-full origin-left scale-x-0 bg-violet transition-transform duration-500 group-hover:scale-x-100" />
          </motion.a>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-6 max-w-sm text-sm leading-relaxed text-muted"
          >
            We reply within 24 hours — usually faster than your CI pipeline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-12"
          >
            <DarkMap />
            <div className="mt-4 grid grid-cols-3 gap-3 font-mono text-[10px] leading-relaxed tracking-[0.12em] text-faint">
              <span>
                37.7749° N<br />122.4194° W
              </span>
              <span>
                52.5200° N<br />13.4050° E
              </span>
              <span>
                35.6762° N<br />139.6503° E
              </span>
            </div>
          </motion.div>
        </div>

        {/* right — form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="self-start rounded-xl border border-paper/10 bg-[#0b0b0c] p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="flex min-h-[380px] flex-col items-start justify-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan/50 bg-cyan/10">
                  <Check size={26} className="text-cyan" strokeWidth={2.4} />
                </span>
                <h2 className="mt-8 font-display text-4xl font-bold tracking-tight md:text-5xl">
                  <TextReveal text="MESSAGE" className="block" />
                  <TextReveal text="RECEIVED." delay={0.1} className="block text-cyan" />
                </h2>
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
                  A human (yes, really) will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", company: "", message: "" });
                  }}
                  className="mt-10 font-mono text-[11px] tracking-[0.2em] text-muted transition-colors hover:text-violet"
                >
                  ← SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                onSubmit={onSubmit}
                noValidate
                className="space-y-9"
              >
                <p className="font-mono text-[11px] tracking-[0.25em] text-faint">
                  TELL US WHAT YOU'RE BUILDING
                </p>
                <Field label="YOUR NAME" value={form.name} onChange={set("name")} error={errors.name} />
                <Field label="WORK EMAIL" type="email" value={form.email} onChange={set("email")} error={errors.email} />
                <Field label="COMPANY" value={form.company} onChange={set("company")} optional />
                <Field label="THE PROBLEM" textarea value={form.message} onChange={set("message")} error={errors.message} />

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
                  data-cursor="send"
                  className="flex w-full items-center justify-center gap-3 bg-violet px-7 py-4 font-mono text-xs tracking-[0.22em] text-obsidian uppercase transition-colors duration-300 hover:bg-paper disabled:cursor-not-allowed"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "sending" ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-3"
                      >
                        <Loader2 size={15} className="animate-spin motion-reduce:animate-none" />
                        TRANSMITTING…
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        SEND MESSAGE →
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <p className="font-mono text-[10px] leading-relaxed tracking-[0.12em] text-faint">
                  NO NEWSLETTERS. NO SEQUENCES. JUST A REPLY.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
