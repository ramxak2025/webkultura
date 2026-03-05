"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "Реклама", href: "/advertising" },
  { label: "Портфолио", href: "/portfolio" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contacts" },
] as const;

export function DesktopNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/configurator")) return null;

  return (
    <nav className="hidden md:flex items-center gap-1 px-1 shrink-0">
      {tabs.map((tab) => {
        const isActive = tab.href === "/"
          ? pathname === "/"
          : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
              isActive ? "text-white" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="desktop-tab"
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </Link>
        );
      })}
      <Link
        href="/configurator"
        className="ml-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105 active:scale-95"
      >
        Обсудить проект
      </Link>
    </nav>
  );
}
