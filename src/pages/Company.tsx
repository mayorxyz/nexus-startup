import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import TextReveal from "../components/ui/TextReveal";
import { MagneticLink } from "../components/ui/Magnetic";

/* ---------- team ---------- */

const TEAM = [
  { name: "MARA VOSS", role: "CEO / CO-FOUNDER", loc: "SAN FRANCISCO", img: "https://image.qwenlm.ai/generated-images/97b6550c-0297-45cd-99bf-ffdd638f059b/_result.png" },
  { name: "DMITRI SOKOLOV", role: "CTO / CO-FOUNDER", loc: "SAN FRANCISCO", img: "https://image.qwenlm.ai/generated-images/a2bbc586-c3d6-428f-b6ef-20ee6a573afb/_result.png" },
  { name: "AIKO TANAKA", role: "VP, AI RESEARCH", loc: "TOKYO", img: "https://image.qwenlm.ai/generated-images/b5f6e61a-89e6-4542-9320-27341a7024cc/_result.png" },
  { name: "JULIAN REYES", role: "HEAD OF DESIGN", loc: "BERLIN", img: "https://image.qwenlm.ai/generated-images/4e366ed6-9496-4312-bf3d-d0d8a58cc24a/_result.png" },
  { name: "NADIA OKAFOR", role: "HEAD OF ENGINEERING", loc: "SAN FRANCISCO", img: "https://image.qwenlm.ai/generated-images/b850e2c0-6aea-4e6d-b85f-66796277acbd/_result.png" },
  { name: "TOMAS LINDQVIST", role: "HEAD OF OPERATIONS", loc: "BERLIN", img: "https://image.qwenlm.ai/generated-images/4894c89e-f398-4de1-a1e4-fb0250e1641b/_result.png" },
];

const OPEN_ROLES = ["STAFF ENGINEER — CONTEXT GRAPH", "PRODUCT WRITER — REMOTE"];

const VALUES = [
  {
    title: "RADICAL TRANSPARENCY",
    detail: "Every roadmap call is recorded. Every incident review is public. Pricing lives on the internet, not in a sales deck.",
  },
  {
    title: "TASTE IS A FEATURE",
    detail: "We ship fewer things, slower, on purpose. If it doesn't feel inevitable, it doesn't ship.",
  },
  {
    title: "DEFAULT TO BOLD",
    detail: "Safe bets compound into mediocre software. We'd rather be wrong and interesting than right and invisible.",
  },
];

const TIMELINE = [
  { year: "2022", event: "Founded in a San Francisco garage. Two laptops, one thesis." },
  { year: "2023", event: "NEXUS-1 ships. First 1,000 teams onboard in 90 days." },
  { year: "2024", event: "Series A — $32M. NEXUS-2 training begins on private graph data." },
  { year: "2025", event: "Tokyo and Berlin offices open. 40+ native integrations." },
  { year: "2026", event: "12,400 teams. Cognitive OS v3 enters public beta." },
];

export default function Company() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<(typeof TEAM)[number] | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 16, mass: 0.6 });

  // manifesto gradient shift
  const manifestoRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ["start 0.85", "end 0.35"],
  });
  const [pos, setPos] = useState(reduced ? 0 : 100);

  useEffect(() => {
    if (reduced) return;
    const unsubscribe = scrollYProgress.on("change", (v) => setPos(100 - v * 100));
    return unsubscribe;
  }, [reduced, scrollYProgress]);

  return (
    <div className="overflow-x-clip">
      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-32 md:px-8 md:pt-40">
        <p className="font-mono text-[11px] tracking-[0.25em] text-violet">03 — COMPANY</p>
        <h1 className="mt-6 max-w-3xl font-display font-bold leading-[0.95] tracking-tight text-[clamp(2.6rem,7.5vw,6rem)]">
          <TextReveal text="THE HUMANS" className="block" />
          <TextReveal text="BEHIND THE GRAPH." delay={0.12} className="block text-outline" />
        </h1>
      </section>

      {/* manifesto — color shifts as you scroll */}
      <section ref={manifestoRef} className="border-y border-paper/10 px-5 py-28 md:px-8 md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <h2
            ref={textRef}
            className="max-w-5xl font-display font-bold leading-[1.02] tracking-tight text-[clamp(2rem,5.5vw,4.5rem)]"
            style={{
              backgroundImage: "linear-gradient(90deg, #F4F4F5 20%, #8B5CF6 55%, #06B6D4 90%)",
              backgroundSize: "240% 100%",
              backgroundPosition: `${pos}% 0%`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            We believe software should adapt to humans — not the other way around.
          </h2>
          <p className="mt-10 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            NEXUS started in 2022 with a simple allergy: tools that make people behave
            like machines. Four years later, 12,400 teams run on our cognitive OS —
            and we&rsquo;re still allergic.
          </p>
        </div>
      </section>

      {/* team — cursor-tracking portraits */}
      <section
        className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-8"
        onMouseMove={(e) => {
          if (reduced) return;
          mx.set(e.clientX - 160);
          my.set(e.clientY - 210);
        }}
      >
        {/* floating portrait (desktop) */}
        {!reduced && (
          <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
          >
            <AnimatePresence mode="wait">
              {hovered && (
                <motion.div
                  key={hovered.name}
                  initial={{ opacity: 0, scale: 0.88, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: -2 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[420px] w-[320px] overflow-hidden border border-paper/15 shadow-[0_40px_120px_rgba(139,92,246,0.25)]"
                >
                  <img
                    src={hovered.img}
                    alt=""
                    className="h-full w-full object-cover saturate-[0.75]"
                    draggable={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <p className="mb-4 font-mono text-[11px] tracking-[0.25em] text-faint">
          THE TEAM — HOVER A NAME
        </p>
        <div className="border-t border-paper/10">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div
                onMouseEnter={() => setHovered(member)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setHovered((h) => (h?.name === member.name ? null : member))}
                data-cursor="peek"
                className="group cursor-pointer border-b border-paper/10 py-6 transition-colors duration-300 hover:bg-paper/[0.02] md:py-7"
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  <h3 className="font-display text-2xl font-bold tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-violet md:text-4xl">
                    {member.name}
                  </h3>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted md:ml-auto">
                    {member.role}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
                    {member.loc}
                  </span>
                </div>
                {/* mobile inline portrait */}
                <div
                  className={`grid transition-[grid-template-rows] duration-500 lg:hidden ${
                    hovered?.name === member.name ? "grid-rows-[220px]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      loading="lazy"
                      className="mt-4 h-[200px] w-full object-cover object-top saturate-[0.75]"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* open roles */}
          {OPEN_ROLES.map((role) => (
            <div
              key={role}
              data-cursor="join"
              className="group border-b border-dashed border-paper/20 py-6 md:py-7"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                <span className="font-mono text-xs text-faint">✳</span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-muted transition-colors duration-300 group-hover:text-cyan md:text-4xl">
                  {role}
                </h3>
                <span className="font-mono text-[11px] tracking-[0.2em] text-faint md:ml-auto">
                  WE&rsquo;RE HIRING
                </span>
                <MagneticLink to="/contact" variant="ghost" cursor="apply" className="!px-4 !py-2 md:self-center">
                  Apply
                </MagneticLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* values — hover flood cards */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-8">
        <p className="mb-8 font-mono text-[11px] tracking-[0.25em] text-faint">
          WHAT WE OPTIMIZE FOR
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              data-cursor="hold"
              className="group relative h-72 overflow-hidden rounded-xl border border-paper/10 bg-[#0b0b0c] p-8"
            >
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-obsidian">
                {v.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-obsidian/80">
                {v.detail}
              </p>
              <div className="absolute inset-0 -z-0 translate-y-full bg-violet transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="border-t border-paper/10">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8">
          <p className="mb-10 font-mono text-[11px] tracking-[0.25em] text-faint">TRAJECTORY</p>
          <div className="flex gap-8 overflow-x-auto pb-6" data-lenis-prevent>
            {TIMELINE.map((t) => (
              <div key={t.year} className="min-w-[240px] border-l border-violet/40 pl-5">
                <p className="font-display text-3xl font-bold text-paper">{t.year}</p>
                <p className="mt-3 max-w-[220px] font-mono text-xs leading-relaxed text-muted">
                  {t.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
