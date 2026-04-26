import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, PenSquare, Sparkles, Star, Zap, Globe2, Download, Layout } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

const benefits = ["Build a polished CV in minutes","Create a matching cover letter","10 premium templates","Live preview as you type","AI writing suggestions","Export-ready structure"];
const steps = [{icon: Layout,title:"Pick a template",desc:"Choose from 10 premium layouts."},{icon: FileText,title:"Fill your content",desc:"Structured sections guide you."},{icon: Sparkles,title:"Preview live",desc:"See every edit reflected instantly."},{icon: Download,title:"Export & apply",desc:"Download a polished CV and cover letter."}];

export default async function HomePage() {
  const user = await getCurrentUser();
  const primaryHref = user ? "/dashboard" : "/signup";
  return (
    <main style={{ position:"relative", zIndex:1 }}>
      <nav style={{ position:"sticky",top:0,zIndex:100,backdropFilter:"blur(24px)",background:"rgba(4,8,15,0.92)",borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="page-shell" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.85rem 0",gap:"1rem" }}>
          <span style={{ fontSize:"1.1rem",fontWeight:700,color:"var(--primary)" }}>Almi CV Builder</span>
          <div style={{ display:"flex",alignItems:"center",gap:"6px" }}>
            <Link href="/templates?kind=resume" className="btn-ghost">Templates</Link>
            {!user && <Link href="/login" className="btn-ghost">Log in</Link>}
            <Link href={primaryHref} className="btn-primary" style={{ padding:"0.55rem 1.2rem",fontSize:"0.85rem" }}>{user ? "Dashboard" : "Start Free"}<ArrowRight style={{ width:14,height:14 }} /></Link>
          </div>
        </div>
      </nav>
      <section className="page-shell" style={{ paddingTop:"5rem",paddingBottom:"4rem" }}>
        <h1 className="section-title">Build a <span className="grad-text">world-class CV</span> in minutes.</h1>
        <p style={{ marginTop:"1rem",fontSize:"1.05rem",lineHeight:1.75,color:"var(--text2)",maxWidth:"500px" }}>Choose a premium template, fill your details, and get a polished CV and cover letter ready to impress.</p>
        <div style={{ marginTop:"1.5rem",display:"flex",flexWrap:"wrap",gap:"0.75rem" }}>
          <Link href={primaryHref} className="btn-primary">Build Your CV Free<ArrowRight style={{ width:16,height:16 }} /></Link>
          <Link href="/templates?kind=resume" className="btn-secondary"><Layout style={{ width:16,height:16 }} />Browse Templates</Link>
        </div>
      </section>
      <section className="page-shell" style={{ paddingBottom:"4rem" }}>
        <h2 style={{ fontSize:"1.8rem",fontWeight:800,marginBottom:"1.5rem" }}>How it works</h2>
        <div style={{ display:"grid",gap:"1rem",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr)" }}>
          {steps.map((s,i) => <div key={s.title} className="card" style={{ padding:"1.5rem" }}><h3 style={{ fontWeight:700,marginBottom:"4px" }}>{i+1}. {s.title}</h3><p style={{ fontSize:"0.85rem",color:"var(--text2)" }}>{s.desc}</p></div>)}
        </div>
      </section>
      <section className="page-shell" style={{ paddingBottom:"4rem" }}>
        <div className="glass-panel" style={{ borderRadius:"24px",padding:"2rem",border:"1px solid rgba(0,229,184,0.1)" }}>
          <h2 style={{ fontSize:"1.6rem",fontWeight:800 }}>Everything you need to <span className="grad-text">land the job</span></h2>
          <div style={{ marginTop:"1rem",display:"flex",flexDirection:"column",gap:"0.75rem" }}>
            {benefits.map(b => <div key={b} style={{ display:"flex",alignItems:"center",gap:"10px" }}><CheckCircle2 style={{ width:16,height:16,color:"var(--primary)",flexShrink:0 }} /><span style={{ fontSize:"0.9rem",color:"var(--text2)" }}>{b</span></div>)}
          </div>
          <div style={{ marginTop:"1.5rem" }}><Link href={primaryHref} className="btn-primary">{user ? "Open Dashboard" : "Get Started Free"}<ArrowRight style={{ width:16,height:16 }} /></Link></div>
        </div>
      </section>
      <footer style={{ borderTop:"1px solid var(--border)",padding:"2rem 0" }}>
        <div className="page-shell" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem" }}>
          <span style={{ fontSize:"0.8rem",color:"var(--text3)" }}>Almi CV Builder — part of almiworld.com</span>
          <div style={{ display:"flex",gap:"1rem",fontSize:"0.82rem",color:"var(--text3)" }}><Link href="/login">Log in</Link><Link href="/signup">Sign up</Link></div>
        </div>
      </footer>
    </main>
  );
}
