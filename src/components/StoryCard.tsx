import type { Story } from "@/lib/feeds";
import { timeAgo } from "@/lib/time";
import { CategoryTag } from "./CategoryTag";

export function StoryCard({ story, size = "md" }: { story: Story; size?: "lg" | "md" | "sm" }) {
  const isLg = size === "lg";
  const isSm = size === "sm";

  return (
    <a
      href={story.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {story.image && !isSm && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={story.image}
          alt=""
          className={`w-full object-cover mb-3 bg-[var(--paper-shade)] ${
            isLg ? "aspect-[16/9]" : "aspect-[16/10]"
          }`}
          loading="lazy"
        />
      )}
      <div className="flex items-center gap-2 mb-1.5">
        <CategoryTag category={story.category} />
        <span className="text-[11px] text-[var(--ink-muted)]">·</span>
        <span className="text-[11px] text-[var(--ink-muted)]">{story.source.name}</span>
      </div>
      <h3
        className={`font-serif text-[var(--ink)] leading-tight group-hover:text-[var(--accent)] transition-colors ${
          isLg ? "text-3xl md:text-[2.5rem] md:leading-[1.05]" : isSm ? "text-base" : "text-xl"
        }`}
      >
        {story.title}
      </h3>
      {!isSm && (
        <p className={`mt-2 text-[var(--ink-soft)] leading-relaxed ${isLg ? "text-base max-w-xl" : "text-sm"}`}>
          {story.excerpt}
        </p>
      )}
      <div className="mt-2 text-[11px] text-[var(--ink-muted)]">{timeAgo(story.publishedAt)}</div>
    </a>
  );
}
