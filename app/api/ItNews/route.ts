import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GNEWS_API_KEY missing" },
      { status: 500 },
    );
  }

  const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=us&max=6&apikey=${apiKey}`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  if (!data.articles) return NextResponse.json([]);

  const formatted = data.articles.map((a: any, i: number) => ({
    id: String(i),
    title: a.title,
    summary: a.description,
    content: a.content,
    image: a.image || "/no-image.png",
    url: a.url,
    source: a.source?.name,
    publishedAt: a.publishedAt,
  }));

  return NextResponse.json(formatted);
}
