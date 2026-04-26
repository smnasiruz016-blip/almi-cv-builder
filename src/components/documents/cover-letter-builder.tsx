"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { CoverLetterPreview } from "@/components/documents/cover-letter-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { CoverLetterBuilderDocument, CoverLetterData, CoverLetterTemplateConfig } from "@/types/documents";

type CoverLetterBuilderProps = {
  coverLetter: CoverLetterBuilderDocument;
  templates: CoverLetterTemplateConfig[];
  canUsePremiumTemplates: boolean;
  canUseAiWriting: boolean;
};

export function CoverLetterBuilder({ coverLetter, templates, canUsePremiumTemplates, canUseAiWriting }: CoverLetterBuilderProps) {
  const router = useRouter();
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const form = useForm({ defaultValues: { title: coverLetter.title, templateKey: coverLetter.templateKey, jobTitle: coverLetter.draftData.jobTitle, company: coverLetter.draftData.company, hiringManager: coverLetter.draftData.hiringManager, intro: coverLetter.draftData.intro, body: coverLetter.draftData.body, closing: coverLetter.draftData.closing } });
  const watched = useWatch({ control: form.control });
  const activeTemplate = useMemo(() => templates.find(t => t.metadata.key === watched.templateKey) ?? templates[0], [templates, watched.templateKey]);
  async function onSubmit(values: any) {
    setSaveState("saving");
    const res = await fetch(`/api/cover-letters/${coverLetter.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: values.title, templateKey: values.templateKey, draftData: { jobTitle: watched.jobTitle, company: watched.company, hiringManager: watched.hiringManager, intro: watched.intro, body: watched.body, closing: watched.closing } }) });
    if (!res.ok) { setSaveState("error"); return; }
    setSaveState("saved"); router.refresh(); window.setTimeout(() => setSaveState("idle"), 1800);
  }
  return (<form onSubmit={form.handleSubmit(onSubmit)}><Button type="submit">{[saving:saving...,saved:Saved][saveState] || "Save"}</Button><section><Input {...form.register("title")} placeholder="Title"/><Select {...form.register("templateKey")}>{templates.map(t => <option key={t.metadata.key} value={t.metadata.key}>{t.metadata.name}</option>)}</Select><Input {...form.register("jobTitle")} placeholder="Job title"/><Input {...form.register("company")} placeholder="Company"/><Input {...form.register("hiringManager")} placeholder="Hiring manager"/><Textarea {...form.register("intro")} rows={4} placeholder="Intro"/><Textarea {...form.register("body")} rows={7} placeholder="Body"/><Textarea {...form.register("closing")} rows={3} placeholder="Closing"/></section><CoverLetterPreview template={activeTemplate} data={{ jobTitle: watched.jobTitle, company: watched.company, hiringManager: watched.hiringManager, intro: watched.intro, body: watched.body, closing: watched.closing }} /></form>);
}
