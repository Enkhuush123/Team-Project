"use client";
import Image from "next/image";
import { useState } from "react";

const UPLOAD_PRESET = "softwareCom";
const CLOUD_NAME = "dv38igwqg";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  // image-iig cloudinary-tai holbono

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];

    try {
      const url = await uploadToCloudinary(file);
      setImage(url);
    } catch (err) {
      console.log("Failed Image Upload", err);
    }
  };

  const handlePost = async () => {
    const postData = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, image, link }),
    });

    const data = postData.json();

    console.log(data);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Post</h1>

        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <input
            className="w-full h-12 px-4 border rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full min-h-[180px] px-4 py-3 border placeholder-gray-500 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Body text (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-blue-400 transition">
            {image ? (
              <div className="w-full h-48 relative">
                <Image
                  src={image}
                  alt="blogImage"
                  fill
                  className="object-cover h-full w-full rounded-xl"
                />
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <p className="text-sm font-medium">
                  Drag and drop images or videos
                </p>
                <p className="text-xs text-gray-400">or click to upload</p>
              </div>
            )}
          </label>

          <input
            type="url"
            className="w-full h-12 px-4 border placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
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
