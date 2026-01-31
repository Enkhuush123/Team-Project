"use client";

import { useEffect, useRef, useState } from "react";
import { Newspaper, RefreshCcw, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type NewsItem = {
  id: number;
  title: string;
  time: string;
  tag: string;
  url: string;
};

type NewsApiResponse = {
  items: NewsItem[];
  nextStart: number | null;
  hasMore: boolean;
};

export default function ItNewsCard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [nextStart, setNextStart] = useState<number | null>(0);
  const [hasMore, setHasMore] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const cooldownRef = useRef(false);
  const COOLDOWN_MS = 700;

  const seenRef = useRef<Set<number>>(new Set());

  const fetchNews = async (mode: "reset" | "more" = "reset") => {
    if (loading) return;
    if (mode === "more" && (!hasMore || nextStart === null)) return;
    if (mode === "more" && cooldownRef.current) return;

    try {
      if (mode === "more") {
        cooldownRef.current = true;
        setTimeout(() => (cooldownRef.current = false), COOLDOWN_MS);
      }

      setLoading(true);

      const start = mode === "reset" ? 0 : nextStart ?? 0;
      const res = await fetch(`/api/news?limit=10&start=${start}`, {
        cache: "no-store",
      });

      const data: NewsApiResponse = await res.json();
      const incoming = data.items || [];

      if (mode === "reset") {
        seenRef.current = new Set(incoming.map((x) => x.id));
        setNews(incoming);
      } else {
        const filtered = incoming.filter((x) => !seenRef.current.has(x.id));
        filtered.forEach((x) => seenRef.current.add(x.id));
        setNews((prev) => [...prev, ...filtered]);
      }

      setNextStart(data.nextStart ?? null);
      setHasMore(Boolean(data.hasMore));
    } catch (e) {
      console.error(e);
      if (mode === "reset") setNews([]);
      setHasMore(false);
      setNextStart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews("reset");
  }, []);

  useEffect(() => {
    const rootEl = scrollRef.current;
    const targetEl = sentinelRef.current;
    if (!rootEl || !targetEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNews("more");
      },
      {
        root: rootEl,
        rootMargin: "350px",
        threshold: 0,
      }
    );

    io.observe(targetEl);
    return () => io.disconnect();
  }, [hasMore, nextStart, loading]);

  return (
    <div className="h-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(99,102,241,0.10)]">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Newspaper className="h-5 w-5 text-white/80" />
          </div>
          <div>
            <div className="text-white font-semibold text-lg">
              Latest IT News
            </div>
            <div className="text-white/55 text-sm">
              {loading ? "Updating..." : "Live feed"}
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          className="h-9 bg-white/10 text-white border border-white/15 hover:bg-white/15"
          onClick={() => fetchNews("reset")}
          disabled={loading}
        >
          <RefreshCcw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="p-5">
        <div className="rounded-xl bg-linear-to-br from-white/6 to-white/3 border border-white/10 p-4">
          <div className="text-white/80 font-medium">Today</div>

          <div className="mt-3 space-y-3">
            {news.map((n, idx) => (
              <a
                key={idx}
                href={n.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl bg-white/5 border border-white/10 px-3 py-3 hover:bg-white/7 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-white/90 text-sm font-medium leading-snug line-clamp-2">
                    {n.title}
                  </div>
                  <span className="shrink-0 text-[11px] text-white/60 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                    {n.tag}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-white/50">
                  <span>{n.time}</span>
                  <span className="inline-flex items-center gap-1 text-white/60">
                    Open <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            ))}

            {!loading && news.length === 0 && (
              <div className="text-center text-white/55 text-sm py-10">
                No news yet
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-white/45">
          Source: Hacker News (no API key)
        </div>
      </div>
    </div>
  );
}
