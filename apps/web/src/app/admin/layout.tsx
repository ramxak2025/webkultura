"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Briefcase, Layers, MessageSquare, LogOut, Menu, X, ArrowLeft } from "lucide-react";

const adminNav = [
  { label: "Заявки", href: "/admin", icon: MessageSquare },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      if (pathname !== "/admin/login") router.push("/admin/login");
      setLoading(false);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/auth/profile`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
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

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background pt-14 lg:pt-16">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 h-14 lg:h-16 glass-strong z-50 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 text-muted-foreground hover:text-white">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <LayoutDashboard size={20} className="text-primary" />
          <span className="font-semibold text-white text-sm lg:text-base">Веб-Культура</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft size={14} /> На сайт
          </Link>
          <span className="text-sm text-muted-foreground hidden sm:block">{user.name}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-medium hidden sm:block">{user.role}</span>
          <button onClick={handleLogout} className="p-2 text-muted-foreground hover:text-white transition-colors" title="Выход">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="flex">
        {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />}
        <aside className={`fixed top-14 lg:top-16 bottom-0 w-56 glass-strong p-4 z-40 transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="lg:ml-56 flex-1 p-4 lg:p-8 min-h-[calc(100vh-3.5rem)] lg:min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
