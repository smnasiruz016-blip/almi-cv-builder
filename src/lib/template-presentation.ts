import type { CoverLetterTemplateConfig, ResumeTemplateConfig } from "@/types/documents";
type TP = { familyLabel: string; audience: string; layoutLabel: string; tone: string; };
export function getTemplatePresentation(t: ResumeTemplateConfig | CoverLetterTemplateConfig): TP { return { familyLabel: t.metadata.name, audience: "Professionals", layoutLabel: "layout", tone: "polished" }; }
