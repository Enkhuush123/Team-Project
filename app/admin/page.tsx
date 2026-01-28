"use client";

import { useEffect, useState } from "react";
import AdminCard from "../components/admin/AdminCard";

type UserApiResponse = {
  user: any;
  usersCount: number;
};

type ReportApiResponse = {
  reports: any[];
  reportsCount: number;
};
export default function AdminDashboard() {
  const [userData, setUserData] = useState<UserApiResponse | null>(null);
  const [reportData, setReportData] = useState<ReportApiResponse | null>(null);

  const getUsers = async () => {
    const res = await fetch("/api/user");
    if (!res.ok) return;
    const result = await res.json();
    setUserData(result);
  };

  const getReports = async () => {
    const res = await fetch("/api/reports");
    if (!res.ok) return;
    const result = await res.json();
    setReportData(result);
  };

  useEffect(() => {
    getUsers();
    getReports();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* USERS */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5">
          <div className="text-white/60 text-sm">Total Users</div>
          <div className="mt-2 text-3xl font-bold text-white">
            {userData?.usersCount ?? 0}
          </div>
          <div className="mt-1 text-xs text-white/40">All users</div>
        </div>

        {/* REPORTS */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5">
          <div className="text-white/60 text-sm">Open Reports</div>
          <div className="mt-2 text-3xl font-bold text-white">
            {reportData?.reportsCount ?? 0}
          </div>
          <div className="mt-1 text-xs text-white/40">Need review</div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <AdminCard>
        <div className="text-white font-semibold text-lg">Quick actions</div>
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
