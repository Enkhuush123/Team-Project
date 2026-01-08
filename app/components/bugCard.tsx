"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Bug, ArrowRight, Trophy } from "lucide-react";

export default function BugCard() {
  const router = useRouter();

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(99,102,241,0.10)]">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Bug className="h-5 w-5 text-white/80" />
          </div>
          <div>
            <div className="text-white font-semibold text-lg">
              User Test & Points
            </div>
            <div className="text-white/55 text-sm">
              Submit bug and earn points.
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
          <Trophy className="h-4 w-4" /> Reward
        </div>
      </div>

      <div className="p-5">
        <div className="rounded-xl bg-linear-to-br from-white/6 to-white/3 border border-white/10 p-4">
          <div className="text-white/80 font-medium">How it works</div>
          <ul className="mt-2 text-white/65 text-sm space-y-1">
            <li>• Project оруулна</li>

            <li>• Зөв report → point авна</li>
          </ul>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => router.push("/hero")}
            className="flex-1 h-10 text-white font-semibold bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_10px_28px_rgba(79,70,229,0.35)] hover:brightness-110"
          >
            Submit a Bug <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
