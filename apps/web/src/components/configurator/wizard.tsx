"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ShoppingCart, Check, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Textarea, Label, formatPriceRange } from "@webkultura/ui";

// Service data
const serviceCategories = [
  {
    id: "marketing",
    title: "Маркетинг",
    description: "Продвижение в интернете",
    services: [
      { id: "yandex-direct", title: "Яндекс Директ", priceFrom: 30000, priceTo: 150000, duration: "от 2 нед.", related: ["seo"] },
      { id: "vk-ads", title: "VK Реклама", priceFrom: 25000, priceTo: 120000, duration: "от 2 нед.", related: ["telegram-ads"] },
      { id: "telegram-ads", title: "Telegram Ads", priceFrom: 50000, priceTo: 200000, duration: "от 1 нед.", related: ["vk-ads"] },
      { id: "seo", title: "SEO-продвижение", priceFrom: 40000, priceTo: 180000, duration: "от 3 мес.", related: ["yandex-direct"] },
    ],
  },
  {
    id: "web-development",
    title: "Веб-разработка",
    description: "Сайты и приложения",
    services: [
      { id: "corporate-website", title: "Корпоративный сайт", priceFrom: 150000, priceTo: 500000, duration: "от 4 нед.", related: ["ui-ux-design"] },
      { id: "ecommerce", title: "Интернет-магазин", priceFrom: 300000, priceTo: 1500000, duration: "от 8 нед.", related: ["ui-ux-design", "seo"] },
      { id: "landing-page", title: "Лендинг", priceFrom: 50000, priceTo: 150000, duration: "от 1 нед.", related: ["ui-ux-design", "yandex-direct"] },
    ],
  },
  {
    id: "design",
    title: "Дизайн",
    description: "Визуал и интерфейсы",
    services: [
      { id: "ui-ux-design", title: "UI/UX дизайн", priceFrom: 80000, priceTo: 300000, duration: "от 2 нед.", related: ["brand-identity"] },
      { id: "brand-identity", title: "Фирменный стиль", priceFrom: 60000, priceTo: 250000, duration: "от 2 нед.", related: ["ui-ux-design"] },
    ],
  },
];

const allServices = serviceCategories.flatMap((c) => c.services);

const briefSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().min(10, "Введите номер телефона"),
  telegram: z.string().optional(),
  budget: z.string().optional(),
  comment: z.string().optional(),
});

type BriefData = z.infer<typeof briefSchema>;

type Step = "category" | "services" | "cart" | "brief";

export function ConfiguratorWizard() {
  const [step, setStep] = useState<Step>("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BriefData>({
    resolver: zodResolver(briefSchema),
  });

  const selectedItems = allServices.filter((s) => selectedServices.includes(s.id));
  const totalFrom = selectedItems.reduce((sum, s) => sum + s.priceFrom, 0);
  const totalTo = selectedItems.reduce((sum, s) => sum + s.priceTo, 0);

  // Get suggested "often purchased together"
  const suggestions = selectedServices
    .flatMap((id) => {
      const svc = allServices.find((s) => s.id === id);
      return svc?.related || [];
    })
    .filter((id, i, arr) => arr.indexOf(id) === i && !selectedServices.includes(id));

  function toggleService(id: string) {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function onBriefSubmit(data: BriefData) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            services: selectedServices,
          }),
        }
      );
      if (res.ok) setIsSubmitted(true);
    } catch {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
          <Check size={36} />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">
          Заявка отправлена!
        </h2>
        <p className="text-neutral-500 max-w-md mx-auto">
          Мы получили ваш бриф и свяжемся в ближайшее время для обсуждения деталей.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-10">
        {(["category", "services", "cart", "brief"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === s
                  ? "bg-brand-600 text-white"
                  : ["category", "services", "cart", "brief"].indexOf(step) > i
                    ? "bg-brand-100 text-brand-700"
                    : "bg-neutral-100 text-neutral-400"
              }`}
            >
              {i + 1}
            </div>
            {i < 3 && <div className="w-8 h-px bg-neutral-200" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Category */}
        {step === "category" && (
          <motion.div
            key="category"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Выберите направление
            </h1>
            <p className="text-neutral-500 mb-8">
              С чего хотите начать?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setStep("services");
                  }}
                  className="group p-6 rounded-2xl border border-neutral-200 bg-white text-left hover:border-brand-300 hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-brand-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-neutral-500">{cat.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Services */}
        {step === "services" && (
          <motion.div
            key="services"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Выберите услуги
            </h1>
            <p className="text-neutral-500 mb-8">
              Выберите одну или несколько услуг
            </p>

            {serviceCategories.map((cat) => (
              <div key={cat.id} className="mb-8">
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
                  {cat.title}
                </h3>
                <div className="space-y-2">
                  {cat.services.map((svc) => {
                    const isSelected = selectedServices.includes(svc.id);
                    return (
                      <button
                        key={svc.id}
                        onClick={() => toggleService(svc.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-brand-300 bg-brand-50"
                            : "border-neutral-200 bg-white hover:border-neutral-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-brand-600 border-brand-600"
                                : "border-neutral-300"
                            }`}
                          >
                            {isSelected && <Check size={14} className="text-white" />}
                          </div>
                          <span className="font-medium text-neutral-900">{svc.title}</span>
                        </div>
                        <div className="text-sm text-neutral-500">
                          {formatPriceRange(svc.priceFrom, svc.priceTo)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {suggestions.length > 0 && selectedServices.length > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-sm font-medium text-amber-800 mb-3">
                  Часто заказывают вместе:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((id) => {
                    const svc = allServices.find((s) => s.id === id);
                    if (!svc) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => toggleService(id)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-sm text-amber-800 hover:bg-amber-100 transition-colors"
                      >
                        + {svc.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mt-8">
              <Button variant="outline" onClick={() => setStep("category")}>
                <ArrowLeft size={16} className="mr-2" /> Назад
              </Button>
              <Button
                onClick={() => setStep("cart")}
                disabled={selectedServices.length === 0}
              >
                Далее <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Cart */}
        {step === "cart" && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              <ShoppingCart className="inline -mt-1 mr-2" size={28} />
              Ваш набор услуг
            </h1>
            <p className="text-neutral-500 mb-8">
              Проверьте выбранные услуги
            </p>

            <div className="space-y-3 mb-8">
              {selectedItems.map((svc) => (
                <div
                  key={svc.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 bg-white"
                >
                  <div>
                    <span className="font-medium text-neutral-900">{svc.title}</span>
                    <span className="text-sm text-neutral-400 ml-2">{svc.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-neutral-700">
                      {formatPriceRange(svc.priceFrom, svc.priceTo)}
                    </span>
                    <button
                      onClick={() => toggleService(svc.id)}
                      className="text-neutral-400 hover:text-red-500 transition-colors text-xs"
                    >
                      Убрать
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-600">Предварительная стоимость:</span>
                <span className="text-xl font-bold text-neutral-900">
                  {formatPriceRange(totalFrom, totalTo)}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Точная стоимость определяется после обсуждения деталей проекта
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setStep("services")}>
                <ArrowLeft size={16} className="mr-2" /> Изменить
              </Button>
              <Button onClick={() => setStep("brief")}>
                Обсудить бриф <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Brief */}
        {step === "brief" && (
          <motion.div
            key="brief"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Расскажите о себе
            </h1>
            <p className="text-neutral-500 mb-8">
              Заполните контактные данные и мы свяжемся с вами
            </p>

            <form onSubmit={handleSubmit(onBriefSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brief-name">Имя *</Label>
                  <Input id="brief-name" placeholder="Ваше имя" className="mt-1.5" {...register("name")} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="brief-phone">Телефон *</Label>
                  <Input id="brief-phone" placeholder="+7 (999) 000-00-00" className="mt-1.5" {...register("phone")} />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brief-tg">Telegram</Label>
                  <Input id="brief-tg" placeholder="@username" className="mt-1.5" {...register("telegram")} />
                </div>
                <div>
                  <Label htmlFor="brief-budget">Бюджет</Label>
                  <Input id="brief-budget" placeholder="от 100 000 ₽" className="mt-1.5" {...register("budget")} />
                </div>
              </div>

              <div>
                <Label htmlFor="brief-comment">Комментарий</Label>
                <Textarea
                  id="brief-comment"
                  placeholder="Дополнительная информация о проекте..."
                  className="mt-1.5"
                  rows={3}
                  {...register("comment")}
                />
              </div>

              {/* Selected services summary */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <p className="text-sm font-medium text-neutral-700 mb-2">Выбранные услуги:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItems.map((svc) => (
                    <span key={svc.id} className="px-2 py-1 rounded-md bg-brand-100 text-brand-700 text-xs font-medium">
                      {svc.title}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-neutral-500 mt-2">
                  Оценка: {formatPriceRange(totalFrom, totalTo)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" type="button" onClick={() => setStep("cart")}>
                  <ArrowLeft size={16} className="mr-2" /> Назад
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Отправка..." : "Отправить бриф"}
                  <Send size={16} className="ml-2" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
