import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { CarteChantier } from "@/components/chemisage/Cartes";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { TitreFlash } from "@/components/chemisage/Titre";
import { Conteneur } from "@/components/ui/Conteneur";
import { CHANTIERS } from "@/lib/chemisage/chantiers";
import { VILLES_CHEMISAGE } from "@/lib/chemisage/villes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ titre: "Chantiers de chemisage : cas types dans le Var", description: "Colonnes d'immeuble, branchements de villa, canalisations sous dalle : des cas types de chemisage à Toulon, La Seyne, La Garde, La Valette, Six-Fours et Hyères.", chemin: "/chemisage/chantiers" });

export default function PageChantiers() {
  return (
    <>
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Chantiers", chemin: "/chemisage/chantiers" }]} surtitre={`${CHANTIERS.length} cas types`} titre={<>Chantiers de <span className="text-lime">chemisage</span></>} texte="Des scénarios représentatifs, ville par ville : le problème, ce que montre la caméra, la technique, et surtout tout ce qu'on n'a pas eu à casser." />
      {VILLES_CHEMISAGE.map((v, i) => {
        const liste = CHANTIERS.filter((c) => c.ville === v.slug);
        if (liste.length === 0) return null;
        return (
          <section key={v.slug} className={`py-16 ${i % 2 ? "bg-sand" : ""}`}>
            <Conteneur>
              <TitreFlash couleur={(["lime", "cyan", "jaune", "rose"] as const)[i % 4]} surtitre={v.cp} titre={`Chemisage à ${v.nom}`} />
              <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{liste.map((c) => <li key={c.slug}><CarteChantier c={c} nomVille={v.nom} /></li>)}</ul>
            </Conteneur>
          </section>
        );
      })}
      <BandeauFlash />
    </>
  );
}
