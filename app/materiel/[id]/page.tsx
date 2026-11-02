import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ban, Check, ShieldAlert } from "lucide-react";
import { Bloc, Paragraphes } from "@/components/cocon/Texte";
import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { EnTetePage } from "@/components/sections/EnTetePage";
import { Conteneur } from "@/components/ui/Conteneur";
import { COCONS } from "@/lib/cocon";
import { EQUIPE } from "@/lib/cocon/equipe";
import { MATERIEL, getMateriel } from "@/lib/cocon/materiel";
import { pageMetadata } from "@/lib/seo";

type Params = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return MATERIEL.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const m = getMateriel(params.id);
  if (!m) return {};
  return pageMetadata({ titre: `${m.nom} : fonctionnement et usages`, description: m.role, chemin: `/materiel/${m.id}` });
}

export default function PageUnMateriel({ params }: Params) {
  const m = getMateriel(params.id);
  if (!m) notFound();

  // Cas types (toutes villes) qui utilisent cet appareil
  const usages = COCONS.flatMap((v) => [
    ...v.quartiers.filter((q) => q.casType.materiel.includes(m.id)).map((q) => ({ titre: q.casType.titre, href: `/villes/${v.slug}/quartiers/${q.slug}`, ville: v.nom })),
    ...v.services.filter((s) => s.casType.materiel.includes(m.id)).map((s) => ({ titre: s.casType.titre, href: `/villes/${v.slug}/${s.service}`, ville: v.nom })),
  ]);
  const techniciens = EQUIPE.filter((t) => t.materiel.includes(m.id));

  return (
    <>
      <EnTetePage appel={false} ariane={[{ nom: "Matériel", chemin: "/materiel" }, { nom: m.court, chemin: `/materiel/${m.id}` }]} titre={m.nom} texte={m.role} />
      <Conteneur className="grid gap-12 py-14 lg:grid-cols-[1fr_340px]">
        <article className="min-w-0 space-y-14">
          <Bloc titre="Comment ça marche"><Paragraphes items={m.principe} /></Bloc>
          <Bloc titre="Quand on l'utilise">
            <ul className="grid gap-3 sm:grid-cols-2">
              {m.quandOnLUtilise.map((x) => <li key={x} className="flex gap-2 rounded-2xl bg-sea-50 p-4 text-ink"><Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sea-600" />{x}</li>)}
            </ul>
          </Bloc>
          <Bloc titre="Ses limites">
            <ul className="space-y-3">
              {m.limites.map((x) => <li key={x} className="flex gap-2 rounded-2xl bg-sun-50 p-4 text-ink"><Ban aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sun-600" />{x}</li>)}
            </ul>
          </Bloc>
          <Bloc titre="Nos précautions">
            <ul className="space-y-3">
              {m.precautions.map((x) => <li key={x} className="flex gap-2 rounded-2xl border border-ink/10 p-4 text-ink"><ShieldAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sea-600" />{x}</li>)}
            </ul>
          </Bloc>
          {usages.length > 0 && (
            <Bloc titre="Exemples d'utilisation près de chez vous">
              <ul className="grid gap-3 sm:grid-cols-2">
                {usages.map((u) => (
                  <li key={u.href + u.titre}><Link href={u.href} className="block rounded-2xl border border-ink/10 p-4 hover:border-sea-500"><span className="text-xs font-semibold uppercase text-ink-muted">Cas type · {u.ville}</span><span className="mt-1 block font-semibold text-ink">{u.titre}</span></Link></li>
                ))}
              </ul>
            </Bloc>
          )}
        </article>
        <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl bg-ink p-6 text-white">
            <p className="font-bold">Caractéristiques</p>
            <p className="mt-1 text-xs text-white/60">Plages typiques pour ce type d&apos;appareil</p>
            <dl className="mt-4 space-y-3 text-sm">
              {m.caracteristiques.map((c) => <div key={c.label}><dt className="text-white/60">{c.label}</dt><dd className="font-semibold">{c.valeur}</dd></div>)}
            </dl>
          </div>
          <div className="rounded-3xl border border-ink/10 p-6">
            <p className="font-bold text-ink">Qui l&apos;utilise</p>
            <ul className="mt-3 space-y-2 text-sm">
              {techniciens.map((t) => <li key={t.slug}><Link href={`/equipe#${t.slug}`} className="text-sea-700 hover:underline">{t.prenom}</Link> <span className="text-ink-muted">· {t.role}</span></li>)}
            </ul>
          </div>
          <div className="rounded-3xl border border-ink/10 p-6">
            <p className="font-bold text-ink">Autres appareils</p>
            <ul className="mt-3 space-y-2 text-sm">
              {MATERIEL.filter((x) => x.id !== m.id).map((x) => <li key={x.id}><Link href={`/materiel/${x.id}`} className="text-sea-700 hover:underline">{x.nom}</Link></li>)}
            </ul>
          </div>
        </aside>
      </Conteneur>
      <BandeauAppel />
    </>
  );
}
