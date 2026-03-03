import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";

function getProject(slug: string) {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Проект не найден" };

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
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container-main max-w-4xl">
        <Reveal>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Назад в портфолио
          </Link>
        </Reveal>

        <Reveal>
          <span className="text-sm font-medium text-primary">{project.category}</span>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mt-2 mb-8">
            {project.title}
          </h1>
        </Reveal>

        <Reveal>
          <div className={`aspect-video rounded-2xl bg-gradient-to-br ${project.gradient} mb-12 overflow-hidden relative`}>
            <div className="absolute inset-0 dot-pattern opacity-20" />
          </div>
        </Reveal>

        <div className="space-y-12">
          <Reveal>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Задача</h2>
              <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Решение</h2>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Технологии</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg glass font-medium text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Результаты</h2>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(project.metrics).map(([label, value]) => (
                  <StaggerItem key={label}>
                    <div className="p-5 rounded-xl glass text-center">
                      <div className="text-2xl font-bold gradient-text">{value}</div>
                      <div className="text-sm text-muted-foreground mt-1">{label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 relative overflow-hidden rounded-2xl p-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600" />
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-white mb-2">Хотите такой же проект?</h3>
              <p className="text-violet-100 mb-6">Обсудим задачу и предложим решение</p>
              <Link
                href="/configurator"
                className="group inline-flex items-center gap-2 h-12 px-8 bg-white text-violet-700 font-semibold rounded-xl hover:bg-violet-50 transition-all hover:scale-105 active:scale-95"
              >
                Обсудить проект
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
