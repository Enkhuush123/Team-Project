"use client";

import { useState } from "react";

export const Link = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handlePost = () => {
    const postData = {
      type: "link",
      title,
      url,
    };
    console.log(postData, "this is link post");
  };

  return (
    <div
      className="max-w-3xl mx-auto flex flex-col gap-6
                 rounded-2xl bg-white/5 border border-white/10
                 backdrop-blur-xl p-6
                 shadow-[0_20px_60px_rgba(99,102,241,0.10)]"
    >
      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="text-white/70 text-sm font-medium">Title</label>
        <input
          className="w-full h-11 px-4 rounded-xl
                     bg-black/40 border border-white/15
                     text-white text-sm placeholder:text-white/40
                     focus:outline-none focus:border-white/30
                     transition"
          placeholder="Share a useful link..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* URL */}
      <div className="flex flex-col gap-2">
        <label className="text-white/70 text-sm font-medium">URL</label>
        <input
          type="url"
          className="w-full h-11 px-4 rounded-xl
                     bg-black/40 border border-white/15
                     text-white text-sm placeholder:text-white/40
                     focus:outline-none focus:border-white/30
                     transition"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      {/* Action */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handlePost}
          className="h-10 px-6 rounded-full text-sm font-semibold text-white
                     bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600
                     shadow-[0_10px_28px_rgba(79,70,229,0.35)]
                     hover:brightness-110 active:scale-[0.97]
                     transition"
        >
          Post
        </button>
      </div>
    </div>
  );
};
