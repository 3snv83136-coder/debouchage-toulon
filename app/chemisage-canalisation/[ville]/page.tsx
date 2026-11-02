import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { AsideChemisage } from "@/components/chemisage/AsideChemisage";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { CarteChantier, PastilleVerdict } from "@/components/chemisage/Cartes";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { Parcours } from "@/components/chemisage/Parcours";
import { TitreFlash } from "@/components/chemisage/Titre";
import { DonneesLocales } from "@/components/cocon/DonneesLocales";
import { Paragraphes } from "@/components/cocon/Texte";
import { GaleriePhotos, Photo } from "@/components/photos/Photo";
import { SchemaComparatif, SchemaImmeuble, SchemaBranchement } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListeFaq } from "@/components/ui/ListeFaq";
import { CHANTIERS } from "@/lib/chemisage/chantiers";
import { getDefaut } from "@/lib/chemisage/defauts";
import { getTechnique } from "@/lib/chemisage/techniques";
import { VILLES_CHEMISAGE, getVilleChemisage } from "@/lib/chemisage/villes";
import { jsonLdFaq, jsonLdService, pageMetadata } from "@/lib/seo";

type Params = { params: { ville: string } };
export const dynamicParams = false;
export const revalidate = 3600;
export function generateStaticParams() { return VILLES_CHEMISAGE.map((v) => ({ ville: v.slug })); }
export function generateMetadata({ params }: Params): Metadata {
  const v = getVilleChemisage(params.ville);
  return v ? pageMetadata({ titre: `Chemisage canalisation ${v.nom} (${v.cp}) sans casse`, description: v.accroche, chemin: `/chemisage-canalisation/${v.slug}` }) : {};
}

export default function PageVilleChemisage({ params }: Params) {
  const v = getVilleChemisage(params.ville);
  if (!v) notFound();
  const chemin = `/chemisage-canalisation/${v.slug}`;
  const chantiers = CHANTIERS.filter((c) => c.ville === v.slug);
  const colonnes = v.techniques.some((t) => t.technique === "chemisage-colonne-immeuble");
  return (
    <>
      <JsonLd data={jsonLdService({ nom: `Chemisage de canalisation à ${v.nom}`, description: v.accroche, chemin, zone: v.nom })} />
      <JsonLd data={jsonLdFaq(v.faqs)} />
      <HeroFlash ariane={[{ nom: "Chemisage par ville", chemin: "/chemisage-canalisation" }, { nom: v.nom, chemin }]} surtitre={`${v.nom} · ${v.cp}`} titre={<>Chemisage canalisation <span className="text-lime">{v.nom}</span></>} texte={v.accroche} visuel={colonnes ? <SchemaImmeuble /> : <SchemaBranchement />} />
      <Conteneur className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-16">
          <Paragraphes items={v.intro} className="space-y-4 text-xl leading-relaxed text-ink-soft" />
          <section>
            <TitreFlash couleur="rose" surtitre={`Pourquoi à ${v.nom}`} titre="Une ville faite pour le chemisage" />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {v.pourquoi.map((p, i) => <li key={p.titre} className={`rounded-3xl border-4 border-ink p-6 shadow-flash ${["bg-lime", "bg-cyan", "bg-jaune", "bg-sea-100"][i % 4]}`}><p className="font-display text-lg font-extrabold uppercase text-ink">{p.titre}</p><p className="mt-2 font-semibold text-ink-soft">{p.texte}</p></li>)}
            </ul>
          </section>
          <DonneesLocales ville={v} />
          <section>
            <TitreFlash surtitre="Défauts fréquents" titre={`Ce qu'on trouve dans les canalisations de ${v.nom}`} />
            <ul className="mt-8 space-y-4">
              {v.defauts.map((d) => { const def = getDefaut(d.defaut); return def ? (
                <li key={d.defaut}><Link href={`/chemisage/defauts/${def.slug}`} className="flex flex-col gap-3 rounded-3xl border-2 border-ink/10 bg-white p-5 hover:border-sea-600 sm:flex-row sm:items-center sm:justify-between">
                  <span><span className="block font-display font-extrabold uppercase text-ink">{def.nom}</span><span className="mt-1 block text-ink-soft">{d.explication}</span></span>
                  <PastilleVerdict verdict={def.verdict} />
                </Link></li>) : null; })}
            </ul>
          </section>
          <section>
            <TitreFlash couleur="cyan" surtitre="Techniques" titre={`Nos techniques à ${v.nom}`} />
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {v.techniques.map((t, i) => { const tech = getTechnique(t.technique); return tech ? (
                <li key={t.technique}><Link href={`/chemisage/techniques/${tech.slug}`} className={`block h-full rounded-3xl p-6 ${["bg-ink text-white", "bg-sea-600 text-white", "bg-sun-500 text-white"][i % 3]}`}><span className="font-display text-lg font-extrabold uppercase text-lime">{tech.court}</span><span className="mt-2 block text-white/85">{t.explication}</span></Link></li>) : null; })}
            </ul>
          </section>
          <section>
            <TitreFlash couleur="jaune" surtitre="Bâtiments" titre="Selon votre type de bâtiment" />
            <ul className="mt-8 grid gap-4 md:grid-cols-3">{v.batiments.map((b) => <li key={b.type} className="rounded-3xl bg-sand p-5"><Building2 aria-hidden className="h-6 w-6 text-sea-600" /><p className="mt-3 font-display font-extrabold uppercase text-ink">{b.type}</p><p className="mt-2 text-ink-soft">{b.texte}</p></li>)}</ul>
          </section>
          <section>
            <TitreFlash couleur="lime" surtitre="Quartiers" titre={`Le chemisage quartier par quartier à ${v.nom}`} />
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {v.quartiers.map((q) => (
                <li key={q.slug}><Link href={`${chemin}/${q.slug}`} className="group flex h-full flex-col rounded-3xl border-4 border-ink bg-white p-6 shadow-flash hover:-translate-y-1">
                  <span className="flex items-center gap-2 font-display text-lg font-extrabold uppercase text-ink"><MapPin aria-hidden className="h-5 w-5 text-sun-500" />{q.nom}</span>
                  <span className="mt-1 text-xs font-bold uppercase text-ink-muted">{q.bati}</span>
                  <span className="mt-3 flex-1 text-ink-soft">{q.accroche}</span>
                  <span className="mt-4 inline-flex items-center gap-1 font-bold text-sea-600">Voir <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link></li>
              ))}
            </ul>
          </section>
          {chantiers.length > 0 && <section><TitreFlash couleur="rose" surtitre="Cas types" titre={`Chantiers de chemisage à ${v.nom}`} /><ul className="mt-8 grid gap-5 md:grid-cols-2">{chantiers.map((c) => <li key={c.slug}><CarteChantier c={c} nomVille={v.nom} /></li>)}</ul></section>}
          <section><TitreFlash couleur="cyan" surtitre="En images" titre="Le chemisage, sans tranchée" /><div className="mt-8"><GaleriePhotos ids={["inversion-air", "gaine-vapeur", "gaine-en-place"]} /></div></section>
          <SchemaComparatif />
          <section><TitreFlash surtitre="FAQ" titre={`Chemisage à ${v.nom} : vos questions`} /><div className="mt-6"><ListeFaq faqs={v.faqs} /></div></section>
          <p className="rounded-2xl bg-sand p-5 text-ink-soft">Tout commence par un débouchage : <Link href={`/villes/${v.slug}`} className="font-bold text-sea-600 underline">débouchage et passage caméra à {v.nom}</Link>.</p>
        </article>
        <AsideChemisage villeActive={v.slug} />
      </Conteneur>
      <Parcours />
      <BandeauFlash titre={`Chemisage à ${v.nom} ? Devis gratuit.`} />
    </>
  );
}
