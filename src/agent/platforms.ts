import type { Ad, Campaign, MinuteEvent } from "./types.ts";
import { simulateMinute } from "./simulator.ts";

export interface PlatformAdapter {
  name: string;
  pushAd(campaign: Campaign, ad: Ad): Promise<void>;
  pauseAd(ad: Ad): Promise<void>;
  pullMetrics(campaign: Campaign, ad: Ad, allocatedEur: number, now: number): Promise<MinuteEvent>;
}

export const SimulatorAdapter: PlatformAdapter = {
  name: "simulator",
  async pushAd() {
    /* noop in sim */
  },
  async pauseAd() {
    /* noop in sim */
  },
  async pullMetrics(_campaign, ad, allocatedEur, now) {
    return simulateMinute(ad, allocatedEur, now);
  },
};

export function selectAdapter(name: string | undefined): PlatformAdapter {
  switch ((name || "simulator").toLowerCase()) {
    case "simulator":
    default:
      return SimulatorAdapter;
  }
}
