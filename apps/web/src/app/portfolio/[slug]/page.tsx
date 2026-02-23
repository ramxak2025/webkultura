import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

// Placeholder - will be replaced with API fetch
const projectData: Record<string, {
  title: string;
  category: string;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: Record<string, string>;
}> = {
  technomarket: {
    title: "ТехноМаркет — Интернет-магазин",
    category: "Веб-разработка",
    challenge:
      "Клиенту требовался современный интернет-магазин с быстрым поиском, фильтрацией товаров и удобной системой оплаты. Старый сайт загружался медленно и плохо конвертировал мобильный трафик.",
    solution:
      "Разработали магазин на Next.js с серверным рендерингом, оптимизированными изображениями и мгновенным поиском. Внедрили систему рекомендаций и упрощённый checkout в 2 шага.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Stripe"],
    metrics: { "Конверсия": "+45%", "Скорость загрузки": "95/100", "Мобильные заказы": "+60%" },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectData[slug];
  return {
    title: project?.title || "Проект",
    description: project?.challenge?.slice(0, 160) || "",
  };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectData[slug];

  if (!project) {
    return (
      <div className="pt-28 pb-24 container-main text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Проект не найден</h1>
        <Link href="/portfolio" className="text-brand-600 hover:underline">
          Вернуться в портфолио
        </Link>
      </div>
    );
  }

  return (
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
            {project.category}
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-neutral-900 mt-2 mb-8">
            {project.title}
          </h1>
        </Reveal>

        {/* Cover placeholder */}
        <Reveal>
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 mb-12 flex items-center justify-center text-brand-300">
            <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </Reveal>

        <div className="space-y-12">
          <Reveal>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">Задача</h2>
              <p className="text-neutral-600 leading-relaxed">{project.challenge}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">Решение</h2>
              <p className="text-neutral-600 leading-relaxed">{project.solution}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">Технологии</h2>
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

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Результаты</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(project.metrics).map(([label, value]) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl bg-brand-50 text-center"
                  >
                    <div className="text-2xl font-bold text-brand-700">{value}</div>
                    <div className="text-sm text-brand-600 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
