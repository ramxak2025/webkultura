import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Портфолио",
  description:
    "Наши проекты — сайты, интернет-магазины, маркетинговые кампании и дизайн. Кейсы и результаты работы.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container-main">
        <Reveal>
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-medium text-primary mb-4 block">Портфолио</span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Проекты, которыми мы{" "}
              <span className="gradient-text">гордимся</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Каждый кейс — это решённая задача и измеримый результат для клиента.
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_PROJECTS.map((project) => (
            <StaggerItem key={project.id}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block rounded-2xl overflow-hidden glass transition-all duration-500 hover:glow-md"
              >
                <div className={`aspect-video bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-md text-xs bg-secondary text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.metrics && (
                    <div className="flex gap-4 pt-4 border-t border-border/50">
                      {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-sm font-semibold gradient-text">{value}</div>
                          <div className="text-xs text-muted-foreground">{key}</div>
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
    </div>
  );
}
