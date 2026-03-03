"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

type LoginData = z.infer<typeof loginSchema>;

const inputClass = "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginData) {
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/auth/login`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) },
      );
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || "Ошибка авторизации");
      }
      const { access_token } = await res.json();
      localStorage.setItem("admin_token", access_token);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка подключения к серверу");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold gradient-text">Админ-панель</h1>
          <p className="text-muted-foreground mt-1">Веб-Культура</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white block mb-1.5">Email</label>
              <input type="email" className={inputClass} placeholder="admin@webkultura.ru" {...register("email")} />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-white block mb-1.5">Пароль</label>
              <input type="password" className={inputClass} placeholder="••••••" {...register("password")} />
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            {error && <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-violet-600/25 disabled:opacity-50"
            >
              {isLoading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
