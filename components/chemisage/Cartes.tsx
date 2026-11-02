import Link from "next/link";
import { ArrowRight, Check, CircleSlash, MapPin, TriangleAlert } from "lucide-react";
import type { ChantierType, Defaut, Technique, Verdict } from "@/lib/chemisage/types";

const ACCENTS = ["bg-lime", "bg-cyan", "bg-jaune", "bg-sun-500", "bg-sea-600"];

export function CarteTechnique({ t, i = 0 }: { t: Technique; i?: number }) {
  return (
    <Link href={`/chemisage/techniques/${t.slug}`} className="group flex h-full flex-col rounded-3xl border-4 border-ink bg-white p-6 shadow-flash transition-transform hover:-translate-y-1">
      <span aria-hidden className={`h-3 w-16 rounded-full ${ACCENTS[i % ACCENTS.length]}`} />
      <h3 className="mt-4 font-display text-lg font-extrabold uppercase leading-tight text-ink">{t.court}</h3>
      <p className="mt-2 flex-1 text-ink-soft">{t.accroche}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-bold text-sea-600">Découvrir <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}

const VERDICTS: Record<Verdict, { libelle: string; classe: string; Icone: typeof Check }> = {
  oui: { libelle: "Chemisage adapté", classe: "bg-lime text-ink", Icone: Check },
  souvent: { libelle: "Souvent possible", classe: "bg-jaune text-ink", Icone: TriangleAlert },
  non: { libelle: "Chemisage non adapté", classe: "bg-sun-500 text-white", Icone: CircleSlash },
};

export function PastilleVerdict({ verdict }: { verdict: Verdict }) {
  const v = VERDICTS[verdict];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold uppercase ${v.classe}`}><v.Icone aria-hidden className="h-3.5 w-3.5" />{v.libelle}</span>;
}

export function CarteDefaut({ d }: { d: Defaut }) {
  return (
    <Link href={`/chemisage/defauts/${d.slug}`} className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-2 ring-ink/10 hover:ring-4 hover:ring-sea-600">
      <PastilleVerdict verdict={d.verdict} />
      <h3 className="mt-4 font-display text-lg font-extrabold uppercase leading-tight text-ink">{d.nom}</h3>
      <p className="mt-2 flex-1 text-ink-soft">{d.accroche}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-bold text-sea-600">Voir <ArrowRight aria-hidden className="h-4 w-4" /></span>
    </Link>
  );
}

export function CarteChantier({ c, nomVille }: { c: ChantierType; nomVille: string }) {
  return (
    <Link href={`/chemisage/chantiers/${c.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border-4 border-ink bg-white shadow-flash transition-transform hover:-translate-y-1">
      <div className="bg-sea-600 p-5 text-white">
        <p className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-lime"><MapPin aria-hidden className="h-3.5 w-3.5" /> {nomVille} · cas type</p>
        <h3 className="mt-2 font-display text-lg font-extrabold uppercase leading-tight">{c.titre}</h3>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-ink-soft"><strong className="text-ink">Problème :</strong> {c.probleme}</p>
        <p className="mt-3 rounded-xl bg-lime-soft p-3 text-sm text-ink"><strong>Évité :</strong> {c.evite}</p>
        <p className="mt-auto pt-4 text-sm font-bold text-sea-600">{c.duree} · {c.dimensions}</p>
      </div>
    </Link>
  );
}
