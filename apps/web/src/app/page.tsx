import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code, Megaphone, Palette, Zap, TrendingUp, Shield } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { HeroSection } from "@/components/sections/hero";

export const metadata: Metadata = {
  title: "Веб-Культура — Digital студия полного цикла",
  description:
    "Разработка сайтов, маркетинг, дизайн и продвижение бизнеса в интернете. Создаём цифровые продукты, которые приносят результат.",
};

const services = [
  {
    icon: Code,
    title: "Веб-разработка",
    description: "Корпоративные сайты, интернет-магазины и лендинги на современных технологиях",
    href: "/services#web-development",
  },
  {
    icon: Megaphone,
    title: "Маркетинг",
    description: "Яндекс Директ, VK Реклама, Telegram Ads и SEO-продвижение",
    href: "/services#marketing",
  },
  {
    icon: Palette,
    title: "Дизайн",
    description: "UI/UX дизайн интерфейсов и разработка фирменного стиля",
    href: "/services#design",
  },
];

const advantages = [
  {
    icon: Zap,
    title: "Скорость",
    description: "Запускаем проекты в кратчайшие сроки без потери качества",
  },
  {
    icon: TrendingUp,
    title: "Результат",
    description: "Фокус на метриках и конверсиях, а не абстрактной красоте",
  },
  {
    icon: Shield,
    title: "Надёжность",
    description: "Современный стек, чистый код, поддержка после запуска",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Services */}
      <section className="py-24 lg:py-32">
        <div className="container-main">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Наши услуги
              </h2>
              <p className="text-lg text-neutral-500">
                Комплексный подход к вашему digital-присутствию
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={service.title}>
                  <Link
                    href={service.href}
                    className="group block p-8 rounded-2xl border border-neutral-200 bg-white hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-neutral-500 mb-4">{service.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 group-hover:gap-2 transition-all">
                      Подробнее <ArrowRight size={16} />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 lg:py-32 bg-neutral-50">
        <div className="container-main">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Почему мы
              </h2>
              <p className="text-lg text-neutral-500">
                Мы не просто пишем код — мы создаём продукты, которые работают на ваш бизнес
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto mb-5">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500">{item.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="container-main">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-600 p-10 lg:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-800 opacity-90" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Готовы обсудить проект?
                </h2>
                <p className="text-brand-100 text-lg mb-8 max-w-xl mx-auto">
                  Воспользуйтесь конфигуратором услуг — подберите нужные решения
                  и получите предварительную оценку
                </p>
                <Link
                  href="/configurator"
                  className="inline-flex items-center gap-2 h-12 px-8 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors"
                >
                  Подобрать услуги <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Веб-Культура",
            description:
              "Digital студия полного цикла. Разработка сайтов, маркетинг, дизайн.",
            url: process.env.NEXT_PUBLIC_SITE_URL || "https://webkultura.ru",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+7-999-000-00-00",
              contactType: "customer service",
              availableLanguage: "Russian",
            },
          }),
        }}
      />
    </>
  );
}
