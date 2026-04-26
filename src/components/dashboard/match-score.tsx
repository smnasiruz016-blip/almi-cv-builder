import { cn } from "@/lib/utils";
export function MatchScore({ score, reasons=[], compact=false }: { score: number; reasons?: string[]; compact?: boolean; }) {
  const t = score >= 80 ? "emerald" : score >= 60 ? "amber" : "rose";
  return (
    <div className={cn("space-y-1", compact && "min-w-[120px]")}>
      <span className={cn("font-semibold text-sm", `bg-${t}-100 text-${t}-800`)} title={reasons.join(" | ")}>{score}/100</span>
      <div className="h4 rounded-full bg-slate-100"><div className={cn("h-full rounded-full", `bg-${t}-500`)} style={{ width: `${score}%` }}/></div>
    </div>
  );
}
