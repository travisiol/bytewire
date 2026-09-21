import { XMLParser } from "fast-xml-parser";

export type Category =
  | "AI"
  | "Hardware"
  | "Software"
  | "Startups"
  | "Security"
  | "Science"
  | "Business";

export type Source = {
  id: string;
  name: string;
  url: string; // RSS feed URL
  homepage: string;
  category: Category;
};

export type Story = {
  id: string;
  title: string;
  link: string;
  excerpt: string;
  publishedAt: string; // ISO string
  source: Pick<Source, "id" | "name" | "homepage">;
  category: Category;
  image?: string;
};

// Real, publicly published RSS feeds from established tech outlets.
export const SOURCES: Source[] = [
  {
    id: "techcrunch",
    name: "TechCrunch",
    url: "https://techcrunch.com/feed/",
    homepage: "https://techcrunch.com",
    category: "Startups",
  },
  {
    id: "theverge",
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
    homepage: "https://www.theverge.com",
    category: "Software",
  },
  {
    id: "arstechnica",
    name: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/index",
    homepage: "https://arstechnica.com",
    category: "Science",
  },
  {
    id: "wired",
    name: "WIRED",
    url: "https://www.wired.com/feed/rss",
    homepage: "https://www.wired.com",
    category: "Business",
  },
  {
    id: "engadget",
    name: "Engadget",
    url: "https://www.engadget.com/rss.xml",
    homepage: "https://www.engadget.com",
    category: "Hardware",
  },
  {
    id: "hackernews",
    name: "Hacker News",
    url: "https://hnrss.org/frontpage",
    homepage: "https://news.ycombinator.com",
    category: "AI",
  },
];

function asText(input: unknown): string {
  if (typeof input === "string") return input;
  if (typeof input === "number") return String(input);
  if (input && typeof input === "object") {
    const obj = input as Record<string, unknown>;
    if (typeof obj["#text"] === "string") return obj["#text"];
    if (typeof obj["@_href"] === "string") return "";
  }
  return "";
}

function decodeEntities(input: string): string {
  return input
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;|&rsquo;|&#39;|&apos;/g, "'")
    .replace(/&#8220;|&ldquo;|&#8221;|&rdquo;|&quot;/g, '"')
    .replace(/&#8211;|&ndash;/g, "-")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, "&");
}

function stripHtml(input: string | undefined): string {
  if (!input) return "";
  return decodeEntities(
    input
      .replace(/<!\[CDATA\[/g, "")
      .replace(/\]\]>/g, "")
      .replace(/<[^>]*>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(input: string, max = 220): string {
  if (input.length <= max) return input;
  return input.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function extractImage(item: Record<string, unknown>): string | undefined {
  const media = item["media:content"] as Record<string, unknown> | undefined;
  if (media && typeof media["@_url"] === "string") return media["@_url"] as string;

  const thumb = item["media:thumbnail"] as Record<string, unknown> | undefined;
  if (thumb && typeof thumb["@_url"] === "string") return thumb["@_url"] as string;

  const enclosure = item["enclosure"] as Record<string, unknown> | undefined;
  if (
    enclosure &&
    typeof enclosure["@_url"] === "string" &&
    typeof enclosure["@_type"] === "string" &&
    (enclosure["@_type"] as string).startsWith("image")
  ) {
    return enclosure["@_url"] as string;
  }

  const contentEncoded =
    (item["content:encoded"] as string | undefined) ||
    (item["description"] as string | undefined);
  if (typeof contentEncoded === "string") {
    const match = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
    if (match) return match[1];
  }

  return undefined;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
});

async function fetchFeed(source: Source): Promise<Story[]> {
  try {
    const res = await fetch(source.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; BytewireBot/1.0; +https://bytewire.local)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      console.error(`[feeds] ${source.id} responded ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const data = parser.parse(xml);

    const channel = data?.rss?.channel ?? data?.feed;
    if (!channel) return [];

    // RSS 2.0 uses channel.item[]; Atom feeds use feed.entry[]
    const rawItems: Record<string, unknown>[] = Array.isArray(channel.item)
      ? channel.item
      : channel.item
        ? [channel.item]
        : Array.isArray(channel.entry)
          ? channel.entry
          : channel.entry
            ? [channel.entry]
            : [];

    const stories: Story[] = [];
    for (const [idx, item] of rawItems.slice(0, 12).entries()) {
      try {
        const title = stripHtml(asText(item.title));

        let link = item.link as unknown;
        if (typeof link === "object" && link !== null) {
          const linkObj = link as Record<string, unknown>;
          link = (linkObj["@_href"] as string) ?? (linkObj["#text"] as string) ?? "";
        }
        if (Array.isArray(link)) {
          const found = (link as Record<string, unknown>[]).find(
            (l) => l["@_rel"] === "alternate" || !l["@_rel"]
          );
          link = (found?.["@_href"] as string) ?? "";
        }

        const rawDate =
          asText(item.pubDate) || asText(item.published) || asText(item.updated) || asText(item["dc:date"]);
        const publishedAt = rawDate ? new Date(rawDate).toISOString() : new Date().toISOString();

        const description =
          asText(item.description) || asText(item.summary) || asText(item["content:encoded"]);

        stories.push({
          id: `${source.id}-${idx}-${link || title}`,
          title: title || "Untitled",
          link: (link as string) || source.homepage,
          excerpt: truncate(stripHtml(description)),
          publishedAt,
          source: { id: source.id, name: source.name, homepage: source.homepage },
          category: source.category,
          image: extractImage(item),
        });
      } catch (itemErr) {
        console.error(`[feeds] ${source.id} item ${idx} failed:`, itemErr);
      }
    }
    return stories;
  } catch (err) {
    console.error(`[feeds] failed to fetch ${source.id}:`, err);
    return [];
  }
}

export async function getAllStories(): Promise<Story[]> {
  const results = await Promise.all(SOURCES.map(fetchFeed));
  const stories = results.flat();
  stories.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return stories;
}
