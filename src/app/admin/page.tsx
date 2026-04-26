import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAdminStats } from "@/server/services/admin";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/dashboard");
  const stats = await getAdminStats();
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Admin Stats</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="card" style={{ padding: "1.2rem" }}>
            <p style={{ fontSize: "0.7rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{key}</p>
            <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)" }}>{String(value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
