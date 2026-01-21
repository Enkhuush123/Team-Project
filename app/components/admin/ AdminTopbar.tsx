"use client";

import { ShieldCheck, Sparkles } from "lucide-react";

export default function AdminTopbar() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(99,102,241,0.10)]">
      <div className="px-5 py-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-white font-semibold text-lg">Dashboard</div>
          <div className="text-white/55 text-sm">
            Admin overview & moderation tools
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-9 px-3 rounded-full bg-white/5 border border-white/10 text-white/75 flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4" /> Secure
          </div>
          <div className="h-9 px-3 rounded-full bg-white/5 border border-white/10 text-white/75 flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4" /> UI only
          </div>
        </div>
      </div>
    </div>
  );
}
