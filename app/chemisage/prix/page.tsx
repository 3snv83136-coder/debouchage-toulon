import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { TitreFlash } from "@/components/chemisage/Titre";
import { SchemaBranchement } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { TARIFS_ORDONNES } from "@/lib/config";
import { FACTEURS_PRIX } from "@/lib/chemisage/guide";
import { euros } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ titre: "Prix d'un chemisage de canalisation", description: "Comment se calcule le prix d'un chemisage : longueur, diamètre, coudes, état, accès, technique. Devis gratuit après débouchage et passage caméra.", chemin: "/chemisage/prix" });

export default function PagePrix() {
  return (
    <>
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Prix", chemin: "/chemisage/prix" }]} surtitre="Transparence" titre={<>Combien coûte un <span className="text-lime">chemisage</span> ?</>} texte="Un chemisage se chiffre sur mesure, après avoir vu la canalisation. Voici ce qui fait le prix, et ce que coûte le diagnostic." visuel={<SchemaBranchement />} />
      <section className="py-20">
        <Conteneur>
          <TitreFlash surtitre="Ce qui fait le prix" titre="Six facteurs" />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FACTEURS_PRIX.map((f, i) => <li key={f.titre} className={`rounded-3xl border-4 border-ink p-6 shadow-flash ${["bg-lime", "bg-cyan", "bg-jaune"][i % 3]}`}><p className="font-display text-xl font-extrabold uppercase text-ink">{f.titre}</p><p className="mt-2 font-semibold text-ink-soft">{f.texte}</p></li>)}
          </ul>
        </Conteneur>
      </section>
      <section className="bg-ink py-20 text-white">
        <Conteneur>
          <TitreFlash clair couleur="rose" surtitre="Le diagnostic" titre="Avant le chemisage : débouchage et caméra" texte="Le diagnostic se fait dans le cadre de nos forfaits de débouchage. Le devis de chemisage est ensuite gratuit." />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {TARIFS_ORDONNES.map((t) => <li key={t.key} className="rounded-3xl bg-white/10 p-6"><p className="font-bold">{t.titre}</p><p className="mt-2 font-display text-4xl font-extrabold text-lime">{euros(t.prix)}</p><p className="mt-2 text-sm text-white/70">{t.inclus.join(" · ")}</p></li>)}
          </ul>
          <p className="mt-6 text-white/80">Le passage caméra est inclus dans le forfait hydrocurage. Le devis de chemisage, établi à partir des images, est gratuit et sans engagement.</p>
        </Conteneur>
      </section>
      <BandeauFlash titre="Recevez votre devis de chemisage" />
    </>
  );
}
