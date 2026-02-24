import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  cover: string;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: Record<string, string> | null;
  category: { id: string; name: string; slug: string };
  images: { id: string; url: string; alt: string; order: number }[];
}

// Fallback data for when API is unavailable
const fallbackProjects: Record<string, PortfolioProject> = {
  technomarket: {
    id: "1",
    title: "ТехноМаркет — Интернет-магазин",
    slug: "technomarket",
    cover: "",
    challenge:
      "Клиенту требовался современный интернет-магазин с быстрым поиском, фильтрацией товаров и удобной системой оплаты. Старый сайт загружался медленно и плохо конвертировал мобильный трафик.",
    solution:
      "Разработали магазин на Next.js с серверным рендерингом, оптимизированными изображениями и мгновенным поиском. Внедрили систему рекомендаций и упрощённый checkout в 2 шага.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Stripe"],
    metrics: { "Конверсия": "+45%", "Скорость загрузки": "95/100", "Мобильные заказы": "+60%" },
    category: { id: "cat-web", name: "Веб-разработка", slug: "web-development" },
    images: [],
  },
  finanspro: {
    id: "2",
    title: "ФинансПро — Корпоративный сайт",
    slug: "finanspro",
    cover: "",
    challenge:
      "Финансовой компании нужен был представительский сайт, вызывающий доверие у корпоративных клиентов. Существующий сайт устарел и не отражал уровень компании.",
    solution:
      "Создали премиальный корпоративный сайт с анимациями, интерактивными калькуляторами и интеграцией с CRM. Акцент на UX и скорости загрузки.",
    techStack: ["React", "Node.js", "Figma", "GSAP"],
    metrics: { "Лиды": "+120%", "Отказы": "-30%", "Время на сайте": "+85%" },
    category: { id: "cat-web", name: "Веб-разработка", slug: "web-development" },
    images: [],
  },
  stroygrad: {
    id: "3",
    title: "СтройГрад — Маркетинговая кампания",
    slug: "stroygrad",
    cover: "",
    challenge:
      "Строительная компания тратила бюджет на рекламу без измеримого результата. Нужна была комплексная digital-стратегия с прозрачной аналитикой.",
    solution:
      "Запустили кампании в Яндекс Директ и Google Ads с микроконверсиями, ретаргетингом и сквозной аналитикой. Оптимизировали посадочные страницы под каждый сегмент.",
    techStack: ["Яндекс Директ", "Google Ads", "Analytics", "Метрика"],
    metrics: { "ROI": "340%", "CPA": "-55%", "Заявки": "+180%" },
    category: { id: "cat-marketing", name: "Маркетинг", slug: "marketing" },
    images: [],
  },
  artstudio: {
    id: "4",
    title: "АртСтудия — Фирменный стиль",
    slug: "artstudio",
    cover: "",
    challenge:
      "Креативное агентство выросло из начального бренда и нуждалось в полном ребрендинге: логотип, фирменный стиль, гайдлайны.",
    solution:
      "Разработали минималистичный визуальный язык бренда, включающий логотип, типографику, палитру, шаблоны и брендбук на 40+ страниц.",
    techStack: ["Figma", "Illustrator", "Photoshop", "After Effects"],
    metrics: { "Узнаваемость": "+80%", "Охват соцсетей": "+150%" },
    category: { id: "cat-design", name: "Дизайн", slug: "design" },
    images: [],
  },
  ecolife: {
    id: "5",
    title: "ЭкоЛайф — Лендинг",
    slug: "ecolife",
    cover: "",
    challenge:
      "Стартапу эко-товаров нужна была конверсионная посадочная страница для запуска краудфандинга. Бюджет ограничен, сроки — 5 дней.",
    solution:
      "Спроектировали и разработали лендинг за 4 дня с микроанимациями, видео-секцией и формой предзаказа. Lighthouse 98/100.",
    techStack: ["Next.js", "Framer Motion", "TailwindCSS", "Vercel"],
    metrics: { "Конверсия": "12%", "Скорость": "98/100", "Предзаказы": "500+" },
    category: { id: "cat-web", name: "Веб-разработка", slug: "web-development" },
    images: [],
  },
  fitnessclub: {
    id: "6",
    title: "ФитнесКлуб — Таргетированная реклама",
    slug: "fitnessclub",
    cover: "",
    challenge:
      "Фитнес-клуб терял клиентов после пандемии. Нужен был приток новых лидов через соцсети с минимальным CPA.",
    solution:
      "Настроили таргетированную рекламу в VK и Telegram с сегментацией по гео и интересам. Создали воронку: реклама → квиз → бесплатная тренировка → абонемент.",
    techStack: ["VK Ads", "Telegram Ads", "Analytics", "Метрика"],
    metrics: { "Лиды": "+200%", "CPA": "-40%", "Абонементы": "+95%" },
    category: { id: "cat-marketing", name: "Маркетинг", slug: "marketing" },
    images: [],
  },
};

async function getProject(slug: string): Promise<PortfolioProject | null> {
  try {
    const res = await fetch(`${API_URL}/portfolio/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackProjects[slug] || null;
    return res.json();
  } catch {
    return fallbackProjects[slug] || null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Проект не найден" };
  }

  return {
    title: project.title,
    description: project.challenge.slice(0, 160),
    openGraph: {
      title: project.title,
      description: project.challenge.slice(0, 160),
      type: "article",
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.challenge,
    creator: {
      "@type": "Organization",
      name: "Веб-Культура",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
        <div className="container-main max-w-4xl">
          <Reveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Назад в портфолио
            </Link>
          </Reveal>

          <Reveal>
            <span className="text-sm font-medium text-brand-600 uppercase tracking-wider">
              {project.category.name}
            </span>
            <h1 className="text-3xl lg:text-5xl font-bold text-neutral-900 mt-2 mb-8">
              {project.title}
            </h1>
          </Reveal>

          {/* Cover */}
          <Reveal>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 mb-12 flex items-center justify-center overflow-hidden">
              {project.cover && project.cover.startsWith("http") ? (
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-24 h-24 text-brand-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
          </Reveal>

          <div className="space-y-12">
            <Reveal>
              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  Задача
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  {project.challenge}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  Решение
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  {project.solution}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  Технологии
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-lg bg-neutral-100 text-neutral-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </Reveal>

            {project.metrics && Object.keys(project.metrics).length > 0 && (
              <Reveal>
                <section>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    Результаты
                  </h2>
                  <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(project.metrics).map(([label, value]) => (
                      <StaggerItem key={label}>
                        <div className="p-4 rounded-xl bg-brand-50 text-center">
                          <div className="text-2xl font-bold text-brand-700">
                            {value}
                          </div>
                          <div className="text-sm text-brand-600 mt-1">
                            {label}
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </section>
              </Reveal>
            )}

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
              <Reveal>
                <section>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    Галерея
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images
                      .sort((a, b) => a.order - b.order)
                      .map((img) => (
                        <div
                          key={img.id}
                          className="rounded-xl overflow-hidden bg-neutral-100"
                        >
                          <img
                            src={img.url}
                            alt={img.alt || project.title}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                  </div>
                </section>
              </Reveal>
            )}
          </div>

          {/* CTA */}
          <Reveal>
            <div className="mt-16 p-8 rounded-2xl bg-neutral-50 border border-neutral-200 text-center">
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Хотите такой же проект?
              </h3>
              <p className="text-neutral-500 mb-6">
                Обсудим задачу и предложим решение
              </p>
              <Link
                href="/configurator"
                className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition-colors"
              >
                Обсудить проект
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
