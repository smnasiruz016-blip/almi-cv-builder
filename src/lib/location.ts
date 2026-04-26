import type { JobSearchInput, NormalizedJob } from "@/types";
const WORLD = new Set(["","worldwide","global","remote"]);
export function isWorldwideFilter(v?: string) { return WORLD.has((v ?? "").trim().toLowerCase()); }
export function matchesSearchLocation(location: string, input: any, desc?: string) {
  const parts = [input.city,input.state,input.country].map(v => (v ?? "").trim().toLowerCase()).filter(v => v && !isWorldwideFilter(v));
  if (!parts.length) return true;
  const h = (`${location} ${desc || ""}`).toLowerCase();
  return parts.every(p => h.includes(p));
}
export function filterJobsBySearchLocation<T extends NormalizedJob>(jobs: T[], input: any) { return jobs.filter(j => matchesSearchLocation(j.location, input, j.descriptionSnippet)); }
export function mapCountryToAdzunaCode(c?: string) { return { us:"us", uk: "gb", germany: "de", france: "fr", canada: "ca" }[(c ?? "").toLowerCase().replace(/[^a-z]/g,"")]; }
