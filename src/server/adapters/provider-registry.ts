import { filterJobsBySearchLocation } from "@/lib/location";
import { log } from "@/lib/logger";
import { getProviderRuntimeConfig } from "@/server/adapters/provider-config";
import type { JobSourceAdapter } from "@/server/adapters/types";
import { mockAdapters } from "@/server/adapters/mock-jobs";
import type { JobSearchInput, NormalizedJob, ProviderStatus } from "@/types";

class RemoteOkAdapter implements JobSourceAdapter {
  source = "RemoteOK";
  sourceType = "live" as const;
  isEnabled() { return getProviderRuntimeConfig().remoteOkEnabled; }
  async searchJobs(input: JobSearchInput): Promise<NormalizedJob[]> {
    const config = getProviderRuntimeConfig();
    const response = await fetch(config.remoteOkApiUrl, { headers: { Accept: "application/json" }, next: { revalidate: config.remoteOkRevalidateSeconds } });
    if (!response.ok) throw new Error("RemoteOK failed: "+response.status);
    const data = await response.json();
    return (Array.isArray(data) ? data : []).map((j: any) => ({ externalJobId: String(j.id), source: "RemoteOK", sourceType: "live", title: j.position || "Remote role", company: j.company || "Unknown", location: j.location || "Remote", descriptionSnippet: (j.description || "").slice(0,240), applyUrl: j.url || "https://remoteok.com", keywords: j.tags || [], postedDate: j.date, providerMetadata: { attributionLabel: "RemoteOK", attributionUrl: j.url } })).filter((j: any) => j.title.toLowerCase().includes(input.desiredTitle.toLowerCase()));
  }
}

export function getJobAdapters() { return [new RemoteOkAdapter(), ...mockAdapters].filter(a => a.isEnabled()); }

export async function fetchFromAdapters(input: JobSearchInput) {
  const adapters = getJobAdapters();
  const providerStatuses: ProviderStatus[] = [];
  const liveResults: NormalizedJob[] = [];
  for (const adapter of adapters.filter(a => a.sourceType === "live")) {
    try {
      const jobs = filterJobsBySearchLocation(await adapter.searchJobs(input), input);
      liveResults.push(...jobs);
      providerStatuses.push({ source: adapter.source, sourceType: "live", status: jobs.length ? "success" : "no_matches", results: jobs.length, message: "" });
    } catch(error) {
      providerStatuses.push({ source: adapter.source, sourceType: "live", status: "error", results: 0, message: "Provider unavailable" });
    }
  }
  return { jobs: liveResults, usedFallback: false, sources: [...new Set(liveResults.map(j => j.source))], providerStatuses };
}
