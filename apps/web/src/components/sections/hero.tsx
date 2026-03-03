"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Counter } from "@/components/motion/counter";
import { STATS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

function FloatingOrb({ className, delay }: { readonly className: string; readonly delay: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient -z-10" />

      <FloatingOrb className="w-96 h-96 bg-violet-600/20 top-20 -left-48" delay={0} />
      <FloatingOrb className="w-80 h-80 bg-blue-600/15 top-40 right-0" delay={2} />
      <FloatingOrb className="w-64 h-64 bg-pink-600/10 bottom-20 left-1/3" delay={4} />

      <div className="absolute inset-0 grid-pattern opacity-30 -z-10" />

      <div className="container-main relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-violet-300 mb-8">
              <Sparkles size={14} className="text-violet-400" />
              Digital-агентство полного цикла
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8"
          >
            Создаём{" "}
            <span className="gradient-text">цифровые</span>
            <br />
            <span className="gradient-text-accent">продукты</span>,{" "}
            которые
            <br className="hidden sm:block" />
            приносят{" "}
            <span className="relative inline-block">
              результат
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Разработка сайтов, маркетинг, дизайн и продвижение.
            Комплексный подход от стратегии до запуска и поддержки.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <Link
              href="/configurator"
              className="group inline-flex items-center justify-center gap-2 h-14 px-8 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-violet-600/25 hover:scale-105 active:scale-95"
            >
              Обсудить проект
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 glass rounded-xl font-semibold text-white transition-all hover:bg-white/10"
            >
              Смотреть портфолио
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease }}
                className="glass rounded-xl p-5"
              >
                <div className="text-3xl lg:text-4xl font-bold gradient-text">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
