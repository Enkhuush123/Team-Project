"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MessageCircle, ArrowUpRight } from "lucide-react";

type Blog = {
  id: string;
  imageUrl?: string;
  title: string;
  description: string;
};

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setBlogs(data);
    };
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-[620px] w-[620px] rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 py-8 space-y-6">
        {blogs.map((item) => (
          <article
            key={item.id}
            className="mx-auto w-full rounded-2xl overflow-hidden
                       bg-white/5 border border-white/10 backdrop-blur-xl
                       shadow-[0_20px_60px_rgba(99,102,241,0.12)]
                       hover:border-white/20 transition"
          >
            {/* IMAGE */}
            {item.imageUrl && (
              <div className="relative w-full aspect-video bg-black">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* CONTENT */}
            <div className="p-5 sm:p-6">
              <h2 className="text-white font-semibold text-lg sm:text-xl leading-snug">
                {item.title}
              </h2>

              <p className="mt-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
                {item.description}
              </p>

              {/* ACTION BAR */}
              <div className="mt-5 flex items-center justify-between text-white/55 text-sm">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-white transition">
                    <MessageCircle className="h-4 w-4" />
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* EMPTY */}
        {blogs.length === 0 && (
          <div className="text-center text-white/60 py-20">No posts yet</div>
        )}
      </div>
    </div>
  );
}
