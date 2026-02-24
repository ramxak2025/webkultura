"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@webkultura/ui";
import { PortfolioCard } from "./portfolio-card";
import { Reveal } from "@/components/motion/reveal";

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

interface PortfolioGridProps {
  projects: PortfolioProject[];
  categories: PortfolioCategory[];
}

export function PortfolioGrid({ projects, categories }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? projects.filter((p) => p.category.id === activeCategory)
    : projects;

  return (
    <>
      {/* Category filters */}
      <Reveal>
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium border transition-colors",
              !activeCategory
                ? "bg-brand-600 text-white border-brand-600"
                : "border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300"
            )}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium border transition-colors",
                activeCategory === cat.id
                  ? "bg-brand-600 text-white border-brand-600"
                  : "border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Projects grid — masonry-like with varied heights */}
      <motion.div
        layout
        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid"
            >
              <PortfolioCard
                project={{
                  id: project.id,
                  title: project.title,
                  slug: project.slug,
                  cover: project.cover,
                  category: project.category.name,
                  techStack: project.techStack,
                  metrics: project.metrics || undefined,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-neutral-400 text-lg">
            {projects.length === 0
              ? "Портфолио скоро пополнится новыми проектами"
              : "В этой категории пока нет проектов"}
          </p>
        </div>
      )}
    </>
  );
}
