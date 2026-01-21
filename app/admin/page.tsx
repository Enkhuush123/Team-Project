import StatCard from "../components/admin/ StatCard";
import AdminCard from "../components/admin/AdminCard";


export default function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: 1284, hint: "Mock data" },
    { title: "Pending Posts", value: 14, hint: "Need approval" },
    { title: "Open Reports", value: 6, hint: "Need review" },
    { title: "Submitted Tests", value: 31, hint: "This week" },
  ];

  return (
    <div className="space-y-8">
      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            hint={s.hint}
          />
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <AdminCard>
        <div className="text-white font-semibold text-lg">
          Quick actions
        </div>
        <p className="mt-2 text-white/55 text-sm">
          Use sidebar to manage posts / reports / tests.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <AdminCard>
            <div className="text-white font-semibold">Moderate Posts</div>
            <p className="mt-2 text-white/60 text-sm">
              Approve or delete community posts.
            </p>
          </AdminCard>

          <AdminCard>
            <div className="text-white font-semibold">Handle Reports</div>
            <p className="mt-2 text-white/60 text-sm">
              Resolve / reject incoming reports.
            </p>
          </AdminCard>
        </div>
      </AdminCard>
    </div>
  );
}
