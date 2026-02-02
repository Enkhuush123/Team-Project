"use client";

import { cn } from "@/lib/utils";

const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-end py-20">
      <div className="container mx-auto px-6 md:px-10 z-10 relative">
        <div className="max-w-4xl mr-0 md:mr-20">
          <h2 className={cn(
            "text-4xl md:text-6xl font-bold tracking-tight",
            "text-transparent bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400",
            "bg-clip-text drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]"
          )}>
            Бид юу хийдэг вэ?
          </h2>

          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full" />

          <p className="mt-8 text-lg md:text-xl text-white/95 leading-relaxed font-medium">
            Таны бүтээсэн веб болон мобайл апп-ыг олон нийтийн community-р шалгуулж,
            алдаа олуулан засаж, оноо цуглуулах боломжтой платформ.
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Найдвартай шалгалт</h3>
              <p className="text-white/90 font-medium">
                Олон хүн таны апп-ыг шалгаж, бодит асуудлуудыг илрүүлнэ.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Оноо цуглуулах</h3>
              <p className="text-white/90 font-medium">
                Алдаа олсон хүмүүс оноо авч, шагнал хүртэх боломжтой.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
