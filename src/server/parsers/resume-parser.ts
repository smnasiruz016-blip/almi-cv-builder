import { KNOWN_SKILLS, ROLE_KEYWORDS } from "@/lib/constants";
import { dedupe } from "@/lib/utils";
import type { ParsedResume } from "@/types";

export function parseResumeText(rawText: string): ParsedResume {
  const cleaned = rawText.replace(/\r/g, "").trim();
  const lines = cleaned.split("\n").map(l => l.trim()).filter(Boolean);
  const email = cleaned.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  const phone = cleaned.match(/\d\d\d[. ]?\d\d\d[. ]?\d\d\d\d/)?.[0];
  const name = lines.find(l => /^[A-Za-z][A-Za-z\s.'-]{2,60}$/.test(l) && !l.includes("@"));
  const skills = dedupe(KNOWN_SKILLS.filter(s => cleaned.toLowerCase().includes(s))).slice(0,20);
  const experienceKeywords = dedupe(["leadership","analytics","performance"].filter(s => cleaned.toLowerCase().includes(s))).slice(0,20);
  const preferredRoles = dedupe(ROLE_KEYWORDS.filter(s => cleaned.toLowerCase().includes(s))).slice(0,8);
  return { name, email, phone, skills, experienceKeywords, educationKeywords: [], preferredRoles, rawText: cleaned };
}
