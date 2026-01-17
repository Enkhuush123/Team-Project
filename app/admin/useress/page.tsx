import AdminCard from "@/app/components/admin/AdminCard";



const MOCK_USERS = [
  { id: "u1", name: "Manlai", email: "manlai@mail.com", role: "ADMIN", status: "ACTIVE", points: 120 },
  { id: "u2", name: "Alpha", email: "alpha@mail.com", role: "USER", status: "ACTIVE", points: 45 },
  { id: "u3", name: "Hunter", email: "hunter@mail.com", role: "USER", status: "BANNED", points: 0 },
];

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "green" | "red" | "blue" }) {
  const toneClass =
    tone === "green"
      ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
      : tone === "red"
      ? "bg-rose-500/10 border-rose-400/20 text-rose-200"
      : tone === "blue"
      ? "bg-sky-500/10 border-sky-400/20 text-sky-200"
      : "bg-white/5 border-white/10 text-white/70";

  return <span className={`px-2.5 py-1 rounded-full text-xs border ${toneClass}`}>{children}</span>;
}

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-white font-semibold text-xl">Users</div>
        <div className="text-white/55 text-sm mt-1">Manage users, roles, and status (UI only)</div>
      </div>

      <AdminCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="text-white/80 text-sm">All users</div>
          <div className="text-white/50 text-xs">Mock table</div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-white/55 text-xs">
              <tr className="border-b border-white/10">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Points</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody className="text-white/80 text-sm">
              {MOCK_USERS.map((u) => (
                <tr key={u.id} className="border-b border-white/10 hover:bg-white/[0.03] transition">
                  <td className="px-5 py-4">{u.name}</td>
                  <td className="px-5 py-4 text-white/60">{u.email}</td>
                  <td className="px-5 py-4">
                    <Pill tone={u.role === "ADMIN" ? "blue" : "neutral"}>{u.role}</Pill>
                  </td>
                  <td className="px-5 py-4">
                    <Pill tone={u.status === "ACTIVE" ? "green" : "red"}>{u.status}</Pill>
                  </td>
                  <td className="px-5 py-4 tabular-nums">{u.points}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-sm transition">
                        Make admin
                      </button>
                      <button className="h-9 px-3 rounded-xl bg-rose-500/10 border border-rose-400/20 hover:bg-rose-500/15 text-rose-200 text-sm transition">
                        Ban
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
