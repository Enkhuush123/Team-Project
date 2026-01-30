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
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-130 w-130 rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-105 w-105 rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.45)]">
                Шалгуулах
              </span>
            </h1>
            <div className="mt-3 h-0.5 w-28 bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full opacity-80" />
            <p className="mt-4 text-white/75 max-w-2xl">
              Вебсайт/төслөө оруулаад community-д шалгуулаарай. Сайн
              тайлбарласан төслүүд хурдан шалгагдана.
            </p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <GlassCard className="p-6 md:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="mt-4 text-white text-xl font-semibold">
                    Төслийн мэдээлэл
                  </h2>
                </div>
              </div>

              <form onSubmit={onSubmitUIOnly} className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Title <span className="text-white/50">*</span>
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Title..."
                    className="h-11 bg-white/5 border-white/15 text-white placeholder:text-white/40
                               focus-visible:ring-0 focus-visible:border-white/30
                               transition hover:border-white/25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Description <span className="text-white/50">*</span>
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder={"Write your description"}
                    rows={7}
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/40
                               focus-visible:ring-0 focus-visible:border-white/30
                               transition hover:border-white/25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      value={formData.link}
                      onChange={(e) =>
                        setFormData({ ...formData, link: e.target.value })
                      }
                      placeholder="https://example.com"
                      className="h-11 pl-10 bg-white/5 border-white/15 text-white placeholder:text-white/40
                                 focus-visible:ring-0 focus-visible:border-white/30
                                 transition hover:border-white/25"
                    />
                  </div>
                </div>

                {formData.screenshot ? (
                  <div>
                    <div className="h-60 w-full relative">
                      <Image
                        src={formData.screenshot}
                        alt="image"
                        fill
                        className="object-center object-cover rounded-xl"
                      />
                    </div>
                    <Button
                      className="flex justify-end mt-2"
                      onClick={() => {
                        setFormData({ ...formData, screenshot: "" });
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Screenshot
                    </label>
                    <div className="relative flex items-center">
                      <ImgIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        placeholder="https://example.com/screenshot.png"
                        className="h-11 pl-10 bg-white/5 border-white/15 text-white placeholder:text-white/40
                                 focus-visible:ring-0 focus-visible:border-white/30
                                 transition hover:border-white/25 w-full "
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    onClick={onSubmitUIOnly}
                    className={[
                      "h-11 text-white font-semibold",
                      "bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600",
                      "shadow-[0_10px_28px_rgba(79,70,229,0.35)] hover:shadow-[0_12px_36px_rgba(79,70,229,0.55)]",
                      "hover:brightness-110 active:scale-[0.98] transition",
                    ].join(" ")}
                  >
                    Илгээх <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className="h-11 bg-white/10 text-white border border-white/15 hover:bg-white/15 transition"
                    onClick={() => history.back()}
                  >
                    Буцах
                  </Button>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
