export default function StatCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 shadow-[0_20px_60px_rgba(99,102,241,0.12)]">
      <div className="text-white/60 text-sm">{title}</div>
      <div className="mt-2 text-3xl font-bold text-white">{value}</div>
      {hint && <div className="mt-1 text-xs text-white/40">{hint}</div>}
    </div>
  );
}
