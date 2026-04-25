import type { Ad, MinuteEvent } from "./types.ts";

const AVERAGE_TICKET_EUR = 145;

function hourMultiplier(date: Date): number {
  const h = date.getHours();
  if (h >= 7 && h <= 9) return 1.6;
  if (h >= 17 && h <= 21) return 1.4;
  if (h >= 22 || h <= 5) return 0.45;
  return 1.0;
}

function adQualityScore(ad: Ad): number {
  const len = ad.headline.length + ad.description.length;
  const lenScore = len > 60 && len < 130 ? 1.05 : 0.92;
  const urgency = /urgence|30 min|24\/7|sos/i.test(ad.headline + " " + ad.description) ? 1.15 : 1.0;
  const price = /\b\d{2,3}\s*€\b/.test(ad.headline + ad.description) ? 1.12 : 1.0;
  return lenScore * urgency * price;
}

export interface SimulationOutput {
  events: MinuteEvent[];
  updatedAds: Ad[];
}

export function simulateMinute(ad: Ad, allocatedEur: number, now: number): MinuteEvent {
  if (allocatedEur <= 0) {
    return {
      ts: now,
      campaignId: ad.campaignId,
      adId: ad.id,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spendEur: 0,
      revenueEur: 0,
    };
  }

  const hMul = hourMultiplier(new Date(now));
  const quality = adQualityScore(ad);
  const cpc = Math.max(0.18, ad.bidEur * (0.85 + Math.random() * 0.3));
  const meanClicks = (allocatedEur / cpc) * quality * hMul * (0.7 + Math.random() * 0.6);
  const floorC = Math.floor(meanClicks);
  const clicks = floorC + (Math.random() < meanClicks - floorC ? 1 : 0);
  const impressions = Math.round(clicks * (35 + Math.random() * 25)) || (allocatedEur > 0 ? 1 : 0);

  const trueCvr = 0.04 + 0.05 * Math.tanh(quality - 1) + (Math.random() - 0.5) * 0.01;
  const cvr = Math.max(0.005, Math.min(0.18, trueCvr));
  const meanConv = clicks * cvr * hMul * (0.85 + Math.random() * 0.3);
  const floorV = Math.floor(meanConv);
  const conversions = floorV + (Math.random() < meanConv - floorV ? 1 : 0);

  const spend = Math.min(allocatedEur, clicks * cpc);
  const revenue = conversions * AVERAGE_TICKET_EUR * (0.9 + Math.random() * 0.25);

  return {
    ts: now,
    campaignId: ad.campaignId,
    adId: ad.id,
    impressions,
    clicks,
    conversions,
    spendEur: Number(spend.toFixed(2)),
    revenueEur: Number(revenue.toFixed(2)),
  };
}
