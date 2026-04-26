import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Button({ className, variant = "default", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }) {
  return <button className={cn("inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", variant === "default" && "bg-indigo-600 text-white hover:bg-slate-800 px-4 py-2", className)} {...props} />;
}
