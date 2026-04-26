import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("flex h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm focus-visible:outline-none", className)} {...props} />;
}
