"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Image as ImgIcon,
  Sparkles,
  Filter,
  ArrowRight,
} from "lucide-react";

/* =======================
   Mock data (Design only)
   ======================= */
const MOCK_PROJECTS = [
  {
    id: "p1",
    title: "Landing page — Animation + Navbar",
    description:
      "Hero section дээр responsive + navbar overflow шалгаад bug report хийгээрэй.",
    url: "https://example.com",
    screenshot: null,
    status: "OPEN",
    user: { name: "Manlai", email: "manlai@mail.com" },
  },
  {
    id: "p2",
    title: "Auth flow — Reset Password",
    description: "Forgot password → reset link → redirect зөв эсэхийг шалга.",
    url: "https://auth.example.com",
    screenshot:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    status: "OPEN",
    user: { name: "Alpha", email: "alpha@mail.com" },
  },
  {
    id: "p3",
    title: "Mobile UI — Sidebar toggle",
    description: "iPhone дээр sidebar animation тасалдах эсэхийг шалга.",
    url: null,
    screenshot: null,
    status: "OPEN",
    user: { name: null, email: "hunter@mail.com" },
  },
];

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(99,102,241,0.10)] ${className}`}
    >
      {children}
    </div>
  );
}

function Pill({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-9 px-3 rounded-full text-sm border backdrop-blur-md transition
        ${
          active
            ? "bg-white/12 border-white/25 text-white"
            : "bg-white/5 border-white/10 text-white/75 hover:bg-white/8"
        }`}
      type="button"
    >
      {children}
    </button>
  );
}

export default function TestPage() {
  const [onlyOpen, setOnlyOpen] = useState(true);
  const [onlyWithUrl, setOnlyWithUrl] = useState(false);
  const [onlyWithShot, setOnlyWithShot] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_PROJECTS.filter((p) => {
      if (onlyOpen && p.status !== "OPEN") return false;
      if (onlyWithUrl && !p.url) return false;
      if (onlyWithShot && !p.screenshot) return false;
      return true;
    });
  }, [onlyOpen, onlyWithUrl, onlyWithShot]);

  const recommended = filtered[0];

  return (
    <div className=" bg-black">
      {/* Glow bg */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Шалгах Mode
              </span>
            </h1>
            <p className="mt-4 text-white/75 max-w-xl">
              Website нээ → Bug ол → Report илгээ. Илгээх бүрт оноо авна.
            </p>
          </div>

          {/* Filters */}
          <GlassCard className="p-3">
            <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
              <Filter className="h-4 w-4" /> Filter
            </div>
            <div className="flex gap-2 flex-wrap">
              <Pill active={onlyOpen} onClick={() => setOnlyOpen(!onlyOpen)}>
                Open only
              </Pill>
              <Pill
                active={onlyWithUrl}
                onClick={() => setOnlyWithUrl(!onlyWithUrl)}
              >
                Has URL
              </Pill>
              <Pill
                active={onlyWithShot}
                onClick={() => setOnlyWithShot(!onlyWithShot)}
              >
                Has Screenshot
              </Pill>
            </div>
          </GlassCard>
        </div>

        {/* Recommended */}
        {recommended && (
          <GlassCard className="p-6">
            <div className="flex justify-between items-center gap-4">
              <div>
                <div className="text-xs text-white/60">Recommended</div>
                <h2 className="text-lg text-white font-semibold">
                  {recommended.title}
                </h2>
                <p className="mt-1 text-white/70 text-sm line-clamp-2">
                  {recommended.description}
                </p>
              </div>
              <Link href={`/test/${recommended.id}`}>
                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                  Эхлүүлэх <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </GlassCard>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <GlassCard key={p.id}>
              {p.screenshot ? (
                <img src={p.screenshot} className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 bg-white/5" />
              )}
              <div className="p-5">
                <h3 className="text-white font-semibold">{p.title}</h3>
                <p className="mt-2 text-white/70 text-sm line-clamp-3">
                  {p.description}
                </p>
                <p className="mt-3 text-xs text-white/50">
                  {p.user.name || p.user.email}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
