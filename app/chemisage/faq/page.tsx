import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { TitreFlash } from "@/components/chemisage/Titre";
import { Glossaire } from "@/components/cocon/Glossaire";
import { Conteneur } from "@/components/ui/Conteneur";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListeFaq } from "@/components/ui/ListeFaq";
import { DEFAUTS } from "@/lib/chemisage/defauts";
import { FAQ_CHEMISAGE, GLOSSAIRE_CHEMISAGE } from "@/lib/chemisage/guide";
import { TECHNIQUES } from "@/lib/chemisage/techniques";
import { jsonLdFaq, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ titre: "FAQ chemisage de canalisation", description: "Toutes les réponses sur le chemisage de canalisation : prix, durée, durée de vie, coudes, racines, limites, techniques.", chemin: "/chemisage/faq" });

export default function PageFaq() {
  const techniques = TECHNIQUES.flatMap((t) => t.faqs);
  const defauts = DEFAUTS.flatMap((d) => d.faqs);
  return (
    <>
      <JsonLd data={jsonLdFaq(FAQ_CHEMISAGE)} />
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "FAQ", chemin: "/chemisage/faq" }]} surtitre={`${FAQ_CHEMISAGE.length + techniques.length + defauts.length} réponses`} titre={<>Toutes vos <span className="text-lime">questions</span></>} texte="Si votre question n'y est pas, appelez : on vous répond franchement." />
      <section className="py-20"><Conteneur className="max-w-4xl space-y-14">
        <div><TitreFlash surtitre="Général" titre="Le chemisage" /><div className="mt-6"><ListeFaq faqs={FAQ_CHEMISAGE} /></div></div>
        <div><TitreFlash couleur="cyan" surtitre="Techniques" titre="Les méthodes" /><div className="mt-6"><ListeFaq faqs={techniques} /></div></div>
        <div><TitreFlash couleur="rose" surtitre="Défauts" titre="Les problèmes" /><div className="mt-6"><ListeFaq faqs={defauts} /></div></div>
        <div><TitreFlash couleur="jaune" surtitre="Lexique" titre="Glossaire" /><div className="mt-6"><Glossaire items={GLOSSAIRE_CHEMISAGE} /></div></div>
      </Conteneur></section>
      <BandeauFlash />
    </>
  );
}
