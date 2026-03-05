import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, TrendingUp, Palette, Zap, Shield, Target, Megaphone, Sparkles } from "lucide-react";
import { Counter } from "@/components/motion/counter";
import { STATS, TESTIMONIALS } from "@/lib/constants";
import { getPortfolioProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Веб-Культура — Digital-агентство полного цикла",
  description:
    "Создаём сайты, запускаем рекламу, разрабатываем бренды. Современные технологии, прозрачные процессы, измеримый результат.",
};

const services = [
  {
    icon: Code2,
    title: "Разработка",
    desc: "Сайты, приложения, SaaS",
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    text: "text-violet-600",
    href: "/services",
  },
  {
    icon: TrendingUp,
    title: "Маркетинг",
    desc: "SEO, контент, аналитика",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
    href: "/services",
  },
  {
    icon: Palette,
    title: "Дизайн",
    desc: "UI/UX, брендинг, айдентика",
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    text: "text-pink-600",
    href: "/services",
  },
  {
    icon: Megaphone,
    title: "Реклама",
    desc: "Директ, ВК, Telegram Ads",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
    href: "/advertising",
  },
];

const advantages = [
  { icon: Zap, title: "Скорость", desc: "MVP за 2 недели" },
  { icon: Target, title: "Результат", desc: "Фокус на метриках" },
  { icon: Shield, title: "Надёжность", desc: "SLA и поддержка" },
];

export default async function HomePage() {
  const projects = await getPortfolioProjects();
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="h-full">
      {/* ============ DESKTOP ============ */}
      <div className="hidden md:grid h-full gap-3 p-4 grid-cols-4 grid-rows-[auto_1fr_1fr]">
        {/* Hero tile — full width */}
        <div className="col-span-4 tile shimmer-hover p-6 flex items-center justify-between reveal-up">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium mb-3">
              <Sparkles size={12} />
              Digital-агентство полного цикла
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Создаём <span className="gradient-text">цифровые продукты</span>,
              <br />которые приносят результат
            </h1>
            <p className="text-gray-500 mt-2 max-w-xl">
              Разработка, маркетинг, дизайн и реклама. Полный цикл от стратегии до запуска.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/configurator"
              className="group inline-flex items-center gap-2 h-12 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-600/20 hover:scale-105 active:scale-95"
            >
              Обсудить проект
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl font-semibold text-gray-700 bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-gray-300"
            >
              Портфолио
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="col-span-1 tile p-4 flex flex-col justify-center gap-3 reveal-up stagger-1">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-2xl font-bold gradient-text">
                <Counter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="col-span-2 tile p-4 reveal-up stagger-2">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Услуги</h2>
          <div className="grid grid-cols-2 gap-2 h-[calc(100%-2rem)]">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group flex flex-col justify-between p-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{service.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{service.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Advantages */}
        <div className="col-span-1 tile p-4 flex flex-col justify-between reveal-up stagger-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Почему мы</h2>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Projects */}
        <div className="col-span-3 tile p-4 reveal-up stagger-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Проекты</h2>
            <Link href="/portfolio" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors">
              Все <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 h-[calc(100%-2.5rem)]">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group block rounded-xl overflow-hidden bg-white border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`aspect-[16/9] bg-gradient-to-br ${project.gradient} relative`}>
                  {project.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.cover} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/90 text-gray-700 shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {project.techStack.slice(0, 2).map((tech) => (
                      <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] bg-gray-50 text-gray-500 border border-gray-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="col-span-1 tile p-4 flex flex-col justify-between reveal-up stagger-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Отзывы</h2>
          {TESTIMONIALS.slice(0, 1).map((t) => (
            <div key={t.name} className="flex-1 flex flex-col justify-center">
              <p className="text-sm text-gray-600 italic leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-3">
                <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                <div className="text-xs text-gray-400">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ MOBILE — Metro One-Screen ============ */}
      <div className="md:hidden flex flex-col h-[calc(100dvh-4rem)] p-3 gap-2">
        {/* Logo bar */}
        <div className="flex items-center justify-between px-1 py-2 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://i.ibb.co/kgRGc9Yx/logo-horizontal.png"
            alt="Веб-Культура"
            className="h-6 w-auto"
          />
          <Link
            href="/configurator"
            className="text-xs font-semibold text-indigo-600 flex items-center gap-1"
          >
            Обсудить <ArrowRight size={12} />
          </Link>
        </div>

        {/* Hero tile */}
        <div className="tile p-4 shrink-0 reveal-up">
          <h1 className="text-lg font-bold text-gray-900 leading-snug">
            Создаём <span className="gradient-text">цифровые продукты</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Полный цикл от стратегии до запуска</p>
        </div>

        {/* Services grid — 2x2 */}
        <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className={`tile shimmer-hover flex flex-col justify-between p-3 reveal-up stagger-${i + 1}`}
              >
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                  <Icon size={18} className="text-white" />
                </div>
                <div className="mt-auto">
                  <h3 className="font-semibold text-gray-800 text-sm">{service.title}</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">{service.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 shrink-0">
          {STATS.map((stat, i) => (
            <div key={stat.label} className={`tile p-2 text-center reveal-up stagger-${i + 5}`}>
              <div className="text-base font-bold gradient-text leading-none">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[9px] text-gray-400 mt-0.5 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <Link
          href="/configurator"
          className="shrink-0 flex items-center justify-center gap-2 h-11 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl text-sm transition-all active:scale-95 reveal-up stagger-8"
        >
          Обсудить проект <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
