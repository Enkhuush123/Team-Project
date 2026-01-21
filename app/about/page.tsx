export default function About() {
  return (
    <section className="relative min-h-screen bg-black">
      {/* glow bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        {/* header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(99,102,241,0.35)]">
              Бидний тухай
            </span>
          </h1>

          <div className="mx-auto mt-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-80" />

          <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
            Бид бол хөгжүүлэгчдэд зориулсан хамтын платформ юм. Энд хэрэглэгчид
            өөрсдийн бичсэн кодоо хуваалцаж, бусадтай хамтран алдааг нь олж
            засах, мөн өөрийн оруулсан хувь нэмрээрээ урамшуулал авах боломжтой.
          </p>
        </div>

        {/* features */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            title="Код хуваалцах"
            desc="Өөрийн бичсэн кодоо олон нийттэй хуваалцаж, санал зөвлөгөө авна."
            icon="💻"
          />
          <Feature
            title="Алдаа засах"
            desc="Бусдын кодын алдааг илрүүлж, хамтран шийдэл олно."
            icon="🐞"
          />
          <Feature
            title="Оноо цуглуулах"
            desc="Идэвхтэй оролцоогоороо оноо цуглуулна."
            icon="⭐"
          />
          <Feature
            title="Урамшуулал авах"
            desc="Цуглуулсан оноогоо мөнгөн болон бусад урамшуулал болгоно."
            icon="💰"
          />
        </div>

        {/* goal card */}
        <div className="mt-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-7 md:p-10 shadow-[0_20px_60px_rgba(99,102,241,0.12)]">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Бидний зорилго
          </h2>
          <p className="mt-3 text-white/70 leading-relaxed max-w-3xl">
            Хөгжүүлэгчид хамтран суралцаж, мэдлэгээ хуваалцан, хөдөлмөрөө
            шударгаар үнэлүүлэх итгэлтэй, найдвартай орчныг бүрдүүлэх явдал юм.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/70">
              Community first
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/70">
              Fair rewards
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/70">
              Learn together
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) => {
  return (
    <div
      className="
        group rounded-2xl p-6
        bg-white/5 border border-white/10 backdrop-blur-xl
        shadow-[0_20px_60px_rgba(99,102,241,0.10)]
        hover:border-white/20 hover:shadow-[0_25px_80px_rgba(139,92,246,0.25)]
        transition
      "
    >
      <div
        className="
          h-12 w-12 rounded-xl mb-4
          flex items-center justify-center
          bg-gradient-to-br from-violet-500/20 to-cyan-400/20
          text-2xl
          group-hover:scale-110 transition
        "
      >
        {icon}
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-white/65 leading-relaxed">{desc}</p>
    </div>
  );
};
