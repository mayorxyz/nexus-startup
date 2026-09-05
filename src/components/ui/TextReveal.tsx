import { motion } from "framer-motion";

type TextRevealProps = {
  text: string;
  className?: string;
  /** base delay in seconds before the stagger begins */
  delay?: number;
  /** per-word stagger */
  stagger?: number;
};

/**
 * Masked text reveal — every word slides up from an overflow-hidden mask.
 * This is the signature typographic motion of the site.
 */
export default function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.07,
}: TextRevealProps) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, i) => (
        <span
          key={i}
          className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
