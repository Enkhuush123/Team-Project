"use client";

import { useMemo } from "react";
import { Newspaper, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type NewsItem = {
  title: string;
  time: string;
  tag: string;
};

export default function ItNewsCard() {
  const news = useMemo<NewsItem[]>(
    () => [
      {
        title: "OpenAI releases new model updates for dev tools",
        time: "2h ago",
        tag: "AI",
      },
      {
        title: "Next.js App Router best practices for 2026",
        time: "5h ago",
        tag: "Next.js",
      },
      {
        title: "Prisma: faster migrations & DX improvements",
        time: "9h ago",
        tag: "DB",
      },
      {
        title: "TypeScript 5.x tips to reduce runtime bugs",
        time: "12h ago",
        tag: "TS",
      },
      {
        title: "Tailwind UI patterns: glass, gradients, cards",
        time: "1d ago",
        tag: "UI",
      },
      {
        title: "Security: common auth mistakes in web apps",
        time: "2d ago",
        tag: "Sec",
      },
    ],
    []
  );

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
            <div className="text-white/55 text-sm">Daily feed (UI only)</div>
          </div>
        </div>

        <Button
          variant="secondary"
          className="h-9 bg-white/10 text-white border border-white/15 hover:bg-white/15"
          onClick={() => console.log("refresh news")}
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="p-5">
        <div className="rounded-xl bg-linear-to-br from-white/6 to-white/3 border border-white/10 p-4">
          <div className="text-white/80 font-medium">Today</div>

          <div className="mt-3 space-y-3">
            {news.map((n, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 hover:bg-white/7 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-white/90 text-sm font-medium leading-snug line-clamp-2">
                    {n.title}
                  </div>
                  <span className="shrink-0 text-[11px] text-white/60 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                    {n.tag}
                  </span>
                </div>
                <div className="mt-2 text-xs text-white/50">{n.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-xs text-white/45">
          Tip: API холбох үед эндээс fetch хийнэ.
        </div>
      </div>
    </div>
  );
}
