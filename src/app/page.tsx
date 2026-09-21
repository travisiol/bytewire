import { getAllStories } from "@/lib/feeds";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoryCard } from "@/components/StoryCard";
import { CategoryTag } from "@/components/CategoryTag";
import { timeAgo } from "@/lib/time";

export const revalidate = 900;

export default async function Home() {
  const stories = await getAllStories();
  const now = new Date().toISOString();

  if (stories.length === 0) {
    return (
      <>
        <Header updatedAt={now} />
        <main className="mx-auto max-w-6xl px-4 md:px-6 py-24 text-center flex-1">
          <p className="text-[var(--ink-muted)]">
            No stories available right now. The feeds may be temporarily
            unreachable — try refreshing shortly.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const [lead, ...rest] = stories;
  const secondary = rest.slice(0, 2);
  const river = rest.slice(2, 14);
  const sidebar = rest.slice(14, 22);

  return (
    <>
      <Header updatedAt={now} />

      <main className="mx-auto max-w-6xl px-4 md:px-6 flex-1">
        {/* Lead story + two secondary */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10 border-b border-[var(--rule)]">
          <div className="lg:col-span-2">
            <StoryCard story={lead} size="lg" />
          </div>
          <div className="flex flex-col gap-8">
            {secondary.map((s) => (
              <StoryCard key={s.id} story={s} size="md" />
            ))}
          </div>
        </section>

        {/* River + sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-sm uppercase tracking-[0.14em] text-[var(--ink-muted)] mb-6 pb-3 border-b border-[var(--rule)]">
              Latest
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {river.map((s) => (
                <StoryCard key={s.id} story={s} size="md" />
              ))}
            </div>
          </div>

          <aside>
            <h2 className="font-serif text-sm uppercase tracking-[0.14em] text-[var(--ink-muted)] mb-6 pb-3 border-b border-[var(--rule)]">
              More headlines
            </h2>
            <ul className="space-y-4">
              {sidebar.map((s) => (
                <li key={s.id} className="pb-4 border-b border-[var(--rule)] last:border-0">
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CategoryTag category={s.category} />
                      <span className="text-[11px] text-[var(--ink-muted)]">
                        · {s.source.name}
                      </span>
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
        </section>
      </main>

      <Footer />
    </>
  );
}
