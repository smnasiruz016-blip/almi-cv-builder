import { prisma } from "@/lib/prisma";
import { getEmailProvider } from "@/server/services/email";
import { executeJobSearch } from "@/server/services/job-search";
import type { JobSearchInput } from "@/types";
export async function processDailyAlerts() {
  const searches = await prisma.savedSearch.findMany({ where: { alertsEnabled: true }, include: { user: true } });
  const email = getEmailProvider();
  let processed = 0, skipped = 0, failed = 0;
  for (const s of searches) {
    try {
      const { results } = await executeJobSearch(s.querySnapshot as JobSearchInput);
      await email.sendEmail(s.user.email, `Almi alert: ${s.name}`, results.slice(0,3).map(j => `${j.title} at ${j.company}`).join("<br/>"));
      await prisma.savedSearch.update({ where: { id: s.id }, data: { lastAlertedAt: new Date() } });
      processed++;
    } catch { failed++; }
  }
  return { processed, skipped, failed };
}
