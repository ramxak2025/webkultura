import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { Target, Heart, Lightbulb, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "Веб-Культура — команда разработчиков, маркетологов и дизайнеров. Создаём цифровые продукты с фокусом на результат.",
};

const values = [
  {
    icon: Target,
    title: "Ориентация на результат",
    description: "Каждое решение подкреплено данными. Мы не делаем «красиво» — мы делаем эффективно.",
  },
  {
    icon: Heart,
    title: "Забота о клиенте",
    description: "Открытая коммуникация, прозрачные процессы и честные сроки. Мы в одной команде.",
  },
  {
    icon: Lightbulb,
    title: "Инновации",
    description: "Современные технологии и подходы. Мы постоянно учимся и внедряем лучшие практики.",
  },
  {
    icon: Users,
    title: "Командная работа",
    description: "Разработчики, маркетологи и дизайнеры работают над проектом единой командой.",
  },
];

const timeline = [
  { year: "2020", title: "Основание", description: "Запуск студии с фокусом на веб-разработку" },
  { year: "2021", title: "Маркетинг", description: "Расширение услуг — добавлен маркетинг и SEO" },
  { year: "2022", title: "Масштабирование", description: "Рост команды, работа с крупными клиентами" },
  { year: "2023", title: "Комплексный подход", description: "Полный цикл — от стратегии до поддержки" },
  { year: "2024", title: "50+ проектов", description: "Успешная реализация более 50 digital-проектов" },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container-main">
        {/* Hero */}
        <Reveal>
          <div className="max-w-3xl mb-20">
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Мы — Веб-Культура
            </h1>
            <p className="text-lg lg:text-xl text-neutral-500 leading-relaxed">
              Digital студия, которая верит в силу технологий и дизайна.
              Мы помогаем бизнесу расти в цифровой среде, создавая продукты,
              которые работают и приносят результат.
            </p>
          </div>
        </Reveal>

        {/* Values */}
        <section className="mb-24">
          <Reveal>
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-10">
              Наши ценности
            </h2>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="flex gap-5 p-6 rounded-2xl border border-neutral-200 bg-white">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                        {value.title}
                      </h3>
                      <p className="text-neutral-500 text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* Timeline */}
        <section>
          <Reveal>
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-10">
              Наша история
            </h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 -translate-x-1/2" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="hidden md:block flex-1" />
                    <div className="relative z-10 w-8 h-8 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.year.slice(-2)}
                    </div>
                    <div className="flex-1 pb-2">
                      <span className="text-sm font-medium text-brand-600">{item.year}</span>
                      <h3 className="text-lg font-semibold text-neutral-900 mt-1">
                        {item.title}
                      </h3>
                      <p className="text-neutral-500 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
