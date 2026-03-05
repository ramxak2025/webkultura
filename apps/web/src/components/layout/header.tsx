"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong py-2" : "py-3 bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between">
        <Link href="/" className="relative z-10 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://i.ibb.co/39qPb4f7/logo-icon.png"
            alt="Веб-Культура"
            className="h-8 w-auto"
          />
          <span className="hidden sm:inline text-lg font-bold gradient-text">Веб-Культура</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/advertising"
            className={`relative text-sm font-medium transition-colors ${
              pathname === "/advertising" ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Реклама
            {pathname === "/advertising" && (
              <motion.span
                layoutId="nav-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
          <Link
            href="/configurator"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105 active:scale-95"
          >
            Обсудить проект
          </Link>
        </nav>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden relative z-10 p-2 text-gray-700"
          aria-label="Меню"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full glass-strong md:hidden"
          >
            <nav className="container-main py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium py-2 transition-colors ${
                    pathname === item.href ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/advertising"
                className={`text-lg font-medium py-2 transition-colors ${
                  pathname === "/advertising" ? "text-gray-900" : "text-gray-500"
                }`}
              >
                Реклама
              </Link>
              <Link
                href="/configurator"
                className="mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-center font-semibold text-white"
              >
                Обсудить проект
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
