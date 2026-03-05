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
  { icon: Target, title: "Ориентация на результат", description: "Каждое решение подкреплено данными. Мы не делаем «красиво» — мы делаем эффективно.", gradient: "from-violet-500 to-purple-500" },
  { icon: Heart, title: "Забота о клиенте", description: "Открытая коммуникация, прозрачные процессы и честные сроки.", gradient: "from-pink-500 to-rose-500" },
  { icon: Lightbulb, title: "Инновации", description: "Современные технологии и подходы. Постоянно учимся и внедряем лучшее.", gradient: "from-amber-500 to-orange-500" },
  { icon: Users, title: "Командная работа", description: "Разработчики, маркетологи и дизайнеры работают единой командой.", gradient: "from-blue-500 to-cyan-500" },
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
    <div className="h-full md:overflow-auto p-4">
      <div className="panel p-6 mb-3">
        <h1 className="text-3xl font-bold text-gray-900">
          Мы — <span className="gradient-text">Веб-Культура</span>
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Digital-агентство, которое верит в силу технологий и дизайна.
          Помогаем бизнесу расти в цифровой среде.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="panel p-5">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Ценности</h2>
          <StaggerContainer className="space-y-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all duration-300">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${value.gradient} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{value.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{value.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        <div className="space-y-3">
          <div className="panel p-5">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Команда</h2>
            <StaggerContainer className="grid grid-cols-2 gap-3">
              {TEAM_MEMBERS.map((member) => (
                <StaggerItem key={member.name}>
                  <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all duration-300">
                    <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-2`}>
                      <span className="text-lg font-bold text-white">{member.name[0]}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">{member.name}</h3>
                    <p className="text-xs text-gray-400">{member.role}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="panel p-5">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">История</h2>
            <div className="space-y-3">
              {timeline.map((item) => (
                <Reveal key={item.year}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      {item.year.slice(-2)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Reveal>
        <div className="relative overflow-hidden rounded-2xl p-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-3">Давайте работать вместе</h2>
            <p className="text-indigo-100 mb-5 max-w-md mx-auto text-sm">
              Расскажите о вашем проекте — мы предложим решение
            </p>
            <Link
              href="/configurator"
              className="group inline-flex items-center gap-2 h-12 px-6 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95"
            >
              Обсудить проект
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
