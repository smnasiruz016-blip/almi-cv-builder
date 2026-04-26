import { cn } from "@/lib/utils";
export function MatchScore({ score, reasons = [], compact = false }: { score: number; reasons?: string[]; compact?: boolean; }) {
  const color = score >= 80 ? "bg-emerald-100 text-emerald-800" : score >= 60 ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800";
  const bar = score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className={cn("space-y-2", compact && "min-w-[120px]")}>
      <span className={cn("rounded-full px-3 py-1 text-sm font-semibold", color)} title={reasons.join(" | ")}>{score}/100</span>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={cn("h-full rounded-full", bar)} style={{ width: `${score}%` }} /></div>
    </div>
  );
}
