import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { VantaClouds } from "@/components/vanta-clouds";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Веб-Культура — Digital-агентство полного цикла",
    template: "%s | Веб-Культура",
  },
  description:
    "Создаём сайты, запускаем рекламу, разрабатываем бренды. Современные технологии, прозрачные процессы, измеримый результат.",
  keywords: [
    "веб-разработка",
    "digital агентство",
    "создание сайтов",
    "SEO продвижение",
    "маркетинг",
    "Яндекс Директ",
    "ВК реклама",
    "Telegram Ads",
    "дизайн",
    "брендинг",
    "React",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Веб-Культура",
    title: "Веб-Культура — Digital-агентство полного цикла",
    description:
      "Создаём сайты, запускаем рекламу, разрабатываем бренды. Современные технологии, прозрачные процессы, измеримый результат.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Веб-Культура",
  description: "Digital-агентство полного цикла",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://webkultura.ru",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-999-000-00-00",
    contactType: "sales",
    areaServed: "RU",
    availableLanguage: "Russian",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased relative">
        <VantaClouds />
        {/* Desktop: single metro window */}
        <div className="relative z-10 hidden md:flex flex-col h-screen h-dvh p-4">
          <div className="metro-window flex flex-col flex-1 min-h-0">
            {/* Top bar: logo + nav */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/20 shrink-0">
              <a href="/" className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://i.ibb.co/39qPb4f7/logo-icon.png"
                  alt="Веб-Культура"
                  className="h-7 w-auto"
                />
                <span className="text-base font-bold gradient-text tracking-tight">Веб-Культура</span>
              </a>
              <DesktopNav />
            </div>
            {/* Content area */}
            <main className="flex-1 overflow-auto metro-content">
              {children}
            </main>
            {/* Inline footer */}
            <div className="border-t border-white/20 shrink-0">
              <Footer />
            </div>
          </div>
        </div>

        {/* Mobile: scrollable */}
        <div className="relative z-10 md:hidden min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
