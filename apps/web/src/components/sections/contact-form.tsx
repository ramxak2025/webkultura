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
      // handled silently
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Заявка отправлена!</h3>
        <p className="text-gray-500">Мы свяжемся с вами в ближайшее время</p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all text-sm";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="name" className="text-xs font-medium text-gray-600 block mb-1">Имя *</label>
          <input id="name" placeholder="Ваше имя" className={inputClass} {...register("name")} />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="text-xs font-medium text-gray-600 block mb-1">Телефон *</label>
          <input id="phone" placeholder="+7 (999) 000-00-00" className={inputClass} {...register("phone")} />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="telegram" className="text-xs font-medium text-gray-600 block mb-1">Telegram</label>
          <input id="telegram" placeholder="@username" className={inputClass} {...register("telegram")} />
        </div>
        <div>
          <label htmlFor="budget" className="text-xs font-medium text-gray-600 block mb-1">Бюджет</label>
          <input id="budget" placeholder="от 100 000 ₽" className={inputClass} {...register("budget")} />
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="text-xs font-medium text-gray-600 block mb-1">Описание задачи *</label>
        <textarea
          id="comment"
          placeholder="Расскажите о вашем проекте..."
          rows={3}
          className={`${inputClass} resize-none`}
          {...register("comment")}
        />
        {errors.comment && <p className="text-xs text-red-500 mt-1">{errors.comment.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center gap-2 h-11 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-600/25 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-sm"
      >
        {isLoading ? "Отправка..." : (
          <>Отправить заявку <Send size={14} /></>
        )}
      </button>
    </form>
  );
}
