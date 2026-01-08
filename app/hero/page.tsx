"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export default function Hero3D() {
  const router = useRouter();

  return (
    <section className="relative w-full h-[calc(100vh-56px)] overflow-hidden">
      <Spline scene="https://prod.spline.design/PoidP2yX28eZYdlE/scene.splinecode" />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-black/10 to-black/55" />

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-xl pointer-events-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.45)]">
                Bug Testing Platform
              </span>
            </h1>

            <div className="mt-4 h-0.5 w-40 bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full opacity-80" />

            <p className="mt-5 text-white/80 text-lg md:text-xl leading-relaxed">
              Веб / апп-аа community-р шалгуулж, bug олж
              <span className="text-white font-semibold">оноо</span> цуглуул.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="h-12 px-7 text-base font-semibold text-white bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_12px_35px_rgba(79,70,229,0.45)] hover:shadow-[0_15px_45px_rgba(79,70,229,0.65)] hover:brightness-110 active:scale-[0.97] transition"
                onClick={() => router.push("/test")}
              >
                Шалгах
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-7 text-base font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/15 hover:border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.35)] active:scale-[0.97] transition"
                onClick={() => router.push("/submit")}
              >
                Шалгуулах
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
