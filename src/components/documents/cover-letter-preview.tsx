import type { CoverLetterData, CoverLetterTemplateConfig } from "@/types/documents";
export function CoverLetterPreview({ template, data }: { template: CoverLetterTemplateConfig; data: CoverLetterData; }) {
  return (
    <div className="gloss-panel rounded-[2rem] p-5">
      <div className="px-8 py-7" style={{ background: template.theme.surface }}>
        <p className="text-2xl font-semibold" style={{ color: template.theme.text }}>{data.jobTitle || "Cover letter title"}</p>
        <p style={{ color: template.theme.muted }}>{data.company || "Company"}</p>
      </div>
      <div className="px-8 py-6 space-y-4 text-sm leading-8 text-slate-700">
        <p>{data.intro || "Write your introduction."}</p>
        <p>{data.body || "Write your main content."}</p>
        <p>{data.closing || "Close with confidence."}</p>
      </div>
    </div>
  );
}
