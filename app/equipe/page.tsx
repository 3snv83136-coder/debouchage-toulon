import Link from "next/link";
import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { EnTetePage } from "@/components/sections/EnTetePage";
import { Conteneur } from "@/components/ui/Conteneur";
import { COCONS } from "@/lib/cocon";
import { EQUIPE } from "@/lib/cocon/equipe";
import { getMateriel } from "@/lib/cocon/materiel";
import { PARAMETRE } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "Nos techniciens : Laurent et Ange",
  description: `Laurent et Ange, techniciens débouchage et hydrocurage, interviennent à Toulon, La Seyne, La Garde, La Valette, Six-Fours et Hyères, ${PARAMETRE.HORAIRES}.`,
  chemin: "/equipe",
});

export default function PageEquipe() {
  return (
    <>
      <EnTetePage ariane={[{ nom: "Équipe", chemin: "/equipe" }]} titre="Laurent et Ange, vos techniciens" texte="Quand vous appelez, c'est l'un d'eux qui vient. Voici qui ils sont et comment ils travaillent." />
      <section className="py-16">
        <Conteneur className="grid gap-8 lg:grid-cols-2">
          {EQUIPE.map((t) => (
            <article key={t.slug} id={t.slug} className="scroll-mt-32 rounded-3xl border border-ink/10 bg-white p-8 shadow-card">
              <div className="flex items-center gap-4">
                <span aria-hidden className="grid h-16 w-16 place-items-center rounded-2xl bg-sea-600 font-display text-2xl font-bold text-white">{t.prenom[0]}</span>
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">{t.prenom}</h2>
                  <p className="text-ink-soft">{t.role}</p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-ink-soft">{t.presentation.map((p) => <p key={p}>{p}</p>)}</div>
              {t.depuis && <p className="mt-4 text-sm text-ink"><strong>Dans le métier depuis :</strong> {t.depuis}</p>}
              {t.formations && t.formations.length > 0 && <p className="mt-2 text-sm text-ink"><strong>Formations :</strong> {t.formations.join(", ")}</p>}
              {t.specialites && t.specialites.length > 0 && <p className="mt-2 text-sm text-ink"><strong>Spécialités :</strong> {t.specialites.join(", ")}</p>}
              <p className="mt-6 text-sm font-bold text-ink">Matériel qu&apos;il utilise</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {t.materiel.map((id) => { const m = getMateriel(id); return m ? <li key={id}><Link href={`/materiel/${id}`} className="inline-block rounded-full bg-sea-50 px-3 py-1 text-sm font-semibold text-sea-700 hover:bg-sea-100">{m.court}</Link></li> : null; })}
              </ul>
              <p className="mt-6 text-sm font-bold text-ink">Où il intervient</p>
              <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                <li><Link href="/villes/toulon" className="text-sea-700 hover:underline">Toulon</Link></li>
                {COCONS.map((v) => <li key={v.slug}>· <Link href={`/villes/${v.slug}`} className="text-sea-700 hover:underline">{v.nom}</Link></li>)}
              </ul>
            </article>
          ))}
        </Conteneur>
        <Conteneur className="mt-10">
          <p className="rounded-2xl bg-sand p-6 text-ink-soft">Laurent et Ange appliquent tous les deux notre <Link href="/charte" className="font-semibold text-sea-700 underline">charte d&apos;intervention</Link> : prix annoncé avant, technique la plus douce d&apos;abord, aucun produit chimique, logement laissé propre.</p>
        </Conteneur>
      </section>
      <BandeauAppel />
    </>
  );
}
