"use client";

import AdminSidebar from "./ AdminSidebar";



export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
