import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { TitreFlash } from "@/components/chemisage/Titre";
import { Photo } from "@/components/photos/Photo";
import { SchemaComparatif } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { COMPARATIF } from "@/lib/chemisage/guide";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ titre: "Chemisage ou tranchée : le comparatif", description: "Chemisage sans casse ou remplacement en tranchée : travaux, durée, gravats, remise en état, limites. Le comparatif honnête.", chemin: "/chemisage/comparatif" });

export default function PageComparatif() {
  return (
    <>
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Comparatif", chemin: "/chemisage/comparatif" }]} surtitre="Le match" titre={<>Chemisage <span className="text-sun-400">vs</span> tranchée</>} texte="Le chemisage gagne presque toujours. Presque : voici aussi les deux cas où la tranchée reste nécessaire." visuel={<SchemaComparatif />} />
      <section className="py-20">
        <Conteneur>
          <div className="mb-16 grid gap-6 md:grid-cols-2">
            <div><p className="mb-3 font-display text-xl font-extrabold uppercase text-sun-600">La tranchée</p><Photo id="tranchee" /></div>
            <div><p className="mb-3 font-display text-xl font-extrabold uppercase text-sea-600">Le chemisage</p><Photo id="gaine-vapeur" /></div>
          </div>
          <TitreFlash surtitre="Critère par critère" titre="Le tableau comparatif" />
          <div className="mt-8 overflow-x-auto rounded-3xl border-4 border-ink shadow-flash">
            <table className="w-full min-w-[600px] text-left">
              <thead><tr className="bg-ink text-white"><th className="p-4 font-display uppercase">Critère</th><th className="bg-lime p-4 font-display uppercase text-ink">Chemisage</th><th className="bg-sun-500 p-4 font-display uppercase">Tranchée</th></tr></thead>
              <tbody className="divide-y-2 divide-ink/10">
                {COMPARATIF.map((r) => <tr key={r.critere}><td className="p-4 font-bold text-ink">{r.critere}</td><td className="bg-lime-soft p-4 font-semibold text-ink">{r.chemisage}</td><td className="bg-sun-50 p-4 font-semibold text-ink">{r.tranchee}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-lg text-ink-soft">En résumé : si la canalisation garde sa forme, le chemisage est presque toujours la meilleure option. Si elle est effondrée ou si le problème est une contre-pente, une reprise localisée en tranchée reste nécessaire, et le chemisage peut traiter le reste du réseau.</p>
        </Conteneur>
      </section>
      <BandeauFlash />
    </>
  );
}
