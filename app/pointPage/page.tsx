"use client";

import { useEffect, useState } from "react";
import BuyPoints from "../components/buyPoints";
import UserPoints from "../components/userPoints";
import CoinIcon from "../_icons/CoinIcon";
import { Sparkles, Wallet } from "lucide-react";

export default function PointPage() {
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setPoints(data.userData.points ?? 0);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-violet-500/20">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/15 to-indigo-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.3),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.2),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left: Title */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/40 ring-2 ring-violet-400/30">
                  <Wallet className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-violet-100 to-purple-200 bg-clip-text text-transparent">
                  Coin Wallet
                </h1>
              </div>
              <p className="text-violet-200/70 text-lg">
                Manage your coins, transfer to friends, and buy more
              </p>
            </div>

            {/* Right: Balance Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-violet-500/40 to-purple-600/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-3xl" />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-violet-400/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-2 text-violet-300 text-sm font-semibold mb-3">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  Current Balance
                </div>
                <div className="flex items-center gap-4">
                  <div className="scale-150 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                    <CoinIcon />
                  </div>
                  <div>
                    {loading ? (
                      <div className="h-12 w-32 bg-white/10 animate-pulse rounded-lg" />
                    ) : (
                      <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-violet-100 bg-clip-text text-transparent">
                        {points.toLocaleString()}
                      </span>
                    )}
                    <span className="text-violet-300/70 text-lg ml-2 font-medium">coins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UserPoints points={points} />
          <BuyPoints onBought={(newPoints) => setPoints(newPoints)} />
        </div>
      </div>
    </div>
  );
}
