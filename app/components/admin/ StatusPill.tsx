export default function StatusPill({ status }: { status: string }) {
  const map: any = {
    OPEN: "bg-yellow-500/20 text-yellow-400",
    PENDING: "bg-blue-500/20 text-blue-400",
    APPROVED: "bg-green-500/20 text-green-400",
    REJECTED: "bg-red-500/20 text-red-400",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${map[status] || "bg-white/10"}`}>
      {status}
    </span>
  );
}
