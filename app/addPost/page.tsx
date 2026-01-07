"use client";
import { useState } from "react";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [image, setImage] = useState("")
  // image-iig cloudinary-tai holbono

  const handlePost = async () => {
    const postData = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
  };

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Post</h1>

        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <input
            className="w-full h-12 px-4 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full min-h-[180px] px-4 py-3 border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Body text (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-blue-400 transition">
            <input type="file" className="hidden" />
            <p className="text-sm font-medium">
              Drag and drop images or videos
            </p>
            <p className="text-xs text-gray-400">or click to upload</p>
          </label>

          <input
            type="url"
            className="w-full h-12 px-4 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="URL"
          />

          <div className="flex justify-end">
            <button
              className="px-5 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition cursor-pointer"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
