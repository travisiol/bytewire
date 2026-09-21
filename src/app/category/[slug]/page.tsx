import { notFound } from "next/navigation";
import { getStoriesByCategory, slugToCategory, NAV_CATEGORIES, categoryToSlug } from "@/lib/feeds";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoryFeed } from "@/components/StoryFeed";

export const revalidate = 900;

export function generateStaticParams() {
  return NAV_CATEGORIES.map((c) => ({ slug: categoryToSlug(c) }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = slugToCategory(slug);

  if (!category) {
    notFound();
  }

  const stories = await getStoriesByCategory(category);
  const now = new Date().toISOString();

  return (
    <>
      <Header updatedAt={now} active={category} />
      <main className="mx-auto max-w-6xl px-4 md:px-6 flex-1">
        <div className="pt-8 md:pt-10">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] font-semibold">
            Section
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--ink)] mt-1">
            {category}
          </h1>
        </div>
        <StoryFeed stories={stories} riverHeading={`More in ${category}`} />
      </main>
      <Footer />
    </>
  );
}
