import { Check } from "lucide-react";
import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { Conteneur, EnTete } from "@/components/ui/Conteneur";
import { TARIFS_ORDONNES } from "@/lib/config";

export function GrilleTarifs({ titre = "Des forfaits clairs, annoncés avant de venir" }: { titre?: string }) {
  return (
    <section id="tarifs" className="scroll-mt-28 py-20">
      <Conteneur>
        <EnTete centre surtitre="Tarifs" titre={titre} texte="Déplacement inclus, prix TTC. Le technicien vous confirme le forfait au téléphone." />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {TARIFS_ORDONNES.map((t, i) => {
            const vedette = i === 0;
            return (
              <li
                key={t.key}
                className={`flex flex-col rounded-3xl p-8 ${vedette ? "bg-ink text-white" : "border border-ink/10 bg-white text-ink"}`}
              >
                {vedette && <p className="mb-3 w-fit rounded-full bg-sun-500 px-3 py-1 text-xs font-bold uppercase tracking-wide">Le plus courant</p>}
                <h3 className="text-xl font-bold">{t.titre}</h3>
                <p className={`mt-2 text-sm ${vedette ? "text-white/70" : "text-ink-soft"}`}>{t.description}</p>
                <p className="mt-6 font-display text-5xl font-extrabold">
                  {t.prix}&nbsp;€<span className={`ml-1 text-base font-semibold ${vedette ? "text-white/60" : "text-ink-muted"}`}>TTC</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {t.inclus.map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <Check aria-hidden className={`h-4 w-4 ${vedette ? "text-sun-400" : "text-sea-600"}`} /> {x}
                    </li>
                  ))}
                </ul>
                <BoutonAppel variante={vedette ? "plein" : "contour"} libelle="Appeler" className="mt-8 w-full" />
              </li>
            );
          })}
        </ul>
      </Conteneur>
    </section>
  );
}
