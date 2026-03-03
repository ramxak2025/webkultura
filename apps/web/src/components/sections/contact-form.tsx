"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().min(10, "Введите номер телефона"),
  telegram: z.string().optional(),
  budget: z.string().optional(),
  comment: z.string().min(10, "Опишите вашу задачу (минимум 10 символов)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (res.ok) setIsSubmitted(true);
    } catch {
      // Silently handle — will be improved with error boundary
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Заявка отправлена!</h3>
        <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-white block mb-1.5">Имя *</label>
          <input
            id="name"
            placeholder="Ваше имя"
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            {...register("name")}
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-white block mb-1.5">Телефон *</label>
          <input
            id="phone"
            placeholder="+7 (999) 000-00-00"
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            {...register("phone")}
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="telegram" className="text-sm font-medium text-white block mb-1.5">Telegram</label>
          <input
            id="telegram"
            placeholder="@username"
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            {...register("telegram")}
          />
        </div>
        <div>
          <label htmlFor="budget" className="text-sm font-medium text-white block mb-1.5">Бюджет</label>
          <input
            id="budget"
            placeholder="от 100 000 ₽"
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            {...register("budget")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="text-sm font-medium text-white block mb-1.5">Описание задачи *</label>
        <textarea
          id="comment"
          placeholder="Расскажите о вашем проекте..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          {...register("comment")}
        />
        {errors.comment && <p className="text-xs text-red-400 mt-1">{errors.comment.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center gap-2 h-12 px-8 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-violet-600/25 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
      >
        {isLoading ? "Отправка..." : (
          <>Отправить заявку <Send size={16} /></>
        )}
      </button>
    </form>
  );
}
