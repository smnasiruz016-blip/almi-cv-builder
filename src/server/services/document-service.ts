import { TemplateTier } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createDefaultCoverLetterData, createDefaultResumeData } from "@/lib/document-defaults";
import { getCoverLetterTemplateByKey, getResumeTemplateByKey } from "@/server/templates/template-registry";
export async function listDocumentsForDashboard(userId: string) {
  const [resumes, coverLetters] = await Promise.all([
    prisma.resume.findMany({ where: { userId }, orderBy: { updatedAt: "desc" }, select: { id: true, title: true, templateKey: true, templateTier: true, updatedAt: true, status: true } }),
    prisma.coverLetter.findMany({ where: { userId }, orderBy: { updatedAt: "desc" }, select: { id: true, title: true, templateKey: true, templateTier: true, updatedAt: true, status: true } })
  ]);
  return { resumes, coverLetters };
}
export async function createResumeForUser(userId: string, templateKey?: string) {
  const t = getResumeTemplateByKey(templateKey ?? "minimal-ats");
  return prisma.resume.create({ data: { userId, title: t.metadata.name+" CV", templateKey: t.metadata.key, templateFamily: t.family, templateTier: t.metadata.tier, draftData: createDefaultResumeData(), sectionOrder: t.visibleSections, hiddenSections: [] } });
}
export async function createCoverLetterForUser(userId: string, templateKey?: string) {
  const t = getCoverLetterTemplateByKey(templateKey ?? "classic-professional");
  return prisma.coverLetter.create({ data: { userId, title: t.metadata.name+" Cover Letter", templateKey: t.metadata.key, templateFamily: t.family, templateTier: t.metadata.tier, draftData: createDefaultCoverLetterData() } });
}
export async function getResumeById(userId: string, resumeId: string) {
  return prisma.resume.findFirst({ where: { id: resumeId, userId } });
}
export async function getCoverLetterById(userId: string, coverLetterId: string) {
  return prisma.coverLetter.findFirst({ where: { id: coverLetterId, userId } });
}
export async function updateResume(userId: string, resumeId: string, data: any) {
  return prisma.resume.update({ where: { id: resumeId }, data: { userId, ...data } });
}
export async function updateCoverLetter(userId: string, coverLetterId: string, data: any) {
  return prisma.coverLetter.update({ where: { id: coverLetterId }, data: { userId, ...data } });
}
export async function deleteResume(userId: string, resumeId: string) { return prisma.resume.deleteMany({ where: { id: resumeId, userId } }); }
export async function deleteCoverLetter(userId: string, coverLetterId: string) { return prisma.coverLetter.deleteMany({ where: { id: coverLetterId, userId } }); }
export async function duplicateResume(userId: string, resumeId: string) {
  const o = await prisma.resume.findFirst({ where: { id: resumeId, userId } });
  if (!o) return null;
  return prisma.resume.create({ data: { userId, title: o.title+" Copy", templateKey: o.templateKey, templateFamily: o.templateFamily, templateTier: o.templateTier, draftData: o.draftData, sectionOrder: o.sectionOrder, hiddenSections: o.hiddenSections } });
}
export async function duplicateCoverLetter(userId: string, coverLetterId: string) {
  const o = await prisma.coverLetter.findFirst({ where: { id: coverLetterId, userId } });
  if (!o) return null;
  return prisma.coverLetter.create({ data: { userId, title: o.title+" Copy", templateKey: o.templateKey, templateFamily: o.templateFamily, templateTier: o.templateTier, draftData: o.draftData } });
}
export function getTemplateTierLabel(t: TemplateTier) { return t === TemplateTier.PREMIUM ? "Premium" : "Free"; }
