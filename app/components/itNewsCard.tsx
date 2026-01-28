/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Newspaper, RefreshCcw, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type News = {
  id: string;
  title: string;
  summary: string;
  image: string;
  source: string;
};

export default function ItNewsCard() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ItNews", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch news");

      const data: News[] = await res.json();
      setNews(data);
    } catch (err) {
      console.error("NEWS FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="h-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(99,102,241,0.10)]">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Newspaper className="h-5 w-5 text-white/80" />
          </div>
          <div>
            <div className="text-white font-semibold text-lg">Latest News</div>
            <div className="text-white/55 text-sm">
              {loading ? "Updating..." : "Live feed"}
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          className="h-9 bg-white/10 text-white border border-white/15 hover:bg-white/15"
          disabled={loading}
          onClick={fetchNews}
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
              <button
                onClick={() => router.push(`/readmore/${n.id}`)}
                key={idx}
                rel="noreferrer"
                className="block w-full rounded-xl bg-white/5 border border-white/10 px-3 py-3 hover:bg-white/7 transition"
              >
                <div className="flex items-start justify-between gap-3 w-full">
                  <div className="flex flex-col gap-5 ">
                    <div className="flex justify-between ">
                      <div className="w-full text-left flex h-fit justify-between">
                        <span className="text-white/90 text-sm font-medium line-clamp-2">
                          {n.title}
                        </span>
                      </div>
                      <div className="text-xs w-20 overflow-hidden h-fit text-white/60 rounded-full bg-white/5 border border-white/10 p-2">
                        <span className="overflow-hidden">{n.source}</span>
                      </div>
                    </div>

                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-full rounded-xl object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/no-image.png";
                      }}
                    />
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-white/50">
                  <span className="inline-flex items-center gap-1 text-white/60">
                    Open <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            ))}

            {!loading && news.length === 0 && (
              <div className="text-center text-white/55 text-sm py-10">
                No news yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
