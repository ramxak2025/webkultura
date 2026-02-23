"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button, Input, Textarea, Label } from "@webkultura/ui";

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
        }
      );

      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch {
      // Will be handled by error boundary in production
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
          <Send size={28} />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          Заявка отправлена!
        </h3>
        <p className="text-neutral-500">
          Мы свяжемся с вами в ближайшее время
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Имя *</Label>
          <Input
            id="name"
            placeholder="Ваше имя"
            className="mt-1.5"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Телефон *</Label>
          <Input
            id="phone"
            placeholder="+7 (999) 000-00-00"
            className="mt-1.5"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="telegram">Telegram</Label>
          <Input
            id="telegram"
            placeholder="@username"
            className="mt-1.5"
            {...register("telegram")}
          />
        </div>

        <div>
          <Label htmlFor="budget">Бюджет</Label>
          <Input
            id="budget"
            placeholder="от 100 000 ₽"
            className="mt-1.5"
            {...register("budget")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="comment">Описание задачи *</Label>
        <Textarea
          id="comment"
          placeholder="Расскажите о вашем проекте..."
          className="mt-1.5"
          rows={4}
          {...register("comment")}
        />
        {errors.comment && (
          <p className="text-xs text-red-500 mt-1">{errors.comment.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isLoading} className="w-full sm:w-auto">
        {isLoading ? "Отправка..." : "Отправить заявку"}
      </Button>
    </form>
  );
}
