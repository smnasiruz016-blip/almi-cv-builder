import { prisma } from "@/lib/prisma";
export async function getAdminStats() {
  const [users,resumes,coverLetters] = await Promise.all([prisma.user.count(),prisma.resume.count(),prisma.coverLetter.count()]);
  return { users, resumes, coverLetters };
}
