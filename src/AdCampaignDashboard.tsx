import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Activity,
  AlertTriangle,
  Banknote,
  CircleDot,
  Pause,
  Play,
  Rocket,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  channel: string;
  geo: string;
  dailyBudgetEur: number;
  spentTodayEur: number;
  targetCpaEur: number;
  status: string;
}

interface Ad {
  id: string;
  campaignId: string;
  headline: string;
  description: string;
  cta: string;
  keywords: string[];
  bidEur: number;
  status: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spendEur: number;
  revenueEur: number;
  alpha: number;
  beta: number;
}

interface MinuteEvent {
  ts: number;
  campaignId: string;
  adId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spendEur: number;
  revenueEur: number;
}

interface AgentDecision {
  ts: number;
  level: string;
  message: string;
}

interface Snapshot {
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

const API_BASE = "/api/agent";

function fmtEur(n: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function fmtPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function levelColor(level: string): string {
  switch (level) {
    case "kill":
      return "text-red-500";
    case "scale":
      return "text-emerald-500";
    case "create":
      return "text-sky-500";
    case "warn":
      return "text-amber-500";
    default:
      return "text-slate-500";
  }
}

const KPI = ({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string; accent?: string }) => (
  <div className="stat-card flex flex-col gap-2">
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400">
      <Icon size={12} />
      {label}
    </div>
    <div className={`text-3xl font-display font-bold ${accent ?? "text-primary"}`}>{value}</div>
  </div>
);

const StatusPill = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    scaling: "bg-sky-100 text-sky-700",
    paused: "bg-slate-100 text-slate-600",
    killed: "bg-red-100 text-red-700",
    exhausted: "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${colors[status] ?? "bg-slate-100"}`}>
      {status}
    </span>
  );
};

export default function AdCampaignDashboard() {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function refresh(): Promise<void> {
    try {
      const r = await fetch(`${API_BASE}/snapshot`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = (await r.json()) as Snapshot;
      setSnap(data);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 5000);
    return () => clearInterval(t);
  }, []);

  async function runTick(): Promise<void> {
    setBusy(true);
    try {
      await fetch(`${API_BASE}/tick`, { method: "POST" });
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function toggleCampaign(id: string): Promise<void> {
    await fetch(`${API_BASE}/campaigns/${id}/toggle`, { method: "POST" });
    await refresh();
  }

  const adByCampaign = useMemo(() => {
    const map = new Map<string, Ad[]>();
    snap?.ads.forEach((a) => {
      const arr = map.get(a.campaignId) ?? [];
      arr.push(a);
      map.set(a.campaignId, arr);
    });
    return map;
  }, [snap]);

  if (error && !snap) {
    return (
      <div className="pt-40 pb-24 px-6 max-w-5xl mx-auto">
        <div className="stat-card border border-red-200 bg-red-50">
          <div className="flex items-center gap-3 text-red-700">
            <AlertTriangle size={20} />
            <div>
              <h2 className="font-display text-lg">Agent indisponible</h2>
              <p className="text-sm text-red-600 mt-1">{error}</p>
              <p className="text-xs text-red-500 mt-2">
                Démarre le serveur agent: <code className="bg-white px-2 py-0.5 rounded">npm run agent</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!snap) {
    return (
      <div className="pt-40 pb-24 px-6 max-w-5xl mx-auto">
        <div className="stat-card animate-pulse h-40" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-accent flex items-center gap-2">
            <Sparkles size={12} /> Agent Ads autonome
          </p>
          <h1 className="text-4xl md:text-5xl font-display tracking-tighter mt-2">
            Pilotage <span className="text-accent">minute par minute</span>
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Création, optimisation et arbitrage continu des campagnes search & social. CPA cible verrouillé,
            kill-switch automatique sur les annonces non rentables, montée en puissance des winners.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={runTick} disabled={busy} className="btn-primary disabled:opacity-50">
            <Zap size={14} /> Tick maintenant
          </button>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPI icon={Banknote} label="Dépense totale" value={fmtEur(snap.totalSpend)} />
        <KPI icon={TrendingUp} label="Revenu" value={fmtEur(snap.totalRevenue)} accent="text-emerald-600" />
        <KPI icon={Target} label="CPA moyen" value={snap.cpa > 0 ? fmtEur(snap.cpa) : "-"} />
        <KPI icon={Rocket} label="Conversions" value={String(snap.totalConversions)} accent="text-sky-600" />
        <KPI
          icon={Activity}
          label="ROI"
          value={fmtPct(snap.roi)}
          accent={snap.roi >= 0 ? "text-emerald-600" : "text-red-600"}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-display tracking-tight flex items-center gap-2">
            <CircleDot size={16} className="text-accent" /> Campagnes
          </h2>
          {snap.campaigns.map((c) => {
            const ads = adByCampaign.get(c.id) ?? [];
            const spend = ads.reduce((s, a) => s + a.spendEur, 0);
            const rev = ads.reduce((s, a) => s + a.revenueEur, 0);
            const conv = ads.reduce((s, a) => s + a.conversions, 0);
            const cpa = conv > 0 ? spend / conv : 0;
            const budgetUsed = c.dailyBudgetEur > 0 ? (c.spentTodayEur / c.dailyBudgetEur) * 100 : 0;
            return (
              <motion.div
                key={c.id}
                layout
                className="stat-card space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg">{c.name}</h3>
                      <StatusPill status={c.status} />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {c.channel} · {c.geo} · CPA cible {fmtEur(c.targetCpaEur)}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCampaign(c.id)}
                    className="btn-outline px-3 py-2 text-xs"
                    title={c.status === "paused" ? "Reprendre" : "Mettre en pause"}
                  >
                    {c.status === "paused" ? <Play size={12} /> : <Pause size={12} />}
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3 text-xs">
                  <div>
                    <div className="text-slate-400 uppercase tracking-widest text-[9px]">Budget jour</div>
                    <div className="font-bold mt-0.5">
                      {fmtEur(c.spentTodayEur)} / {fmtEur(c.dailyBudgetEur)}
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: `${Math.min(100, budgetUsed)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-widest text-[9px]">Spend cumulé</div>
                    <div className="font-bold mt-0.5">{fmtEur(spend)}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-widest text-[9px]">Revenu</div>
                    <div className="font-bold mt-0.5 text-emerald-600">{fmtEur(rev)}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-widest text-[9px]">CPA réel</div>
                    <div className={`font-bold mt-0.5 ${cpa > c.targetCpaEur ? "text-amber-600" : "text-emerald-600"}`}>
                      {cpa > 0 ? fmtEur(cpa) : "-"}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  {ads.length === 0 && (
                    <p className="text-xs text-slate-400 italic">Aucune annonce active.</p>
                  )}
                  {ads.map((a) => {
                    const adCpa = a.conversions > 0 ? a.spendEur / a.conversions : 0;
                    const roas = a.spendEur > 0 ? a.revenueEur / a.spendEur : 0;
                    return (
                      <div key={a.id} className="flex items-start gap-3 text-xs">
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2">
                            <StatusPill status={a.status} />
                            <span className="font-bold truncate">{a.headline}</span>
                          </div>
                          <p className="text-slate-500 truncate mt-0.5">{a.description}</p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {a.keywords.slice(0, 4).join(" · ")}
                          </p>
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <div className="text-slate-400 text-[9px] uppercase">ROAS</div>
                          <div className={`font-bold ${roas >= 3 ? "text-emerald-600" : roas >= 1 ? "text-slate-700" : "text-red-500"}`}>
                            {roas.toFixed(2)}x
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            CPA {adCpa > 0 ? fmtEur(adCpa) : "-"} · {a.conversions} conv
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <aside className="space-y-4">
          <h2 className="text-xl font-display tracking-tight flex items-center gap-2">
            <Timer size={16} className="text-accent" /> Journal de l'agent
          </h2>
          <div className="stat-card max-h-[640px] overflow-y-auto custom-scrollbar space-y-2">
            {snap.decisions.length === 0 && (
              <p className="text-xs text-slate-400 italic">Pas encore de décisions enregistrées.</p>
            )}
            {snap.decisions.map((d, i) => (
              <div key={i} className="flex gap-2 text-xs border-b border-slate-50 pb-2 last:border-b-0">
                <span className={`font-mono text-[10px] uppercase ${levelColor(d.level)} w-12 shrink-0`}>
                  {d.level}
                </span>
                <div className="flex-grow">
                  <p className="text-slate-700 leading-snug">{d.message}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {new Date(d.ts).toLocaleTimeString("fr-FR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
