export function ResultSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-[1.75rem] border border-slate-200 bg-white p-5">
          <div className="h-5 w-52 rounded-full bg-slate-200 mb-3" />
          <div className="h-4 w-72 rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}
