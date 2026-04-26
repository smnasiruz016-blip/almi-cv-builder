import type { ReactNode } from "react";
export function EmptyState({ title, description, nextStep, actionLabel, onAction }: { title: string; description?: string; nextStep?: string; actionLabel?: string; onAction?: () => void; icon?: ReactNode; }) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/75 p-8 text-left">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
      {nextStep && <div className="mt-3 rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm">{nextStep}</div>}
      {actionLabel && onAction && <button onClick={onAction} className="mt-4 px-4 py-2 rounded-lg border border-slate-200 text-sm">{actionLabel}</button>}
    </div>
  );
}
