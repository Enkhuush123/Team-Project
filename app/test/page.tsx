"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Image as ImgIcon,
  Sparkles,
  Filter,
  X,
  User,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  url?: string | null;
  screenshot?: string | null;
  status?: string;
  user?: { name?: string | null; email?: string | null } | null;
};

const MOCK_PROJECTS: Project[] = [
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
      className={[
        "h-9 px-3 rounded-full text-sm transition",
        "border backdrop-blur-md",
        active
          ? "bg-white/12 border-white/25 text-white"
          : "bg-white/5 border-white/10 text-white/75 hover:bg-white/8 hover:text-white",
      ].join(" ")}
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

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MOCK_PROJECTS.filter((p) => {
      const status = (p.status || "OPEN").toUpperCase();
      if (onlyOpen && status !== "OPEN") return false;
      if (onlyWithUrl && !p.url) return false;
      if (onlyWithShot && !p.screenshot) return false;
      return true;
    });
  }, [onlyOpen, onlyWithUrl, onlyWithShot]);

  const recommended = filtered[0];

  const selected =
    (selectedId && MOCK_PROJECTS.find((p) => p.id === selectedId)) || null;

  return (
    <div className="min-h-screen bg-black">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 py-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.45)]">
                Шалгах Mode
              </span>
            </h1>
            <div className="mt-3 h-[2px] w-28 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full opacity-80" />
            <p className="mt-4 text-white/75 max-w-2xl">
              3 алхам: <span className="text-white">Website нээ</span> →{" "}
              <span className="text-white">Bug ол</span> →{" "}
              <span className="text-white">Report илгээ</span>. Илгээсэн бүрт
              оноо нэмэгдэнэ.
            </p>
          </div>

          <GlassCard className="p-3">
            <div className="flex items-center gap-2 text-white/70 text-sm px-1">
              <Filter className="h-4 w-4" />
              Filter
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill active={onlyOpen} onClick={() => setOnlyOpen((v) => !v)}>
                Open only
              </Pill>
              <Pill
                active={onlyWithUrl}
                onClick={() => setOnlyWithUrl((v) => !v)}
              >
                Has URL
              </Pill>
              <Pill
                active={onlyWithShot}
                onClick={() => setOnlyWithShot((v) => !v)}
              >
                Has Screenshot
              </Pill>
            </div>
          </GlassCard>
        </div>

        {selected && (
          <GlassCard className="p-5 md:p-6">
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
                          {selected.screenshot
                            ? "Screenshot байна"
                            : "Screenshot байхгүй"}
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
                  <Button
                    className="h-11 text-white font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_10px_28px_rgba(79,70,229,0.35)] hover:brightness-110"
                    onClick={() => alert("UI only")}
                  >
                    Start testing
                  </Button>

                  {selected.url && (
                    <Button
                      variant="secondary"
                      className="h-11 bg-white/10 text-white border border-white/15 hover:bg-white/15"
                      onClick={() => window.open(selected.url!, "_blank")}
                    >
                      Open URL
                    </Button>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-[420px]">
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                  {selected.screenshot ? (
                    <img
                      src={selected.screenshot}
                      alt={selected.title}
                      className="w-full h-[240px] lg:h-[260px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-[240px] lg:h-[260px] flex items-center justify-center text-white/40 text-sm">
                      Screenshot байхгүй
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {filtered.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <GlassCard
                key={p.id}
                className={[
                  "overflow-hidden transition",
                  selectedId === p.id
                    ? "border-white/25 shadow-[0_20px_70px_rgba(99,102,241,0.18)]"
                    : "",
                ].join(" ")}
              >
                {p.screenshot ? (
                  <img
                    src={p.screenshot}
                    alt={p.title}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-white/5 border-b border-white/10" />
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-white font-semibold text-lg line-clamp-1">
                      {p.title}
                    </h3>
                    <span className="shrink-0 text-xs text-white/70 rounded-full bg-white/5 border border-white/10 px-3 py-1">
                      {(p.status || "OPEN").toUpperCase()}
                    </span>
                  </div>

                  <p className="mt-2 text-white/70 text-sm line-clamp-3">
                    {p.description}
                  </p>

                  <p className="mt-3 text-white/50 text-xs">
                    {p.user?.name || p.user?.email || ""}
                  </p>

                  <div className="mt-5 flex gap-2 w-full">
                    <Button
                      onClick={() => setSelectedId(p.id)}
                      className="w-full h-10 text-white font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_10px_28px_rgba(79,70,229,0.35)] hover:brightness-110"
                    >
                      Шалгах
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
