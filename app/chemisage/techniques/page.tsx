import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { CarteTechnique } from "@/components/chemisage/Cartes";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { SchemaInversion } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { TECHNIQUES } from "@/lib/chemisage/techniques";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ titre: "Les techniques de chemisage de canalisation", description: "Chemisage continu, manchette, inversion, tractage, UV, eau chaude, colonne d'immeuble, branchement, sous dalle, robot fraiseur : toutes les techniques expliquées.", chemin: "/chemisage/techniques" });

export default function PageTechniques() {
  return (
    <>
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Techniques", chemin: "/chemisage/techniques" }]} surtitre="10 techniques" titre={<>Toutes les techniques de <span className="text-lime">chemisage</span></>} texte="Il n'existe pas un chemisage, mais des chemisages. Le bon dépend de votre canalisation : ce que montre la caméra décide." visuel={<SchemaInversion />} />
      <section className="py-20"><Conteneur><ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{TECHNIQUES.map((t, i) => <li key={t.slug}><CarteTechnique t={t} i={i} /></li>)}</ul></Conteneur></section>
      <BandeauFlash />
    </>
  );
}
