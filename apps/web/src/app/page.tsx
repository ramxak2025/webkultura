import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, TrendingUp, Palette, Zap, Shield, Target, Megaphone } from "lucide-react";
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
    href: "/services",
  },
  {
    icon: TrendingUp,
    title: "Маркетинг",
    desc: "SEO, контент, аналитика",
    gradient: "from-blue-500 to-cyan-500",
    href: "/services",
  },
  {
    icon: Palette,
    title: "Дизайн",
    desc: "UI/UX, брендинг, айдентика",
    gradient: "from-pink-500 to-rose-500",
    href: "/services",
  },
  {
    icon: Megaphone,
    title: "Реклама",
    desc: "Директ, ВК, Telegram Ads",
    gradient: "from-amber-500 to-orange-500",
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
    <div className="h-full md:p-3 md:overflow-hidden">
      {/* Desktop: Grid layout, all on one screen */}
      <div className="hidden md:grid h-full gap-3 grid-cols-4 grid-rows-[auto_1fr_1fr]">
        {/* Hero panel — full width top */}
        <div className="col-span-4 panel p-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Создаём <span className="gradient-text">цифровые продукты</span>,
                <br />которые приносят результат
              </h1>
              <p className="text-gray-500 mt-2 max-w-xl">
                Разработка, маркетинг, дизайн и реклама. Полный цикл от стратегии до запуска.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/configurator"
              className="group inline-flex items-center gap-2 h-12 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-indigo-600/20 hover:scale-105 active:scale-95"
            >
              Обсудить проект
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center h-12 px-6 glass rounded-xl font-semibold text-gray-700 transition-all hover:bg-white/70"
            >
              Портфолио
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="col-span-1 panel p-4 flex flex-col justify-center gap-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-2xl font-bold gradient-text">
                <Counter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Services grid */}
        <div className="col-span-2 panel p-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Услуги</h2>
          <div className="grid grid-cols-2 gap-2 h-[calc(100%-2rem)]">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group flex flex-col justify-between p-4 rounded-xl bg-white/40 hover:bg-white/70 border border-white/50 transition-all duration-300 hover:shadow-md"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-2`}>
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
        <div className="col-span-1 panel p-4 flex flex-col justify-between">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Почему мы</h2>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shrink-0">
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

        {/* Featured projects row */}
        <div className="col-span-3 panel p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Проекты</h2>
            <Link href="/portfolio" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              Все <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 h-[calc(100%-2.5rem)]">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group block rounded-xl overflow-hidden bg-white/40 border border-white/50 hover:shadow-md transition-all"
              >
                <div className={`aspect-[16/9] bg-gradient-to-br ${project.gradient} relative`}>
                  {project.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.cover} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/80 text-gray-700 backdrop-blur-sm">
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
                      <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-500">
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
        <div className="col-span-1 panel p-4 flex flex-col justify-between">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Отзывы</h2>
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

      {/* Mobile: Scrollable layout */}
      <div className="md:hidden">
        {/* Mobile Hero */}
        <section className="px-4 pt-6 pb-8">
          <div className="glass rounded-2xl p-6">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
              Создаём <span className="gradient-text">цифровые продукты</span>,
              которые приносят результат
            </h1>
            <p className="text-gray-500 mb-6">
              Разработка, маркетинг, дизайн и реклама. Полный цикл от стратегии до запуска.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/configurator"
                className="group inline-flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl"
              >
                Обсудить проект
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center h-12 glass rounded-xl font-semibold text-gray-700"
              >
                Портфолио
              </Link>
            </div>
          </div>
        </section>

        {/* Mobile Stats */}
        <section className="px-4 pb-6">
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Services */}
        <section className="px-4 pb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Услуги</h2>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="glass rounded-xl p-4 flex flex-col gap-2"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{service.title}</h3>
                  <p className="text-xs text-gray-400">{service.desc}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Mobile Projects */}
        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Проекты</h2>
            <Link href="/portfolio" className="text-sm text-indigo-600 font-medium">Все</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="glass rounded-xl overflow-hidden shrink-0 w-[260px]"
              >
                <div className={`aspect-video bg-gradient-to-br ${project.gradient} relative`}>
                  {project.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.cover} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800">{project.title}</h3>
                  <span className="text-xs text-gray-400">{project.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Mobile CTA */}
        <section className="px-4 pb-8">
          <div className="relative overflow-hidden rounded-2xl p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-3">Готовы обсудить проект?</h2>
              <p className="text-indigo-100 text-sm mb-5">
                Подберите нужные услуги с помощью нашего конфигуратора
              </p>
              <Link
                href="/configurator"
                className="inline-flex items-center gap-2 h-12 px-6 bg-white text-indigo-700 font-semibold rounded-xl"
              >
                Подобрать услуги <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
