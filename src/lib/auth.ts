import crypto from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { SessionUser } from "@/types";
const SESSION_COOKIE = "session";
function sha256(v): string { return crypto.createHash("sha256").update(v).digest("hex"); }
const getSession = cache(async (tokenHash: string) => prisma.session.findUnique({ where: { tokenHash }, include: { user: true } }));
export async function getCurrentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await getSession(sha256(token));
  if (!session || session.expiresAt <= new Date()) { store.delete(SESSION_COOKIE); return null; }
  return { id: session.user.id, name: session.user.name, email: session.user.email, role: session.user.role, subscriptionTier: session.user.subscriptionTier };
}
export async function requireUser() { const u = await getCurrentUser(); if (!u) redirect("/login"); return u; }
