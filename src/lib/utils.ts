import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function dedupe(values: string[]) { return [...new Set(values.map(v => v.trim()).filter(Boolean))]; }
export function slugify(v: string) { return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
export function formatCurrencyRange(min?: number, max?: number) {
  if (!min && !max) return "Not listed";
  const f = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  if (min && max) return `${f.format(min)} - ${f.format(max)}`;
  if (min) return `From ${f.format(min)}`;
  return `Up to ${f.format(max!)}`;
}
