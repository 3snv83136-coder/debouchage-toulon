import { NOMS_SAISONS, saisonDe } from "@/lib/donnees";
import type { Saison, VilleCocon } from "@/lib/cocon/types";

const ORDRE: Saison[] = ["hiver", "printemps", "ete", "automne"];

export function Saisons({ ville }: { ville: VilleCocon }) {
  const actuelle = saisonDe(new Date());
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ORDRE.map((s) => {
        const d = ville.saisons[s];
        const active = s === actuelle;
        return (
          <article key={s} className={`rounded-2xl p-5 ${active ? "bg-sun-500 text-white shadow-card" : "border border-ink/10 bg-white"}`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${active ? "text-white/80" : "text-ink-muted"}`}>
              {NOMS_SAISONS[s]}{active && " · en ce moment"}
            </p>
            <h3 className={`mt-1 text-lg font-bold ${active ? "" : "text-ink"}`}>{d.titre}</h3>
            <p className={`mt-2 text-sm ${active ? "text-white/90" : "text-ink-soft"}`}>{d.texte}</p>
            <p className={`mt-3 text-sm font-semibold ${active ? "" : "text-sea-700"}`}>Conseil : {d.conseil}</p>
          </article>
        );
      })}
    </div>
  );
}
