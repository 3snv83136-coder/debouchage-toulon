import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import type { Ad, AgentDecision, Campaign, MinuteEvent } from "./types.ts";

const DB_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "ads-agent.sqlite");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      channel TEXT NOT NULL,
      geo TEXT NOT NULL,
      daily_budget_eur REAL NOT NULL,
      spent_today_eur REAL NOT NULL,
      target_cpa_eur REAL NOT NULL,
      status TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS ads (
      id TEXT PRIMARY KEY,
      campaign_id TEXT NOT NULL,
      headline TEXT NOT NULL,
      description TEXT NOT NULL,
      cta TEXT NOT NULL,
      keywords TEXT NOT NULL,
      bid_eur REAL NOT NULL,
      status TEXT NOT NULL,
      alpha REAL NOT NULL,
      beta REAL NOT NULL,
      impressions INTEGER NOT NULL,
      clicks INTEGER NOT NULL,
      conversions INTEGER NOT NULL,
      spend_eur REAL NOT NULL,
      revenue_eur REAL NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
    );
    CREATE INDEX IF NOT EXISTS idx_ads_campaign ON ads(campaign_id);
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts INTEGER NOT NULL,
      campaign_id TEXT NOT NULL,
      ad_id TEXT NOT NULL,
      impressions INTEGER NOT NULL,
      clicks INTEGER NOT NULL,
      conversions INTEGER NOT NULL,
      spend_eur REAL NOT NULL,
      revenue_eur REAL NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_events_ts ON events(ts);
    CREATE TABLE IF NOT EXISTS decisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts INTEGER NOT NULL,
      level TEXT NOT NULL,
      message TEXT NOT NULL,
      campaign_id TEXT,
      ad_id TEXT
    );
  `);
  return db;
}

const rowToCampaign = (r: any): Campaign => ({
  id: r.id,
  name: r.name,
  channel: r.channel,
  geo: r.geo,
  dailyBudgetEur: r.daily_budget_eur,
  spentTodayEur: r.spent_today_eur,
  targetCpaEur: r.target_cpa_eur,
  status: r.status,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

const rowToAd = (r: any): Ad => ({
  id: r.id,
  campaignId: r.campaign_id,
  headline: r.headline,
  description: r.description,
  cta: r.cta,
  keywords: JSON.parse(r.keywords),
  bidEur: r.bid_eur,
  status: r.status,
  alpha: r.alpha,
  beta: r.beta,
  impressions: r.impressions,
  clicks: r.clicks,
  conversions: r.conversions,
  spendEur: r.spend_eur,
  revenueEur: r.revenue_eur,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

export function upsertCampaign(c: Campaign): void {
  getDb()
    .prepare(
      `INSERT INTO campaigns (id,name,channel,geo,daily_budget_eur,spent_today_eur,target_cpa_eur,status,created_at,updated_at)
       VALUES (@id,@name,@channel,@geo,@dailyBudgetEur,@spentTodayEur,@targetCpaEur,@status,@createdAt,@updatedAt)
       ON CONFLICT(id) DO UPDATE SET
         name=excluded.name,
         daily_budget_eur=excluded.daily_budget_eur,
         spent_today_eur=excluded.spent_today_eur,
         target_cpa_eur=excluded.target_cpa_eur,
         status=excluded.status,
         updated_at=excluded.updated_at`
    )
    .run(c);
}

export function upsertAd(a: Ad): void {
  getDb()
    .prepare(
      `INSERT INTO ads (id,campaign_id,headline,description,cta,keywords,bid_eur,status,alpha,beta,impressions,clicks,conversions,spend_eur,revenue_eur,created_at,updated_at)
       VALUES (@id,@campaignId,@headline,@description,@cta,@keywords,@bidEur,@status,@alpha,@beta,@impressions,@clicks,@conversions,@spendEur,@revenueEur,@createdAt,@updatedAt)
       ON CONFLICT(id) DO UPDATE SET
         headline=excluded.headline,
         description=excluded.description,
         cta=excluded.cta,
         keywords=excluded.keywords,
         bid_eur=excluded.bid_eur,
         status=excluded.status,
         alpha=excluded.alpha,
         beta=excluded.beta,
         impressions=excluded.impressions,
         clicks=excluded.clicks,
         conversions=excluded.conversions,
         spend_eur=excluded.spend_eur,
         revenue_eur=excluded.revenue_eur,
         updated_at=excluded.updated_at`
    )
    .run({ ...a, keywords: JSON.stringify(a.keywords) });
}

export function listCampaigns(): Campaign[] {
  return getDb().prepare(`SELECT * FROM campaigns ORDER BY created_at`).all().map(rowToCampaign);
}

export function listAds(): Ad[] {
  return getDb().prepare(`SELECT * FROM ads ORDER BY created_at`).all().map(rowToAd);
}

export function listAdsForCampaign(campaignId: string): Ad[] {
  return getDb()
    .prepare(`SELECT * FROM ads WHERE campaign_id = ? ORDER BY created_at`)
    .all(campaignId)
    .map(rowToAd);
}

export function recordEvent(e: MinuteEvent): void {
  getDb()
    .prepare(
      `INSERT INTO events (ts,campaign_id,ad_id,impressions,clicks,conversions,spend_eur,revenue_eur)
       VALUES (@ts,@campaignId,@adId,@impressions,@clicks,@conversions,@spendEur,@revenueEur)`
    )
    .run(e);
}

export function recentEvents(limit = 120): MinuteEvent[] {
  return getDb()
    .prepare(`SELECT * FROM events ORDER BY id DESC LIMIT ?`)
    .all(limit)
    .map((r: any) => ({
      id: r.id,
      ts: r.ts,
      campaignId: r.campaign_id,
      adId: r.ad_id,
      impressions: r.impressions,
      clicks: r.clicks,
      conversions: r.conversions,
      spendEur: r.spend_eur,
      revenueEur: r.revenue_eur,
    }));
}

export function recordDecision(d: AgentDecision): void {
  getDb()
    .prepare(
      `INSERT INTO decisions (ts,level,message,campaign_id,ad_id) VALUES (@ts,@level,@message,@campaignId,@adId)`
    )
    .run({ campaignId: null, adId: null, ...d });
}

export function recentDecisions(limit = 80): AgentDecision[] {
  return getDb()
    .prepare(`SELECT * FROM decisions ORDER BY id DESC LIMIT ?`)
    .all(limit)
    .map((r: any) => ({
      ts: r.ts,
      level: r.level,
      message: r.message,
      campaignId: r.campaign_id ?? undefined,
      adId: r.ad_id ?? undefined,
    }));
}

export function resetDailySpend(): void {
  getDb()
    .prepare(`UPDATE campaigns SET spent_today_eur = 0, status = CASE WHEN status='exhausted' THEN 'active' ELSE status END, updated_at = ?`)
    .run(Date.now());
}
