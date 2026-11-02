import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AsideChemisage } from "@/components/chemisage/AsideChemisage";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { ListePlus } from "@/components/chemisage/Listes";
import { TitreFlash } from "@/components/chemisage/Titre";
import { Paragraphes } from "@/components/cocon/Texte";
import { SchemaCoupe } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListeFaq } from "@/components/ui/ListeFaq";
import { MATERIAUX, getMateriau } from "@/lib/chemisage/materiaux";
import { jsonLdFaq, pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };
export const dynamicParams = false;
export function generateStaticParams() { return MATERIAUX.map((m) => ({ slug: m.slug })); }
export function generateMetadata({ params }: Params): Metadata {
  const m = getMateriau(params.slug);
  return m ? pageMetadata({ titre: `Chemisage de canalisation en ${m.nom.toLowerCase()}`, description: m.accroche, chemin: `/chemisage/materiaux/${m.slug}` }) : {};
}

export default function PageMateriau({ params }: Params) {
  const m = getMateriau(params.slug);
  if (!m) notFound();
  return (
    <>
      <JsonLd data={jsonLdFaq(m.faqs)} />
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Matériaux", chemin: "/chemisage/materiaux" }, { nom: m.nom, chemin: `/chemisage/materiaux/${m.slug}` }]} surtitre="Matériau" titre={<>Chemisage <span className="text-lime">{m.nom.toLowerCase()}</span></>} texte={m.accroche} visuel={<SchemaCoupe />} />
      <Conteneur className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-14">
          <section><TitreFlash surtitre="Origine" titre={`Le ${m.nom.toLowerCase()} dans nos canalisations`} /><div className="mt-6"><Paragraphes items={m.histoire} /></div></section>
          <section><TitreFlash couleur="rose" titre="Comment il vieillit" /><div className="mt-6"><Paragraphes items={m.vieillissement} /></div></section>
          <section><TitreFlash couleur="lime" titre="Ce que fait le chemisage" /><div className="mt-6"><Paragraphes items={m.chemisage} /></div></section>
          <section><TitreFlash couleur="jaune" titre="Nos précautions" /><div className="mt-5"><ListePlus items={m.precautions} /></div></section>
          <section><TitreFlash surtitre="FAQ" titre="Questions fréquentes" /><div className="mt-6"><ListeFaq faqs={m.faqs} /></div></section>
        </article>
        <AsideChemisage />
      </Conteneur>
      <BandeauFlash />
    </>
  );
}
