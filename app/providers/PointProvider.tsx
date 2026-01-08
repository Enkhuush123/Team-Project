"use client";

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type PointsContextValue = {
  points: number;
  refreshPoints: () => Promise<void>;
  setPoints: (p: number) => void;
};

const PointsContext = createContext<PointsContextValue | null>(null);

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser();
  const [points, setPoints] = useState(0);

  const refreshPoints = async () => {
    if (!isSignedIn) {
      setPoints(0);
      return;
    }
    const res = await fetch("/api/user");
    if (!res.ok) return;
    const data = await res.json();
    setPoints(data.points ?? 0);
  };

  useEffect(() => {
    refreshPoints();
  }, [isSignedIn]);

  return (
    <PointsContext.Provider value={{ points, refreshPoints, setPoints }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error("usePoints must be used within PointsProvider");
  return ctx;
}
