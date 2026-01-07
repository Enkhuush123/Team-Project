"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Circle,
  Globe,
  Image as ImgIcon,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";

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
    url: "",
    screenshot: "",
  });

  const clearAll = () =>
    setFormData({ title: "", description: "", url: "", screenshot: "" });

  const onSubmitUIOnly = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("UI only submit:", formData);
    // энд API/route байхгүй (frontend only)
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

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="h-10 bg-white/10 text-white border border-white/15 hover:bg-white/15"
              type="button"
              onClick={() => history.back()}
            >
              Цуцлах
            </Button>

            <Button
              variant="secondary"
              className="h-10 bg-white/10 text-white border border-white/15 hover:bg-white/15"
              onClick={clearAll}
              type="button"
            >
              <X className="h-4 w-4 mr-2" />
              Цэвэрлэх
            </Button>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <GlassCard className="p-6 md:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-white/80 text-sm backdrop-blur">
                    <Sparkles className="h-4 w-4" />
                    Project Submit
                  </div>
                  <h2 className="mt-4 text-white text-xl font-semibold">
                    Төслийн мэдээлэл
                  </h2>
                  <p className="mt-1 text-white/60 text-sm">
                    * Тайлбар дээр “юуг шалгах вэ?” гэдгийг тодорхой бич.
                  </p>
                </div>
              </div>

              <form onSubmit={onSubmitUIOnly} className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Гарчиг <span className="text-white/50">*</span>
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Жишээ: Landing page — Navbar + Hero"
                    className="h-11 bg-white/5 border-white/15 text-white placeholder:text-white/40
                               focus-visible:ring-0 focus-visible:border-white/30
                               transition hover:border-white/25"
                  />
                  <div className="mt-2 text-xs text-white/45">
                    UI only (validation байхгүй)
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Тайлбар <span className="text-white/50">*</span>
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder={`Юуг шалгах вэ?\n- Page: /pricing\n- Flow: sign up → checkout\n- Expected vs actual\n- Device/Browser`}
                    rows={7}
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/40
                               focus-visible:ring-0 focus-visible:border-white/30
                               transition hover:border-white/25"
                  />
                  <div className="mt-2 text-xs text-white/45">
                    UI only (validation байхгүй)
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    URL (сонголттой)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      value={formData.url}
                      onChange={(e) =>
                        setFormData({ ...formData, url: e.target.value })
                      }
                      placeholder="https://example.com"
                      className="h-11 pl-10 bg-white/5 border-white/15 text-white placeholder:text-white/40
                                 focus-visible:ring-0 focus-visible:border-white/30
                                 transition hover:border-white/25"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Скриншот URL (сонголттой)
                  </label>
                  <div className="relative">
                    <ImgIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      value={formData.screenshot}
                      onChange={(e) =>
                        setFormData({ ...formData, screenshot: e.target.value })
                      }
                      placeholder="https://example.com/screenshot.png"
                      className="h-11 pl-10 bg-white/5 border-white/15 text-white placeholder:text-white/40
                                 focus-visible:ring-0 focus-visible:border-white/30
                                 transition hover:border-white/25"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
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

          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-6 sticky top-20">
              <div className="text-white font-semibold text-lg">
                Ready checklist
              </div>
              <p className="mt-2 text-white/60 text-sm">
                (UI only) Checklist нь статик.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  { title: "1) Гарчиг", desc: "Товч, ойлгомжтой" },
                  { title: "2) Тайлбар", desc: "“Юуг шалгах вэ?” + flow бич" },
                  { title: "3) URL format", desc: "Оруулсан бол зөв байх" },
                  { title: "4) Screenshot URL", desc: "Сонголттой" },
                ].map((s) => (
                  <div
                    key={s.title}
                    className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-start gap-3"
                  >
                    <Circle className="h-5 w-5 text-white/35 mt-0.5" />
                    <div>
                      <div className="text-white/90 font-medium">{s.title}</div>
                      <div className="text-white/55 text-sm">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 h-px bg-white/10" />
              <div className="mt-4 text-sm text-white/70">
                Status: <span className="text-white/55">UI ONLY</span>
              </div>

              <div className="mt-5 rounded-2xl bg-linear-to-br from-white/6 to-white/3 border border-white/10 p-4">
                <div className="text-white/60 text-xs mb-2">Preview</div>
                <div className="text-white font-semibold line-clamp-1">
                  {formData.title.trim() ? formData.title : "Project title…"}
                </div>
                <div className="mt-2 text-white/70 text-sm line-clamp-3">
                  {formData.description.trim()
                    ? formData.description
                    : "Project description preview…"}
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/65">
                  <span className="rounded-full bg-white/5 border border-white/10 px-2 py-1">
                    Submit
                  </span>
                  <span className="rounded-full bg-white/5 border border-white/10 px-2 py-1">
                    Community review
                  </span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
