"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type News = {
  id: string;
  title: string;
  summary: string;
  content?: string;
  image: string;
  url?: string;
  source?: string;
  publishedAt?: string;
};

export default function ReadMorePage() {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSingleNews = async () => {
      try {
        const res = await fetch("/api/ItNews");
        const data: News[] = await res.json();

        const found = data.find((n) => n.id === id);
        setNews(found || null);
      } catch (err) {
        console.error("READ MORE ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleNews();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 max-w-4xl mx-auto animate-pulse">
        <div className="h-80 bg-gray-700 rounded-xl mb-6" />
        <div className="h-8 bg-gray-700 w-3/4 rounded mb-4" />
        <div className="h-4 bg-gray-700 w-full rounded mb-2" />
        <div className="h-4 bg-gray-700 w-5/6 rounded mb-2" />
        <div className="h-4 bg-gray-700 w-2/3 rounded" />
      </div>
    );
  }

  if (!news) {
    return <p className="text-red-400 p-10">News not found</p>;
  }

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto text-white">
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-105 object-cover rounded-2xl mb-6"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/no-image.png";
        }}
      />

      <h1 className="text-4xl font-bold mb-4 leading-tight">{news.title}</h1>

      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
        {news.source && <span>📰 {news.source}</span>}
        {news.publishedAt && (
          <span>🕒 {new Date(news.publishedAt).toLocaleDateString()}</span>
        )}
      </div>

      <p className="text-gray-300 text-lg leading-relaxed mb-8">
        {news.content || news.summary}
      </p>

      {news.url && (
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-400 hover:underline text-lg"
        >
          Read full article →
        </a>
      )}
    </div>
  );
}
