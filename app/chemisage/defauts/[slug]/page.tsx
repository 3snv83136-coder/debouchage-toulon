import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera } from "lucide-react";
import { AsideChemisage } from "@/components/chemisage/AsideChemisage";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { CarteTechnique, PastilleVerdict } from "@/components/chemisage/Cartes";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { ListePlus } from "@/components/chemisage/Listes";
import { TitreFlash } from "@/components/chemisage/Titre";
import { Paragraphes } from "@/components/cocon/Texte";
import { SchemaCoupe } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListeFaq } from "@/components/ui/ListeFaq";
import { DEFAUTS, getDefaut } from "@/lib/chemisage/defauts";
import { getTechnique } from "@/lib/chemisage/techniques";
import { VILLES_CHEMISAGE } from "@/lib/chemisage/villes";
import { jsonLdFaq, pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };
export const dynamicParams = false;
export function generateStaticParams() { return DEFAUTS.map((d) => ({ slug: d.slug })); }
export function generateMetadata({ params }: Params): Metadata {
  const d = getDefaut(params.slug);
  return d ? pageMetadata({ titre: `${d.nom} : réparation par chemisage ?`, description: d.accroche, chemin: `/chemisage/defauts/${d.slug}` }) : {};
}

export default function PageDefaut({ params }: Params) {
  const d = getDefaut(params.slug);
  if (!d) notFound();
  const techniques = d.techniques.map(getTechnique).filter((t) => t !== undefined);
  const villes = VILLES_CHEMISAGE.filter((v) => v.defauts.some((x) => x.defaut === d.slug));
  return (
    <>
      <JsonLd data={jsonLdFaq(d.faqs)} />
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Défauts", chemin: "/chemisage/defauts" }, { nom: d.nom, chemin: `/chemisage/defauts/${d.slug}` }]} surtitre="Défaut de canalisation" titre={d.nom} texte={d.accroche} visuel={<SchemaCoupe />} />
      <Conteneur className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-14">
          <div className={`rounded-3xl border-4 border-ink p-6 shadow-flash ${d.verdict === "oui" ? "bg-lime" : d.verdict === "souvent" ? "bg-jaune" : "bg-sun-50"}`}>
            <PastilleVerdict verdict={d.verdict} />
            <p className="mt-3 font-display text-xl font-extrabold uppercase text-ink">{d.verdictTexte}</p>
          </div>
          <section><TitreFlash surtitre="Comprendre" titre="De quoi parle-t-on ?" /><div className="mt-6"><Paragraphes items={d.description} /></div></section>
          <section className="grid gap-8 md:grid-cols-2">
            <div><TitreFlash couleur="rose" titre="Les causes" /><ul className="mt-5 space-y-2">{d.causes.map((c) => <li key={c} className="rounded-2xl bg-sun-50 p-3 font-semibold text-ink">{c}</li>)}</ul></div>
            <div><TitreFlash couleur="jaune" titre="Les signes" /><ul className="mt-5 space-y-2">{d.signes.map((c) => <li key={c} className="rounded-2xl bg-jaune-soft p-3 font-semibold text-ink">{c}</li>)}</ul></div>
          </section>
          <section className="rounded-3xl bg-ink p-8 text-white">
            <p className="flex items-center gap-2 font-display text-lg font-extrabold uppercase text-cyan"><Camera aria-hidden className="h-6 w-6" /> Ce que montre la caméra</p>
            <p className="mt-3 text-lg text-white/85">{d.camera}</p>
          </section>
          <section><TitreFlash couleur="lime" titre="La solution" /><div className="mt-5"><ListePlus items={d.solution} /></div></section>
          {techniques.length > 0 && <section><TitreFlash titre="Techniques adaptées" /><ul className="mt-6 grid gap-5 md:grid-cols-2">{techniques.map((t, i) => <li key={t.slug}><CarteTechnique t={t} i={i} /></li>)}</ul></section>}
          {villes.length > 0 && <section><TitreFlash couleur="cyan" titre="Fréquent dans ces villes" /><ul className="mt-5 space-y-3">{villes.map((v) => <li key={v.slug}><Link href={`/chemisage-canalisation/${v.slug}`} className="block rounded-2xl border-2 border-ink/10 p-4 hover:border-sea-600"><span className="font-display font-extrabold uppercase text-ink">{v.nom}</span><span className="mt-1 block text-sm text-ink-soft">{v.defauts.find((x) => x.defaut === d.slug)?.explication}</span></Link></li>)}</ul></section>}
          <section><TitreFlash surtitre="FAQ" titre="Questions fréquentes" /><div className="mt-6"><ListeFaq faqs={d.faqs} /></div></section>
        </article>
        <AsideChemisage />
      </Conteneur>
      <BandeauFlash />
    </>
  );
}
