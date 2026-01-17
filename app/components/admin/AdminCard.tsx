export default function AdminCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(99,102,241,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}
