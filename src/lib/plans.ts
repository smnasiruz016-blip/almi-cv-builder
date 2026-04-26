import type { SubscriptionTier } from "@prisma/client";
export function getPlanDefinition(tier: SubscriptionTier) { return tier === "PRO" ? { tier, label: "Pro", dailySearchLimit: null, features: { canUseAlerts: true, canUseResumeInsights: true, hasUnlimitedSearches: true, canUsePremiumTemplates: true, canUseAiWriting: true, canExportWithoutBranding: true } } : { tier, label: "Free", dailySearchLimit: 5, features: { canUseAlerts: false, canUseResumeInsights: false, hasUnlimitedSearches: false, canUsePremiumTemplates: false, canUseAiWriting: false, canExportWithoutBranding: false } }; }
export function canUsePremiumTemplates(t: SubscriptionTier) { return getPlanDefinition(t).features.canUsePremiumTemplates; }
export function canUseAiWriting(t: SubscriptionTier) { return getPlanDefinition(t).features.canUseAiWriting; }
export function canUseAlerts(t: SubscriptionTier) { return getPlanDefinition(t).features.canUseAlerts; }
export function getDailySearchLimitForTier(t: SubscriptionTier) { return getPlanDefinition(t).dailySearchLimit; }
export function hasUnlimitedSearches(t: SubscriptionTier) { return getPlanDefinition(t).features.hasUnlimitedSearches; }
