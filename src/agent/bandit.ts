import type { Ad } from "./types.ts";

function gammaSample(shape: number): number {
  if (shape < 1) {
    return gammaSample(shape + 1) * Math.pow(Math.random(), 1 / shape);
  }
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  while (true) {
    let x: number;
    let v: number;
    do {
      const u1 = Math.random();
      const u2 = Math.random();
      x = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = Math.random();
    if (u < 1 - 0.0331 * x * x * x * x) return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}

export function sampleBeta(alpha: number, beta: number): number {
  const x = gammaSample(alpha);
  const y = gammaSample(beta);
  return x / (x + y);
}

export function expectedConversionRate(ad: Ad): number {
  return ad.alpha / (ad.alpha + ad.beta);
}

export function thompsonScore(ad: Ad): number {
  return sampleBeta(Math.max(ad.alpha, 1e-3), Math.max(ad.beta, 1e-3));
}

export interface AllocationInput {
  ads: Ad[];
  remainingBudgetEur: number;
  targetCpaEur: number;
}

export interface AllocationOutput {
  adId: string;
  share: number;
  euros: number;
  expectedCpa: number;
}

export function allocateBudget(input: AllocationInput): AllocationOutput[] {
  const live = input.ads.filter((a) => a.status === "active" || a.status === "scaling");
  if (live.length === 0 || input.remainingBudgetEur <= 0) return [];

  const scored = live.map((a) => {
    const cvr = thompsonScore(a);
    const cpc = a.clicks > 0 ? a.spendEur / a.clicks : a.bidEur;
    const expCpa = cvr > 0 ? cpc / cvr : input.targetCpaEur * 4;
    const fitness = expCpa > 0 ? 1 / expCpa : 0;
    const boost = a.status === "scaling" ? 1.4 : 1;
    return { ad: a, fitness: fitness * boost, expCpa };
  });

  const total = scored.reduce((s, x) => s + x.fitness, 0) || 1;
  return scored.map((x) => ({
    adId: x.ad.id,
    share: x.fitness / total,
    euros: (x.fitness / total) * input.remainingBudgetEur,
    expectedCpa: x.expCpa,
  }));
}
