import "dotenv/config";
import express from "express";
import {
  bootstrapDefaultCampaigns,
  pauseCampaign,
  snapshot,
  startLoop,
  stopLoop,
  tick,
} from "./agent.ts";

const PORT = Number(process.env.AGENT_PORT ?? 4001);
const TICK_MS = Number(process.env.AGENT_TICK_MS ?? 60_000);

async function main(): Promise<void> {
  await bootstrapDefaultCampaigns();
  startLoop(TICK_MS);

  const app = express();
  app.use(express.json());

  app.get("/api/agent/health", (_req, res) => {
    res.json({ ok: true, now: Date.now(), tickMs: TICK_MS });
  });

  app.get("/api/agent/snapshot", (_req, res) => {
    res.json(snapshot());
  });

  app.post("/api/agent/tick", async (_req, res) => {
    await tick();
    res.json({ ok: true, snapshot: snapshot() });
  });

  app.post("/api/agent/campaigns/:id/toggle", (req, res) => {
    pauseCampaign(req.params.id);
    res.json({ ok: true });
  });

  app.post("/api/agent/loop/stop", (_req, res) => {
    stopLoop();
    res.json({ ok: true });
  });

  app.post("/api/agent/loop/start", (_req, res) => {
    startLoop(TICK_MS);
    res.json({ ok: true });
  });

  app.listen(PORT, () => {
    console.log(`[agent] API on http://localhost:${PORT} (tick=${TICK_MS}ms)`);
  });
}

main().catch((err) => {
  console.error("[agent] fatal:", err);
  process.exit(1);
});
