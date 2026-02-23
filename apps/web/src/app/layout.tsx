import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Веб-Культура — Digital студия полного цикла",
    template: "%s | Веб-Культура",
  },
  description:
    "Разработка сайтов, маркетинг, дизайн и продвижение бизнеса в интернете. Создаём цифровые продукты, которые приносят результат.",
  keywords: [
    "веб-разработка",
    "digital студия",
    "создание сайтов",
    "SEO продвижение",
    "маркетинг",
    "дизайн",
    "Яндекс Директ",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Веб-Культура",
    title: "Веб-Культура — Digital студия полного цикла",
    description:
      "Разработка сайтов, маркетинг, дизайн и продвижение бизнеса в интернете.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
