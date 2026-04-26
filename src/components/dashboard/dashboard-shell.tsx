"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { JobCard } from "@/components/dashboard/job-card";
import { MatchScore } from "@/components/dashboard/match-score";
import { ResultSkeleton } from "@/components/dashboard/result-skeleton";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PlanCard } from "@/components/dashboard/plan-card";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { buildResultsSummary } from "@/lib/search-trust";
import { buildDashboardInsights } from "@/lib/dashboard-insights";
import { buildProfileInsights } from "@/lib/profile-insights";
import type { RankedJob, SavedSearch, SearchUsageSnapshot, SessionUser } from "@/types";

type DashboardShellProps = {
  user: SessionUser;
  usage: SearchUsageSnapshot;
  savedSearches: SavedSearch[];
  initialQuery?: Record<string, string>;
};

export function DashboardShell({ user, usage, savedSearches, initialQuery = {} }: DashboardShellProps) {
  const router = useRouter();
  const [query, setQuery] = useState({
    desiredTitle: initialQuery.desiredTitle ?? "",
    keyword: initialQuery.keyword ?? "",
    country: initialQuery.country ?? "",
    city: initialQuery.city ?? "",
    remoteMode: initialQuery.remoteMode ?? "",
    employmentType: initialQuery.employmentType ?? "",
    ...initialQuery,
  });
  const [results, setResults] = useState<RankedJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedJob, setSelectedJob] = useState<RankedJob | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.desiredTitle.trim()) {
      toast.error("Please enter a job title to search.");
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([k, v]) => { if (v) params.set(k, v as string); });
      const res = await fetch(`/api/jobs/search?${params.toString()}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data.jobs ?? []);
      setUsedFallback(data.usedFallback ?? false);
    } catch {
      toast.error("Search failed. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(job: RankedJob) {
    const res = await fetch("/api/saved-jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (res.ok) { toast.success("Job saved!"); } else { toast.error("Could not save job."); }
  }

  const summary = buildResultsSummary({ results, usedFallback, hasResume: !!user.parsedResume });
  const profileInsights = buildProfileInsights(user.parsedResume ?? null);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="page-shell" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "1.5rem", padding: "2rem 0", alignItems: "start" }}>
        <SidebarNav user={user} />

        <main className="space-y-6">
          {/* Search */}
          <section className="glass-panel rounded-[2rem] p-6 md:p-8">
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-5xl">
              Find your next role.
            </h1>
            <p className="mt-3 text-base leading-8 text-slate-600">
              Search live job listings matched to your resume. The more complete your profile, the sharper the ranking.
            </p>
            <form onSubmit={handleSearch} className="mt-6 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Input
                  placeholder="Desired job title *"
                  value={query.desiredTitle}
                  onChange={e => setQuery(q => ({ ...q, desiredTitle: e.target.value }))}
                  required
                  className="sm:col-span-2 lg:col-span-1"
                />
                <Input
                  placeholder="Keyword (optional)"
                  value={query.keyword}
                  onChange={e => setQuery(q => ({ ...q, keyword: e.target.value }))}
                />
                <Input
                  placeholder="City (optional)"
                  value={query.city}
                  onChange={e => setQuery(q => ({ ...q, city: e.target.value }))}
                />
                <Input
                  placeholder="Country (optional)"
                  value={query.country}
                  onChange={e => setQuery(q => ({ ...q, country: e.target.value }))}
                />
                <Select
                  value={query.remoteMode}
                  onChange={e => setQuery(q => ({ ...q, remoteMode: e.target.value }))}
                >
                  <option value="">Any remote status</option>
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="ONSITE">Onsite</option>
                </Select>
                <Select
                  value={query.employmentType}
                  onChange={e => setQuery(q => ({ ...q, employmentType: e.target.value }))}
                >
                  <option value="">Any employment type</option>
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="CONTRACT">Contract</option>
                </Select>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? "Searching..." : "Search jobs"}
                </Button>
                {results.length > 0 && (
                  <p className="text-sm text-slate-500">
                    {summary.totalJobs} results · {summary.strongMatches} strong matches
                    {usedFallback && " · Sample data"}
                  </p>
                )}
              </div>
            </form>
          </section>

          {/* Results */}
          {loading && (
            <section className="glass-panel rounded-[2rem] p-6">
              <ResultSkeleton />
            </section>
          )}

          {!loading && searched && results.length === 0 && (
            <EmptyState
              title="No results found"
              description="Try adjusting your search filters or using a broader job title."
              nextStep="Try a different title, remove filters, or search globally."
            />
          )}

          {!loading && results.length > 0 && (
            <section className="space-y-4">
              <div className="grid gap-4">
                {results.map(job => (
                  <JobCard
                    key={job.externalJobId}
                    job={job}
                    selected={selectedJob?.externalJobId === job.externalJobId}
                    onInspect={setSelectedJob}
                    onSave={handleSave}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Plan card */}
          <PlanCard usage={usage} />
        </main>
      </div>
    </div>
  );
}
