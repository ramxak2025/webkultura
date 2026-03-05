import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, TrendingUp, Palette, Zap, Shield, Target } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { HeroSection } from "@/components/sections/hero";
import { TestimonialsSection } from "@/components/sections/testimonials";
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
    description: "Сайты и веб-приложения на React, Next.js, Node.js. Быстро, масштабируемо, надёжно.",
    href: "/services",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Маркетинг",
    description: "Яндекс Директ, таргет, SEO, контент. Привлекаем клиентов и увеличиваем продажи.",
    href: "/services",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Дизайн",
    description: "UI/UX, брендинг, фирменный стиль. Создаём визуальные решения, которые запоминаются.",
    href: "/services",
    gradient: "from-pink-500 to-rose-500",
  },
];

const advantages = [
  {
    icon: Zap,
    title: "Скорость",
    description: "Запускаем проекты в кратчайшие сроки. Прототип за 3 дня, MVP за 2 недели.",
  },
  {
    icon: Target,
    title: "Результат",
    description: "Фокус на бизнес-метриках. Каждое решение подкреплено данными и аналитикой.",
  },
  {
    icon: Shield,
    title: "Надёжность",
    description: "Современный стек, чистый код, SLA. Поддержка и развитие после запуска.",
  },
];

export default async function HomePage() {
  const projects = await getPortfolioProjects();
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* Services */}
      <section className="py-24 lg:py-32 relative">
        <div className="container-main">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary mb-4 block">Что мы делаем</span>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Полный цикл{" "}
                <span className="gradient-text">digital-услуг</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                От идеи до результата. Комплексный подход к вашему digital-присутствию.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={service.title}>
                  <Link
                    href={service.href}
                    className="group block p-8 rounded-2xl glass hover:glow-sm transition-all duration-500"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Подробнее <ArrowRight size={16} />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 mesh-gradient opacity-50 -z-10" />
        <div className="container-main">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-sm font-medium text-primary mb-4 block">Портфолио</span>
                <h2 className="text-3xl lg:text-5xl font-bold">
                  Избранные{" "}
                  <span className="gradient-text">проекты</span>
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
              >
                Все проекты <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block rounded-2xl overflow-hidden glass transition-all duration-500 hover:glow-md"
                >
                  <div className={`aspect-video bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    {project.cover && (
                      <img src={project.cover} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 rounded-md text-xs bg-secondary text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              Все проекты <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 lg:py-32">
        <div className="container-main">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary mb-4 block">Почему мы</span>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Не просто код —{" "}
                <span className="gradient-text">результат</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Мы создаём продукты, которые работают на ваш бизнес
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <div className="text-center p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center mx-auto mb-6">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="container-main">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600" />
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                  Готовы обсудить проект?
                </h2>
                <p className="text-violet-100 text-lg mb-8 max-w-xl mx-auto">
                  Подберите нужные услуги и получите предварительную оценку с помощью нашего конфигуратора
                </p>
                <Link
                  href="/configurator"
                  className="group inline-flex items-center gap-2 h-14 px-8 bg-white text-violet-700 font-semibold rounded-xl hover:bg-violet-50 transition-all hover:scale-105 active:scale-95"
                >
                  Подобрать услуги
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
