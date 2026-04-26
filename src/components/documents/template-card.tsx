import Link from "next/link";
import type { ResumeTemplateConfig } from "@/types/documents";
import { LockKeyhole } from "lucide-react";
import { TemplatePreviewThumbnail } from "@/components/documents/template-preview-thumbnail";
import { getTemplatePresentation } from "@/lib/template-presentation";
import type { Route } from "next";

type TemplateCardProps = {
  template: ResumeTemplateConfig | any;
  href: Route;
  premiumLocked?: boolean;
};

export function TemplateCard({ template, href, premiumLocked }: TemplateCardProps) {
  const presentation = getTemplatePresentation(template);
  return (
    <div className="relative rounded-[2rem] overflow-hidden border border-slate-150 shadow-sm hover:shadow-md transition-all">
      <TemplatePreviewThumbnail template={template} />
      {premiumLocked && <div className="absolute inset-0 bg-white/60 flex items-center justify-center"><LockKeyhole className="h-6 w-6 text-slate-600" /></div>}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-sm">{template.metadata.name}</h3>
        <p className="text-xs text-slate-500 mt-1">{presentation.familyLabel}</p>
        <Link href={href} className="mt-3 block text-center py-1.5 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">Use Template</Link>
      </div>
    </div>
  );
}
