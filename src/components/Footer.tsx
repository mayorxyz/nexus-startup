const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#demo" },
      { label: "Roadmap", href: "#get-access" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Docs", href: "#demo" },
      { label: "API", href: "#demo" },
      { label: "Status", href: "#faq" },
      { label: "GitHub", href: "#top" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#top" },
      { label: "Blog", href: "#get-access" },
      { label: "Careers", href: "#get-access" },
      { label: "Press", href: "#top" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#faq" },
      { label: "Terms", href: "#faq" },
      { label: "Security", href: "#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-16">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
        {/* brand column */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-wide text-ink"
          >
            <span
              aria-hidden="true"
              className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-accent to-highlight shadow-[0_0_14px_rgba(99,102,241,0.55)]"
            />
            NEXUS
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Built for teams who don&rsquo;t slow down.
          </p>
          <p className="mt-6 flex items-center gap-2 font-mono text-xs text-faint">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-50 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-highlight" />
            </span>
            all systems operational
          </p>
          <p className="mt-6 text-[13px] text-faint">© 2026 NEXUS Labs, Inc.</p>
        </div>

        {/* link columns */}
        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {col.heading}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-faint transition-colors duration-200 hover:text-muted"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
