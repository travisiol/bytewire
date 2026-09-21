import type { Category } from "@/lib/feeds";

export function CategoryTag({ category }: { category: Category }) {
  return (
    <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
      {category}
    </span>
  );
}
