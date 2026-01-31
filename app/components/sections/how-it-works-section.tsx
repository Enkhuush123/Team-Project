"use client";

import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Бүртгүүлэх",
    description: "Платформд нэвтэрч орж эхлэх",
    color: "from-violet-500 to-purple-600"
  },
  {
    number: "02",
    title: "Апп сонгох",
    description: "Шалгах гэж буй апп-аа сонгох",
    color: "from-blue-500 to-cyan-600"
  },
  {
    number: "03",
    title: "Bug олох",
    description: "Апп-ыг ашиглаж bug олох",
    color: "from-pink-500 to-rose-600"
  },
  {
    number: "04",
    title: "Илгээх",
    description: "Bug-ийн дэлгэрэнгүй мэдээллийг илгээх",
    color: "from-amber-500 to-orange-600"
  },
  {
    number: "05",
    title: "Оноо авах",
    description: "Баталгаажсан bug-ээр оноо цуглуулах",
    color: "from-emerald-500 to-green-600"
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative min-h-screen flex items-center justify-center py-20">

      <div className="container mx-auto px-6 md:px-10 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className={cn(
            "text-4xl md:text-6xl font-bold tracking-tight text-center",
            "text-transparent bg-gradient-to-r from-orange-300 via-red-400 to-pink-400",
            "bg-clip-text drop-shadow-[0_0_25px_rgba(251,113,133,0.4)]"
          )}>
            Хэрхэн ажилладаг вэ?
          </h2>

          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-full mx-auto" />

          <div className="mt-16 relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/20 via-blue-500/20 via-pink-500/20 via-amber-500/20 to-emerald-500/20 -translate-y-1/2" />

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Number circle */}
                  <div className={cn(
                    "relative w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg transition-transform group-hover:scale-110",
                    step.color
                  )}>
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                    <div className={cn(
                      "absolute inset-0 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-20 animate-ping",
                      step.color
                    )} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/95 text-sm leading-relaxed font-medium">{step.description}</p>

                  {/* Arrow (except last one) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-4 text-white/20">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-xl text-white/95 mb-6 font-medium">
              Бэлэн үү? Одоо эхэл!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/test"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Шалгах
              </a>
              <a
                href="/submit"
                className="px-8 py-4 rounded-xl bg-white/10 text-white font-semibold border border-white/20 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-all"
              >
                Шалгуулах
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
