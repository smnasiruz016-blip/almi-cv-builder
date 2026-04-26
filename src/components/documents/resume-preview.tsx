import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ResumeData, ResumeTemplateConfig } from "@/types/documents";

function joinMeta(parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" | ");
}

function ContactRow({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <Icon className="h-3.5 w-3.5 text-slate-400" />
      <span className="truncate">{children}</span>
    </div>
  );
}

export function ResumePreview({ template, data, sectionOrder, hiddenSections, photoEnabled }: { template: ResumeTemplateConfig; data: ResumeData; sectionOrder: string[]; hiddenSections: string[]; photoEnabled: boolean; }) {
  const orderedSections = sectionOrder.filter(s => !hiddenSections.includes(s));
  const hasSidebar = template.layout.mode === "two-column" || template.layout.mode === "header-accent";
  const compact = template.layout.density === "compact";
  const sidebarSections = new Set(template.layout.sidebarSections);
  const leftSections = hasSidebar ? orderedSections.filter(s => sidebarSections.has(s)) : [];
  const rightSections = hasSidebar ? orderedSections.filter(s => !sidebarSections.has(s)) : orderedSections;
  const showPhoto = template.layout.showPhoto && photoEnabled;

  return (
    <div className="glass-panel rounded-[2rem] p-5">
      <div className="overflow-hidden rounded-[1.75rem]" style={{ background: template.theme.surface }}>
        <div className="px-6 py-6" style={{ background: template.layout.mode === "header-accent" ? `linear-gradient(135deg, ${template.theme.accent}, ${template.theme.muted})` : template.theme.surface }}>
          <div className="flex items-start gap-4">
            {showPhoto && <div className="h-20 w-20 shrink-0 rounded-full" style={{ background: template.theme.accentSoft }}></div>}
            <div className="min-w-0 space-y-2">
              <p className="text-3xl font-semibold text-slate-950">{data.basics.fullName || "Your Name"}</p>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{data.basics.professionalTitle || "Target role"}</p>
              <div className="grid gap-2 pt-1 md:grid-cols-2">
                {data.basics.email && <ContactRow icon={Mail}>{data.basics.email}</ContactRow>}
                {data.basics.phone && <ContactRow icon={Phone}>{data.basics.phone}</ContactRow>}
                {data.basics.location && <ContactRow icon={MapPin}>{data.basics.location}</ContactRow>}
              </div>
            </div>
          </div>
        </div>
        <div className={cn("grid gap-8 px-6 py-6", hasSidebar ? "md:grid-cols-[0.78fr_1.22fr]" : "grid-cols-1")}>
          {hasSidebar && (
            <aside className="space-y-6 rounded-[1.5rem] p-5" style={{ background: template.theme.accentSoft }}>
              {leftSections.map(s => <div key={s}>{s.includes("skills") && data.skills.length ? (<div className="space-y-3"><p style={{ color: template.theme.accent }} className="text-[11px] font-semibold uppercase tracking-wide">Skills</p><div className="flex flex-wrap gap-2">{data.skills.map(sk => <span key={sk} className="rounded-full px-3 py-1 text-xs" style={{ background: template.theme.accentSoft, color: template.theme.text }}>{sk}</span>)}</div></div>) : null}</div>)}
            </aside>
          )}
          <main className="space-y-6">
            {rightSections.map(s => (
              <div key={s}>
                {s === "summary" && data.summary && <div className="space-y-3"><p style={{ color: template.theme.accent }} className="text-[11px] font-semibold uppercase tracking-wide">Profile</p><p className="text-sm leading-7 text-slate-700">{data.summary}</p></div>}
                {s === "experience" && data.experience.length > 0 && <div className="space-y-4"><p style={{ color: template.theme.accent }} className="text-[11px] font-semibold uppercase tracking-wide mb-2">Experience</p>{data.experience.map(item => <div key={item.id} className="space-y-2 mb-4"><p className="font-semibold text-slate-900">{item.role || "Role"}</p><p className="text-sm text-slate-500">{joinMeta([item.company,item.startDate,item.endDate])}</p>{item.bullets.length > 0 && <ul className="pl-5 space-y-1 text-sm leading-7 text-slate-700">{item.bullets.map((b,i) => <li key={i} className="list-disc">{b}</li>)}</ul>}</div>!}</div>}
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
