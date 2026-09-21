const CATEGORIES = ["AI", "Hardware", "Software", "Startups", "Security", "Business"];

export function Header({ updatedAt }: { updatedAt: string }) {
  const dateStr = new Date(updatedAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="border-b border-[var(--rule)]">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between py-3 text-[11px] uppercase tracking-[0.1em] text-[var(--ink-muted)]">
          <span>{dateStr}</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            Live feed
          </span>
        </div>

        <div className="py-6 text-center border-t border-[var(--rule)]">
          <a href="/" className="inline-block">
            <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-[var(--ink)]">
              Bytewire
            </h1>
          </a>
          <p className="mt-1.5 text-[13px] text-[var(--ink-muted)] tracking-wide">
            Technology news, wired in real time
          </p>
        </div>

        <nav className="flex items-center justify-center gap-5 md:gap-8 py-3 border-t border-[var(--rule)] text-[13px] font-medium overflow-x-auto">
          <a href="/" className="text-[var(--ink)] whitespace-nowrap">
            Front Page
          </a>
          {CATEGORIES.map((c) => (
            <a
              key={c}
              href={`/#${c.toLowerCase()}`}
              className="text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
            >
              {c}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
