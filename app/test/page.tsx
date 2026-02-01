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

import { Sparkles, X, User, Globe, Image as ImgIcon } from "lucide-react";

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

export default function TestPage() {
  const [project, setProject] = useState<Project[]>([]);
  const [activeWebsiteId, setActiveWebsiteId] = useState<string | null>(null);

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [geminiResponseLoading, setGeminiResponseLoading] = useState(false);

  const [showGeminiResponse, setShowGeminiResponse] = useState(false);
  const [geminiResponse, setGeminiResponse] =
    useState<GeminiResponseType | null>(null);

  console.log(project);

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
      { method: "POST", body: formDataCloudinary }
    );

    const data = await res.json();
    return data.secure_url as string;
  };

  const handleBugImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
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
    console.log("REVIEW RESPONSE:", data);

    if (!res.ok) {
      alert(data?.message || "Failed");
      return;
    }

    setBug({ description: "", screenshot: "" });
    setActiveWebsiteId(null);
  };

  useEffect(() => {
    const getWebsites = async () => {
      const res = await fetch("/api/website");
      const data = await res.json();
      setProject(data.websites ?? []);
    };
    getWebsites();
  }, []);

  return (
    <div className="bg-black min-h-screen p-10">
      <h1 className="text-white text-2xl font-bold mb-6">Lets Test</h1>

      {project.length === 0 && <p className="text-white/60">No websites</p>}

      {selected && (
        <GlassCard className="p-5 md:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white/80" />
                  </div>

                  <div>
                    <div className="text-white/60 text-xs">Selected</div>
                    <div className="text-white font-semibold text-xl">
                      {selected.title}
                    </div>
                    <div className="mt-2 text-white/70 text-sm leading-relaxed">
                      {selected.description}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/65">
                      <span className="rounded-full bg-white/5 border border-white/10 px-2 py-1">
                        {(selected.status || "OPEN").toUpperCase()}
                      </span>

                      <span className="rounded-full bg-white/5 border border-white/10 px-2 py-1 flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {selected.user?.name ||
                          selected.user?.email ||
                          "Unknown"}
                      </span>

                      <span className="rounded-full bg-white/5 border border-white/10 px-2 py-1 flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5" />
                        {selected.url ? "URL байна" : "URL байхгүй"}
                      </span>

                      <span className="rounded-full bg-white/5 border border-white/10 px-2 py-1 flex items-center gap-1">
                        <ImgIcon className="h-3.5 w-3.5" />
                        {selected.imageUrl ? "Image байна" : "Image байхгүй"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center text-white/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                {selected.url && (
                  <a
                    className="h-10 px-4 rounded-xl border border-white/15 text-white/90 hover:bg-white/10 inline-flex items-center justify-center"
                    href={selected.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open URL
                  </a>
                )}

                <Button
                  type="button"
                  className="h-10 bg-white/10 border border-white/15 text-white hover:bg-white/15"
                  onClick={() => {
                    setActiveWebsiteId(selected.id);
                    setBug({ description: "", screenshot: "" });
                  }}
                >
                  Prepare Bug Form
                </Button>
              </div>
            </div>

            <div className="w-full lg:w-[420px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                {selected.imageUrl ? (
                  <div className="relative w-full h-[240px] lg:h-[260px]">
                    <Image
                      src={selected.imageUrl}
                      alt={selected.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[240px] lg:h-[260px] flex items-center justify-center text-white/40 text-sm">
                    Image байхгүй
                  </div>
                )}
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="space-y-10">
        {project.map((p) => (
          <GlassCard key={p.id} className="p-6">
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-white text-xl font-semibold">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-white/80">{p.description}</p>
                  <p className="mt-2 text-white/60 text-sm">
                    {p.user?.name || p.user?.email || "Unknown"}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  className="h-10 bg-white/10 text-white border border-white/15 hover:bg-white/15"
                  onClick={() => setSelectedId(p.id)}
                >
                  Select
                </Button>
              </div>

              {p.imageUrl && (
                <div className="relative w-full max-w-xl aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                {p.url && (
                  <a
                    className="text-white px-4 py-2 flex items-center justify-center border border-white/15 rounded-2xl hover:bg-white/10"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open URL
                  </a>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      onClick={() => {
                        setActiveWebsiteId(p.id);
                        setBug({ description: "", screenshot: "" });
                      }}
                      className="text-white border border-white/15 rounded-2xl bg-white/10 hover:bg-white/15"
                    >
                      Submit a Bug
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[520px] bg-[#0b0b0f] border border-white/10 text-white">
                    <form onSubmit={submitBug}>
                      <DialogHeader>
                        <DialogTitle>Submit Bug</DialogTitle>
                      </DialogHeader>

                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-white/80 mb-2">Description</p>
                          <textarea
                            value={bug.description}
                            onChange={(e) =>
                              setBug((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                            className="w-full h-28 rounded-xl bg-white/5 border border-white/15 outline-0 p-3 text-white"
                            placeholder="Юу буруу байна? Аль page дээр? Яаж reproduce хийх вэ?"
                            required
                          />
                        </div>

                        <div>
                          <p className="text-white/80 mb-2">
                            Screenshot (optional)
                          </p>

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
                                className="bg-white/10 text-white border border-white/15 hover:bg-white/15"
                                onClick={() =>
                                  setBug((prev) => ({
                                    ...prev,
                                    screenshot: "",
                                  }))
                                }
                              >
                                Delete screenshot
                              </Button>
                            </div>
                          ) : (
                            <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleBugImageUpload}
                                className="text-white/80"
                              />

                              {uploading && (
                                <p className="text-white/60 text-sm mt-2">
                                  Uploading...
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <DialogFooter className="mt-6 gap-2">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="secondary"
                            className="bg-white/10 text-white border border-white/15 hover:bg-white/15"
                          >
                            Cancel
                          </Button>
                        </DialogClose>

                        <Button type="submit" disabled={uploading}>
                          {uploading ? "Uploading..." : "Submit a bug"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
