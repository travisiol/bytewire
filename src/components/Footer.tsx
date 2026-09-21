import { SOURCES } from "@/lib/feeds";

export function Footer() {
  return (
    <footer className="border-t border-[var(--rule)] mt-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="col-span-2">
            <div className="font-serif text-xl text-[var(--ink)]">Bytewire</div>
            <p className="mt-2 text-[13px] text-[var(--ink-muted)] leading-relaxed max-w-sm">
              Bytewire aggregates headlines from established technology
              newsrooms and links directly to the original reporting. We don&apos;t
              rewrite or republish articles — every story belongs to, and is
              credited to, the outlet that wrote it.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-[var(--ink-muted)] mb-2">
              Sources
            </div>
            <ul className="space-y-1.5">
              {SOURCES.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-[var(--ink-muted)] mb-2">
              About
            </div>
            <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
              Headlines refresh automatically. Times are shown relative to
              when a story was published by its original source.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--rule)] text-[11px] text-[var(--ink-muted)]">
          © {new Date().getFullYear()} Bytewire. Story headlines, excerpts and
          images are the property of their respective publishers.
        </div>
      </div>
    </footer>
  );
}
