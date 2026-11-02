import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera, Clock, Ruler, ShieldCheck } from "lucide-react";
import { AsideChemisage } from "@/components/chemisage/AsideChemisage";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { CarteChantier } from "@/components/chemisage/Cartes";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { Etapes } from "@/components/chemisage/Listes";
import { TitreFlash } from "@/components/chemisage/Titre";
import { Photo } from "@/components/photos/Photo";
import { PHOTOS_TECHNIQUE } from "@/lib/photos";
import { Schema } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { getMateriel } from "@/lib/cocon/materiel";
import { CHANTIERS, getChantier } from "@/lib/chemisage/chantiers";
import { getTechnique } from "@/lib/chemisage/techniques";
import { getVilleChemisage } from "@/lib/chemisage/villes";
import { pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };
export const dynamicParams = false;
export function generateStaticParams() { return CHANTIERS.map((c) => ({ slug: c.slug })); }
export function generateMetadata({ params }: Params): Metadata {
  const c = getChantier(params.slug);
  const v = c && getVilleChemisage(c.ville);
  return c && v ? pageMetadata({ titre: `${c.titre} (${v.nom}) : cas type de chemisage`, description: `${c.probleme} Solution : ${getTechnique(c.technique)?.court ?? "chemisage"}. Évité : ${c.evite}`, chemin: `/chemisage/chantiers/${c.slug}` }) : {};
}

export default function PageChantier({ params }: Params) {
  const c = getChantier(params.slug);
  const v = c && getVilleChemisage(c.ville);
  if (!c || !v) notFound();
  const t = getTechnique(c.technique);
  const q = v.quartiers.find((x) => x.slug === c.quartier);
  const autres = CHANTIERS.filter((x) => x.ville === c.ville && x.slug !== c.slug);
  return (
    <>
      <HeroFlash
        ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Chantiers", chemin: "/chemisage/chantiers" }, { nom: c.titre, chemin: `/chemisage/chantiers/${c.slug}` }]}
        surtitre={`Cas type · ${v.nom}${q ? ` · ${q.nom}` : ""}`}
        titre={c.titre}
        texte={c.batiment}
        visuel={t ? <Schema id={t.schema} /> : undefined}
        badges={[t?.court ?? "Chemisage", c.duree, "Sans casse"]}
      />
      <Conteneur className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-12">
          <p className="rounded-2xl bg-jaune-soft p-4 text-sm font-semibold text-ink">Cas type : scénario représentatif des chantiers que l&apos;on rencontre à {v.nom}, présenté à titre d&apos;exemple.</p>
          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border-4 border-ink bg-sun-50 p-6 shadow-flash"><p className="font-display font-extrabold uppercase text-sun-600">Le problème</p><p className="mt-2 text-lg font-semibold text-ink">{c.probleme}</p></div>
            <div className="rounded-3xl border-4 border-ink bg-ink p-6 text-white shadow-flash"><p className="flex items-center gap-2 font-display font-extrabold uppercase text-cyan"><Camera aria-hidden className="h-5 w-5" /> La caméra</p><p className="mt-2 text-lg">{c.camera}</p></div>
          </section>
          <section><TitreFlash couleur="lime" surtitre={t?.court} titre="Le chantier, étape par étape" /><div className="mt-6"><Etapes items={c.deroulement.map((d) => ({ titre: d, texte: "" }))} /></div></section>
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-cyan p-5"><Ruler aria-hidden className="h-6 w-6 text-ink" /><p className="mt-2 text-sm font-bold uppercase text-ink">Dimensions</p><p className="font-semibold text-ink">{c.dimensions}</p></div>
            <div className="rounded-3xl bg-jaune p-5"><Clock aria-hidden className="h-6 w-6 text-ink" /><p className="mt-2 text-sm font-bold uppercase text-ink">Durée</p><p className="font-semibold text-ink">{c.duree}</p></div>
            <div className="rounded-3xl bg-lime p-5"><ShieldCheck aria-hidden className="h-6 w-6 text-ink" /><p className="mt-2 text-sm font-bold uppercase text-ink">Résultat</p><p className="font-semibold text-ink">{c.resultat}</p></div>
          </section>
          <section className="rounded-[2rem] border-4 border-ink bg-sea-600 p-8 text-white shadow-flash">
            <p className="font-display text-sm font-extrabold uppercase text-lime">Ce qu&apos;on n&apos;a pas eu à casser</p>
            <p className="mt-3 font-display text-2xl font-extrabold uppercase leading-tight">{c.evite}</p>
          </section>
          {PHOTOS_TECHNIQUE[c.technique] && <Photo id={PHOTOS_TECHNIQUE[c.technique]!} tailles="(min-width: 1024px) 60vw, 100vw" />}
          <section><TitreFlash couleur="cyan" titre="Matériel utilisé" /><ul className="mt-5 flex flex-wrap gap-3">{c.materiel.map((id) => { const m = getMateriel(id); return m ? <li key={id}><Link href={`/materiel/${id}`} className="inline-block rounded-full border-2 border-ink bg-white px-4 py-2 font-bold text-ink hover:bg-lime">{m.court}</Link></li> : null; })}</ul></section>
          {t && <p className="text-ink-soft">En savoir plus : <Link href={`/chemisage/techniques/${t.slug}`} className="font-bold text-sea-600 underline">{t.nom}</Link> · <Link href={`/chemisage-canalisation/${v.slug}`} className="font-bold text-sea-600 underline">chemisage à {v.nom}</Link>{q && <> · <Link href={`/chemisage-canalisation/${v.slug}/${q.slug}`} className="font-bold text-sea-600 underline">{q.nom}</Link></>}</p>}
          {autres.length > 0 && <section><TitreFlash titre={`Autres cas à ${v.nom}`} /><ul className="mt-6 grid gap-5 md:grid-cols-2">{autres.map((x) => <li key={x.slug}><CarteChantier c={x} nomVille={v.nom} /></li>)}</ul></section>}
        </article>
        <AsideChemisage villeActive={v.slug} />
      </Conteneur>
      <BandeauFlash />
    </>
  );
}
