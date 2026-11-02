import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AsideChemisage } from "@/components/chemisage/AsideChemisage";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { CarteChantier } from "@/components/chemisage/Cartes";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { Etapes, ListeMoins, ListePlus } from "@/components/chemisage/Listes";
import { TitreFlash } from "@/components/chemisage/Titre";
import { Paragraphes } from "@/components/cocon/Texte";
import { Photo } from "@/components/photos/Photo";
import { PHOTOS_TECHNIQUE } from "@/lib/photos";
import { Schema } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListeFaq } from "@/components/ui/ListeFaq";
import { CHANTIERS } from "@/lib/chemisage/chantiers";
import { DEFAUTS } from "@/lib/chemisage/defauts";
import { TECHNIQUES, getTechnique } from "@/lib/chemisage/techniques";
import { VILLES_CHEMISAGE } from "@/lib/chemisage/villes";
import { jsonLdFaq, jsonLdService, pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };
export const dynamicParams = false;
export function generateStaticParams() { return TECHNIQUES.map((t) => ({ slug: t.slug })); }
export function generateMetadata({ params }: Params): Metadata {
  const t = getTechnique(params.slug);
  return t ? pageMetadata({ titre: t.nom, description: t.accroche, chemin: `/chemisage/techniques/${t.slug}` }) : {};
}

export default function PageTechnique({ params }: Params) {
  const t = getTechnique(params.slug);
  if (!t) notFound();
  const chantiers = CHANTIERS.filter((c) => c.technique === t.slug);
  const defauts = DEFAUTS.filter((d) => d.techniques.includes(t.slug));
  const nomVille = (s: string) => VILLES_CHEMISAGE.find((v) => v.slug === s)?.nom ?? s;
  return (
    <>
      <JsonLd data={jsonLdService({ nom: t.nom, description: t.accroche, chemin: `/chemisage/techniques/${t.slug}` })} />
      {t.faqs.length > 0 && <JsonLd data={jsonLdFaq(t.faqs)} />}
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Techniques", chemin: "/chemisage/techniques" }, { nom: t.court, chemin: `/chemisage/techniques/${t.slug}` }]} surtitre="Technique" titre={t.nom} texte={t.accroche} visuel={<Schema id={t.schema} />} />
      <Conteneur className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-16">
          <section><TitreFlash surtitre="Principe" titre="Comment ça marche" /><div className="mt-6"><Paragraphes items={t.principe} /></div></section>
          {PHOTOS_TECHNIQUE[t.slug] && <Photo id={PHOTOS_TECHNIQUE[t.slug]!} tailles="(min-width: 1024px) 60vw, 100vw" />}
          <section><TitreFlash couleur="cyan" surtitre="Étape par étape" titre="Le déroulé" /><div className="mt-6"><Etapes items={t.etapes} /></div></section>
          <section className="grid gap-8 md:grid-cols-2">
            <div><TitreFlash couleur="lime" titre="Les plus" /><div className="mt-5"><ListePlus items={t.avantages} /></div></div>
            <div><TitreFlash couleur="rose" titre="Les limites" /><div className="mt-5"><ListeMoins items={t.limites} /></div></div>
          </section>
          <section>
            <TitreFlash couleur="jaune" titre="Pour qui ?" />
            <ul className="mt-5 flex flex-wrap gap-3">{t.pourQui.map((p) => <li key={p} className="rounded-full border-2 border-ink bg-jaune px-4 py-2 font-bold text-ink">{p}</li>)}</ul>
          </section>
          {defauts.length > 0 && (
            <section><TitreFlash titre="Défauts traités" /><ul className="mt-5 flex flex-wrap gap-3">{defauts.map((d) => <li key={d.slug}><Link href={`/chemisage/defauts/${d.slug}`} className="inline-block rounded-full bg-sea-600 px-4 py-2 font-bold text-white hover:bg-sea-700">{d.nom}</Link></li>)}</ul></section>
          )}
          {chantiers.length > 0 && (
            <section><TitreFlash couleur="cyan" surtitre="Cas types" titre="Exemples de chantiers" /><ul className="mt-6 grid gap-5 md:grid-cols-2">{chantiers.map((c) => <li key={c.slug}><CarteChantier c={c} nomVille={nomVille(c.ville)} /></li>)}</ul></section>
          )}
          <section><TitreFlash surtitre="FAQ" titre="Questions fréquentes" /><div className="mt-6"><ListeFaq faqs={t.faqs} /></div></section>
          <section><TitreFlash couleur="rose" titre="Disponible près de chez vous" /><ul className="mt-5 flex flex-wrap gap-3">{VILLES_CHEMISAGE.map((v) => <li key={v.slug}><Link href={`/chemisage-canalisation/${v.slug}`} className="inline-block rounded-full border-2 border-ink px-4 py-2 font-bold text-ink hover:bg-lime">Chemisage {v.nom}</Link></li>)}</ul></section>
        </article>
        <AsideChemisage />
      </Conteneur>
      <BandeauFlash />
    </>
  );
}
