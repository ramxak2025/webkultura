import Link from "next/link";
import { SITE_NAME, NAV_ITEMS, CONTACT_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="glass-strong border-t border-white/30">
      <div className="container-main py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ibb.co/kgRGc9Yx/logo-horizontal.png"
                alt="Веб-Культура"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed">
              Создаём цифровые продукты, которые помогают бизнесу расти.
              Современные технологии, прозрачные процессы, измеримый результат.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-sm">Навигация</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/advertising"
                  className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
                >
                  Реклама
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-sm">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-gray-900 transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-gray-900 transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://t.me/${CONTACT_INFO.telegram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors"
                >
                  Telegram: {CONTACT_INFO.telegram}
                </a>
              </li>
              <li>{CONTACT_INFO.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Все права защищены.
          </p>
          <Link
            href="/privacy"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
