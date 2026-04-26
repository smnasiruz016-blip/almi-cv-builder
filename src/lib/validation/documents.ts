import { z } from "zod";
const ot = z.string().trim().optional().default("");
const rt = z.string().trim().min(1);
export const resumeDataSchema = z.object({ basics: z.object({ fullName: ot, professionalTitle: ot, email: ot, phone: ot, location: ot, website: ot, linkedIn: ot, photoUrl: ot }), summary: ot, experience: z.array(z.object({ id: rt, role: ot, company: ot, location: ot, startDate: ot, endDate: ot, bullets: z.array(z.string()).default([]) })).default([]), education: z.array(z.object({ id: rt, degree: ot, school: ot, location: ot, startDate: ot, endDate: ot, details: ot })).default([]), skills: z.array(z.string()).default([]), projects: z.array(z.any()).default([]), certifications: z.array(z.any()).default([]), links: z.array(z.any()).default([]) });
export const coverLetterDataSchema = z.object({ jobTitle: ot, company: ot, hiringManager: ot, intro: ot, body: ot, closing: ot });
export const updateResumeSchema = z.object({ title: z.string().trim().min(1).max(80), templateKey: z.string(), photoEnabled: z.boolean().default(true), accentColor: z.string().optional().nullable(), sectionOrder: z.array(z.string()).default([]), hiddenSections: z.array(z.string()).default([]), draftData: resumeDataSchema });
export const updateCoverLetterSchema = z.object({ title: z.string().trim().min(1).max(80), templateKey: z.string(), draftData: coverLetterDataSchema });
export function validateResumeUpdateBody(body: unknown) { return updateResumeSchema.safeParse(body); }
export function validateCoverLetterUpdateBody(body: unknown) { return updateCoverLetterSchema.safeParse(body); }
export function validateSignupBody(b: unknown) { return z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8) }).safeParse(b); }
export function validateLoginBody(b: unknown) { return z.object({ email: z.string().email(), password: z.string().min(8) }).safeParse(b); }
