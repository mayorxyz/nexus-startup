import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const FAQS = [
  {
    question: "Is NEXUS free to start?",
    answer: "Yes. Our Starter plan is free forever. No credit card required.",
  },
  {
    question: "How does the AI understand my codebase?",
    answer:
      "NEXUS indexes your repos securely and builds a context graph. It understands relationships between files, functions, and contributors — not just syntax.",
  },
  {
    question: "Is my code sent to OpenAI or third parties?",
    answer:
      "No. We run our own fine-tuned models. Your code never leaves our infrastructure.",
  },
  {
    question: "Can I migrate from Linear, Jira, or GitHub Projects?",
    answer: "Yes. One-click import. Migration takes under 10 minutes.",
  },
  {
    question: "What's your uptime SLA?",
    answer: "99.95% uptime. Status page at status.nexus.dev.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 px-5 py-24 md:py-[100px]">
      <div className="mx-auto max-w-[720px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Questions we get a lot.
          </h2>
        </motion.div>

        <div className="mt-12">
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              >
                <GlassCard hoverGlow={false} className="mb-3 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-ink">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="shrink-0 text-muted"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
