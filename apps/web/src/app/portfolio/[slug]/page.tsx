import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { getPortfolioProject, getPortfolioProjects } from "@/lib/data";

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);
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
  const project = await getPortfolioProject(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.challenge,
    keywords: project.techStack.join(", "),
  };

  return (
    <div className="h-full md:overflow-auto p-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="panel p-6 mb-3">
          <Reveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-4"
            >
              <ArrowLeft size={16} /> Назад в портфолио
            </Link>
          </Reveal>

          <Reveal>
            <span className="text-sm font-medium text-indigo-600">{project.category}</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-1">
              {project.title}
            </h1>
          </Reveal>
        </div>

        <Reveal>
          <div className={`aspect-video rounded-2xl bg-gradient-to-br ${project.gradient} mb-3 overflow-hidden relative panel`}>
            {project.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.cover} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 dot-pattern opacity-20" />
            )}
          </div>
        </Reveal>

        {project.images.length > 0 && (
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {project.images.map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.alt || project.title}
                  className="rounded-xl w-full aspect-video object-cover panel"
                />
              ))}
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="panel p-5">
            <Reveal>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Задача</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{project.challenge}</p>
            </Reveal>
          </div>
          <div className="panel p-5">
            <Reveal>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Решение</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{project.solution}</p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="panel p-5">
            <Reveal>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Технологии</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-xs rounded-lg bg-white/60 border border-white/80 font-medium text-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {project.metrics && Object.keys(project.metrics).length > 0 && (
            <div className="panel p-5">
              <Reveal>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Результаты</h2>
                <StaggerContainer className="grid grid-cols-3 gap-3">
                  {Object.entries(project.metrics).map(([label, value]) => (
                    <StaggerItem key={label}>
                      <div className="text-center p-3 rounded-xl bg-white/40 border border-white/50">
                        <div className="text-lg font-bold gradient-text">{value}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{label}</div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </Reveal>
            </div>
          )}
        </div>

        <Reveal>
          <div className="relative overflow-hidden rounded-2xl p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600" />
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-white mb-2">Хотите такой же проект?</h3>
              <p className="text-indigo-100 text-sm mb-5">Обсудим задачу и предложим решение</p>
              <Link
                href="/configurator"
                className="group inline-flex items-center gap-2 h-12 px-6 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95"
              >
                Обсудить проект
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
