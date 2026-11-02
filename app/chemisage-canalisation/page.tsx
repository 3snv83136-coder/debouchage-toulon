import Link from "next/link";
import { MapPin } from "lucide-react";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { SchemaBranchement } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { VILLES_CHEMISAGE } from "@/lib/chemisage/villes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ titre: "Chemisage de canalisation dans le Var : nos villes", description: "Chemisage sans tranchée à Toulon, La Seyne-sur-Mer, La Garde, La Valette-du-Var, Six-Fours-les-Plages et Hyères, quartier par quartier.", chemin: "/chemisage-canalisation" });

export default function PageVillesChemisage() {
  return (
    <>
      <HeroFlash ariane={[{ nom: "Chemisage par ville", chemin: "/chemisage-canalisation" }]} surtitre={`${VILLES_CHEMISAGE.length} villes · ${VILLES_CHEMISAGE.reduce((n, v) => n + v.quartiers.length, 0)} quartiers`} titre={<>Chemisage <span className="text-lime">près de chez vous</span></>} texte="Chaque ville a ses canalisations, ses défauts et ses contraintes. Voici comment on chemise, ville par ville et quartier par quartier." visuel={<SchemaBranchement />} />
      <section className="py-20">
        <Conteneur>
          <ul className="grid gap-6 md:grid-cols-2">
            {VILLES_CHEMISAGE.map((v, i) => (
              <li key={v.slug} className={`rounded-[2rem] border-4 border-ink p-7 shadow-flash ${["bg-lime", "bg-cyan", "bg-jaune", "bg-white", "bg-sea-100", "bg-sun-50"][i % 6]}`}>
                <Link href={`/chemisage-canalisation/${v.slug}`} className="font-display text-2xl font-extrabold uppercase text-ink hover:underline">Chemisage {v.nom}</Link>
                <p className="mt-2 font-semibold text-ink-soft">{v.accroche}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {v.quartiers.map((q) => <li key={q.slug}><Link href={`/chemisage-canalisation/${v.slug}/${q.slug}`} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-bold text-ink ring-2 ring-ink hover:bg-ink hover:text-white"><MapPin aria-hidden className="h-3.5 w-3.5" />{q.nom}</Link></li>)}
                </ul>
              </li>
            ))}
          </ul>
        </Conteneur>
      </section>
      <BandeauFlash />
    </>
  );
}
