"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Briefcase, FolderOpen, Megaphone, MessageCircle } from "lucide-react";

const tabs = [
  { icon: Home, label: "Главная", href: "/" },
  { icon: Briefcase, label: "Услуги", href: "/services" },
  { icon: Megaphone, label: "Реклама", href: "/advertising" },
  { icon: FolderOpen, label: "Кейсы", href: "/portfolio" },
  { icon: MessageCircle, label: "Связь", href: "/contacts" },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-2 pt-1">
      <nav className="liquid-glass rounded-[22px] px-2 py-2 flex items-center justify-around relative">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-300"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-tab-bg"
                  className="absolute inset-0 liquid-glass-active rounded-2xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={`relative z-10 transition-colors duration-300 ${
                  isActive ? "text-indigo-600" : "text-gray-400"
                }`}
              />
              <span
                className={`relative z-10 text-[10px] font-medium transition-colors duration-300 ${
                  isActive ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
