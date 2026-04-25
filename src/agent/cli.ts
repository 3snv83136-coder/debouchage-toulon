import "dotenv/config";
import { bootstrapDefaultCampaigns, snapshot, tick } from "./agent.ts";

async function main(): Promise<void> {
  await bootstrapDefaultCampaigns();
  const ticks = Number(process.env.AGENT_RUN_TICKS ?? 1);
  for (let i = 0; i < ticks; i++) {
    await tick();
  }
  const snap = snapshot();
  console.log(
    JSON.stringify(
      {
        totalSpend: snap.totalSpend,
        totalRevenue: snap.totalRevenue,
        totalConversions: snap.totalConversions,
        roi: snap.roi,
        cpa: snap.cpa,
        campaigns: snap.campaigns.length,
        ads: snap.ads.length,
        lastDecisions: snap.decisions.slice(0, 8),
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error("[agent:once] fatal:", err);
  process.exit(1);
});
