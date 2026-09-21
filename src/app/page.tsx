import { getAllStories } from "@/lib/feeds";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoryFeed } from "@/components/StoryFeed";

export const revalidate = 900;

export default async function Home() {
  const stories = await getAllStories();
  const now = new Date().toISOString();

  return (
    <>
      <Header updatedAt={now} />
      <main className="mx-auto max-w-6xl px-4 md:px-6 flex-1">
        <StoryFeed stories={stories} />
      </main>
      <Footer />
    </>
  );
}
