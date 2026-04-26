"use client";

import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { FileText, Sparkles, Wand2 } from "lucide-react";
import { DocumentEmptyState } from "@/components/documents/document-empty-state";
import { Button } from "@/components/ui/button";
import { getTemplateTierLabel } from "@/server/services/document-service";
import type { BuilderPlanSnapshot } from "@/types/documents";
type DocumentListItem = { id: string; title: string; templateKey: string; templateTier: "FREE"|"PREMIUM"; status: "DRAFT"|"READY"|"ARCHIVED"; updatedAt: string; };
type DashboardShellProps = { userName: string; resumes: DocumentListItem[]; coverLetters: DocumentListItem[]; plan: BuilderPlanSnapshot; };
function formatDate(v: string) { return new Intl.DateTimeFormat("en",{month:"short",day:"numeric",year:"numeric"}).format(new Date(v)); }
export function DashboardShell({ userName, resumes, coverLetters, plan }: DashboardShellProps) {
  const router = useRouter();
  async function duplicateResume(id: string) { const r=await fetch(`/api/resumes/${id}/duplicate`,{method:"POST"}); if(r.ok) router.refresh(); }
  async function deleteResume(id: string) { const r=await fetch(`/api/resumes/${id}`,{method:"DELETE"}); if(r.ok) router.refresh(); }
  async function duplicateCoverLetter(id: string) { const r=await fetch(`/api/cover-letters/${id}/duplicate`,{method:"POST"}); if(r.ok) router.refresh(); }
  async function deleteCoverLetter(id: string) { const r=await fetch(`/api/cover-letters/${id}`,{method:"DELETE"}); if(r.ok) router.refresh(); }
  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[2rem] p-6">
        <h1 className="text-4xl font-bold text-slate-950">Build a professional CV.</h1>
        <p className="mt-3 text-slate-600">Welcome back, {userName}.</p>
        <div className="mt-5 flex gap-3">
          <Link href="/templates?kind=resume" className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Create CV</Link>
          <Link href="/templates?kind=coverLetter" className="inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold">Create cover letter</Link>
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl font-semibold text-slate-950">CVs</h2>
          <div className="mt-5 space-y-4">
            {resumes.length ? resumes.map(r => (
              <div key={r.id} className="rounded-xl border p-4">
                <p className="font-semibold">{r.title}</p>
                <p className="text-xs text-slate-500">Updated {formatDate(r.updatedAt)}</p>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => void duplicateResume(r.id)}>Duplicate</Button>
                  <Link href={`/resumes/${r.id}` as Route} className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Open</Link>
                  <Button onClick={() => void deleteResume(r.id)}>Delete</Button>
                </div>
              </div>
            )) : <DocumentEmptyState title="No CVs yet" description="Start with a polished template." href="/templates?kind=resume" ctaLabel="Create your first CV" />}
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Cover letters</h2>
          <div className="mt-5 space-y-4">
            {coverLetters.length ? coverLetters.map(c => (
              <div key={c.id} className="rounded-xl border p-4">
                <p className="font-semibold">{c.title}</p>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => void duplicateCoverLetter(c.id)}>Duplicate</Button>
                  <Link href={`/cover-letters/${c.id}` as Route} className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Open</Link>
                  <Button onClick={() => void deleteCoverLetter(c.id)}>Delete</Button>
                </div>
              </div>
            )) : <DocumentEmptyState title="No cover letters yet" description="Create a matching cover letter." href="/templates?kind=coverLetter" ctaLabel="Create first cover letter" />}
          </div>
        </div>
      </section>
    </div>
  );
}
