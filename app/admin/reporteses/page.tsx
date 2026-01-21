import AdminCard from "@/app/components/admin/AdminCard";


const MOCK_REPORTS = [
  { id: "r1", title: "Spam post", type: "POST", status: "OPEN", createdAt: "2026-01-13" },
  { id: "r2", title: "Broken link", type: "TEST", status: "IN_REVIEW", createdAt: "2026-01-12" },
  { id: "r3", title: "Harassment", type: "USER", status: "RESOLVED", createdAt: "2026-01-11" },
];

function StatusPill({ s }: { s: string }) {
  const cls =
    s === "OPEN"
      ? "bg-rose-500/10 border-rose-400/20 text-rose-200"
      : s === "IN_REVIEW"
      ? "bg-amber-500/10 border-amber-400/20 text-amber-200"
      : "bg-emerald-500/10 border-emerald-400/20 text-emerald-200";
  return <span className={`px-2.5 py-1 rounded-full text-xs border ${cls}`}>{s}</span>;
}

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-white font-semibold text-xl">Reports</div>
        <div className="text-white/55 text-sm mt-1">Review incoming reports (UI only)</div>
      </div>

      <AdminCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 text-white/80 text-sm">Reports list</div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-white/55 text-xs">
              <tr className="border-b border-white/10">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Created</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody className="text-white/80 text-sm">
              {MOCK_REPORTS.map((r) => (
                <tr key={r.id} className="border-b border-white/10 hover:bg-white/[0.03] transition">
                  <td className="px-5 py-4">{r.title}</td>
                  <td className="px-5 py-4 text-white/60">{r.type}</td>
                  <td className="px-5 py-4">
                    <StatusPill s={r.status} />
                  </td>
                  <td className="px-5 py-4 text-white/60">{r.createdAt}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-sm transition">
                        Review
                      </button>
                      <button className="h-9 px-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20 hover:bg-emerald-500/15 text-emerald-200 text-sm transition">
                        Resolve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
