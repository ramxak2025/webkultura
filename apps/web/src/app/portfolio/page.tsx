import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Портфолио",
  description:
    "Наши проекты — сайты, интернет-магазины, маркетинговые кампании и дизайн. Смотрите кейсы и результаты работы.",
};

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  cover: string;
  category: { id: string; name: string; slug: string };
  techStack: string[];
  metrics: Record<string, string> | null;
}

interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  _count: { projects: number };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Fallback data for when API is unavailable
const fallbackCategories: PortfolioCategory[] = [
  { id: "cat-web", name: "Веб-разработка", slug: "web-development", _count: { projects: 3 } },
  { id: "cat-marketing", name: "Маркетинг", slug: "marketing", _count: { projects: 2 } },
  { id: "cat-design", name: "Дизайн", slug: "design", _count: { projects: 1 } },
];

const fallbackProjects: PortfolioProject[] = [
  {
    id: "1",
    title: "ТехноМаркет — Интернет-магазин",
    slug: "technomarket",
    cover: "",
    category: { id: "cat-web", name: "Веб-разработка", slug: "web-development" },
    techStack: ["Next.js", "TypeScript", "PostgreSQL"],
    metrics: { "Конверсия": "+45%", "Скорость": "95/100" },
  },
  {
    id: "2",
    title: "ФинансПро — Корпоративный сайт",
    slug: "finanspro",
    cover: "",
    category: { id: "cat-web", name: "Веб-разработка", slug: "web-development" },
    techStack: ["React", "Node.js", "Figma"],
    metrics: { "Лиды": "+120%", "Отказы": "-30%" },
  },
  {
    id: "3",
    title: "СтройГрад — Маркетинговая кампания",
    slug: "stroygrad",
    cover: "",
    category: { id: "cat-marketing", name: "Маркетинг", slug: "marketing" },
    techStack: ["Яндекс Директ", "Google Ads", "Analytics"],
    metrics: { "ROI": "340%", "CPA": "-55%" },
  },
  {
    id: "4",
    title: "АртСтудия — Фирменный стиль",
    slug: "artstudio",
    cover: "",
    category: { id: "cat-design", name: "Дизайн", slug: "design" },
    techStack: ["Figma", "Illustrator", "Photoshop"],
    metrics: { "Узнаваемость": "+80%" },
  },
  {
    id: "5",
    title: "ЭкоЛайф — Лендинг",
    slug: "ecolife",
    cover: "",
    category: { id: "cat-web", name: "Веб-разработка", slug: "web-development" },
    techStack: ["Next.js", "Framer Motion", "TailwindCSS"],
    metrics: { "Конверсия": "12%", "Скорость": "98/100" },
  },
  {
    id: "6",
    title: "ФитнесКлуб — Таргетированная реклама",
    slug: "fitnessclub",
    cover: "",
    category: { id: "cat-marketing", name: "Маркетинг", slug: "marketing" },
    techStack: ["VK Ads", "Telegram Ads", "Analytics"],
    metrics: { "Лиды": "+200%", "CPA": "-40%" },
  },
];

async function getProjects(): Promise<PortfolioProject[]> {
  try {
    const res = await fetch(`${API_URL}/portfolio`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackProjects;
    const data = await res.json();
    return data.length > 0 ? data : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

async function getCategories(): Promise<PortfolioCategory[]> {
  try {
    const res = await fetch(`${API_URL}/portfolio/categories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackCategories;
    const data = await res.json();
    return data.length > 0 ? data : fallbackCategories;
  } catch {
    return fallbackCategories;
  }
}

export default async function PortfolioPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);

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

        <PortfolioGrid projects={projects} categories={categories} />
      </div>
    </div>
  );
}
