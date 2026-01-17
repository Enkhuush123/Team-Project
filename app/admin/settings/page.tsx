import AdminCard from "@/app/components/admin/AdminCard";


export default function AdminSettingsPage() {
  return (
    <AdminCard title="Settings" subtitle="Admin settings (optional)">
      <div className="text-white/60 text-sm">
        Role management, feature toggles, etc.
      </div>
    </AdminCard>
  );
}
