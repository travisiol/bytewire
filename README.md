# Bytewire

A live technology news front page. Bytewire aggregates real, current headlines
from established tech newsrooms — it does not generate or rewrite articles.
Every card links out to the original story on the publisher's own site.

## Sources

- [TechCrunch](https://techcrunch.com)
- [The Verge](https://www.theverge.com)
- [Ars Technica](https://arstechnica.com)
- [WIRED](https://www.wired.com)
- [Engadget](https://www.engadget.com)
- [Hacker News](https://news.ycombinator.com) (front page, via [hnrss.org](https://hnrss.org))

## How it works

`src/lib/feeds.ts` fetches each outlet's public RSS/Atom feed, parses it with
`fast-xml-parser`, and normalizes titles, excerpts, images, and publish times
into a common `Story` shape. The home page (`src/app/page.tsx`) is an ISR
route that revalidates every 15 minutes, so headlines stay current without
hitting the source feeds on every request.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a source

Add an entry to `SOURCES` in `src/lib/feeds.ts` with the feed's RSS/Atom URL,
homepage, and a `Category`. The parser handles both RSS 2.0 (`channel.item`)
and Atom (`feed.entry`) formats.
