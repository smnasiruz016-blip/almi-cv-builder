export function EmptyState({ title, description, nextStep, actionLabel, onAction }: { title: string; description: string; nextStep: string; actionLabel?: string; onAction?: () => void; }) {
  return (
    <div className="rounded-[1.75rem] border border-dashed p-8">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-slate-600">{description}</p>
      <div className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-sm">Next: {nextStep}</div>
      {actionLabel && onAction && <button onClick={onAction} className="mt-4 rounded-lg border px-4 py-2 text-sm">{actionLabel}</button>}
    </div>
  );
}
