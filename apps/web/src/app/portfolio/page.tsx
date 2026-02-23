import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { PortfolioCard } from "@/components/sections/portfolio-card";

export const metadata: Metadata = {
  title: "Портфолио",
  description:
    "Наши проекты — сайты, интернет-магазины, маркетинговые кампании и дизайн. Смотрите кейсы и результаты работы.",
};

interface PortfolioProjectData {
  id: string;
  title: string;
  slug: string;
  cover: string;
  category: string;
  techStack: string[];
  metrics: Record<string, string>;
}

// Placeholder projects (will come from API later)
const projects: PortfolioProjectData[] = [
  {
    id: "1",
    title: "ТехноМаркет — Интернет-магазин",
    slug: "technomarket",
    cover: "/images/placeholder-1.svg",
    category: "Веб-разработка",
    techStack: ["Next.js", "TypeScript", "PostgreSQL"],
    metrics: { conversion: "+45%", speed: "95/100" },
  },
  {
    id: "2",
    title: "ФинансПро — Корпоративный сайт",
    slug: "finanspro",
    cover: "/images/placeholder-2.svg",
    category: "Веб-разработка",
    techStack: ["React", "Node.js", "Figma"],
    metrics: { leads: "+120%", bounce: "-30%" },
  },
  {
    id: "3",
    title: "СтройГрад — Маркетинговая кампания",
    slug: "stroygrad",
    cover: "/images/placeholder-3.svg",
    category: "Маркетинг",
    techStack: ["Яндекс Директ", "Google Ads", "Analytics"],
    metrics: { roi: "340%", cpa: "-55%" },
  },
  {
    id: "4",
    title: "АртСтудия — Фирменный стиль",
    slug: "artstudio",
    cover: "/images/placeholder-4.svg",
    category: "Дизайн",
    techStack: ["Figma", "Illustrator", "Photoshop"],
    metrics: { recognition: "+80%" },
  },
  {
    id: "5",
    title: "ЭкоЛайф — Лендинг",
    slug: "ecolife",
    cover: "/images/placeholder-5.svg",
    category: "Веб-разработка",
    techStack: ["Next.js", "Framer Motion", "TailwindCSS"],
    metrics: { conversion: "12%", speed: "98/100" },
  },
  {
    id: "6",
    title: "ФитнесКлуб — Таргетированная реклама",
    slug: "fitnessclub",
    cover: "/images/placeholder-6.svg",
    category: "Маркетинг",
    techStack: ["VK Ads", "Telegram Ads", "Analytics"],
    metrics: { leads: "+200%", cpa: "-40%" },
  },
];

const categories = ["Все", ...new Set(projects.map((p) => p.category))];

export default function PortfolioPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container-main">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Портфолио
            </h1>
            <p className="text-lg text-neutral-500">
              Проекты, которыми мы гордимся. Каждый кейс — это решённая задача
              и измеримый результат для клиента.
            </p>
          </div>
        </Reveal>

        {/* Category filters */}
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 transition-colors first:bg-brand-600 first:text-white first:border-brand-600"
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Projects grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <PortfolioCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
