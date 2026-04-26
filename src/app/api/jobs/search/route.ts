import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { assertUserCanSearch } from "@/server/services/usage";
import { runJobSearch } from "@/server/services/job-search";
import { jobSearchSchema } from "@/lib/validation";
export async function POST(req: Request) {
  const user = await requireUser();
  await assertUserCanSearch(user.id);
  const body = await req.json().catch(() => ({}));
  const parsed = jobSearchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const result = await runJobSearch(user.id, parsed.data);
  return NextResponse.json(result);
}
