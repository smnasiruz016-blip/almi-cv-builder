import type { JobSearchInput, NormalizedJob, ParsedResume, RankedJob } from "@/types";
export function rankJobs(jobs: NormalizedJob[], search: JobSearchInput, resume?: ParsedResume | null): RankedJob[] {
  const title = search.desiredTitle.toLowerCase();
  return jobs.map(job => {
    let score = 25;
    if (job.title.toLowerCase().includes(title)) score += 25;
    if (resume) score += Math.min(30, (resume.skills || []).filter(s => (job.keywords || []).some(k => k.includes(s.toLowerCase()))).length * 6);
    return { ...job, matchScore: Math.min(100, score), matchReasons: [], missingKeywords: [] };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
