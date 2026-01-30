"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Project = {
  id: string;
  title: string;
  description: string;
  url: string | null;
  user: {
    name?: string | null;
    email?: string | null;
    imageUrl: string | null;
  };
  imageUrl?: string | null;
};

const UPLOAD_PRESET = "softwarecom";
const CLOUD_NAME = "dv38igwqg";

export default function TestPage() {
  const [project, setProject] = useState<Project[]>([]);
  const [activeWebsiteId, setActiveWebsiteId] = useState<string | null>(null);

  console.log(project, "gg");

  const [bug, setBug] = useState({
    description: "",
    screenshot: "",
  });

  const [uploading, setUploading] = useState(false);

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

  const submitBug = async (
    e: React.FormEvent<HTMLFormElement>,
    websiteId: string,
  ) => {
    e.preventDefault();

    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        websiteId: websiteId,
        description: bug.description,
        screenshotUrl: bug.screenshot || null,
      }),
    });

    const data = await res.json();
    console.log("REVIEW RESPONSE:", data);

    if (!res.ok) {
      alert(data?.message || "Failed");
      return;
    }

    setBug({ description: "", screenshot: "" });
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
    <div className="bg-black min-h-screen p-10 ">
      <h1 className="text-white text-2xl font-bold mb-6">Lets Test</h1>

      {project.length === 0 && <p className="text-white/60">No</p>}

      <div className="space-y-10 w-full  flex justify-evenly">
        {project.map((p) => (
          <div
            key={p.id}
            className="flex gap-10 w-150  h-150 flex-col border border-white/10 rounded-2xl p-6 bg-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-black/40">
                {p.user.imageUrl ? (
                  <Image
                    src={p.user.imageUrl}
                    alt={p.user.name || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10" />
                )}
              </div>

              <p className="text-white/60 text-sm">{p.user.email}</p>
            </div>
            <h2 className="text-white text-xl font-semibold">{p.title}</h2>

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

            <p className="text-white/80">{p.description}</p>

            <div className="flex gap-3">
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

                <DialogContent className="sm:max-w-130 bg-[#0b0b0f] border border-white/10 text-white">
                  <form
                    onSubmit={(e) => {
                      if (!activeWebsiteId) return;
                      void submitBug(e, activeWebsiteId);
                    }}
                  >
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
                          required
                        />
                      </div>

                      <div>
                        <p className="text-white/80 mb-2">Screenshot</p>

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
                                setBug((prev) => ({ ...prev, screenshot: "" }))
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

                    <DialogFooter className="mt-6">
                      <Button type="submit" disabled={uploading}>
                        {uploading ? "Uploading..." : "Submit a bug"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
