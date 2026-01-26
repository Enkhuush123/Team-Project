/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type News = {
  id: string;
  title: string;
  summary: string;
  image: string;
};

function NewsSkeleton() {
  return (
    <div className="bg-[#111] rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-700" />

      <div className="p-4 flex flex-col gap-3">
        <div className="h-5 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-700 rounded w-1/4 mt-4" />
      </div>
    </div>
  );
}

export default function ITNewsSection() {
  const router = useRouter();
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/ItNews");
        if (!res.ok) throw new Error("Failed to fetch news");

        const data: News[] = await res.json();
        setNewsData(data);
      } catch (err) {
        console.error("NEWS FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-white">🔥News</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={i} />)}

        {!loading &&
          newsData.map((news) => (
            <div
              key={news.id}
              className="bg-[#111] rounded-2xl overflow-hidden shadow-md hover:scale-[1.02] transition"
            >
              <img
                src={news.image}
                alt={news.title}
                className="h-48 w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/no-image.png";
                }}
              />

              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-white line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-sm text-gray-400 line-clamp-3">
                  {news.summary}
                </p>

                <button
                  className="mt-auto text-sm text-blue-400 hover:underline"
                  onClick={() => router.push(`/readmore/${news.id}`)}
                >
                  Read more →
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
