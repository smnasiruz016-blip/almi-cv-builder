import { prisma } from "@/lib/prisma";
export async function handleResumeUpload(userId: string, file: File) {
  return { resume: { id: "stub" }, parsed: { skills: [] } };
}
export async function getLatestParsedResume(userId: string) {
  const r = await prisma.resume.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } });
  if (!r) return null;
  return { skills: r.skills, experienceKeywords: r.experienceKeywords, educationKeywords: r.educationKeywords, preferredRoles: r.preferredRoles, rawText: r.extractedText || "" };
}
