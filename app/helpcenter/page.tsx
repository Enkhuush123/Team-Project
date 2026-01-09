"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ArrowRight, LifeBuoy } from "lucide-react";

export default function HelpCenter() {
  const categories = [
    {
      title: "Community Rules",
      desc: "Learn our rules and policies",
      href: "/rules",
    },

    {
      title: "About us",
      desc: "More information about us",
      href: "/about",
    },
    {
      title: "Report",
      desc: "Report a user or content",
      href: "/report",
    },
  ];

  const popular = [
    { title: "How to create a post", href: "/help/posting" },
    { title: "Reset your password", href: "/help/account" },
    { title: "Why was my post removed?", href: "/help/rules" },
  ];

  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter((c) => {
      return (
        c.title.toLowerCase().includes(query) ||
        (c.desc || "").toLowerCase().includes(query)
      );
    });
  }, [q]);

  return (
    <main className="relative min-h-[calc(100vh-56px)] w-full bg-black">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-white/80 text-sm backdrop-blur">
              <LifeBuoy className="h-4 w-4" />
              Help Center
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.45)]">
                How can we help you?
              </span>
            </h1>

            <div className="mt-3 h-[2px] w-28 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full opacity-80" />

            <p className="mt-4 text-white/70">
              Account, posting, rules, technical асуудлуудын шийдлийг эндээс
              олно. Search хийгээд шууд category руу ор.
            </p>
          </div>
        </div>

        <section className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="
                  group rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                  shadow-[0_20px_60px_rgba(99,102,241,0.10)]
                  p-6 transition
                  hover:bg-white/8 hover:border-white/15
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60">
                      {cat.desc || ""}
                    </p>
                  </div>

                  <span
                    className="
                      shrink-0 h-9 w-9 rounded-xl
                      bg-white/5 border border-white/10
                      flex items-center justify-center
                      text-white/70
                      group-hover:bg-white/10 group-hover:border-white/15
                      transition
                    "
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-10 text-center text-white/60">
              Олдсонгүй 😅 өөр keyword-р хайгаад үз.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
