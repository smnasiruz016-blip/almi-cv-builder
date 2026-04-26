export function ResultSkeleton() {
  return <div className="grid gap-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="animate-pulse rounded-xl border bg-white p-5"><div className="h5 w-52 rounded bg-slate-200" /><div className="mt-3 h-4 w-72 rounded bg-slate-100" /></div>)}</div>;
}
