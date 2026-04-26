import type { ParsedResume, RankedJob } from "@/types";
export function buildDashboardInsights(user: any, resume: ParsedResume | null, recentJobs: RankedJob[]) {
  return {
    hasResume: !!resume,
    skillCount: resume?.skills.length || 0,
    topJob: recentJobs[0] || null,
    actions: []
  };
}
