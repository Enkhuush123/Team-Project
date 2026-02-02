"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section id="hero" className={cn("relative w-full h-screen flex items-center justify-center")}>
      <div className="container mx-auto px-6 md:px-10 z-10">
        <div className="max-w-3xl">
          <h1 className={cn(
            "text-6xl md:text-8xl font-extrabold tracking-tight leading-tight",
            "text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400",
            "bg-clip-text drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]"
          )}>
            Software Community
          </h1>

          <div className="mt-6 h-1 w-48 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full" />

          <p className={cn(
            "mt-8 text-xl md:text-2xl leading-relaxed",
            "text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100",
            "bg-clip-text drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
          )}>
            Өөрийн веб болон апп-аа олон хүмүүсээр шалгуулж, bug олуулаад оноо авах, мөн бусдын төслийг шалгаж оноо цуглуулах боломжтой.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="h-14 px-8 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_15px_40px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.7)] hover:brightness-110 active:scale-95 transition-all"
              onClick={() => router.push("/test")}
            >
              Шалгах
            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-8 text-lg font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/15 hover:border-white/30 shadow-[0_10px_35px_rgba(0,0,0,0.4)] active:scale-95 transition-all"
              onClick={() => router.push("/submit")}
            >
              Шалгуулах
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
