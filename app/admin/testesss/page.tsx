import AdminCard from "@/app/components/admin/AdminCard";




const MOCK_TESTS = [
  { id: "t1", title: "Landing page test", status: "SUBMITTED", tester: "Alpha", date: "2026-01-13" },
  { id: "t2", title: "Auth flow test", status: "SUBMITTED", tester: "Manlai", date: "2026-01-12" },
];

export default function AdminTestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-white font-semibold text-xl">Tests</div>
        <div className="text-white/55 text-sm mt-1">Submitted tests overview (UI only)</div>
      </div>

      <div className="grid gap-4">
        {MOCK_TESTS.map((t) => (
          <AdminCard key={t.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-white font-semibold">{t.title}</div>
                <div className="mt-2 text-white/60 text-sm">
                  Tester: <span className="text-white/80">{t.tester}</span> • {t.date}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="h-9 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-sm transition">
                  View
                </button>
                <button className="h-9 px-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20 hover:bg-emerald-500/15 text-emerald-200 text-sm transition">
                  Approve
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
