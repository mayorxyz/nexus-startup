/**
 * Two fixed, heavily-blurred ambient orbs that drift behind all page content.
 * Pure CSS animation (transform + scale only) · pointer-events: none · z-index: -1.
 * Disabled via @media (prefers-reduced-motion: reduce) in index.css.
 */
export default function Orbs() {
  return (
    <div aria-hidden="true">
      <div className="orb orb-purple" />
      <div className="orb orb-cyan" />
    </div>
  );
}
