import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { deleteResume, updateResume } from "@/server/services/document-service";
import { validateResumeUpdateBody } from "@/lib/validation/documents";
export async function PATCH(req: Request, { params }: { params: Promise<{ resumeId: string }> }) {
  const user = await requireUser();
  const { resumeId } = await params;
  const body = await req.json().catch(() => ({}));
  const p = validateResumeUpdateBody(body);
  if (!p.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const resume = await updateResume(user.id, resumeId, p.data);
  return NextResponse.json(resume);
}
export async function DELETE(_r: Request, { params }: { params: Promise<{ resumeId: string }> }) {
  const user = await requireUser();
  const { resumeId } = await params;
  await deleteResume(user.id, resumeId);
  return NextResponse.json({ success: true });
}
