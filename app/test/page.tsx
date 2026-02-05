"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Sparkles,
  X,
  User,
  Globe,
  Image as ImgIcon,
  Bug,
  ExternalLink,
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  Upload,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  url: string | null;
  user?: { name?: string | null; email?: string | null } | null;
  imageUrl?: string | null;
  screenshot?: string | null;
  status?: string;
};

type GeminiResponseType = {
  ai: {
    reason: string;
  };
  review: {
    status: string;
  };
};

const UPLOAD_PRESET = "softwarecom";
const CLOUD_NAME = "dv38igwqg";

function GlassCard({
  children,
  className = "",
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        hover
          ? "transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(99,102,241,0.2)] hover:scale-[1.02]"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function TestPage() {
  const [project, setProject] = useState<Project[]>([]);
  const [activeWebsiteId, setActiveWebsiteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [geminiResponseLoading, setGeminiResponseLoading] = useState(false);

  const [showGeminiResponse, setShowGeminiResponse] = useState(false);
  const [geminiResponse, setGeminiResponse] =
    useState<GeminiResponseType | null>(null);

  const [bug, setBug] = useState({
    description: "",
    screenshot: "",
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);

  const selected = useMemo(() => {
    if (!selectedId) return null;
    return project.find((p) => p.id === selectedId) ?? null;
  }, [selectedId, project]);

  const uploadToCloudinary = async (file: File) => {
    const formDataCloudinary = new FormData();
    formDataCloudinary.append("file", file);
    formDataCloudinary.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formDataCloudinary },
    );

    const data = await res.json();
    return data.secure_url as string;
  };

  const handleBugImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setBug((prev) => ({ ...prev, screenshot: url ?? "" }));
    } catch (err) {
      console.error("upload failed", err);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const submitBug = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activeWebsiteId) {
      alert("Website сонгоогүй байна");
      return;
    }

    setGeminiResponseLoading(true);

    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        websiteId: activeWebsiteId,
        description: bug.description,
        screenshotUrl: bug.screenshot || null,
      }),
    });

    setGeminiResponseLoading(false);
    setShowSubmitDialog(false);
    setShowGeminiResponse(true);

    const data = await res.json();
    setGeminiResponse(data);

    if (!res.ok) {
      alert(data?.message || "Failed");
      return;
    }

    setBug({ description: "", screenshot: "" });
    setActiveWebsiteId(null);
  };

  useEffect(() => {
    const getWebsites = async () => {
      setLoading(true);
      const res = await fetch("/api/website");
      const data = await res.json();
      setProject(data.websites ?? []);
      setLoading(false);
    };
    getWebsites();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-6 pt-12 pb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Bug className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Веб Шалгах
              </h1>
              <p className="text-white/50 text-sm mt-1">
                Бусдын вебсайтуудаас bug олж, оноо цуглуул
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-12">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-violet-500 animate-spin mb-4" />
            <p className="text-white/60">Ачааллаж байна...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && project.length === 0 && (
          <GlassCard className="p-12 text-center">
            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-white/30" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Вебсайт олдсонгүй
            </h3>
            <p className="text-white/50">
              Одоогоор шалгах вебсайт байхгүй байна
            </p>
          </GlassCard>
        )}

        {/* Selected Website Card */}
        {selected && (
          <GlassCard className="p-6 md:p-8 mb-8 border-violet-500/30">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
                      <Sparkles className="h-7 w-7 text-violet-400" />
                    </div>

                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium mb-2">
                        Сонгогдсон
                      </span>
                      <h2 className="text-white font-bold text-2xl">
                        {selected.title}
                      </h2>
                      <p className="mt-3 text-white/70 leading-relaxed">
                        {selected.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 text-xs font-medium">
                          {(selected.status || "OPEN").toUpperCase()}
                        </span>

                        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 flex items-center gap-1.5 text-xs text-white/70">
                          <User className="h-3.5 w-3.5" />
                          {selected.user?.name ||
                            selected.user?.email ||
                            "Unknown"}
                        </span>

                        {selected.url && (
                          <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 flex items-center gap-1.5 text-xs text-white/70">
                            <Globe className="h-3.5 w-3.5" />
                            URL байна
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center text-white/60 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {selected.url && (
                    <a
                      className="h-11 px-5 rounded-xl border border-white/15 text-white/90 hover:bg-white/10 hover:border-white/25 inline-flex items-center justify-center gap-2 transition-all"
                      href={selected.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Вебсайт нээх
                    </a>
                  )}

                  <Dialog
                    open={showSubmitDialog}
                    onOpenChange={setShowSubmitDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        className="h-11 px-5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-medium shadow-lg shadow-violet-500/25 transition-all"
                        onClick={() => {
                          setActiveWebsiteId(selected.id);
                          setBug({ description: "", screenshot: "" });
                        }}
                      >
                        <Bug className="h-4 w-4 mr-2" />
                        Bug илгээх
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[520px] bg-[#12121a] border border-white/10 text-white">
                      <form onSubmit={submitBug}>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3 text-xl">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                              <Bug className="h-5 w-5 text-white" />
                            </div>
                            Bug илгээх
                          </DialogTitle>
                        </DialogHeader>

                        <div className="mt-6 space-y-5">
                          <div>
                            <label className="text-white/80 text-sm font-medium mb-2 block">
                              Тайлбар
                            </label>
                            <textarea
                              value={bug.description}
                              onChange={(e) =>
                                setBug((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              className="w-full h-32 rounded-xl bg-white/5 border border-white/15 focus:border-violet-500/50 outline-none p-4 text-white placeholder:text-white/30 transition-colors resize-none"
                              placeholder="Юу буруу байна? Аль page дээр? Яаж reproduce хийх вэ?"
                              required
                            />
                          </div>

                          <div>
                            <label className="text-white/80 text-sm font-medium mb-2 block">
                              Screenshot (заавал биш)
                            </label>

                            {bug.screenshot ? (
                              <div className="space-y-3">
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                                  <Image
                                    src={bug.screenshot}
                                    alt="bug screenshot"
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <Button
                                  type="button"
                                  variant="secondary"
                                  className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                                  onClick={() =>
                                    setBug((prev) => ({
                                      ...prev,
                                      screenshot: "",
                                    }))
                                  }
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Устгах
                                </Button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleBugImageUpload}
                                  className="hidden"
                                />
                                {uploading ? (
                                  <Loader2 className="h-8 w-8 text-violet-400 animate-spin" />
                                ) : (
                                  <>
                                    <Upload className="h-8 w-8 text-white/40 mb-2" />
                                    <span className="text-white/50 text-sm">
                                      Зураг оруулах
                                    </span>
                                  </>
                                )}
                              </label>
                            )}
                          </div>
                        </div>

                        <DialogFooter className="mt-8 gap-3">
                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="secondary"
                              className="bg-white/5 text-white border border-white/15 hover:bg-white/10"
                            >
                              Болих
                            </Button>
                          </DialogClose>

                          <Button
                            type="submit"
                            disabled={geminiResponseLoading}
                            className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-medium"
                          >
                            {geminiResponseLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Шалгаж байна...
                              </>
                            ) : (
                              "Илгээх"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="w-full lg:w-[400px]">
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                  {selected.imageUrl ? (
                    <div className="relative w-full h-[260px]">
                      <Image
                        src={selected.imageUrl}
                        alt={selected.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[260px] flex flex-col items-center justify-center text-white/30">
                      <ImgIcon className="h-12 w-12 mb-2" />
                      <span className="text-sm">Зураг байхгүй</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Website Grid */}
        {!loading && project.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {project.map((p) => (
              <GlassCard
                key={p.id}
                hover
                className={`overflow-hidden ${selectedId === p.id ? "ring-2 ring-violet-500" : ""}`}
              >
                {/* Image */}
                {p.imageUrl ? (
                  <div className="relative w-full h-48 bg-black">
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 flex items-center justify-center">
                    <Globe className="h-16 w-16 text-white/20" />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="text-white text-lg font-semibold line-clamp-1">
                      {p.title}
                    </h2>
                    <span className="shrink-0 rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-xs font-medium">
                      OPEN
                    </span>
                  </div>

                  <p className="text-white/60 text-sm line-clamp-2 mb-4">
                    {p.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-white/50 mb-5">
                    <User className="h-3.5 w-3.5" />
                    {p.user?.name || p.user?.email || "Unknown"}
                  </div>

                  <div className="flex gap-2">
                    {p.url && (
                      <a
                        className="flex-1 h-10 rounded-xl border border-white/15 text-white/80 hover:bg-white/10 hover:text-white inline-flex items-center justify-center gap-2 text-sm transition-all"
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Нээх
                      </a>
                    )}

                    <Button
                      type="button"
                      className={`flex-1 h-10 text-sm font-medium ${
                        selectedId === p.id
                          ? "bg-violet-600 text-white"
                          : "bg-white/10 text-white border border-white/15 hover:bg-white/15"
                      }`}
                      onClick={() => setSelectedId(p.id)}
                    >
                      {selectedId === p.id ? "Сонгогдсон" : "Сонгох"}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Gemini Response Dialog */}
        <Dialog open={showGeminiResponse} onOpenChange={setShowGeminiResponse}>
          <DialogContent className="sm:max-w-[480px] bg-[#12121a] border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="flex flex-col items-center text-center pt-4">
                {geminiResponse?.review.status === "REJECTED" ? (
                  <>
                    <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                      <XCircle className="h-8 w-8 text-red-400" />
                    </div>
                    <span className="text-2xl font-bold text-red-400">
                      Татгалзсан
                    </span>
                  </>
                ) : (
                  <>
                    <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                    </div>
                    <span className="text-2xl font-bold text-emerald-400">
                      Зөвшөөрөгдсөн
                    </span>
                  </>
                )}
                <p className="mt-4 text-white/70 text-base font-normal leading-relaxed">
                  {geminiResponse?.ai.reason}
                </p>
              </DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
