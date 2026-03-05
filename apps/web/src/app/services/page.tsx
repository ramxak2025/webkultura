import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Веб-разработка, маркетинг, дизайн — полный спектр digital-услуг для вашего бизнеса.",
};

export default async function ServicesPage() {
  const categories = await getServices();

  return (
    <div className="h-full md:overflow-auto p-4">
      <div className="panel p-6 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Полный спектр <span className="gradient-text">digital-услуг</span>
            </h1>
            <p className="text-gray-500 mt-1">
              От стратегии до реализации.{" "}
              <Link href="/configurator" className="text-indigo-600 hover:underline">
                Воспользуйтесь конфигуратором
              </Link>
            </p>
          </div>
          <Link
            href="/configurator"
            className="hidden md:inline-flex group items-center gap-2 h-12 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-indigo-600/20 hover:scale-105 active:scale-95 shrink-0"
          >
            Подобрать услуги
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.slug} className="panel p-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <span className="text-lg text-white font-bold">{category.title[0]}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
            </Reveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.services.map((service) => (
                <StaggerItem key={service.title}>
                  <div className="group p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300 hover:-translate-y-0.5">
                    <h3 className="font-semibold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors">
                      {service.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="font-medium gradient-text text-xs">{service.price}</span>
                      <span className="text-gray-400 text-xs">{service.duration}</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
