"use client";

import { cn } from "@/lib/utils";

const features = [
  {
    title: "Bug Report",
    description: "Олдсон bug-уудыг дэлгэрэнгүй тайлбартайгаар илгээх",
    icon: "🐛",
    gradient: "from-red-500 to-orange-600"
  },
  {
    title: "IT News",
    description: "Сүүлийн үеийн технологийн мэдээ, мэдээлэл",
    icon: "📰",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    title: "Blog",
    description: "Өөрийн туршлага, мэдлэгээ бусадтай хуваалцах",
    icon: "✍️",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    title: "Points System",
    description: "Bug олж оноо цуглуулаад шагнал авах",
    icon: "🏆",
    gradient: "from-yellow-500 to-amber-600"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative min-h-screen flex items-center justify-center py-20">

      <div className="container mx-auto px-6 md:px-10 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className={cn(
            "text-4xl md:text-6xl font-bold tracking-tight text-center",
            "text-transparent bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400",
            "bg-clip-text drop-shadow-[0_0_25px_rgba(20,184,166,0.4)]"
          )}>
            Онцлог шинж чанарууд
          </h2>

          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-full mx-auto" />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
              >
                <div className={cn(
                  "w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 text-3xl",
                  feature.gradient
                )}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/95 text-sm leading-relaxed font-medium">{feature.description}</p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
