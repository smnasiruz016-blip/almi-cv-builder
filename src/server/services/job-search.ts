import { filterJobsBySearchLocation } from "@/lib/location";
import { prisma } from "@/lib/prisma";
import { fetchFromAdapters } from "@/server/adapters/provider-registry";
import { rankJobs } from "@/server/services/ranking";
import type { JobSearchInput, NormalizedJob, ParsedResume, SearchInsights } from "@/types";
export function dedupeJobs<T extends NormalizedJob>(jobs: T[]) {
  const seen = new Map<string, T>();
  for (const job of jobs) {
    const key = `${job.source}:${job.externalJobId}`;
    if (!seen.has(key)) seen.set(key, job);
  }
  return [...seen.values()];
}
export async function executeJobSearch(input: JobSearchInput, resume?: ParsedResume | null) {
  const normalizedInput = { ...input, country: input.country?.trim() || "Worldwide" };
  const { jobs, usedFallback, sources, providerStatuses } = await fetchFromAdapters(normalizedInput);
  const results = dedupeJobs(filterJobsBySearchLocation(jobs, normalizedInput));
  const ranked = rankJobs(results, normalizedInput, resume);
  return { normalizedInput, results: ranked, meta: { usedFallback, sources, providerStatuses, insights: { totalResults: ranked.length, liveResults: ranked.filter(j => j.sourceType === "live").length, remoteResults: ranked.filter(j => j.remoteStatus === "REMOTE").length, salaryVisibleResults: ranked.filter(j => !!j.salaryMin).length, topCompanies: [] }, quality: { averageMatchScore: 0, topMatchScore: ranked[0]?.matchScore ?? 0, highFitCount: ranked.filter(j => k.matchScore >= 80).length } } };
}
export async function runJobSearch(userId: string, input: JobSearchInput, resume?: ParsedResume | null) {
  const { normalizedInput, results: ranked, meta } = await executeJobSearch(input, resume);
  const search = await prisma.jobSearch.create({ data: { userId, desiredTitle: normalizedInput.desiredTitle, keyword: normalizedInput.keyword, company: normalizedInput.company, country: normalizedInput.country ?? "Worldwide", latestResults: ranked } });
  await prisma.searchHistory.create({ data: { userId, searchId: search.id, snapshot: normalizedInput, resultsCount: ranked.length } });
  return { searchId: search.id, results: ranked, meta };
}
