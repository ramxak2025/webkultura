import { PORTFOLIO_PROJECTS, SERVICE_CATEGORIES } from "./constants";

const API_URL = process.env.API_URL || "http://localhost:4000";

interface ApiPortfolioProject {
  id: string;
  slug: string;
  title: string;
  cover: string;
  gradient: string | null;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: Record<string, string> | null;
  published: boolean;
  order: number;
  category: { id: string; name: string; slug: string };
  images: { id: string; url: string; alt: string; order: number }[];
}

interface ApiService {
  id: string;
  title: string;
  slug: string;
  description: string;
  priceFrom: number | null;
  priceTo: number | null;
  durationEstimate: string | null;
  icon: string | null;
  order: number;
  published: boolean;
  parentId: string | null;
  children?: ApiService[];
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  cover: string;
  gradient: string;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: Record<string, string>;
  category: string;
  images: { id: string; url: string; alt: string }[];
}

export interface ServiceCategory {
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  services: {
    title: string;
    price: string;
    duration: string;
  }[];
}

function formatPrice(from: number | null, to?: number | null): string {
  if (!from) return "По запросу";
  return `от ${from.toLocaleString("ru-RU")} \u20BD`;
}

function mapApiProject(p: ApiPortfolioProject): PortfolioProject {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    cover: p.cover,
    gradient: p.gradient || "from-violet-600 via-purple-600 to-indigo-600",
    challenge: p.challenge,
    solution: p.solution,
    techStack: p.techStack,
    metrics: (p.metrics as Record<string, string>) || {},
    category: p.category.name,
    images: p.images,
  };
}

function mapColorBySlug(slug: string): string {
  const colors: Record<string, string> = {
    marketing: "from-blue-500 to-cyan-400",
    "web-development": "from-violet-500 to-purple-400",
    design: "from-pink-500 to-rose-400",
  };
  return colors[slug] || "from-violet-500 to-purple-400";
}

function mapApiServices(services: ApiService[]): ServiceCategory[] {
  const parents = services.filter((s) => !s.parentId);
  return parents.map((parent) => ({
    title: parent.title,
    slug: parent.slug,
    description: parent.description,
    icon: parent.icon || "Code2",
    color: mapColorBySlug(parent.slug),
    services: (parent.children || []).map((child) => ({
      title: child.title,
      price: formatPrice(child.priceFrom),
      duration: child.durationEstimate || "",
    })),
  }));
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const res = await fetch(`${API_URL}/portfolio`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ApiPortfolioProject[] = await res.json();
    return data.map(mapApiProject);
  } catch {
    return PORTFOLIO_PROJECTS.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      cover: p.cover,
      gradient: p.gradient,
      challenge: p.challenge,
      solution: p.solution,
      techStack: [...p.techStack],
      metrics: { ...p.metrics },
      category: p.category,
      images: [],
    }));
  }
}

export async function getPortfolioProject(slug: string): Promise<PortfolioProject | null> {
  try {
    const res = await fetch(`${API_URL}/portfolio/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ApiPortfolioProject = await res.json();
    return mapApiProject(data);
  } catch {
    const fallback = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
    if (!fallback) return null;
    return {
      id: fallback.id,
      slug: fallback.slug,
      title: fallback.title,
      cover: fallback.cover,
      gradient: fallback.gradient,
      challenge: fallback.challenge,
      solution: fallback.solution,
      techStack: [...fallback.techStack],
      metrics: { ...fallback.metrics },
      category: fallback.category,
      images: [],
    };
  }
}

export async function getServices(): Promise<ServiceCategory[]> {
  try {
    const res = await fetch(`${API_URL}/services`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ApiService[] = await res.json();
    return mapApiServices(data);
  } catch {
    return SERVICE_CATEGORIES.map((c) => ({
      title: c.title,
      slug: c.slug,
      description: c.description,
      icon: c.icon,
      color: c.color,
      services: c.services.map((s) => ({
        title: s.title,
        price: s.price,
        duration: s.duration,
      })),
    }));
  }
}
