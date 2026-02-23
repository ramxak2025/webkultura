"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Briefcase, Users, Phone } from "lucide-react";
import { cn } from "@webkultura/ui";

const tabs = [
  { label: "Главная", href: "/", icon: Home },
  { label: "Услуги", href: "/services", icon: Layers },
  { label: "Портфолио", href: "/portfolio", icon: Briefcase },
  { label: "О нас", href: "/about", icon: Users },
  { label: "Контакты", href: "/contacts", icon: Phone },
];

export function MobileNav() {
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-neutral-200/50 safe-area-bottom">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors",
                isActive ? "text-brand-600" : "text-neutral-400"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
