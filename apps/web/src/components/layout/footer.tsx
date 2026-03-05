import Link from "next/link";
import { SITE_NAME, NAV_ITEMS, CONTACT_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer>
      <div className="px-5 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ibb.co/kgRGc9Yx/logo-horizontal.png"
                alt="Веб-Культура"
                className="h-6 w-auto opacity-60"
              />
            </div>
            <nav className="hidden md:flex items-center gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/advertising"
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Реклама
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-gray-600 transition-colors">
              {CONTACT_INFO.phone}
            </a>
            <span className="hidden md:inline">|</span>
            <a href={`mailto:${CONTACT_INFO.email}`} className="hidden md:inline hover:text-gray-600 transition-colors">
              {CONTACT_INFO.email}
            </a>
            <span className="hidden md:inline">|</span>
            <a
              href={`https://t.me/${CONTACT_INFO.telegram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline hover:text-gray-600 transition-colors"
            >
              Telegram
            </a>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[10px] text-gray-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
          <Link
            href="/privacy"
            className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
