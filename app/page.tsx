import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { CarteChantier, CarteDefaut, CarteTechnique } from "@/components/chemisage/Cartes";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { Parcours } from "@/components/chemisage/Parcours";
import { TitreFlash } from "@/components/chemisage/Titre";
import { GaleriePhotos, Photo } from "@/components/photos/Photo";
import { GrilleTarifs } from "@/components/sections/GrilleTarifs";
import { SchemaComparatif, SchemaCoupe, SchemaImmeuble } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListeFaq } from "@/components/ui/ListeFaq";
import { SITE_URL } from "@/lib/config";
import { CHANTIERS } from "@/lib/chemisage/chantiers";
import { DEFAUTS } from "@/lib/chemisage/defauts";
import { FAQ_CHEMISAGE, GUIDE } from "@/lib/chemisage/guide";
import { TECHNIQUES } from "@/lib/chemisage/techniques";
import { VILLES_CHEMISAGE } from "@/lib/chemisage/villes";
import { jsonLdFaq } from "@/lib/seo";

export const metadata = { alternates: { canonical: SITE_URL } };

const MOTS = ["Sans tranchée", "Sans casse", "Sans gravats", "En une journée", "Fin des racines", "Colonnes d'immeuble", "Sous dalle", "Branchements"];

export default function Accueil() {
  const nomVille = (s: string) => VILLES_CHEMISAGE.find((v) => v.slug === s)?.nom ?? s;
  const faqs = FAQ_CHEMISAGE.slice(0, 6);
  return (
    <>
      <JsonLd data={jsonLdFaq(faqs)} />
      <HeroFlash
        surtitre="Chemisage de canalisation · Toulon & Var"
        titre={<>On répare vos canalisations <span className="text-lime">sans casser</span></>}
        texte="Fissures, racines, fonte rongée, fuites sous dalle : on crée une canalisation neuve à l'intérieur de l'ancienne. Pas de tranchée, pas de carrelage cassé, pas de jardin retourné."
        visuel={<SchemaCoupe />}
      />

      <div className="overflow-hidden border-y-4 border-ink bg-lime py-4">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-4 font-display text-sm font-extrabold uppercase text-ink sm:text-base">
          {MOTS.map((m, i) => <li key={m} className="flex items-center gap-8">{i > 0 && <span aria-hidden className="text-sun-500">●</span>}{m}</li>)}
        </ul>
      </div>

      <section className="py-20">
        <Conteneur>
          <TitreFlash couleur="cyan" surtitre="En images" titre="Le chemisage, concrètement" texte="Une gaine imprégnée de résine, posée depuis un regard, durcie sur place. Voici à quoi ça ressemble sur un chantier." />
          <div className="mt-10"><GaleriePhotos ids={["gaine-vapeur", "inversion-air", "impregnation-resine"]} /></div>
        </Conteneur>
      </section>

      <Parcours />

      <section className="py-20">
        <Conteneur>
          <TitreFlash couleur="rose" surtitre="Le match" titre="Tranchée ou chemisage ? Y a pas photo." />
          <div className="mt-10 grid gap-6 md:grid-cols-2"><Photo id="tranchee" /><Photo id="gaine-en-place" /></div>
          <div className="mt-10"><SchemaComparatif /></div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE.avantages.map((a, i) => <li key={a.titre} className={`rounded-3xl border-4 border-ink p-6 shadow-flash ${["bg-lime", "bg-cyan", "bg-jaune", "bg-white", "bg-sea-100", "bg-sun-50"][i % 6]}`}><p className="font-display text-xl font-extrabold uppercase text-ink">{a.titre}</p><p className="mt-2 font-semibold text-ink-soft">{a.texte}</p></li>)}
          </ul>
        </Conteneur>
      </section>

      <section className="bg-sand py-20">
        <Conteneur>
          <TitreFlash couleur="jaune" surtitre="Votre problème" titre="Ce que le chemisage répare" texte="Et ce qu'il ne répare pas : on vous le dit franchement dès le passage caméra." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{DEFAUTS.slice(0, 6).map((d) => <li key={d.slug}><CarteDefaut d={d} /></li>)}</ul>
          <p className="mt-8"><Link href="/chemisage/defauts" className="inline-flex items-center gap-1 font-bold text-sea-600">Tous les défauts <ArrowRight aria-hidden className="h-4 w-4" /></Link></p>
        </Conteneur>
      </section>

      <section className="py-20">
        <Conteneur className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <TitreFlash couleur="cyan" surtitre="Copropriétés" titre="Colonnes d'immeuble : on chemise de haut en bas" texte="Des colonnes en fonte rongées par la rouille, partout dans les immeubles de Toulon et du littoral. On les réhabilite en site occupé, sans ouvrir un seul appartement." />
            <Link href="/chemisage/techniques/chemisage-colonne-immeuble" className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-6 font-bold text-lime hover:bg-sea-700">Chemisage de colonne</Link>
          </div>
          <SchemaImmeuble />
        </Conteneur>
      </section>

      <section className="bg-ink py-20">
        <Conteneur>
          <TitreFlash clair couleur="lime" surtitre="Techniques" titre="La bonne technique, au centimètre" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{TECHNIQUES.slice(0, 6).map((t, i) => <li key={t.slug}><CarteTechnique t={t} i={i} /></li>)}</ul>
          <p className="mt-8"><Link href="/chemisage/techniques" className="inline-flex items-center gap-1 font-bold text-lime">Les 10 techniques <ArrowRight aria-hidden className="h-4 w-4" /></Link></p>
        </Conteneur>
      </section>

      <section className="py-20">
        <Conteneur>
          <TitreFlash couleur="rose" surtitre="Cas types" titre="Ce qu'on n'a pas eu à casser" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{CHANTIERS.filter((_, i) => i % 3 === 0).map((c) => <li key={c.slug}><CarteChantier c={c} nomVille={nomVille(c.ville)} /></li>)}</ul>
          <p className="mt-8"><Link href="/chemisage/chantiers" className="inline-flex items-center gap-1 font-bold text-sea-600">Les {CHANTIERS.length} chantiers types <ArrowRight aria-hidden className="h-4 w-4" /></Link></p>
        </Conteneur>
      </section>

      <section className="bg-sea-600 py-20">
        <Conteneur>
          <TitreFlash clair couleur="jaune" surtitre="Zones" titre="Chemisage à Toulon et dans le Var" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VILLES_CHEMISAGE.map((v) => <li key={v.slug}><Link href={`/chemisage-canalisation/${v.slug}`} className="block h-full rounded-3xl border-4 border-ink bg-white p-6 shadow-flash hover:bg-lime"><span className="font-display text-xl font-extrabold uppercase text-ink">{v.nom}</span><span className="mt-2 block text-sm font-semibold text-ink-soft">{v.quartiers.map((q) => q.nom).join(" · ")}</span></Link></li>)}
          </ul>
        </Conteneur>
      </section>

      <GrilleTarifs titre="Ça commence par un débouchage" />

      <section className="bg-sand py-20">
        <Conteneur className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <TitreFlash surtitre="FAQ" titre="Vos questions" />
          <div><ListeFaq faqs={faqs} /><p className="mt-6"><Link href="/chemisage/faq" className="font-bold text-sea-600 underline">Toutes les questions</Link></p></div>
        </Conteneur>
      </section>
      <BandeauFlash />
    </>
  );
}
