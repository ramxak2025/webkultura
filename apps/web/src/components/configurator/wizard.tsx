"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ShoppingCart, Check, Send, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const serviceCategories = [
  {
    id: "marketing",
    title: "Маркетинг",
    description: "Продвижение в интернете",
    gradient: "from-blue-500 to-cyan-500",
    services: [
      { id: "yandex-direct", title: "Яндекс Директ", priceFrom: 30000, priceTo: 150000, duration: "от 2 нед.", related: ["seo"] },
      { id: "vk-ads", title: "VK Реклама", priceFrom: 25000, priceTo: 120000, duration: "от 2 нед.", related: ["telegram-ads"] },
      { id: "telegram-ads", title: "Telegram Ads", priceFrom: 50000, priceTo: 200000, duration: "от 1 нед.", related: ["vk-ads"] },
      { id: "seo", title: "SEO-продвижение", priceFrom: 40000, priceTo: 180000, duration: "от 3 мес.", related: ["yandex-direct"] },
    ],
  },
  {
    id: "web-development",
    title: "Разработка",
    description: "Сайты и приложения",
    gradient: "from-violet-500 to-purple-500",
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
    gradient: "from-pink-500 to-rose-500",
    services: [
      { id: "ui-ux-design", title: "UI/UX дизайн", priceFrom: 80000, priceTo: 300000, duration: "от 2 нед.", related: ["brand-identity"] },
      { id: "brand-identity", title: "Фирменный стиль", priceFrom: 60000, priceTo: 250000, duration: "от 2 нед.", related: ["ui-ux-design"] },
    ],
  },
];

const allServices = serviceCategories.flatMap((c) => c.services);

function formatPrice(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

function formatRange(from: number, to: number) {
  return `${formatPrice(from)} — ${formatPrice(to)}`;
}

const briefSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().min(10, "Введите номер телефона"),
  telegram: z.string().optional(),
  budget: z.string().optional(),
  comment: z.string().optional(),
});

type BriefData = z.infer<typeof briefSchema>;
type Step = "category" | "services" | "cart" | "brief";

const steps: Step[] = ["category", "services", "cart", "brief"];

const inputClass = "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

export function ConfiguratorWizard() {
  const [step, setStep] = useState<Step>("category");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<BriefData>({
    resolver: zodResolver(briefSchema),
  });

  const selectedItems = allServices.filter((s) => selectedServices.includes(s.id));
  const totalFrom = selectedItems.reduce((sum, s) => sum + s.priceFrom, 0);
  const totalTo = selectedItems.reduce((sum, s) => sum + s.priceTo, 0);

  const suggestions = selectedServices
    .flatMap((id) => allServices.find((s) => s.id === id)?.related ?? [])
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
          body: JSON.stringify({ ...data, services: selectedServices }),
        },
      );
      if (res.ok) setIsSubmitted(true);
    } catch {
      // Silent
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
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Заявка отправлена!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Мы получили ваш бриф и свяжемся в ближайшее время для обсуждения деталей.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === s
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                  : steps.indexOf(step) > i
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              {steps.indexOf(step) > i ? <Check size={14} /> : i + 1}
            </div>
            {i < 3 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "category" && (
          <motion.div key="category" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h1 className="text-3xl font-bold text-white mb-2">Выберите направление</h1>
            <p className="text-muted-foreground mb-8">С чего хотите начать?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setStep("services"); }}
                  className="group p-6 rounded-2xl glass text-left hover:glow-sm transition-all duration-500"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4`}>
                    <span className="text-white font-bold">{cat.title[0]}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "services" && (
          <motion.div key="services" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h1 className="text-3xl font-bold text-white mb-2">Выберите услуги</h1>
            <p className="text-muted-foreground mb-8">Выберите одну или несколько</p>
            {serviceCategories.map((cat) => (
              <div key={cat.id} className="mb-8">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">{cat.title}</h3>
                <div className="space-y-2">
                  {cat.services.map((svc) => {
                    const isSelected = selectedServices.includes(svc.id);
                    return (
                      <button
                        key={svc.id}
                        onClick={() => toggleService(svc.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                          isSelected ? "border-primary/50 glass glow-sm" : "glass hover:border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                            isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                          }`}>
                            {isSelected && <Check size={14} className="text-white" />}
                          </div>
                          <span className="font-medium text-white">{svc.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{formatRange(svc.priceFrom, svc.priceTo)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {suggestions.length > 0 && selectedServices.length > 0 && (
              <div className="mt-6 p-4 rounded-xl glass border-amber-500/20">
                <p className="text-sm font-medium text-amber-400 mb-3">Часто заказывают вместе:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((id) => {
                    const svc = allServices.find((s) => s.id === id);
                    if (!svc) return null;
                    return (
                      <button key={id} onClick={() => toggleService(id)} className="px-3 py-1.5 rounded-lg glass text-sm text-amber-300 hover:text-white transition-colors">
                        + {svc.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 mt-8">
              <button onClick={() => setStep("category")} className="h-12 px-6 rounded-xl glass font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all">
                <ArrowLeft size={16} /> Назад
              </button>
              <button onClick={() => setStep("cart")} disabled={selectedServices.length === 0} className="h-12 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 font-semibold text-white flex items-center gap-2 hover:shadow-lg hover:shadow-violet-600/25 transition-all disabled:opacity-50">
                Далее <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === "cart" && (
          <motion.div key="cart" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h1 className="text-3xl font-bold text-white mb-2">
              <ShoppingCart className="inline -mt-1 mr-2" size={28} /> Ваш набор услуг
            </h1>
            <p className="text-muted-foreground mb-8">Проверьте выбранные услуги</p>
            <div className="space-y-3 mb-8">
              {selectedItems.map((svc) => (
                <div key={svc.id} className="flex items-center justify-between p-4 rounded-xl glass">
                  <div>
                    <span className="font-medium text-white">{svc.title}</span>
                    <span className="text-sm text-muted-foreground ml-2">{svc.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium gradient-text">{formatRange(svc.priceFrom, svc.priceTo)}</span>
                    <button onClick={() => toggleService(svc.id)} className="text-muted-foreground hover:text-red-400 transition-colors text-xs">Убрать</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 rounded-2xl glass glow-sm mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Предварительная стоимость:</span>
                <span className="text-xl font-bold gradient-text">{formatRange(totalFrom, totalTo)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Точная стоимость определяется после обсуждения деталей</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setStep("services")} className="h-12 px-6 rounded-xl glass font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all">
                <ArrowLeft size={16} /> Изменить
              </button>
              <button onClick={() => setStep("brief")} className="h-12 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 font-semibold text-white flex items-center gap-2 hover:shadow-lg hover:shadow-violet-600/25 transition-all">
                Заполнить бриф <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === "brief" && (
          <motion.div key="brief" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h1 className="text-3xl font-bold text-white mb-2">Расскажите о себе</h1>
            <p className="text-muted-foreground mb-8">Заполните контактные данные</p>
            <form onSubmit={handleSubmit(onBriefSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white block mb-1.5">Имя *</label>
                  <input className={inputClass} placeholder="Ваше имя" {...register("name")} />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-white block mb-1.5">Телефон *</label>
                  <input className={inputClass} placeholder="+7 (999) 000-00-00" {...register("phone")} />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white block mb-1.5">Telegram</label>
                  <input className={inputClass} placeholder="@username" {...register("telegram")} />
                </div>
                <div>
                  <label className="text-sm font-medium text-white block mb-1.5">Бюджет</label>
                  <input className={inputClass} placeholder="от 100 000 ₽" {...register("budget")} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-white block mb-1.5">Комментарий</label>
                <textarea className={`${inputClass} resize-none`} placeholder="Дополнительная информация..." rows={3} {...register("comment")} />
              </div>
              <div className="p-4 rounded-xl glass">
                <p className="text-sm font-medium text-white mb-2">Выбранные услуги:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItems.map((svc) => (
                    <span key={svc.id} className="px-2 py-1 rounded-md bg-primary/20 text-primary text-xs font-medium">{svc.title}</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">Оценка: {formatRange(totalFrom, totalTo)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setStep("cart")} className="h-12 px-6 rounded-xl glass font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all">
                  <ArrowLeft size={16} /> Назад
                </button>
                <button type="submit" disabled={isLoading} className="h-12 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 font-semibold text-white flex items-center gap-2 hover:shadow-lg hover:shadow-violet-600/25 transition-all disabled:opacity-50">
                  {isLoading ? "Отправка..." : "Отправить бриф"} <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
