"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRight, Image as ImgIcon, Link2, X } from "lucide-react";

const UPLOAD_PRESET = "softwareCom";
const CLOUD_NAME = "dv38igwqg";

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl",
        "shadow-[0_20px_60px_rgba(99,102,241,0.10)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function Post() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [errors, setErrors] = useState<{ title?: boolean }>({});

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setLink("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.secure_url as string;
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setImage(url);
    } catch (err) {
      console.log("Failed Image Upload", err);
    } finally {
      setUploading(false);
    }
  };

  const handlePost = async () => {
    if (posting) return;

    // Validation - title is required
    if (!title.trim()) {
      setErrors({ title: true });
      return;
    }
    setErrors({});

    try {
      setPosting(true);
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image, link }),
      });

      const data = await res.json();
      console.log(data);

      // Auto-clear after successful post
      if (res.ok) {
        clearForm();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* glow bg */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-6 md:px-10 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.45)]">
              Post нэмэх
            </span>
          </h1>
          <div className="mt-3 h-[2px] w-28 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full opacity-80" />
          <p className="mt-4 text-white/70 text-sm">
            Текст, зураг, линк оруулах
          </p>
        </div>

        <GlassCard className="p-6 md:p-7 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">
              Гарчиг <span className="text-red-400">*</span>
            </label>
            <input
              className={`w-full h-12 px-4 rounded-xl bg-white/5 text-white text-sm placeholder:text-white/30
                         focus:outline-none focus:ring-2 transition-all
                         ${errors.title
                           ? "border border-red-500 focus:ring-red-500/50 focus:border-red-500"
                           : "border border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500/50 hover:border-white/20"
                         }`}
              placeholder="Гарчиг..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({});
              }}
            />
            {errors.title && (
              <p className="text-sm text-red-400">Гарчиг оруулна уу</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">
              Тайлбар
            </label>
            <textarea
              className="w-full min-h-[180px] px-4 py-3 rounded-xl bg-white/5 border border-white/10
                         text-white text-sm placeholder:text-white/30 resize-none
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
                         hover:border-white/20 transition-all"
              placeholder="Тайлбар бичих..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Upload */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">
              Зураг
            </label>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <div
              onClick={() => fileRef.current?.click()}
              className="w-full h-52 rounded-2xl cursor-pointer
                         bg-white/5 border-2 border-dashed border-white/10 hover:border-indigo-500/50 hover:bg-white/5 transition-all
                         flex items-center justify-center overflow-hidden relative group"
            >
              {image ? (
                <>
                  <Image
                    src={image}
                    alt="blogImage"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage("");
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    className="absolute top-3 right-3 h-9 w-9 rounded-xl
                               bg-black/50 border border-white/15 backdrop-blur
                               flex items-center justify-center hover:bg-black/65 transition"
                  >
                    <X className="h-4 w-4 text-white/90" />
                  </button>
                </>
              ) : (
                <div className="text-center px-6">
                  <div className="mx-auto h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <ImgIcon className="h-6 w-6 text-white/30 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <div className="mt-3 text-white/60 group-hover:text-white/80 font-medium transition-colors">
                    {uploading ? "Uploading..." : "Зураг оруулах"}
                  </div>
                  <div className="mt-1 text-white/40 text-sm">
                    PNG, JPG, WEBP supported
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Link */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">
              Линк
            </label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="url"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10
                           text-white text-sm placeholder:text-white/30
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
                           hover:border-white/20 transition-all"
                placeholder="https://example.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handlePost}
              disabled={posting || uploading}
              className="h-12 px-8 rounded-xl text-sm font-semibold text-white
                         bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500
                         shadow-[0_8px_30px_rgba(99,102,241,0.3)]
                         hover:shadow-[0_8px_40px_rgba(99,102,241,0.5)]
                         hover:brightness-110 active:scale-[0.98]
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {posting ? "Нийтэлж байна..." : "Нийтлэх"}
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
