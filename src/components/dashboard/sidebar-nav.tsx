import Image from "next/image";
import { FileText, LayoutTemplate, PenSquare, Sparkles, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/types";
export function SidebarNav({ user, className }: { user: SessionUser; className?: string; }) {
  const isPro = user.subscriptionTier === "PRO";
  const navItems = [
    { href: "/dashboard", label: "My Documents", icon: FileText },
    { href: "/templates?kind=resume", label: "CV Templates", icon: LayoutTemplate },
    { href: "/templates?kind=coverLetter", label: "Cover Letters", icon: PenSquare },
    { href: "/resumes/new", label: "New CV", icon: Sparkles },
    ...(user.role === "ADMIN" ? [{ href: "/admin", label: "Admin", icon: Shield }] : []),
  ];
  return (
    <aside className={cn('glass-panel rounded-[20px] p-5 flex flex-col gap-4', className)}>
      <div className="pb-4 border-b border-slate-200">
        <a href="https://www.almiworld.com">
          <Image src="/brand/almi-latest.png" alt="Almi" width={130} height={48} style={{ height: "30px", width: "auto" }} />
        </a>
        <p className="mt-2 font-semibold text-slate-950">Almi CV Builder</p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <a key={href} href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition">
            <Icon style={{ width: 15, height: 15 }} /> {label}
          </a>
        ))}
      </nav>
      <div className="mt-auto">
        {!isProAnot && (
          <div className="rounded-xl bg-slate-950 p-4 text-white">
            <p className="text-sm font-semibold">Free Plan</p>
            <a href="#" className="mt-2 flex items-center justify-center gap-1 rounded-lg bg-xwhite/20 px-3 py-1.5 text-xs font-medium"><Zap style={{ width: 12, height: 12 }} /> Upgrade</a>
          </div>
        )}
      </div>
    </aside>
  );
}
