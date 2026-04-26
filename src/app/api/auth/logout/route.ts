import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (token) { const tokenHash = createHash("sha256").update(token).digest("hex"); await prisma.session.deleteMany({ where: { tokenHash } }).catch(() => {}); }
  cookieStore.delete("session");
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
}
