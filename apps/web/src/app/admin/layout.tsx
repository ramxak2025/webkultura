"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { cn } from "@webkultura/ui";

const adminNav = [
  { label: "Лиды", href: "/admin", icon: MessageSquare },
  { label: "Портфолио", href: "/admin/portfolio", icon: Briefcase },
  { label: "Услуги", href: "/admin/services", icon: Layers },
];

interface User {
  name: string;
  email: string;
  role: string;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      if (pathname !== "/admin/login") router.push("/admin/login");
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("admin_token");
        if (pathname !== "/admin/login") router.push("/admin/login");
      })
      .finally(() => setLoading(false));
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-16">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <LayoutDashboard size={20} className="text-brand-600" />
          <span className="font-semibold text-neutral-900">Веб-Культура Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500">{user.name}</span>
          <button
            onClick={handleLogout}
            className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed top-16 left-0 bottom-0 w-56 bg-white border-r border-neutral-200 p-4">
          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="ml-56 flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
