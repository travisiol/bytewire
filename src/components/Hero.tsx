import type { Story } from "@/lib/feeds";
import { timeAgo } from "@/lib/time";
import { CategoryTag } from "./CategoryTag";

export function Hero({ story }: { story: Story }) {
  return (
    <a href={story.link} target="_blank" rel="noopener noreferrer" className="group block">
      {story.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={story.image}
          alt=""
          className="w-full aspect-[16/9] md:aspect-[21/9] object-cover bg-[var(--paper-shade)]"
        />
      )}
      <div className="pt-5 md:pt-6 max-w-4xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)] border border-[var(--accent)] rounded-full px-2 py-0.5">
            Top story
          </span>
          <CategoryTag category={story.category} />
          <span className="text-[11px] text-[var(--ink-muted)]">· {story.source.name}</span>
        </div>
        <h2 className="font-serif text-[var(--ink)] text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight group-hover:text-[var(--accent)] transition-colors">
          {story.title}
        </h2>
        <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed max-w-2xl">
          {story.excerpt}
        </p>
        <div className="mt-3 text-[12px] text-[var(--ink-muted)]">{timeAgo(story.publishedAt)}</div>
      </div>
    </a>
  );
}
