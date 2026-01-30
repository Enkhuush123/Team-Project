"use client";

import { useEffect, useState } from "react";
import { usePoints } from "../providers/PointProvider";
import CoinIcon from "../_icons/CoinIcon";
import { Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

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

    const res = await fetch(`/api/points/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packKey }),
    });

    const data = await res.json();
    setLoadingPack(null);

    if (!res.ok) return;

    setSuccessPack(packKey);
    setPoints(data.points);
    onBought(data.points);

    setTimeout(() => {
      setSuccessPack(null);
    }, 1500);
  };

  return (
    <div className="w-full border border-white/15 rounded-2xl bg-white/5 p-6 text-white ">
      <h2 className="text-lg font-semibold mb-4">Buy Points</h2>
      <div className="space-y-3">
        {packs.map((p) => (
          <div
            key={p.key}
            className={`flex items-center justify-between rounded-xl border p-4
              ${
                p.popular
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-white/10 bg-white/5"
              }`}
          >
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="font-medium text-white/60 flex items-center gap-1">
                <CoinIcon /> {p.points} points{" "}
                {p.bonusPct ? `(+${p.bonusPct}% bonus)` : ""}
              </div>
            </div>
            <Button
              onClick={() => buy(p.key)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold
             bg-linear-to-r from-indigo-500 to-violet-600
             hover:brightness-110 transition"
              disabled={successPack === p.key || loadingPack === p.key}
            >
              {loadingPack === p.key && (
                <Loader className="animate-spin h-4 w-4" />
              )}
              {successPack === p.key && <Check className="h-4 w-4" />}
              {loadingPack !== p.key && successPack !== p.key && `${p.price}₮`}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
