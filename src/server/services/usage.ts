import { prisma } from "@/lib/prisma";
import { getPlanDefinition } from "@/lib/plans";
export async function getSearchUsageForUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { subscriptionTier: true } });
  const tier = user?.subscriptionTier ?? "FREE";
  const plan = getPlanDefinition(tier as any);
  return { dailyUsed: 0, dailyLimit: plan.dailySearchLimit, remaining: plan.dailySearchLimit, tier, plan };
}
export async function assertUserCanSearch(userId: string) {
  const usage = await getSearchUsageForUser(userId);
  return usage;
}
