import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { handleResumeUpload } from "@/server/services/resume-service";
export async function POST(req: Request) {
  const user = await requireUser();
  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  const result = await handleResumeUpload(user.id, file);
  return NextResponse.json(result);
}
