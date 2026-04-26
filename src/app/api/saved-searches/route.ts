import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveSearchSchema } from "@/lib/validation";
export async function GET() {
  const user = await requireUser();
  const searches = await prisma.savedSearch.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(searches);
}
export async function POST(req: Request) {
  const user = await requireUser();
  const body = await req.json().catch(() => ({}));
  const parsed = saveSearchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const search = await prisma.savedSearch.create({ data: { userId: user.id, ...parsed.data } });
  return NextResponse.json(search);
}
