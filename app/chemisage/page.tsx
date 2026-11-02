import Link from "next/link";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { CarteDefaut, CarteTechnique } from "@/components/chemisage/Cartes";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { ListeMoins } from "@/components/chemisage/Listes";
import { Parcours } from "@/components/chemisage/Parcours";
import { TitreFlash } from "@/components/chemisage/Titre";
import { GaleriePhotos, Photo } from "@/components/photos/Photo";
import { Glossaire } from "@/components/cocon/Glossaire";
import { Paragraphes } from "@/components/cocon/Texte";
import { SchemaComparatif, SchemaCoupe, SchemaCouches, SchemaEtapes } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListeFaq } from "@/components/ui/ListeFaq";
import { DEFAUTS } from "@/lib/chemisage/defauts";
import { FAQ_CHEMISAGE, GLOSSAIRE_CHEMISAGE, GUIDE } from "@/lib/chemisage/guide";
import { MATERIAUX } from "@/lib/chemisage/materiaux";
import { TECHNIQUES } from "@/lib/chemisage/techniques";
import { VILLES_CHEMISAGE } from "@/lib/chemisage/villes";
import { jsonLdFaq, jsonLdService, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "Chemisage de canalisation : le guide complet",
  description: "Tout sur le chemisage de canalisation sans tranchée : principe, histoire, techniques (inversion, manchette, UV), défauts réparables, limites, étapes, durée de vie et prix.",
  chemin: "/chemisage",
});

export default function PageChemisage() {
  return (
    <>
      <JsonLd data={jsonLdService({ nom: "Chemisage de canalisation", description: GUIDE.definition[0] ?? "", chemin: "/chemisage" })} />
      <JsonLd data={jsonLdFaq(FAQ_CHEMISAGE)} />
      <HeroFlash
        ariane={[{ nom: "Chemisage", chemin: "/chemisage" }]}
        surtitre="Le guide complet"
        titre={<>Le chemisage de <span className="text-lime">canalisation</span>, expliqué à fond</>}
        texte="Une canalisation neuve à l'intérieur de l'ancienne, sans tranchée et sans rien casser. Voici comment ça marche, ce que ça répare, et ce que ça ne répare pas."
        visuel={<SchemaCoupe />}
      />

      <section className="py-20">
        <Conteneur className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <TitreFlash surtitre="Définition" titre="C'est quoi, le chemisage ?" />
            <div className="mt-6"><Paragraphes items={GUIDE.definition} /></div>
            <div className="mt-8"><Photo id="gaine-en-place" /></div>
          </div>
          <SchemaCouches />
        </Conteneur>
      </section>

      <section className="bg-sand py-20">
        <Conteneur>
          <TitreFlash couleur="cyan" surtitre="Histoire" titre="Né à Londres, utilisé partout dans le monde" />
          <div className="mt-6 max-w-3xl"><Paragraphes items={GUIDE.histoire} /></div>
        </Conteneur>
      </section>

      <section className="py-20">
        <Conteneur>
          <TitreFlash couleur="rose" surtitre="En images" titre="Un chantier de chemisage" />
          <div className="mt-10"><GaleriePhotos ids={["tete-camera", "impregnation-resine", "inversion-air", "gaine-vapeur", "gaine-en-place", "tranchee"]} /></div>
        </Conteneur>
      </section>

      <Parcours />

      <section className="py-20">
        <Conteneur>
          <TitreFlash couleur="rose" surtitre="Les avantages" titre="Pourquoi le chemisage change tout" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE.avantages.map((a, i) => (
              <li key={a.titre} className={`rounded-3xl border-4 border-ink p-6 shadow-flash ${["bg-lime", "bg-cyan", "bg-jaune", "bg-white", "bg-sea-100", "bg-sun-50"][i % 6]}`}>
                <p className="font-display text-xl font-extrabold uppercase text-ink">{a.titre}</p>
                <p className="mt-2 font-semibold text-ink-soft">{a.texte}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12"><SchemaComparatif /></div>
          <p className="mt-4 text-center"><Link href="/chemisage/comparatif" className="font-bold text-sea-600 underline">Comparatif détaillé chemisage contre tranchée</Link></p>
        </Conteneur>
      </section>

      <section className="bg-ink py-20">
        <Conteneur>
          <TitreFlash clair couleur="lime" surtitre="Le déroulé" titre="Six étapes, dans cet ordre" />
          <div className="mt-10"><SchemaEtapes /></div>
          <p className="mt-6 text-center"><Link href="/chemisage/etapes" className="font-bold text-lime underline">Toutes les étapes en détail</Link></p>
        </Conteneur>
      </section>

      <section className="py-20">
        <Conteneur>
          <TitreFlash surtitre="Techniques" titre="Une technique pour chaque situation" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TECHNIQUES.map((t, i) => <li key={t.slug}><CarteTechnique t={t} i={i} /></li>)}
          </ul>
        </Conteneur>
      </section>

      <section className="bg-sand py-20">
        <Conteneur>
          <TitreFlash couleur="jaune" surtitre="Défauts" titre="Ce que le chemisage répare (et ce qu'il ne répare pas)" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DEFAUTS.map((d) => <li key={d.slug}><CarteDefaut d={d} /></li>)}
          </ul>
        </Conteneur>
      </section>

      <section className="py-20">
        <Conteneur className="grid gap-12 lg:grid-cols-2">
          <div>
            <TitreFlash couleur="rose" surtitre="En toute franchise" titre="Les limites du chemisage" />
            <div className="mt-6"><ListeMoins items={GUIDE.limites} /></div>
          </div>
          <div>
            <TitreFlash couleur="cyan" surtitre="Matériaux" titre="Selon votre canalisation" />
            <ul className="mt-6 grid gap-3">
              {MATERIAUX.map((m) => <li key={m.slug}><Link href={`/chemisage/materiaux/${m.slug}`} className="block rounded-2xl border-2 border-ink/10 p-4 hover:border-sea-600"><span className="font-display font-extrabold uppercase text-ink">Chemisage {m.nom.toLowerCase()}</span><span className="mt-1 block text-sm text-ink-soft">{m.accroche}</span></Link></li>)}
            </ul>
          </div>
        </Conteneur>
      </section>

      <section className="bg-sea-600 py-20">
        <Conteneur>
          <TitreFlash clair couleur="lime" surtitre="Près de chez vous" titre="Chemisage à Toulon et dans le Var" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VILLES_CHEMISAGE.map((v) => <li key={v.slug}><Link href={`/chemisage-canalisation/${v.slug}`} className="block rounded-3xl bg-white p-6 hover:bg-lime"><span className="font-display text-xl font-extrabold uppercase text-ink">Chemisage {v.nom}</span><span className="mt-2 block text-sm text-ink-soft">{v.accroche}</span></Link></li>)}
          </ul>
        </Conteneur>
      </section>

      <section className="py-20">
        <Conteneur className="grid gap-12 lg:grid-cols-2">
          <div><TitreFlash surtitre="FAQ" titre="Vos questions sur le chemisage" /><div className="mt-6"><ListeFaq faqs={FAQ_CHEMISAGE} /></div></div>
          <div><TitreFlash couleur="jaune" surtitre="Lexique" titre="Les mots du chemisage" /><div className="mt-6"><Glossaire items={GLOSSAIRE_CHEMISAGE} /></div></div>
        </Conteneur>
      </section>
      <BandeauFlash />
    </>
  );
}
