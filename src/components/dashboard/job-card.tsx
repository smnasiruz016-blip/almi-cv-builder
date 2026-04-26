import { BookmarkPlus, ExternalLink, MapPin, Wallet } from "lucide-react";
import { MatchScore } from "@/components/dashboard/match-score";
import { formatCurrencyRange } from "@/lib/utils";
import type { RankedJob } from "@/types";
export function JobCard({ job, selected, onInspect, onSave }: { job: RankedJob; selected: boolean; onInspect: ()=>void; onSave: ()=>void; }) {
  return (
    <article className={`rounded-xl border bg-white p-5 ${selected ? "border-teal-400" : "border-slate-200"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">{job.source}</span>
          <h3 className="mt-2 text-xl font-semibold">{job.title}</h3>
          <p className="text-sm text-slate-600">{job.company} • {job.location}</p>
          <p className="text-xs text-slate-500">{formatCurrencyRange(job.salaryMin, job.salaryMax)}</p>
        </div>
        <MatchScore score={job.matchScore} reasons={job.matchReasons} compact />
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-600">{job.descriptionSnippet}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={onInspect} className="rounded-lg border px-4 py-2 text-sm">Inspect fit</button>
        <button onClick={onSave} className="flex items-center gap-1 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white"><BookmarkPlus className="h-4 w-4" /> Save</button>
        <a href={job.applyUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm">Open <ExternalLink className="h-4 w-4" /></a>
      </div>
    </article>
  );
}
