import { NextResponse } from "next/server";

type NewsItem = {
<<<<<<< Updated upstream
  title: string;
  time: string; // "2h ago" гэх мэт болгоно
=======
  id: number;
  title: string;
  time: string; // "2h ago" гэх мэт
>>>>>>> Stashed changes
  tag: string;
  url: string;
};

function timeAgo(unixSeconds: number) {
  const diff = Date.now() - unixSeconds * 1000;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function tagFromTitle(title: string) {
  const t = title.toLowerCase();
  if (t.includes("next")) return "Next.js";
  if (t.includes("react")) return "React";
  if (t.includes("prisma") || t.includes("postgres") || t.includes("db"))
    return "DB";
  if (t.includes("tailwind") || t.includes("ui") || t.includes("design"))
    return "UI";
  if (t.includes("openai") || t.includes("ai") || t.includes("llm"))
    return "AI";
  if (t.includes("security") || t.includes("auth") || t.includes("oauth"))
    return "Sec";
  if (t.includes("typescript") || t.includes("ts")) return "TS";
  return "Dev";
}

<<<<<<< Updated upstream
// GET /api/news?limit=8
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 20), 20);

  try {
    // Hacker News top stories
    const idsRes = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      { next: { revalidate: 60 } } // 60s cache
    );
    const ids: number[] = await idsRes.json();

    const pick = ids.slice(0, limit);

    const items = await Promise.all(
      pick.map(async (id) => {
        const r = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          { next: { revalidate: 60 } }
        );
        const x = await r.json();
        const title = (x?.title as string) || "Untitled";
        const url =
          (x?.url as string) || `https://news.ycombinator.com/item?id=${id}`;

        const out: NewsItem = {
          title,
          time: x?.time ? timeAgo(Number(x.time)) : "—",
          tag: tagFromTitle(title),
          url,
        };
        return out;
      })
    );

    return NextResponse.json(
      { items, source: "HackerNews", updatedAt: new Date().toISOString() },
=======
// concurrency limit helper
async function mapLimit<T, R>(
  arr: T[],
  limit: number,
  fn: (item: T, idx: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(arr.length);
  let i = 0;

  const workers = new Array(Math.min(limit, arr.length))
    .fill(0)
    .map(async () => {
      while (i < arr.length) {
        const cur = i++;
        results[cur] = await fn(arr[cur], cur);
      }
    });

  await Promise.all(workers);
  return results;
}

// GET /api/news?limit=10&start=0
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const limit = Math.min(
    Math.max(Number(searchParams.get("limit") || 10), 1),
    30
  );
  const start = Math.max(Number(searchParams.get("start") || 0), 0);

  try {
    const idsRes = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      { next: { revalidate: 60 } }
    );

    const ids: number[] = await idsRes.json();
    const pick = ids.slice(start, start + limit);

    const items = await mapLimit(pick, 4, async (id) => {
      const r = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        { next: { revalidate: 60 } }
      );
      const x = await r.json();

      const title = (x?.title as string) || "Untitled";
      const url =
        (x?.url as string) || `https://news.ycombinator.com/item?id=${id}`;

      const out: NewsItem = {
        id,
        title,
        time: x?.time ? timeAgo(Number(x.time)) : "—",
        tag: tagFromTitle(title),
        url,
      };
      return out;
    });

    const nextStart = start + limit;
    const hasMore = nextStart < ids.length;

    return NextResponse.json(
      {
        items,
        source: "HackerNews",
        updatedAt: new Date().toISOString(),
        nextStart: hasMore ? nextStart : null,
        hasMore,
      },
>>>>>>> Stashed changes
      { status: 200 }
    );
  } catch (err) {
    console.error("news api error:", err);
    return NextResponse.json(
<<<<<<< Updated upstream
      { items: [], error: "Failed to fetch news" },
=======
      {
        items: [],
        error: "Failed to fetch news",
        nextStart: null,
        hasMore: false,
      },
>>>>>>> Stashed changes
      { status: 500 }
    );
  }
}
