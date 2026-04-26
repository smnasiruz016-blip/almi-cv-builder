import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { deleteCoverLetter, updateCoverLetter } from "@/server/services/document-service";
import { validateCoverLetterUpdateBody } from "@/lib/validation/documents";
export async function PATCH(req: Request, { params }: { params: Promise<{ coverLetterId: string }> }) {
  const user = await requireUser();
  const { coverLetterId } = await params;
  const body = await req.json().catch(() => ({}));
  const p = validateCoverLetterUpdateBody(body);
  if (!p.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const cl = await updateCoverLetter(user.id, coverLetterId, p.data);
  return NextResponse.json(cl);
}
export async function DELETE(_r: Request, { params }: { params: Promise<{ coverLetterId: string }> }) {
  const user = await requireUser();
  const { coverLetterId } = await params;
  await deleteCoverLetter(user.id, coverLetterId);
  return NextResponse.json({ success: true });
}
