import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { getPortfolioProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Портфолио",
  description:
    "Наши проекты — сайты, интернет-магазины, маркетинговые кампании и дизайн.",
};

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <div className="h-full md:overflow-auto p-3">
      <div className="panel p-6 mb-3">
        <Reveal>
          <h1 className="text-3xl font-bold text-gray-900">
            Проекты, которыми мы <span className="gradient-text">гордимся</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Каждый кейс — это решённая задача и измеримый результат.
          </p>
        </Reveal>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <Link
              href={`/portfolio/${project.slug}`}
              className="group block rounded-2xl overflow-hidden panel transition-all duration-500 hover:glow-md"
            >
              <div className={`aspect-video bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                {project.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.cover} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/80 text-gray-700 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-500">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.metrics && Object.keys(project.metrics).length > 0 && (
                  <div className="flex gap-4 pt-3 border-t border-gray-100">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-xs font-semibold gradient-text">{value}</div>
                        <div className="text-[10px] text-gray-400">{key}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
