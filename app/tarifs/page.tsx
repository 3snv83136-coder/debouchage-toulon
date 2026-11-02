import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { EnTetePage } from "@/components/sections/EnTetePage";
import { GrilleTarifs } from "@/components/sections/GrilleTarifs";
import { SectionFaq } from "@/components/sections/SectionFaq";
import { Conteneur } from "@/components/ui/Conteneur";
import { PRIX_MIN } from "@/lib/config";
import { FAQ_GENERALE } from "@/lib/data/faq";
import { euros } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "Tarifs débouchage à Toulon",
  description: `Prix d'un débouchage à Toulon : à partir de ${euros(PRIX_MIN)}, déplacement inclus. Forfaits fixes annoncés avant l'intervention.`,
  chemin: "/tarifs",
});

const POINTS = [
  { titre: "Prix confirmé avant le déplacement", texte: "Au téléphone, le technicien vous pose quelques questions et vous annonce le forfait adapté." },
  { titre: "Déplacement inclus", texte: "Dans toutes nos zones d'intervention, le déplacement est compris dans le forfait." },
  { titre: "Aucun supplément imposé", texte: "Si une autre technique est nécessaire sur place, on vous explique pourquoi et on attend votre accord." },
];

export default function PageTarifs() {
  return (
    <>
      <EnTetePage
        ariane={[{ nom: "Tarifs", chemin: "/tarifs" }]}
        titre="Nos tarifs de débouchage"
        texte={`Trois forfaits fixes, à partir de ${euros(PRIX_MIN)}. Le prix vous est donné avant qu'on se déplace.`}
      />
      <GrilleTarifs titre="Trois forfaits, selon la technique" />
      <section className="pb-16">
        <Conteneur>
          <ul className="grid gap-6 md:grid-cols-3">
            {POINTS.map((p) => (
              <li key={p.titre} className="rounded-2xl bg-sea-50 p-6">
                <h2 className="font-bold text-ink">{p.titre}</h2>
                <p className="mt-2 text-ink-soft">{p.texte}</p>
              </li>
            ))}
          </ul>
        </Conteneur>
      </section>
      <SectionFaq faqs={FAQ_GENERALE} />
      <BandeauAppel />
    </>
  );
}
