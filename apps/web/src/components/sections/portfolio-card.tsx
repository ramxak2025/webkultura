"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  cover: string;
  category: string;
  techStack: string[];
  metrics?: Record<string, string>;
}

export function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-lg hover:border-neutral-300 transition-shadow"
      >
        {/* Cover placeholder */}
        <div className="aspect-[4/3] bg-gradient-to-br from-brand-50 to-brand-100 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-brand-300">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={16} className="text-neutral-700" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <span className="text-xs font-medium text-brand-600 uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="text-lg font-semibold text-neutral-900 mt-1 mb-3">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs rounded-md bg-neutral-100 text-neutral-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
