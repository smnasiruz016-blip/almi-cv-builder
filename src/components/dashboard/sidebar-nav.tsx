import Link from "next/link";
import { FileText, LayoutTemplate, PenSquare, Sparkles, Shield, Zap, Crown } from "lucide-react";
import { canUsePremiumTemplates } from "@/lib/plans";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/types";

export function SidebarNav({ user, className }: { user: SessionUser; className?: string; }) {
  const isPro = user.subscriptionTier === "PRO";
  const navItems = [
    { href: "/dashboard", label: "My Documents", icon: FileText },
    { href: "/templates?kind=resume", label: "CV Templates", icon: LayoutTemplate },
    { href: "/templates?kind=coverLetter", label: "Cover Letter Templates", icon: PenSquare },
    { href: "/resumes/new", label: "New CV", icon: Sparkles },
    ...(user.role === "ADMIN" ? [{ href: "/admin", label: "Admin", icon: Shield }] : []),
  ] as const;
  return (
    <aside className={cn("glass-panel rounded-[20px] p-5 flex flex-col gap-4", className)}>
      <div className="pb-4 border-b border-white/10">
        <p className="text-lg font-bold">Almi CV Builder</p>
        <p className="text-xs mt-1" style={{ color: "var(--text3)" }}>Professional CVs & cover letters</p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="nav-item"><Icon style={{ width: 15, height: 15 }} />{label}</Link>
        ))}
      </nav>
      <div className="mt-auto">
        {isPro ? <div style={{ background: "rgba(0,229,184,0.12)", border: "1px solid rgba(0,229,184,0.2)", padding: "1rem", borderRadius: "14px" }}><span style={{ color: "var(--primary)" }}>Premium Active</span></div> : <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", padding: "1rem", borderRadius: "14px" }}><a href="#" style={{ display: "flex", justifyContent: "center", gap: "5px", padding: "0.5rem", borderRadius: "9px", background: "#00e5b8", color: "#04080f", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}><Zap style={{ width: 12, height: 12 }} /> Upgrade</a></div>}
      </div>
    </aside>
  );
}
