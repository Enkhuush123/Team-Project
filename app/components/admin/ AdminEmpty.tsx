import AdminCard from "./AdminCard";


export default function AdminEmpty({ text }: { text: string }) {
  return (
    <AdminCard className="p-12 text-center">
      <div className="text-white/60">{text}</div>
    </AdminCard>
  );
}
