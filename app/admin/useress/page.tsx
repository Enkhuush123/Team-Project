"use client";

import AdminCard from "@/app/components/admin/AdminCard";

import { useEffect, useState } from "react";

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "red" | "blue";
}) {
  const toneClass =
    tone === "green"
      ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
      : tone === "red"
        ? "bg-rose-500/10 border-rose-400/20 text-rose-200"
        : tone === "blue"
          ? "bg-sky-500/10 border-sky-400/20 text-sky-200"
          : "bg-white/5 border-white/10 text-white/70";

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs border ${toneClass}`}>
      {children}
    </span>
  );
}

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  banned: boolean;
  points: number;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const handleMakeAdmin = async (userId: string) => {
    if (!confirm("Are you sure you want to make this user admin?")) return;

    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "Admin" }),
      });

      if (!res.ok) throw new Error("Failed");

      const updatedUser = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleBanUser = async (userId: string) => {
    if (!confirm("Are you sure you want to ban this user?")) return;

    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banned: true }),
      });

      if (!res.ok) {
        const updatedUser = await res.json();
        console.log(updatedUser);
        // alert
      }

      const updatedUser = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) {
          const error = await res
            .json()
            .catch(() => ({ message: "Unknown error" }));

          return;
        }

        const data = await res.json();
        setUsers(data.allUsers);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-white font-semibold text-xl">Users</div>
        <div className="text-white/55 text-sm mt-1">
          Manage users, roles, and status (UI only)
        </div>
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

                <th className="px-5 py-3 font-medium">Points</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody className="text-white/80 text-sm">
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-6 text-center text-white/50"
                  >
                    Loading users...
                  </td>
                </tr>
              )}

              {!loading && users.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-6 text-center text-white/50"
                  >
                    No users found
                  </td>
                </tr>
              )}

              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/10 hover:bg-white/3 transition"
                >
                  <td className="px-5 py-4">{user.name}</td>
                  <td className="px-5 py-4 text-white/60">{user.email}</td>

                  <td className="px-5 py-4">
                    <Pill tone={user.role === "Admin" ? "blue" : "neutral"}>
                      {user.role}
                    </Pill>
                  </td>

                  <td className="px-5 py-4 tabular-nums">{user.points}</td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={user.role === "Admin"}
                        className={`h-9 px-3 rounded-xl text-sm transition
    ${
      user.role === "Admin"
        ? "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
        : "bg-white/5 border border-white/10 hover:bg-white/10 text-white/80"
    }`}
                        onClick={() => handleMakeAdmin(user.id)}
                      >
                        Make admin
                      </button>

                      <button
                        disabled={user.banned}
                        className={`h-9 px-3 rounded-xl text-sm transition
    ${
      user.banned
        ? "bg-rose-500/5 border border-rose-400/10 text-rose-200/40 cursor-not-allowed"
        : "bg-rose-500/10 border border-rose-400/20 hover:bg-rose-500/15 text-rose-200"
    }`}
                        onClick={() => handleBanUser(user.id)}
                      >
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
