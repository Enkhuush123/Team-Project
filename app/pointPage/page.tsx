"use client";

import { useEffect, useState } from "react";
import BuyPoints from "../components/buyPoints";
import UserPoints from "../components/userPoints";

export default function PointPage() {
  const [points, setPoints] = useState<number>(0);
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setPoints(data.points ?? 0);
    };
    load();
  }, []);
  return (
    <div className="max-w-6xl mx-auto mt-20 px-6">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <UserPoints points={points} />
        <BuyPoints onBought={(newPoints) => setPoints(newPoints)} />
      </div>
    </div>
  );
}
