export type Channel = "google_search" | "google_local" | "meta_feed" | "tiktok";

export type CampaignStatus = "active" | "paused" | "exhausted";
export type AdStatus = "active" | "paused" | "killed" | "scaling";

export interface Campaign {
  id: string;
  name: string;
  channel: Channel;
  geo: string;
  dailyBudgetEur: number;
  spentTodayEur: number;
  targetCpaEur: number;
  status: CampaignStatus;
  createdAt: number;
  updatedAt: number;
}

export interface Ad {
  id: string;
  campaignId: string;
  headline: string;
  description: string;
  cta: string;
  keywords: string[];
  bidEur: number;
  status: AdStatus;
  alpha: number;
  beta: number;
  impressions: number;
  clicks: number;
  conversions: number;
  spendEur: number;
  revenueEur: number;
  createdAt: number;
  updatedAt: number;
}

export interface MinuteEvent {
  id?: number;
  ts: number;
  campaignId: string;
  adId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spendEur: number;
  revenueEur: number;
}

export interface AgentDecision {
  ts: number;
  level: "info" | "warn" | "kill" | "scale" | "create";
  message: string;
  campaignId?: string;
  adId?: string;
}

export interface DashboardSnapshot {
  now: number;
  totalSpend: number;
  totalRevenue: number;
  totalConversions: number;
  roi: number;
  cpa: number;
  campaigns: Campaign[];
  ads: Ad[];
  recentEvents: MinuteEvent[];
  decisions: AgentDecision[];
}
