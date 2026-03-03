import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { SERVICE_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Веб-разработка, маркетинг, дизайн — полный спектр digital-услуг для вашего бизнеса.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container-main">
        <Reveal>
          <div className="max-w-3xl mb-20">
            <span className="text-sm font-medium text-primary mb-4 block">Услуги</span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Полный спектр{" "}
              <span className="gradient-text">digital-услуг</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              От стратегии до реализации. Подберите нужные решения или{" "}
              <Link href="/configurator" className="text-primary hover:underline">
                воспользуйтесь конфигуратором
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <div className="space-y-24">
          {SERVICE_CATEGORIES.map((category) => (
            <section key={category.slug}>
              <Reveal>
                <div className="flex items-center gap-4 mb-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <span className="text-xl text-white font-bold">{category.title[0]}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Reveal>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.services.map((service) => (
                  <StaggerItem key={service.title}>
                    <div className="group p-6 rounded-2xl glass hover:glow-sm transition-all duration-500">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm mt-4">
                        <span className="font-medium gradient-text">
                          {service.price}
                        </span>
                        <span className="text-muted-foreground">
                          {service.duration}
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600" />
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                Не знаете, что выбрать?
              </h2>
              <p className="text-violet-100 text-lg mb-8 max-w-xl mx-auto">
                Наш конфигуратор поможет подобрать оптимальный набор услуг под ваши задачи и бюджет.
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
    </div>
  );
}
