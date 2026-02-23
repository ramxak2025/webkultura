import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceRange(from?: number | null, to?: number | null): string {
  if (from && to) return `${formatPrice(from)} — ${formatPrice(to)}`;
  if (from) return `от ${formatPrice(from)}`;
  if (to) return `до ${formatPrice(to)}`;
  return "По запросу";
}
