import type { ParsedResume } from "@/types";
export function buildProfileInsights(r: ParsedResume | null) {
  if (!r) return { completenessScore: 18, strengths: [], gaps: ["Upload a resume"] };
  let score = 30;
  if (r.name) score += 10; if (r.email) score += 10;
  score += Math.min(20, r.skills.length * 2);
  return { completenessScore: Math.min(100,score), strengths: [], gaps: [] };
}
