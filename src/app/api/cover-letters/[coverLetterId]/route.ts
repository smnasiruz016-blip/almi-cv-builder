import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { deleteCoverLetter, getCoverLetterById, updateCoverLetter } from "@/server/services/document-service";
import { validateCoverLetterUpdateBody } from "@/lib/validation/documents";

export async function PATCH(req: Request, { params }: { params: Promise<{ coverLetterId: string }> }) {
  const user = await requireUser();
  const { coverLetterId } = await params;
  const body = await req.json().catch(() => ({}));
  const parsed = validateCoverLetterUpdateBody(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const updated = await updateCoverLetter(user.id, coverLetterId, parsed.data);
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ coverLetterId: string }> }) {
  const user = await requireUser();
  const { coverLetterId } = await params;
  await deleteCoverLetter(user.id, coverLetterId);
  return NextResponse.json({ success: true });
}
