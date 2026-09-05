import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

type Status = "idle" | "error" | "loading" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CTAStrip() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [shake, setShake] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setShake((s) => s + 1);
      return;
    }

    setStatus("loading");
    timeoutRef.current = window.setTimeout(() => setStatus("success"), 900);
  };

  return (
    <section
      id="get-access"
      className="relative scroll-mt-20 border-y border-white/10 px-5 py-20 md:py-[80px]"
      style={{
        background:
          "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(34,211,238,0.04))",
      }}
    >
      <div className="mx-auto max-w-[720px] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-[40px] font-extrabold leading-tight tracking-tight text-ink md:text-[60px]"
        >
          Ready to move at speed?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-4 text-lg text-muted"
        >
          Join 12,000+ teams already building faster with NEXUS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-10 min-h-[110px] max-w-[440px]"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                className="flex flex-col items-center gap-4"
              >
                <span className="gradient-border flex h-12 w-12 items-center justify-center rounded-full">
                  <Check size={22} className="text-highlight" strokeWidth={2.4} />
                </span>
                <p className="text-base font-medium text-ink">
                  You&rsquo;re on the list. We&rsquo;ll be in touch soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                onSubmit={onSubmit}
                noValidate
                animate={shake > 0 ? { x: [0, -7, 7, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="flex">
                  <label htmlFor="waitlist-email" className="sr-only">
                    Work email
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    disabled={status === "loading"}
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "waitlist-error" : undefined}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className="min-w-0 flex-1 rounded-l-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink backdrop-blur-md transition-[border-color,box-shadow] duration-200 placeholder:text-faint focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)] focus:outline-none disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex shrink-0 items-center gap-2 rounded-r-lg bg-gradient-to-br from-accent to-highlight px-5 py-3 text-sm font-semibold text-ink shadow-[0_8px_28px_rgba(99,102,241,0.35)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={15} className="animate-spin motion-reduce:animate-none" />
                        Joining…
                      </>
                    ) : (
                      "Get Access"
                    )}
                  </button>
                </div>
                <div aria-live="polite">
                  {status === "error" && (
                    <p id="waitlist-error" className="mt-3 text-[13px] text-muted">
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-highlight align-middle" />
                      That email doesn&rsquo;t look right — try again.
                    </p>
                  )}
                  {status === "idle" && (
                    <p className="mt-3 font-mono text-[11px] text-faint">
                      No credit card · Free forever tier · Cancel anytime
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
