import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { Engagements } from "@/components/sections/Engagements";
import { Etapes } from "@/components/sections/Etapes";
import { GrilleServices } from "@/components/sections/GrilleServices";
import { GrilleTarifs } from "@/components/sections/GrilleTarifs";
import { Hero } from "@/components/sections/Hero";
import { SectionFaq } from "@/components/sections/SectionFaq";
import { Zones } from "@/components/sections/Zones";
import { PARAMETRE, SITE_URL } from "@/lib/config";
import { FAQ_GENERALE } from "@/lib/data/faq";

export const metadata = { alternates: { canonical: SITE_URL } };

export default function Accueil() {
  return (
    <>
      <Hero
        surtitre={`Débouchage à Toulon · ${PARAMETRE.HORAIRES}`}
        titre={<>Canalisation bouchée&nbsp;? <span className="text-sea-600">On arrive.</span></>}
        texte={`WC, évier, douche ou canalisation principale : un technicien local intervient en moins de ${PARAMETRE.DELAI_INTERVENTION} à Toulon et dans les communes voisines. Le prix est fixé avant le déplacement.`}
      />
      <Etapes />
      <GrilleServices />
      <GrilleTarifs />
      <Engagements />
      <Zones />
      <SectionFaq faqs={FAQ_GENERALE} />
      <BandeauAppel />
    </>
  );
}
