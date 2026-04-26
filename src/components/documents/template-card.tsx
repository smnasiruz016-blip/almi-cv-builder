import Link from "next/link";
import type { Route } from "next";
import { LockKeyhole, Sparkles, ArrowRight } from "lucide-react";
import type { ResumeTemplateConfig, CoverLetterTemplateConfig } from "@/types/documents";
import { getTemplatePresentation } from "@/lib/template-presentation";
type TemplateCardProps = { template: ResumeTemplateConfig | CoverLetterTemplateConfig; href: Route; premiumLocked?: boolean; };
export function TemplateCard({ template, href, premiumLocked = false }: TemplateCardProps) {
  const presentation = getTemplatePresentation(template);
  const isPremium = template.metadata.tier === "PREMIUM";
  return (
    <Link href={href} className="group relative flex flex-col rounded-[2rem] border border-slate-150 p-5 shadow-sm hover:siØow-md transition-all">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{presentation.familyLabel}</p>
      <p className="mt-1 text-xl font-semibold text-slate-950">{template.metadata.name}</p>
      <div className="mt-3 flex items-center justify-between">
        {isPremium ? <span className="flex items-center gap-1 text-xs font-semibold"><LockKeyhole className="h-3 w-3"/>Premium</span> : <span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><Sparkles className="h4 w-4"/>Free</span>}
        <span className="flex items-center gap-1 text-xs font-medium text-indigo-600">{{premiumLocked ? "Upgrade" : "Use"}}<ArrowRight className="h4 w-4"/></span>
      </div>
    </Link>
  );
}
