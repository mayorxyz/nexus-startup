type MarqueeProps = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = "" }: MarqueeProps) {
  return (
    <div className={`w-full px-5 ${className}`}>
      <div className="mx-auto grid max-w-5xl grid-cols-2 border-l border-paper/10 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => (
          <span key={item} className="flex min-w-0 items-center justify-center border-b border-r border-t border-paper/10 px-2 py-4 font-display text-sm font-semibold tracking-tight text-muted transition-colors hover:text-paper sm:px-4 sm:text-base md:py-5 md:text-lg">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}