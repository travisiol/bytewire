import Link from "next/link";
import { NAV_CATEGORIES, categoryToSlug, type Category } from "@/lib/feeds";

export function Header({
  updatedAt,
  active,
}: {
  updatedAt: string;
  active?: Category;
}) {
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
          <Link href="/" className="inline-block">
            <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-[var(--ink)]">
              Bytewire
            </h1>
          </Link>
          <p className="mt-1.5 text-[13px] text-[var(--ink-muted)] tracking-wide">
            Technology news, wired in real time
          </p>
        </div>

        <nav className="flex items-center justify-center gap-5 md:gap-8 py-3 border-t border-[var(--rule)] text-[13px] font-medium overflow-x-auto">
          <Link
            href="/"
            className={`whitespace-nowrap ${
              !active ? "text-[var(--accent)]" : "text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            }`}
          >
            Front Page
          </Link>
          {NAV_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/category/${categoryToSlug(c)}`}
              className={`whitespace-nowrap transition-colors ${
                active === c
                  ? "text-[var(--accent)]"
                  : "text-[var(--ink-soft)] hover:text-[var(--accent)]"
              }`}
            >
              {c}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
