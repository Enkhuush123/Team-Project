"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Flag,
  Beaker,
  Settings,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/useress", icon: Users },
  { label: "Posts", href: "/admin/postesss", icon: FileText },
  { label: "Reports", href: "/admin/reporteses", icon: Flag },
  { label: "Tests", href: "/admin/testesss", icon: Beaker },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname?.startsWith(href);
  };

  return (
    <aside className="w-[260px] shrink-0 p-4 border-r border-white/10 bg-white/5 backdrop-blur-xl">
      <h2 className="text-lg font-semibold mb-6 text-white">Admin Panel</h2>

      <div className="space-y-1">
        {NAV.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition
                ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
