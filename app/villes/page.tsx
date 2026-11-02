import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { EnTetePage } from "@/components/sections/EnTetePage";
import { Conteneur } from "@/components/ui/Conteneur";
import { PARAMETRE } from "@/lib/config";
import { VILLES } from "@/lib/data/villes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "Zones d'intervention : Toulon et le Var",
  description: `Débouchage à Toulon, La Seyne, Hyères, La Garde, La Valette, Six-Fours, Sanary et dans ${VILLES.length} communes du Var. Intervention ${PARAMETRE.HORAIRES}.`,
  chemin: "/villes",
});

export default function PageVilles() {
  return (
    <>
      <EnTetePage
        ariane={[{ nom: "Zones d'intervention", chemin: "/villes" }]}
        titre="Nos zones d'intervention"
        texte={`Nos techniciens couvrent Toulon et ${VILLES.length - 1} communes voisines. Chaque secteur a ses particularités : réseaux anciens, sable, racines, fosses septiques…`}
      />
      <section className="py-16">
        <Conteneur>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VILLES.map((v) => (
              <li key={v.slug}>
                <Link href={`/villes/${v.slug}`} className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 hover:border-sea-500">
                  <p className="text-sm font-semibold text-ink-muted">{v.cp}</p>
                  <h2 className="mt-1 text-xl font-bold text-ink">Débouchage {v.nom}</h2>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{v.problemes.join(" · ")}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sea-600">
                    Voir la page <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Conteneur>
      </section>
      <BandeauAppel />
    </>
  );
}
