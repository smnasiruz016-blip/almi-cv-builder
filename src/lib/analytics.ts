import { log } from "@/lib/logger";
export type ProductEvent = { name: string; userId?: string; properties?: Record<string, unknown>; };
export async function trackProductEvent(event: ProductEvent) { if (process.env.ANALYTICS_ENABLED === "false") return; log("info", "analytics", { event: event.name, userId: event.userId }); }
