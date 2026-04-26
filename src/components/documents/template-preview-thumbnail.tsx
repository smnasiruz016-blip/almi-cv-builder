import { cn } from "@/lib/utils";
import type { CoverLetterTemplateConfig, ResumeTemplateConfig } from "@/types/documents";

type TemplatePreviewThumbnailProps = {
  template: ResumeTemplateConfig | CoverLetterTemplateConfig;
};

export function TemplatePreviewThumbnail({ template }: TemplatePreviewThumbnailProps) {
  const isResume = template.metadata.kind === "resume";
  return (
    <div
      className={cn("relative overflow-hidden rounded-[1.5rem] aspect-[0.72/1] w-full")}
      style={{ background: template.theme.surface }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[28%] px-4 py-3"
        style={{
          background: template.layout && (template.layout as any).mode === "header-accent"
            ? `linear-gradient(135deg, ${template.theme.accent}, ${template.theme.muted})`
            : template.theme.surface,
        }}
      >
        <div className="h-3 rounded-full w-24 mb-1.5" style={{ background: template.theme.text, opacity: 0.85 }} />
        <div className="h-2 rounded-full w-16" style={{ background: template.theme.muted }} />
        <div className="mt-2 flex gap-2">
          <div className="h-1.5 rounded-full w-12" style={{ background: template.theme.muted, opacity: 0.6 }} />
          <div className="h-1.5 rounded-full w-12" style={{ background: template.theme.muted, opacity: 0.6 }} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[28%] px-4 py-3 space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-1.5 rounded-full" style={{ background: template.theme.accent, opacity: 0.7, width: i === 0 ? "40%" : "60%" }} />
            <div className="h-1 rounded-full bg-slate-200" style={{ width: `${60 + i * 8}%`, maxWidth: "100%" }} />
            <div className="h-1 rounded-full bg-slate-100" style={{ width: `${50 + i * 5}%`, maxWidth: "100%" }} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, transparent 60%, ${template.theme.surface} 100%)` }} />
    </div>
  );
}
