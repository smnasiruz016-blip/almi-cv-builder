import { NextResponse } from "next/server";
import { log } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { validateSignupBody } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { createHash } from "crypto";

export async function POST(req: Request) {
  log("info", "auth.signup.start");
  const body = await req.json().catch(() => ({}));
  const parsed = validateSignupBody(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input", details: parsed.error }, { status: 400 });
  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { name, email, passwordHash } });
  const token = randomUUID();
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await prisma.session.create({ data: { userId: user.id, tokenHash, expiresAt } });
  const cookieStore = await cookies();
  cookieStore.set("session", token, { httpOnly: true, sameSite: "lax", path: "/", expires: expiresAt, secure: process.env.NODE_ENV === "production" });
  log("info", "auth.signup.success", { userId: user.id });
  return NextResponse.json({ success: true, userId: user.id });
}
