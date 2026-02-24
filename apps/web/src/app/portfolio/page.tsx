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

async function getProjects(): Promise<PortfolioProject[]> {
  try {
    const res = await fetch(`${API_URL}/portfolio`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getCategories(): Promise<PortfolioCategory[]> {
  try {
    const res = await fetch(`${API_URL}/portfolio/categories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
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
