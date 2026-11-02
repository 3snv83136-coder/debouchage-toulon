import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { CarteDefaut } from "@/components/chemisage/Cartes";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { SchemaCoupe } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { DEFAUTS } from "@/lib/chemisage/defauts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ titre: "Défauts de canalisation : le chemisage est-il adapté ?", description: "Fissure, racines, joint déboîté, fonte corrodée, infiltration, fuite, ovalisation, contre-pente, effondrement : pour chaque défaut, le chemisage est-il la bonne solution ?", chemin: "/chemisage/defauts" });

export default function PageDefauts() {
  return (
    <>
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Défauts", chemin: "/chemisage/defauts" }]} surtitre="Diagnostic" titre={<>Votre défaut se <span className="text-lime">chemise-t-il</span> ?</>} texte="Chaque défaut, notre verdict franc : adapté, souvent possible, ou non adapté. La caméra confirme toujours." visuel={<SchemaCoupe />} />
      <section className="py-20"><Conteneur><ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{DEFAUTS.map((d) => <li key={d.slug}><CarteDefaut d={d} /></li>)}</ul></Conteneur></section>
      <BandeauFlash />
    </>
  );
}
