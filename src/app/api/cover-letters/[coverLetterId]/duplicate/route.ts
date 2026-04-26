import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { duplicateCoverLetter } from "@/server/services/document-service";
export async function POST(_: Request, { params }: { params: Promise<{ coverLetterId: string }> }) {
  const user = await requireUser();
  const { coverLetterId } = await params;
  const newCL = await duplicateCoverLetter(user.id, coverLetterId);
  return NextResponse.json({ coverLetter: newCL });
}
