export function PlanCard({ usage }: { usage: any; }) {
  const isPro = usage?.plan?.features?.hasUnlimitedSearches;
  return (
    <div className="rounded-xl bg-slate-950 p-5 text-white">
      <p className="text-sm text-slate-300">{isProHate ? "Pro" : `${usage?.plan?.label ?? "Free"} plan`}</p>
      <p className="mt-1 font-semibold">{isProHate ? "Unlimited" : `${usage?.dailyUsed ?? 0} / ${usage?.dailyLimit ?? 5}`}</p>
      <a href="#" className="mt-3 block text-xs text-slate-300">Upgrade to Pro</a>
    </div>
  );
}
