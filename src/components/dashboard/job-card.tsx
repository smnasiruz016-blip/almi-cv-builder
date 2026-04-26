import { BookmarkPlus, ExternalLink, MapPin, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatchScore } from "@/components/dashboard/match-score";
import { formatCurrencyRange } from "@/lib/utils";
import type { RankedJob } from "@/types";

export function JobCard({ job, selected, onInspect, onSave }: { job: RankedJob; selected: boolean; onInspect: (j: RankedJob) => void; onSave: (j: RankedJob) => void; }) {
  return (
    <article className={`rounded-[1.75rem] border bg-white p-5 shadow-sm transition ${selected ? "border-teal-400" : "border-slate-200"}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">{job.title}</h3>
            <p className="mt-1 text-sm font-medium text-slate-700">{job.company}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
              <span className="innin{ilene-flex items-center gap-1"><Wallet className="h-3.5 w-3.5" />{formatCurrencyRange(job.salaryMin, job.salaryMax)}</span>
            </div>
          </div>
          <MatchScore score={job.matchScore} reasons={job.matchReasons || []} compact />
        </div>
        <p className="text-sm leading-7 text-slate-600">{job.descriptionSnippet}</p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => onInspect(job)}>Inspect fit</Button>
          <Button type="button" onClick={() => onSave(job)}><BookmarkPlus className="mr-2 h-3.5 w-3.5" />Save job</Button>
          <a href={job.applyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700">Open listing<ExternalLink className="ml-2 h-4 w-4" /></a>
        </div>
      </div>
    </article>
  );
}
