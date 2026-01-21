"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Mail,
  FileText,
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

export default function Report() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    const reportData = {
      title,
      description,
      email,
      createdAt: new Date(),
    };

    console.log("Report:", reportData);

    setSuccess(true);
    setTitle("");
    setDescription("");
    setEmail("");
  };

  return (
    <main className="relative min-h-[calc(100vh-56px)] w-full bg-black">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-130 w-130 rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-105 w-105 rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-white/80 text-sm backdrop-blur">
              <AlertTriangle className="h-4 w-4" />
              Report
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.45)]">
                Report an Issue
              </span>
            </h1>

            <div className="mt-3 h-0.2 w-28 bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full opacity-80" />

            <p className="mt-4 text-white/70">
              Found a bug, user issue, or content problem? Submit a report here.
              (UI only — API can be added later)
            </p>
          </div>

          {success && (
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-3 py-2 text-emerald-200 text-sm backdrop-blur">
              <CheckCircle2 className="h-4 w-4" />
              Report submitted successfully
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <GlassCard className="p-6 md:p-7">
              <div className="text-white font-semibold text-lg">
                Report details
              </div>
              <p className="mt-1 text-white/55 text-sm">
                * Title and description are required. Email is optional.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Title *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      className="w-full h-11 pl-10 pr-3 rounded-xl bg-white/5 border border-white/15
                                 text-white placeholder:text-white/35 outline-none
                                 focus-visible:border-white/30 transition hover:border-white/25"
                      placeholder="Example: Submit page crashes on click"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Description *
                  </label>
                  <textarea
                    className="w-full min-h-35 rounded-xl px-4 py-3 resize-none
                               bg-white/5 border border-white/15 text-white
                               placeholder:text-white/35 outline-none
                               focus-visible:border-white/30 transition hover:border-white/25"
                    placeholder={`Details:\n- Steps to reproduce\n- Expected vs actual behavior\n- Browser / device`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email (optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      className="w-full h-11 pl-10 pr-3 rounded-xl bg-white/5 border border-white/15
                                 text-white placeholder:text-white/35 outline-none
                                 focus-visible:border-white/30 transition hover:border-white/25"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSubmit}
                    className="h-11 px-6 rounded-xl font-semibold text-white
                               bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600
                               shadow-[0_10px_28px_rgba(79,70,229,0.35)]
                               hover:brightness-110 active:scale-[0.98] transition
                               inline-flex items-center justify-center"
                  >
                    Submit report <ArrowRight className="ml-2 h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTitle("");
                      setDescription("");
                      setEmail("");
                      setSuccess(false);
                    }}
                    className="h-11 px-6 rounded-xl font-semibold
                               bg-white/10 text-white border border-white/15
                               hover:bg-white/15 active:scale-[0.98] transition"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-4">
            <GlassCard className="p-6 sticky top-20">
              <div className="text-white font-semibold text-lg">Tips</div>
              <p className="mt-2 text-white/60 text-sm">
                To help us resolve the issue faster:
              </p>

              <div className="mt-5 space-y-3">
                {[
                  { t: "Steps", d: "How can we reproduce it?" },
                  { t: "Expected vs Actual", d: "What should happen?" },
                  { t: "Environment", d: "Browser, device, OS" },
                  { t: "Media", d: "Screenshots or videos if possible" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-xl bg-white/5 border border-white/10 p-3"
                  >
                    <div className="text-white/85 font-medium">{x.t}</div>
                    <div className="text-white/55 text-sm">{x.d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 h-px bg-white/10" />
              <div className="mt-4 text-xs text-white/45">Status: UI ONLY</div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}
