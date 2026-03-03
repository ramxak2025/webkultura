import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Lightbulb, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { TEAM_MEMBERS } from "@/lib/constants";

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
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Heart,
    title: "Забота о клиенте",
    description: "Открытая коммуникация, прозрачные процессы и честные сроки. Мы в одной команде.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Lightbulb,
    title: "Инновации",
    description: "Современные технологии и подходы. Мы постоянно учимся и внедряем лучшие практики.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Командная работа",
    description: "Разработчики, маркетологи и дизайнеры работают над проектом единой командой.",
    gradient: "from-blue-500 to-cyan-500",
  },
];

const timeline = [
  { year: "2019", title: "Основание", description: "Запуск студии с фокусом на веб-разработку" },
  { year: "2020", title: "Маркетинг", description: "Расширение услуг — добавлен маркетинг и SEO" },
  { year: "2021", title: "Масштабирование", description: "Рост команды, работа с крупными клиентами" },
  { year: "2023", title: "Комплексный подход", description: "Полный цикл — от стратегии до поддержки" },
  { year: "2025", title: "150+ проектов", description: "Успешная реализация более 150 digital-проектов" },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container-main">
        <Reveal>
          <div className="max-w-3xl mb-20">
            <span className="text-sm font-medium text-primary mb-4 block">О нас</span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Мы —{" "}
              <span className="gradient-text">Веб-Культура</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Digital-агентство, которое верит в силу технологий и дизайна.
              Мы помогаем бизнесу расти в цифровой среде, создавая продукты,
              которые работают и приносят результат.
            </p>
          </div>
        </Reveal>

        {/* Values */}
        <section className="mb-32">
          <Reveal>
            <h2 className="text-2xl lg:text-4xl font-bold mb-12">
              Наши <span className="gradient-text">ценности</span>
            </h2>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="flex gap-5 p-6 rounded-2xl glass hover:glow-sm transition-all duration-500">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shrink-0`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* Team */}
        <section className="mb-32">
          <Reveal>
            <h2 className="text-2xl lg:text-4xl font-bold mb-12">
              Наша <span className="gradient-text">команда</span>
            </h2>
          </Reveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <StaggerItem key={member.name}>
                <div className="text-center glass rounded-2xl p-6 hover:glow-sm transition-all duration-500">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4`}>
                    <span className="text-2xl font-bold text-white">
                      {member.name[0]}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Timeline */}
        <section className="mb-24">
          <Reveal>
            <h2 className="text-2xl lg:text-4xl font-bold mb-12">
              Наша <span className="gradient-text">история</span>
            </h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="hidden md:block flex-1" />
                    <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.year.slice(-2)}
                    </div>
                    <div className="flex-1 pb-2 glass rounded-xl p-4">
                      <span className="text-sm font-medium text-primary">{item.year}</span>
                      <h3 className="text-lg font-semibold text-white mt-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600" />
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                Давайте работать вместе
              </h2>
              <p className="text-violet-100 text-lg mb-8 max-w-xl mx-auto">
                Расскажите о вашем проекте — мы предложим решение
              </p>
              <Link
                href="/configurator"
                className="group inline-flex items-center gap-2 h-14 px-8 bg-white text-violet-700 font-semibold rounded-xl hover:bg-violet-50 transition-all hover:scale-105 active:scale-95"
              >
                Обсудить проект
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
