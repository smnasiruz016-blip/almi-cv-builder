"use client";

import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { DocumentEmptyState } from "@/components/documents/document-empty-state";
import { Button } from "@/components/ui/button";
import { getTemplateTierLabel } from "@/server/services/document-service";
import type { BuilderPlanSnapshot } from "@/types/documents";

type DocItem = { id: string; title: string; templateKey: string; templateTier: "FREE" | "PREMIUM"; status: string; updatedAt: string; };

function DocRow({ kind, item, onDup, onDel }: { kind: "resume" | "coverLetter"; item: DocItem; onDup: (id:string)=>Promise<void>; onDel: (id:string)=>Promise<void>; }) {
  const href = (kind === "resume" ? `/resumes/${item.id}` : `/cover-letters/${item.id}`) as Route;
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-950">{item.title}</p>
          <p className="mt-1 text-sm text-slate-500">Template: {item.templateKey} {getTemplateTierLabel(item.templateTier)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => void onDup(item.id)}>Duplicate</Button>
          <Link href={href} className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Open</Link>
          <Button variant="ghost" onClick={() => void onDel(item.id)} className="text-red-700">Delete</Button>
        </div>
      </div>
    </div>
  );
}

export function DashboardShell({ userName, resumes, coverLetters, plan }: { userName: string; resumes: DocItem[]; coverLetters: DocItem[]; plan: BuilderPlanSnapshot; }) {
  const router = useRouter();
  async function dupResume(id:string) { if((await fetch(`/resumes/${id}/duplicate`,{method:"POST"})).ok) router.refresh(); }
  async function delResume(id:string) { if((await fetch(`/resumes/${id}`,{method:"DELETE"})).ok) router.refresh(); }
  async function dupCL(id:string) { if((await fetch(`/cover-letters/${id}/duplicate`,{method:"POST"})).ok) router.refresh(); }
  async function delCL(id:string) { if((await fetch(`/cover-letters/${id}`,{method:"DELETE"})).ok) router.refresh(); }
  return (
    <div className="space-y-6">
      <section className="glÏSss-panel rounded-[2rem] p-6">
        <h1 className="text-4xl font-bold text-slate-950">Build a professional CV</h1>
        <p className="mt-2 text-base text-slate-600">Welcome back, {userName}.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/templates?kind=resume" className="inline-flex items-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Create CV</Link>
          <Link href="/templates?kind=coverLetter" className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">Create cover letter</Link>
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="glÏSss-panel rounded-[2rem] p-6">
          <h2 className="text-2xl font-semibold text-slate-950">CVs</h2>
          <div className="mt-4 space-y-4">
            {resumes.length ? resumes.map(r => <DocRow key={r.id} kind="resume" item={r} onDup={dupResume} onDel={delResume} />) : <DocumentEmptyState title="No CVs yet" description="Start with a polished template." href="/templates?kind=resume" ctaLabel="Create your first CV" />}
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Cover letters</h2>
          <div className="mt-4 space-y-4">
            {coverLetters.length ? coverLetters.map(c => <DocRow key={c.id} kind="coverLetter" item={c} onDup={dupCL} onDel={delCL} />) : <DocumentEmptyState title="No cover letters yet" description="Create a matching cover letter once your CV is ready." href="/templates?kind=coverLetter" ctaLabel="Create your first cover letter" />}
          </div>
        </div>
      </section>
    </div>
  );
}
