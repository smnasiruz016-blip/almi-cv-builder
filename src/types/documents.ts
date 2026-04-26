import type {
  CoverLetterTemplateFamily,
  ResumeTemplateFamily,
  SubscriptionTier,
  TemplateTier
} from "@prisma/client";

export type ResumeBasics = {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedIn: string;
  photoUrl: string;
};

export type ResumeExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
};

export type ResumeData = {
  basics: ResumeBasics;
  summary: string;
  experience: ResumeExperienceItem[];
  education: any[];
  skills: string[];
  projects: any[];
  certifications: any[];
  links: any[];
};

export type CoverLetterData = {
  jobTitle: string;
  company: string;
  hiringManager: string;
  intro: string;
  body: string;
  closing: string;
};

export type TemplateKind = "resume" | "coverLetter";
export type LayoutMode = "single-column" | "two-column" | "header-accent";
export type ThemeConfig = { accent: string; accentSoft: string; surface: string; text: string; muted: string; };
export type TemplateMetadata = { key: string; name: string; description: string; previewLabel: string; kind: TemplateKind; tier: TemplateTier; };
export type ResumeTemplateConfig = { metadata: TemplateMetadata; family: ResumeTemplateFamily; layout: any; theme: ThemeConfig; visibleSections: any[]; };
export type CoverLetterTemplateConfig = { metadata: TemplateMetadata; family: CoverLetterTemplateFamily; layout: any; theme: ThemeConfig; visibleSections: any[]; };
export type ResumeBuilderDocument = { id: string; title: string; templateKey: string; templateFamily: ResumeTemplateFamily; templateTier: TemplateTier; status: string; photoEnabled: boolean; sectionOrder: string[]; hiddenSections: string[]; draftData: ResumeData; updatedAt: string; };
export type CoverLetterBuilderDocument = { id: string; title: string; templateKey: string; templateFamily: CoverLetterTemplateFamily; templateTier: TemplateTier; status: string; draftData: CoverLetterData; updatedAt: string; };
export type BuilderPlanSnapshot = { tier: SubscriptionTier; label: string; features: any; };
