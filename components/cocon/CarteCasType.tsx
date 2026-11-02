import Link from "next/link";
import { CheckCircle2, Clock, Search, Wrench } from "lucide-react";
import { getMateriel } from "@/lib/cocon/materiel";
import type { CasType } from "@/lib/cocon/types";

export function CarteCasType({ cas }: { cas: CasType }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card">
      <header className="bg-ink p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-sun-400">Cas type · scénario représentatif</p>
        <h3 className="mt-2 font-display text-2xl font-bold">{cas.titre}</h3>
        <p className="mt-2 text-sm text-white/70">{cas.lieu}</p>
      </header>
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <h4 className="font-bold text-ink">Contexte</h4>
            <p className="mt-1 text-ink-soft">{cas.contexte}</p>
          </div>
          <div>
            <h4 className="font-bold text-ink">Symptômes</h4>
            <ul className="mt-2 space-y-1 text-ink-soft">
              {cas.symptomes.map((s) => <li key={s} className="flex gap-2"><span aria-hidden className="text-sun-600">•</span>{s}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="flex items-center gap-2 font-bold text-ink"><Search aria-hidden className="h-4 w-4 text-sea-600" /> Diagnostic</h4>
            <p className="mt-1 text-ink-soft">{cas.diagnostic}</p>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h4 className="flex items-center gap-2 font-bold text-ink"><Wrench aria-hidden className="h-4 w-4 text-sea-600" /> Intervention</h4>
            <ol className="mt-2 space-y-2 text-ink-soft">
              {cas.intervention.map((e, i) => (
                <li key={e} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sea-50 text-xs font-bold text-sea-700">{i + 1}</span>{e}</li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="font-bold text-ink">Matériel utilisé</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {cas.materiel.map((id) => {
                const m = getMateriel(id);
                return m ? <li key={id}><Link href={`/materiel/${id}`} className="inline-block rounded-full bg-sea-50 px-3 py-1 text-sm font-semibold text-sea-700 hover:bg-sea-100">{m.court}</Link></li> : null;
              })}
            </ul>
          </div>
          <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-sand p-4 text-sm">
            <div><dt className="flex items-center gap-1 text-ink-muted"><Clock aria-hidden className="h-3.5 w-3.5" /> Durée</dt><dd className="font-semibold text-ink">{cas.duree}</dd></div>
            <div><dt className="flex items-center gap-1 text-ink-muted"><CheckCircle2 aria-hidden className="h-3.5 w-3.5" /> Résultat</dt><dd className="font-semibold text-ink">{cas.resultat}</dd></div>
          </dl>
          <p className="rounded-2xl border border-sea-100 bg-sea-50 p-4 text-sm text-sea-700"><strong>Pour éviter que ça revienne :</strong> {cas.prevention}</p>
        </div>
      </div>
    </article>
  );
}
