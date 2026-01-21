import AdminCard from "@/app/components/admin/AdminCard";


const MOCK_POSTS = [
  { id: "p1", title: "New UI update", author: "Alpha", status: "PENDING" },
  { id: "p2", title: "Bug report: navbar", author: "Manlai", status: "APPROVED" },
  { id: "p3", title: "Off-topic spam", author: "Hunter", status: "PENDING" },
];

function StatusPill({ s }: { s: string }) {
  const cls =
    s === "APPROVED"
      ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
      : "bg-amber-500/10 border-amber-400/20 text-amber-200";
  return <span className={`px-2.5 py-1 rounded-full text-xs border ${cls}`}>{s}</span>;
}

export default function AdminPostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-white font-semibold text-xl">Posts</div>
        <div className="text-white/55 text-sm mt-1">Approve / delete posts (UI only)</div>
      </div>

      <AdminCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 text-white/80 text-sm">Moderation queue</div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-white/55 text-xs">
              <tr className="border-b border-white/10">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Author</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody className="text-white/80 text-sm">
              {MOCK_POSTS.map((p) => (
                <tr key={p.id} className="border-b border-white/10 hover:bg-white/[0.03] transition">
                  <td className="px-5 py-4">{p.title}</td>
                  <td className="px-5 py-4 text-white/60">{p.author}</td>
                  <td className="px-5 py-4">
                    <StatusPill s={p.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="h-9 px-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20 hover:bg-emerald-500/15 text-emerald-200 text-sm transition">
                        Approve
                      </button>
                      <button className="h-9 px-3 rounded-xl bg-rose-500/10 border border-rose-400/20 hover:bg-rose-500/15 text-rose-200 text-sm transition">
                        Delete
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
