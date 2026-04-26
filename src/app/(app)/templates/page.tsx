import type { Route } from "next";
import Link from "next/link";
import { Layers3, LockKeyhole, Palette, Sparkles } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { canUsePremiumTemplates } from "@/lib/plans";
import { TemplateCard } from "@/components/documents/template-card";
import { getCoverLetterTemplates, getResumeTemplates } from "@/server/templates/template-registry";
type TemplatesPageProps = { searchParams?: Promise<{ kind?: "resume" | "coverLetter"; }>; };
export default async function TemplatesPage({ searchParams }: TemplatesPageProps) {
  const user = await requireUser();
  const params = (await searchParams) ?? {};
  const kind = params.kind === "coverLetter" ? "coverLetter" : "resume";
  const premiumEnabled = canUsePremiumTemplates(user.subscriptionTier);
  const templates = kind === "resume" ? getResumeTemplates() : getCoverLetterTemplates();
  const premiumCount = templates.filter((t) => t.metadata.tier === "PREMIUM").length;
  const freeCount = templates.length - premiumCount;
  return (<div className="space-y-8"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{templates.map((template) => {; const href = kind === "resume" ? `/resumes/new?template=${template.metadata.key}` : `/cover-letters/new?template=${template.metadata.key}`; return (<TemplateCard key={template.metadata.key} template={template} href={href as Route} premiumLocked={template.metadata.tier === "PREMIUM" && !premiumEnabled} />); })}</div></div>);
}
