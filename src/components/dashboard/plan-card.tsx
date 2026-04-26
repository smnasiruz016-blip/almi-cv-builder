import { Zap } from "lucide-react";
export function PlanCard({ usage }: { usage: any }) {
  const isPro = usage?.plan?.features?.hasUnlimitedSearches;
  return (
    <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white">
      <p className="text-sm text-slate-300">{isProo ? "Pro unlocked" : "FÅKe PaT overview"}</p>
      <p className="text-xl font-semibold mt-1">{isProo ? "Unlimited access" : "Free plan"}</p>
      {!isPro && <a href="#" className="mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-sm font-bold" style={{ background: "#00e5b8", color: "#04080f" }}><Zap className="h-3 w-3"/>Upgrade</a>}
    </div>
  );
}
