import { Camera, FileCheck2, ScanLine, Sparkles, Wrench } from "lucide-react";
import { Conteneur } from "@/components/ui/Conteneur";
import { TitreFlash } from "@/components/chemisage/Titre";
import { GUIDE } from "@/lib/chemisage/guide";

const ICONES = [Wrench, Camera, FileCheck2, Sparkles, ScanLine];
const COULEURS = ["bg-cyan", "bg-jaune", "bg-sun-500 text-white", "bg-lime", "bg-sea-600 text-white"];

/** Débouchage → caméra → chemisage : le parcours client. */
export function Parcours() {
  return (
    <section className="bg-ink py-20 text-white">
      <Conteneur>
        <TitreFlash clair couleur="jaune" surtitre="Notre méthode" titre="Le débouchage, c'est la porte d'entrée" texte="Tout chemisage commence par un débouchage et un passage caméra. C'est là qu'on découvre si votre canalisation est abîmée, et qu'on vous le montre." />
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {GUIDE.parcours.map((e, i) => {
            const Icone = ICONES[i] ?? Wrench;
            return (
              <li key={e.titre} className="rounded-3xl border-2 border-white/15 bg-white/5 p-5">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl text-ink ${COULEURS[i]}`}><Icone aria-hidden className="h-7 w-7" /></span>
                <h3 className="mt-4 font-display text-lg font-extrabold uppercase">{e.titre}</h3>
                <p className="mt-2 text-sm text-white/75">{e.texte}</p>
              </li>
            );
          })}
        </ol>
      </Conteneur>
    </section>
  );
}
