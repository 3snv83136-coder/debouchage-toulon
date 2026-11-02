import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AsideChemisage } from "@/components/chemisage/AsideChemisage";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { CarteChantier, CarteDefaut } from "@/components/chemisage/Cartes";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { TitreFlash } from "@/components/chemisage/Titre";
import { Paragraphes } from "@/components/cocon/Texte";
import { Schema } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { JsonLd } from "@/components/ui/JsonLd";
import { getCocon, getQuartier } from "@/lib/cocon";
import { CHANTIERS } from "@/lib/chemisage/chantiers";
import { getDefaut } from "@/lib/chemisage/defauts";
import { getTechnique } from "@/lib/chemisage/techniques";
import { VILLES_CHEMISAGE, getVilleChemisage } from "@/lib/chemisage/villes";
import { jsonLdService, pageMetadata } from "@/lib/seo";

type Params = { params: { ville: string; quartier: string } };
export const dynamicParams = false;
export function generateStaticParams() { return VILLES_CHEMISAGE.flatMap((v) => v.quartiers.map((q) => ({ ville: v.slug, quartier: q.slug }))); }
function trouver(p: Params["params"]) {
  const v = getVilleChemisage(p.ville);
  const q = v?.quartiers.find((x) => x.slug === p.quartier);
  return { v, q };
}
export function generateMetadata({ params }: Params): Metadata {
  const { v, q } = trouver(params);
  return v && q ? pageMetadata({ titre: `Chemisage canalisation ${q.nom}, ${v.nom}`, description: `${q.accroche} ${q.pourquoi}`, chemin: `/chemisage-canalisation/${v.slug}/${q.slug}` }) : {};
}

export default function PageQuartierChemisage({ params }: Params) {
  const { v, q } = trouver(params);
  if (!v || !q) notFound();
  const chemin = `/chemisage-canalisation/${v.slug}/${q.slug}`;
  const t = getTechnique(q.technique);
  const defauts = q.defauts.map(getDefaut).filter((d) => d !== undefined);
  const chantiers = CHANTIERS.filter((c) => c.ville === v.slug && c.quartier === q.slug);
  const cocon = getCocon(v.slug);
  const qDebouchage = cocon && getQuartier(cocon, q.slug);
  const autres = v.quartiers.filter((x) => x.slug !== q.slug);
  return (
    <>
      <JsonLd data={jsonLdService({ nom: `Chemisage de canalisation ${q.nom} (${v.nom})`, description: q.accroche, chemin, zone: v.nom })} />
      <HeroFlash ariane={[{ nom: "Chemisage par ville", chemin: "/chemisage-canalisation" }, { nom: v.nom, chemin: `/chemisage-canalisation/${v.slug}` }, { nom: q.nom, chemin }]} surtitre={`${v.nom} · ${q.bati}`} titre={<>Chemisage <span className="text-lime">{q.nom}</span></>} texte={q.accroche} visuel={t ? <Schema id={t.schema} /> : undefined} badges={[t?.court ?? "Chemisage", "Sans casse", v.cp]} />
      <Conteneur className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-14">
          <section><TitreFlash surtitre="Le quartier" titre={`Les canalisations de ${q.nom}`} /><div className="mt-6"><Paragraphes items={q.texte} /></div></section>
          {qDebouchage && <section><TitreFlash couleur="cyan" surtitre="Réseau" titre="Ce que nous savons du réseau" /><div className="mt-6"><Paragraphes items={qDebouchage.reseau} /></div></section>}
          {t && (
            <section className="rounded-[2rem] border-4 border-ink bg-sea-600 p-8 text-white shadow-flash">
              <p className="font-display text-sm font-extrabold uppercase text-lime">Technique conseillée</p>
              <Link href={`/chemisage/techniques/${t.slug}`} className="mt-2 block font-display text-2xl font-extrabold uppercase hover:underline">{t.nom}</Link>
              <p className="mt-3 text-lg text-white/90">{q.pourquoi}</p>
            </section>
          )}
          {defauts.length > 0 && <section><TitreFlash couleur="rose" titre="Défauts typiques ici" /><ul className="mt-6 grid gap-5 md:grid-cols-2">{defauts.map((d) => <li key={d.slug}><CarteDefaut d={d} /></li>)}</ul></section>}
          {chantiers.length > 0 && <section><TitreFlash couleur="jaune" surtitre="Cas type" titre={`Chantier type à ${q.nom}`} /><ul className="mt-6 grid gap-5 md:grid-cols-2">{chantiers.map((c) => <li key={c.slug}><CarteChantier c={c} nomVille={v.nom} /></li>)}</ul></section>}
          {qDebouchage && <p className="rounded-2xl bg-sand p-5 text-ink-soft">Avant tout chemisage : <Link href={`/villes/${v.slug}/quartiers/${q.slug}`} className="font-bold text-sea-600 underline">débouchage et caméra à {q.nom}</Link>.</p>}
          <section><TitreFlash titre={`Autres quartiers de ${v.nom}`} /><ul className="mt-5 flex flex-wrap gap-3">{autres.map((x) => <li key={x.slug}><Link href={`/chemisage-canalisation/${v.slug}/${x.slug}`} className="inline-block rounded-full border-2 border-ink px-4 py-2 font-bold text-ink hover:bg-lime">{x.nom}</Link></li>)}</ul></section>
        </article>
        <AsideChemisage villeActive={v.slug} />
      </Conteneur>
      <BandeauFlash titre={`Chemisage à ${q.nom} ? Devis gratuit.`} />
    </>
  );
}
