"use client";

import { useEffect, useState } from "react";
import CoinIcon from "../_icons/CoinIcon";

type User = {
  points: number;
};

export default function UserPoints({ points }: { points: number }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch("/api/user", { method: "GET" });
      const data = await res.json();
      setUser(data);
    };
    getUserData();
  }, []);

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-white/5 p-6 text-white">
      <h2 className="text-lg font-semibold">Your Points</h2>
      <div className="mt-3 text-4xl font-extrabold flex items-center gap-3">
        <CoinIcon /> {points}
        <span className="text-base font-medium text-white/60 ml-2">points</span>
      </div>
    </div>
  );
}
