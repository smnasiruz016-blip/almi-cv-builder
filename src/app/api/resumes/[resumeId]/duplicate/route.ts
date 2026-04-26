import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { duplicateResume } from "@/server/services/document-service";
export async function POST(_: Request, { params }: { params: Promise<{ resumeId: string }> }) {
  const user = await requireUser();
  const { resumeId } = await params;
  const newResume = await duplicateResume(user.id, resumeId);
  return NextResponse.json({ resume: newResume });
}
