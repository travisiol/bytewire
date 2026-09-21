import type { Story } from "@/lib/feeds";
import { Hero } from "./Hero";
import { StoryCard } from "./StoryCard";
import { CategoryTag } from "./CategoryTag";
import { timeAgo } from "@/lib/time";

export function StoryFeed({ stories, riverHeading = "Latest" }: { stories: Story[]; riverHeading?: string }) {
  if (stories.length === 0) {
    return (
      <div className="py-24 text-center text-[var(--ink-muted)]">
        No stories available right now. The feeds may be temporarily
        unreachable — try refreshing shortly.
      </div>
    );
  }

  const [lead, ...rest] = stories;
  const secondary = rest.slice(0, 3);
  const river = rest.slice(3, 15);
  const sidebar = rest.slice(15, 23);

  return (
    <>
      <section className="py-8 md:py-10 border-b border-[var(--rule)]">
        <Hero story={lead} />
      </section>

      {secondary.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-8 py-10 border-b border-[var(--rule)]">
          {secondary.map((s) => (
            <StoryCard key={s.id} story={s} size="md" />
          ))}
        </section>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-sm uppercase tracking-[0.14em] text-[var(--ink-muted)] mb-6 pb-3 border-b border-[var(--rule)]">
            {riverHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
            {river.map((s) => (
              <StoryCard key={s.id} story={s} size="md" />
            ))}
          </div>
        </div>

        {sidebar.length > 0 && (
          <aside>
            <h2 className="font-serif text-sm uppercase tracking-[0.14em] text-[var(--ink-muted)] mb-6 pb-3 border-b border-[var(--rule)]">
              More headlines
            </h2>
            <ul className="space-y-4">
              {sidebar.map((s) => (
                <li key={s.id} className="pb-4 border-b border-[var(--rule)] last:border-0">
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="flex items-center gap-2 mb-1">
                      <CategoryTag category={s.category} />
                      <span className="text-[11px] text-[var(--ink-muted)]">· {s.source.name}</span>
                    </div>
                    <h3 className="text-[15px] leading-snug text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                      {s.title}
                    </h3>
                    <div className="mt-1 text-[11px] text-[var(--ink-muted)]">
                      {timeAgo(s.publishedAt)}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </section>
    </>
  );
}
