import { NextResponse } from "next/server";
import { log } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { validateLoginBody } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { createHash } from "crypto";

export async function POST(req: Request) {
  log("info", "auth.login.start");
  const body = await req.json().catch(() => ({}));
  const parsed = validateLoginBody(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const token = randomUUID();
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await prisma.session.create({ data: { userId: user.id, tokenHash, expiresAt } });
  const cookieStore = await cookies();
  cookieStore.set("session", token, { httpOnly: true, sameSite: "lax", path: "/", expires: expiresAt, secure: process.env.NODE_ENV === "production" });
  log("info", "auth.login.success", { userId: user.id });
  return NextResponse.json({ success: true, userId: user.id });
}
