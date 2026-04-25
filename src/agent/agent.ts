import { randomUUID } from "node:crypto";
import { allocateBudget, expectedConversionRate } from "./bandit.ts";
import { generateCreatives } from "./creative.ts";
import {
  listAds,
  listAdsForCampaign,
  listCampaigns,
  recentDecisions,
  recentEvents,
  recordDecision,
  recordEvent,
  resetDailySpend,
  upsertAd,
  upsertCampaign,
} from "./store.ts";
import { selectAdapter, type PlatformAdapter } from "./platforms.ts";
import type {
  Ad,
  AgentDecision,
  Campaign,
  DashboardSnapshot,
  MinuteEvent,
} from "./types.ts";

interface AgentConfig {
  apiKey?: string;
  adapter: PlatformAdapter;
  killCpaMultiplier: number;
  scaleRoasThreshold: number;
  minImpressionsBeforeKill: number;
  maxAdsPerCampaign: number;
}

const config: AgentConfig = {
  apiKey: process.env.GEMINI_API_KEY,
  adapter: selectAdapter(process.env.AD_PLATFORM),
  killCpaMultiplier: Number(process.env.AD_KILL_CPA_MULT ?? 2.2),
  scaleRoasThreshold: Number(process.env.AD_SCALE_ROAS ?? 3),
  minImpressionsBeforeKill: Number(process.env.AD_MIN_IMPRESSIONS ?? 400),
  maxAdsPerCampaign: Number(process.env.AD_MAX_PER_CAMPAIGN ?? 6),
};

let dayKey = new Date().toISOString().slice(0, 10);

function log(decision: Omit<AgentDecision, "ts">): void {
  const entry: AgentDecision = { ...decision, ts: Date.now() };
  recordDecision(entry);
  console.log(`[agent ${entry.level}] ${entry.message}`);
}

export async function bootstrapDefaultCampaigns(): Promise<void> {
  if (listCampaigns().length > 0) return;

  const seeds: Array<Pick<Campaign, "name" | "channel" | "geo" | "dailyBudgetEur" | "targetCpaEur">> = [
    { name: "Toulon - Search Urgence", channel: "google_search", geo: "Toulon 25km", dailyBudgetEur: 40, targetCpaEur: 22 },
    { name: "Var - Local Services", channel: "google_local", geo: "Var (83)", dailyBudgetEur: 30, targetCpaEur: 18 },
    { name: "Toulon - Meta Retargeting", channel: "meta_feed", geo: "Toulon 15km", dailyBudgetEur: 20, targetCpaEur: 28 },
  ];

  const now = Date.now();
  for (const seed of seeds) {
    const campaign: Campaign = {
      id: randomUUID(),
      ...seed,
      spentTodayEur: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    };
    upsertCampaign(campaign);
    log({ level: "create", message: `Campagne créée: ${campaign.name}`, campaignId: campaign.id });
    await ensureMinAds(campaign, 3);
  }
}

async function ensureMinAds(campaign: Campaign, target: number): Promise<void> {
  const existing = listAdsForCampaign(campaign.id);
  const live = existing.filter((a) => a.status !== "killed");
  if (live.length >= target) return;

  const need = Math.min(target - live.length, config.maxAdsPerCampaign - live.length);
  if (need <= 0) return;

  const creatives = await generateCreatives(campaign, need, config.apiKey);
  const now = Date.now();
  for (const c of creatives) {
    const ad: Ad = {
      id: randomUUID(),
      campaignId: campaign.id,
      headline: c.headline,
      description: c.description,
      cta: c.cta,
      keywords: c.keywords,
      bidEur: 0.6 + Math.random() * 0.7,
      status: "active",
      alpha: 1,
      beta: 8,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spendEur: 0,
      revenueEur: 0,
      createdAt: now,
      updatedAt: now,
    };
    upsertAd(ad);
    await config.adapter.pushAd(campaign, ad);
    log({
      level: "create",
      message: `Annonce créée "${ad.headline}"`,
      campaignId: campaign.id,
      adId: ad.id,
    });
  }
}

function maybeRollDay(): void {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    resetDailySpend();
    log({ level: "info", message: `Nouveau jour ${today}: budgets quotidiens réinitialisés.` });
  }
}

function applyEventToAd(ad: Ad, ev: MinuteEvent): Ad {
  const next: Ad = {
    ...ad,
    impressions: ad.impressions + ev.impressions,
    clicks: ad.clicks + ev.clicks,
    conversions: ad.conversions + ev.conversions,
    spendEur: Number((ad.spendEur + ev.spendEur).toFixed(2)),
    revenueEur: Number((ad.revenueEur + ev.revenueEur).toFixed(2)),
    alpha: ad.alpha + ev.conversions,
    beta: ad.beta + Math.max(0, ev.clicks - ev.conversions),
    updatedAt: ev.ts,
  };
  return next;
}

async function optimizeCampaign(campaign: Campaign): Promise<void> {
  const ads = listAdsForCampaign(campaign.id);
  const live = ads.filter((a) => a.status === "active" || a.status === "scaling");
  if (live.length === 0) {
    await ensureMinAds(campaign, 3);
    return;
  }

  const remaining = Math.max(0, campaign.dailyBudgetEur - campaign.spentTodayEur);
  if (remaining <= 0) {
    if (campaign.status !== "exhausted") {
      const updated: Campaign = { ...campaign, status: "exhausted", updatedAt: Date.now() };
      upsertCampaign(updated);
      log({
        level: "warn",
        message: `Budget quotidien épuisé pour ${campaign.name} (${campaign.spentTodayEur.toFixed(2)}€).`,
        campaignId: campaign.id,
      });
    }
    return;
  }

  const minuteBudget = Math.min(remaining, campaign.dailyBudgetEur / 1440 * 6);
  const allocations = allocateBudget({
    ads: live,
    remainingBudgetEur: minuteBudget,
    targetCpaEur: campaign.targetCpaEur,
  });

  const now = Date.now();
  let spendThisTick = 0;
  let revenueThisTick = 0;

  for (const alloc of allocations) {
    const ad = live.find((a) => a.id === alloc.adId);
    if (!ad) continue;
    const ev = await config.adapter.pullMetrics(campaign, ad, alloc.euros, now);
    recordEvent(ev);
    spendThisTick += ev.spendEur;
    revenueThisTick += ev.revenueEur;
    const updated = applyEventToAd(ad, ev);
    upsertAd(updated);
    evaluateAd(campaign, updated);
  }

  const updatedCampaign: Campaign = {
    ...campaign,
    spentTodayEur: Number((campaign.spentTodayEur + spendThisTick).toFixed(2)),
    updatedAt: now,
  };
  upsertCampaign(updatedCampaign);

  if (revenueThisTick > 0 && spendThisTick > 0) {
    const tickRoas = revenueThisTick / spendThisTick;
    if (tickRoas > config.scaleRoasThreshold * 1.5 && updatedCampaign.dailyBudgetEur < 200) {
      const newBudget = Number(Math.min(200, updatedCampaign.dailyBudgetEur * 1.15).toFixed(2));
      upsertCampaign({ ...updatedCampaign, dailyBudgetEur: newBudget, updatedAt: now });
      log({
        level: "scale",
        message: `Budget +15% sur ${updatedCampaign.name} (ROAS tick=${tickRoas.toFixed(2)}) → ${newBudget}€/j.`,
        campaignId: campaign.id,
      });
    }
  }

  await ensureMinAds(updatedCampaign, 3);
}

function evaluateAd(campaign: Campaign, ad: Ad): void {
  if (ad.impressions < config.minImpressionsBeforeKill) return;

  const cpa = ad.conversions > 0 ? ad.spendEur / ad.conversions : Number.POSITIVE_INFINITY;
  const roas = ad.spendEur > 0 ? ad.revenueEur / ad.spendEur : 0;
  const cvr = expectedConversionRate(ad);

  if (cpa > campaign.targetCpaEur * config.killCpaMultiplier && ad.status !== "killed") {
    upsertAd({ ...ad, status: "killed", updatedAt: Date.now() });
    config.adapter.pauseAd(ad).catch(() => undefined);
    log({
      level: "kill",
      message: `Annonce tuée "${ad.headline}" CPA=${cpa.toFixed(2)}€ vs cible ${campaign.targetCpaEur}€.`,
      campaignId: campaign.id,
      adId: ad.id,
    });
    return;
  }

  if (roas >= config.scaleRoasThreshold && ad.status !== "scaling" && cvr > 0.05) {
    const newBid = Math.min(2.5, ad.bidEur * 1.1);
    upsertAd({ ...ad, status: "scaling", bidEur: Number(newBid.toFixed(2)), updatedAt: Date.now() });
    log({
      level: "scale",
      message: `Annonce scalée "${ad.headline}" ROAS=${roas.toFixed(2)}, bid→${newBid.toFixed(2)}€.`,
      campaignId: campaign.id,
      adId: ad.id,
    });
  }
}

export async function tick(): Promise<void> {
  maybeRollDay();
  const campaigns = listCampaigns().filter((c) => c.status !== "paused");
  for (const c of campaigns) {
    await optimizeCampaign(c);
  }
}

export function snapshot(): DashboardSnapshot {
  const campaigns = listCampaigns();
  const ads = listAds();
  const totalSpend = ads.reduce((s, a) => s + a.spendEur, 0);
  const totalRevenue = ads.reduce((s, a) => s + a.revenueEur, 0);
  const totalConversions = ads.reduce((s, a) => s + a.conversions, 0);
  const roi = totalSpend > 0 ? (totalRevenue - totalSpend) / totalSpend : 0;
  const cpa = totalConversions > 0 ? totalSpend / totalConversions : 0;
  return {
    now: Date.now(),
    totalSpend: Number(totalSpend.toFixed(2)),
    totalRevenue: Number(totalRevenue.toFixed(2)),
    totalConversions,
    roi: Number(roi.toFixed(3)),
    cpa: Number(cpa.toFixed(2)),
    campaigns,
    ads,
    recentEvents: recentEvents(180),
    decisions: recentDecisions(60),
  };
}

export function pauseCampaign(id: string): void {
  const c = listCampaigns().find((x) => x.id === id);
  if (!c) return;
  upsertCampaign({ ...c, status: c.status === "paused" ? "active" : "paused", updatedAt: Date.now() });
  log({
    level: "info",
    message: `Campagne ${c.name} → ${c.status === "paused" ? "active" : "paused"}.`,
    campaignId: id,
  });
}

let loopHandle: ReturnType<typeof setInterval> | null = null;

export function startLoop(intervalMs = 60_000): void {
  if (loopHandle) return;
  log({ level: "info", message: `Boucle agent démarrée (tick=${intervalMs}ms).` });
  const run = () =>
    tick().catch((err) =>
      log({ level: "warn", message: `Tick error: ${(err as Error).message}` })
    );
  run();
  loopHandle = setInterval(run, intervalMs);
}

export function stopLoop(): void {
  if (loopHandle) {
    clearInterval(loopHandle);
    loopHandle = null;
    log({ level: "info", message: "Boucle agent arrêtée." });
  }
}
