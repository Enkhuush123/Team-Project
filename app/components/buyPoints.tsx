"use client";

import { useEffect, useState } from "react";
import { usePoints } from "../providers/PointProvider";
import CoinIcon from "../_icons/CoinIcon";
import { Check, Loader, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { fireCoinConfetti } from "../utils/confetti";
import { playCoinSound } from "../utils/sound";

type Pack = {
  key: string;
  name: string;
  points: number;
  price: number;
  popular: boolean;
  bonusPct: number;
};

export default function BuyPoints({
  onBought,
}: {
  onBought: (newPoints: number) => void;
}) {
  const { setPoints } = usePoints();
  const [packs, setPacks] = useState<Pack[]>([]);

  const [loadingPack, setLoadingPack] = useState<string | null>(null);
  const [successPack, setSuccessPack] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/pack");
      const data = await res.json();
      setPacks(data.packs ?? []);
    };
    load();
  }, []);

  const buy = async (packKey: string) => {
    setLoadingPack(packKey);
    const pack = packs.find((p) => p.key === packKey);

    const res = await fetch(`/api/points/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packKey }),
    });

    const data = await res.json();
    setLoadingPack(null);

    if (!res.ok) {
      toast.error("Худалдан авалт амжилтгүй", {
        description: data.error || "Дахин оролдоно уу",
      });
      return;
    }

    // Success!
    setSuccessPack(packKey);
    setPoints(data.points);
    onBought(data.points);

    // Fire confetti and play sound!
    fireCoinConfetti();
    playCoinSound();

    // Show success toast
    toast.success("Амжилттай!", {
      description: `${pack?.points.toLocaleString() || ""} оноо нэмэгдлээ`,
      icon: "🎉",
    });

    setTimeout(() => {
      setSuccessPack(null);
    }, 1500);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10 bg-linear-to-r from-indigo-500/10 to-violet-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Buy Points</h2>
            <p className="text-white/50 text-sm">Choose a pack to purchase</p>
          </div>
        </div>
      </div>


      <div className="p-6 space-y-3">
        {packs.length === 0 ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          packs.map((p) => (
            <div
              key={p.key}
              className={`relative flex items-center justify-between rounded-xl p-4 transition-all ${
                p.popular
                  ? "bg-linear-to-r from-indigo-500/15 to-violet-500/15 border-2 border-indigo-500/50"
                  : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >

              {p.popular && (
                <div className="absolute -top-2.5 left-4 px-3 py-0.5 rounded-full bg-linear-to-r from-indigo-500 to-violet-600 text-white text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </div>
              )}


              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  p.popular
                    ? "bg-linear-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25"
                    : "bg-white/10"
                }`}>
                  <CoinIcon />
                </div>
                <div>
                  <div className="font-semibold text-white">{p.name}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-400 font-medium">
                      {p.points.toLocaleString()} points
                    </span>
                    {p.bonusPct > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        +{p.bonusPct}% bonus
                      </span>
                    )}
                  </div>
                </div>
              </div>


              <button
                onClick={() => buy(p.key)}
                disabled={successPack === p.key || loadingPack === p.key}
                className={`flex items-center justify-center gap-2 min-w-[100px] rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  p.popular
                    ? "bg-linear-to-r from-indigo-500 to-violet-600 text-white hover:brightness-110 shadow-lg shadow-indigo-500/25"
                    : "bg-white/10 text-white hover:bg-white/20"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {loadingPack === p.key ? (
                  <Loader className="animate-spin h-4 w-4" />
                ) : successPack === p.key ? (
                  <Check className="h-5 w-5 text-green-400" />
                ) : (
                  <span>{p.price.toLocaleString()}₮</span>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
