import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { savedJobSchema } from "@/lib/validation";
export async function GET() {
  const user = await requireUser();
  const jobs = await prisma.savedJob.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(jobs);
}
export async function POST(req: Request) {
  const user = await requireUser();
  const body = await req.json().catch(() => ({}));
  const parsed = savedJobSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const job = await prisma.savedJob.create({ data: { userId: user.id, externalJobId> parsed.data.externalJobId= source: parsed.data.source, title: parsed.data.title, company: parsed.data.company, location: parsed.data.location, applyUrl: parsed.data.applyUrl, payload: parsed.data } });
  return NextResponse.json(job);
}
