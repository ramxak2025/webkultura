import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Megaphone, Code, Palette } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { formatPriceRange } from "@webkultura/ui";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Веб-разработка, маркетинг, дизайн — полный спектр digital-услуг для вашего бизнеса. Яндекс Директ, VK Реклама, SEO, UI/UX.",
};

const iconMap: Record<string, React.ElementType> = {
  megaphone: Megaphone,
  code: Code,
  palette: Palette,
};

const serviceCategories = [
  {
    id: "marketing",
    title: "Маркетинг",
    description: "Комплексное продвижение вашего бизнеса в интернете",
    icon: "megaphone",
    services: [
      { title: "Яндекс Директ", slug: "yandex-direct", description: "Настройка и ведение рекламных кампаний в Яндекс Директ", priceFrom: 30000, priceTo: 150000, duration: "от 2 недель" },
      { title: "VK Реклама", slug: "vk-ads", description: "Таргетированная реклама ВКонтакте", priceFrom: 25000, priceTo: 120000, duration: "от 2 недель" },
      { title: "Telegram Ads", slug: "telegram-ads", description: "Реклама в Telegram каналах и через Telegram Ads", priceFrom: 50000, priceTo: 200000, duration: "от 1 недели" },
      { title: "SEO-продвижение", slug: "seo", description: "Поисковая оптимизация и вывод в ТОП Яндекс и Google", priceFrom: 40000, priceTo: 180000, duration: "от 3 месяцев" },
    ],
  },
  {
    id: "web-development",
    title: "Веб-разработка",
    description: "Разработка современных веб-сайтов и приложений",
    icon: "code",
    services: [
      { title: "Корпоративный сайт", slug: "corporate-website", description: "Разработка представительского сайта компании", priceFrom: 150000, priceTo: 500000, duration: "от 4 недель" },
      { title: "Интернет-магазин", slug: "ecommerce", description: "Разработка онлайн-магазина с каталогом и оплатой", priceFrom: 300000, priceTo: 1500000, duration: "от 8 недель" },
      { title: "Лендинг", slug: "landing-page", description: "Конверсионная посадочная страница", priceFrom: 50000, priceTo: 150000, duration: "от 1 недели" },
    ],
  },
  {
    id: "design",
    title: "Дизайн",
    description: "Создание визуальной идентичности и интерфейсов",
    icon: "palette",
    services: [
      { title: "UI/UX дизайн", slug: "ui-ux-design", description: "Проектирование пользовательских интерфейсов", priceFrom: 80000, priceTo: 300000, duration: "от 2 недель" },
      { title: "Фирменный стиль", slug: "brand-identity", description: "Разработка логотипа и фирменного стиля", priceFrom: 60000, priceTo: 250000, duration: "от 2 недель" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container-main">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Услуги
            </h1>
            <p className="text-lg text-neutral-500">
              Полный спектр digital-услуг для роста вашего бизнеса.
              Подберите нужные решения или{" "}
              <Link href="/configurator" className="text-brand-600 hover:underline">
                воспользуйтесь конфигуратором
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <div className="space-y-20">
          {serviceCategories.map((category) => {
            const Icon = iconMap[category.icon] || Code;
            return (
              <section key={category.id} id={category.id}>
                <Reveal>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900">
                        {category.title}
                      </h2>
                      <p className="text-neutral-500 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Reveal>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.services.map((service) => (
                    <StaggerItem key={service.slug}>
                      <div className="group p-6 rounded-2xl border border-neutral-200 bg-white hover:border-brand-200 hover:shadow-md transition-all duration-300">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-neutral-500 mb-4">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-neutral-900">
                            {formatPriceRange(service.priceFrom, service.priceTo)}
                          </span>
                          <span className="text-neutral-400">
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-20 text-center">
            <p className="text-neutral-500 mb-4">
              Не знаете, что выбрать? Наш конфигуратор поможет подобрать услуги.
            </p>
            <Link
              href="/configurator"
              className="inline-flex items-center gap-2 h-12 px-8 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors"
            >
              Подобрать услуги <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Услуги Веб-Культура",
            itemListElement: serviceCategories.flatMap((cat, ci) =>
              cat.services.map((svc, si) => ({
                "@type": "ListItem",
                position: ci * 10 + si + 1,
                item: {
                  "@type": "Service",
                  name: svc.title,
                  description: svc.description,
                },
              }))
            ),
          }),
        }}
      />
    </div>
  );
}
