import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
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
        <div className="relative z-10 md:h-screen md:h-dvh md:overflow-hidden md:flex md:flex-col">
          <Header />
          <main className="flex-1 md:overflow-hidden relative">
            {children}
          </main>
          <div className="md:block hidden">
            <Footer />
          </div>
        </div>
        <div className="md:hidden pb-20">
          <Footer />
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
