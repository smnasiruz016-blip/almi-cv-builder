"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ResumePreview } from "@/components/documents/resume-preview";
import type { ResumeBuilderDocument, ResumeData, ResumeTemplateConfig } from "@/types/documents";

type ResumeBuilderProps = {
  resume: ResumeBuilderDocument;
  templates: ResumeTemplateConfig[];
  canUsePremiumTemplates: boolean;
  canUseAiWriting: boolean;
};

export function ResumeBuilder({ resume, templates, canUsePremiumTemplates, canUseAiWriting }: ResumeBuilderProps) {
  const router = useRouter();
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [sectionOrder, setSectionOrder] = useState(resume.sectionOrder);
  const [hiddenSections, setHiddenSections] = useState(resume.hiddenSections);

  const form = useForm({
    defaultValues: {
      title: resume.title,
      templateKey: resume.templateKey,
      photoEnabled: resume.photoEnabled,
      accentColor: null as string | null,
      draftData: resume.draftData,
    },
  });

  const watched = useWatch({ control: form.control });
  const activeTemplate = useMemo(
    () => templates.find(t => t.metadata.key === watched.templateKey) ?? templates[0],
    [templates, watched.templateKey]
  );

  async function onSubmit(values: any) {
    setSaveState("saving");
    const res = await fetch(`/api/resumes/${resume.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        templateKey: values.templateKey,
        photoEnabled: values.photoEnabled,
        accentColor: values.accentColor,
        sectionOrder,
        hiddenSections,
        draftData: values.draftData,
      }),
    });
    if (!res.ok) { setSaveState("error"); toast.error("Failed to save"); return; }
    setSaveState("saved");
    router.refresh();
    window.setTimeout(() => setSaveState("idle"), 1800);
  }

  const previewData: ResumeData = (watched.draftData as ResumeData) ?? resume.draftData;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="glass-panel rounded-[2rem] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950">CV Builder</h1>
              <p className="mt-2 text-sm text-slate-500">Build and refine your CV with a live preview alongside.</p>
            </div>
            <Button type="submit" disabled={saveState === "saving"}>
              {saveState === "saving" ? "Saving..." : saveState === "saved" ? "Saved" : "Save draft"}
            </Button>
          </div>
        </div>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-950">Setup</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Input {...form.register("title")} placeholder="Document title" />
            <Select {...form.register("templateKey")}>
              {templates.map(t => (
                <option key={t.metadata.key} value={t.metadata.key} disabled={t.metadata.tier === "PREMIUM" && !canUsePremiumTemplates}>
                  {`${t.metadata.name}${t.metadata.tier === "PREMIUM" ? " · Premium" : ""}`}
                </option>
              ))}
            </Select>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-950">Personal details</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Input {...form.register("draftData.basics.fullName")} placeholder="Full name" />
            <Input {...form.register("draftData.basics.professionalTitle")} placeholder="Professional title" />
            <Input {...form.register("draftData.basics.email")} placeholder="Email" />
            <Input {...form.register("draftData.basics.phone")} placeholder="Phone" />
            <Input {...form.register("draftData.basics.location")} placeholder="Location" />
            <Input {...form.register("draftData.basics.website")} placeholder="Website" />
            <Input {...form.register("draftData.basics.linkedIn")} placeholder="LinkedIn" className="md:col-span-2" />
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-950">Summary</h2>
          <Textarea {...form.register("draftData.summary")} rows={4} placeholder="Professional summary..." className="mt-4" />
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-950">Skills</h2>
          <p className="mt-1 text-sm text-slate-500">Enter skills separated by commas.</p>
          <Textarea
            className="mt-4"
            rows={3}
            placeholder="TypeScript, React, Node.js, SQL..."
            value={(watched.draftData?.skills ?? []).join(", ")}
            onChange={e => {
              const skills = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
              form.setValue("draftData.skills", skills);
            }}
          />
        </section>

        <div className="rounded-[1.25rem] bg-slate-50 p-4 text-sm text-slate-600">
          AI writing suggestions are{" "}
          {canUseAiWriting ? "prepared for the next phase." : "set aside for premium access next."}
        </div>
      </form>

      <div className="space-y-5">
        <div className="glass-panel rounded-[2rem] p-5">
          <h2 className="text-xl font-semibold text-slate-950">Live preview</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            See every change reflected instantly before you export.
          </p>
        </div>
        <ResumePreview
          template={activeTemplate}
          data={previewData}
          sectionOrder={sectionOrder}
          hiddenSections={hiddenSections}
          photoEnabled={watched.photoEnabled ?? true}
        />
      </div>
    </div>
  );
}
