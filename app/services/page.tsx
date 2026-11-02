import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { EnTetePage } from "@/components/sections/EnTetePage";
import { GrilleServices } from "@/components/sections/GrilleServices";
import { GrilleTarifs } from "@/components/sections/GrilleTarifs";
import { PARAMETRE } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "Nos services de débouchage à Toulon",
  description: `WC, évier, douche, canalisation, hydrocurage, inspection caméra, racines, bac à graisse, fosse septique : toutes nos interventions à Toulon, ${PARAMETRE.HORAIRES}.`,
  chemin: "/services",
});

export default function PageServices() {
  return (
    <>
      <EnTetePage
        ariane={[{ nom: "Services", chemin: "/services" }]}
        titre="Nos services de débouchage"
        texte="Du simple WC bouché au curage complet d'une colonne d'immeuble, on choisit toujours la technique la plus douce qui règle le problème."
      />
      <GrilleServices surtitre="11 interventions" titre="Choisissez votre problème" />
      <GrilleTarifs />
      <BandeauAppel />
    </>
  );
}
