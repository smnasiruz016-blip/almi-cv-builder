import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { createCoverLetterForUser } from "@/server/services/document-service";
export async function POST(req: Request) {
  const user = await requireUser();
  const body = await req.json().catch(() => ({}));
  const coverLetter = await createCoverLetterForUser(user.id, body.templateKey);
  return NextResponse.json(coverLetter);
}
