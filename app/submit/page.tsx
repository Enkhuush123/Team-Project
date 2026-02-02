/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Circle,
  Globe,
  Image as ImgIcon,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";

import Image from "next/image";

const UPLOAD_PRESET = "softwarecom";
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

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    screenshot: "",
  });
  const [errors, setErrors] = useState<{ title?: boolean }>({});

  const uploadToCloudinary = async (file: File) => {
    const formDataCloudinary = new FormData();
    formDataCloudinary.append("file", file);
    formDataCloudinary.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formDataCloudinary,
        },
      );

      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("upload failed", err);
    }
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    try {
      const url = await uploadToCloudinary(file);
      setFormData({ ...formData, screenshot: url ?? "" });
    } catch (err) {
      console.log(err);
    }
  };

  const clearAll = () =>
    setFormData({ title: "", description: "", link: "", screenshot: "" });

  const onSubmitUIOnly = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation - title is required
    if (!formData.title.trim()) {
      setErrors({ title: true });
      return;
    }
    setErrors({});

    const res = await fetch(`/api/website`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        link: formData.link,
        image: formData.screenshot,
      }),
    });
    const data = await res.json();
    console.log(data);

    // Auto-clear after successful submit
    if (res.ok) {
      clearAll();
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-[100px]" />
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header - Centered */}
        <div className="text-center mb-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-white/70">Төсөл оруулах</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Шалгуулах
            </span>
          </h1>
          <p className="text-white/60 text-base md:text-lg">
            Вебсайт/төслөө оруулаад community-д шалгуулаарай
          </p>
        </div>

        {/* Form Card - Centered */}
        <div className="w-full max-w-2xl">
          <GlassCard className="p-6 md:p-8">
            {/* Form Header */}
            <div className="flex items-center gap-3 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Circle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Төслийн мэдээлэл</h2>
                <p className="text-sm text-white/50">Бүх талбарыг бөглөнө үү</p>
              </div>
            </div>

            <form onSubmit={onSubmitUIOnly} className="mt-6 space-y-5">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Гарчиг <span className="text-red-400">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (errors.title) setErrors({});
                  }}
                  placeholder="Төслийн нэр..."
                  className={`h-12 bg-white/5 text-white placeholder:text-white/30
                             focus-visible:ring-2 rounded-xl transition-all
                             ${errors.title
                               ? "border-red-500 focus-visible:ring-red-500/50 focus-visible:border-red-500"
                               : "border-white/10 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 hover:border-white/20"
                             }`}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-400">Гарчиг оруулна уу</p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Тайлбар
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Төслийнхөө талаар дэлгэрэнгүй бичнэ үү..."
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30
                             focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50
                             rounded-xl transition-all hover:border-white/20 resize-none"
                />
              </div>

              {/* URL Field */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Вэб хаяг
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="https://example.com"
                    className="h-12 pl-11 bg-white/5 border-white/10 text-white placeholder:text-white/30
                               focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50
                               rounded-xl transition-all hover:border-white/20"
                  />
                </div>
              </div>

              {/* Screenshot Field */}
              {formData.screenshot ? (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white/80">
                    Зураг
                  </label>
                  <div className="relative h-48 w-full rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={formData.screenshot}
                      alt="image"
                      fill
                      className="object-center object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, screenshot: "" })}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white/80 hover:text-white transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Дэлгэцийн зураг
                  </label>
                  <div className="relative">
                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-indigo-500/50 hover:bg-white/5 transition-all group">
                      <ImgIcon className="w-8 h-8 text-white/30 group-hover:text-indigo-400 transition-colors mb-2" />
                      <span className="text-sm text-white/40 group-hover:text-white/60">Зураг оруулах</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="flex-1 h-12 text-white font-semibold rounded-xl
                            bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500
                            shadow-[0_8px_30px_rgba(99,102,241,0.3)]
                            hover:shadow-[0_8px_40px_rgba(99,102,241,0.5)]
                            hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Илгээх
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="h-12 px-6 bg-white/5 text-white/80 border border-white/10 rounded-xl
                            hover:bg-white/10 hover:text-white transition-all"
                  onClick={() => history.back()}
                >
                  Буцах
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="h-12 px-6 text-white/50 hover:text-white/80 hover:bg-white/5 rounded-xl transition-all"
                  onClick={clearAll}
                >
                  Цэвэрлэх
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
