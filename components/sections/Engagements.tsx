import { BadgeEuro, CircleCheck, Clock, ShieldCheck } from "lucide-react";
import { Conteneur, EnTete } from "@/components/ui/Conteneur";
import { PARAMETRE } from "@/lib/config";

const ENGAGEMENTS = [
  { icone: BadgeEuro, titre: "Prix annoncé avant", texte: "Forfait confirmé au téléphone. Aucun supplément sans votre accord écrit." },
  { icone: Clock, titre: `Moins de ${PARAMETRE.DELAI_INTERVENTION}`, texte: `Techniciens basés dans l'aire toulonnaise, disponibles ${PARAMETRE.HORAIRES}.` },
  { icone: CircleCheck, titre: "Test d'écoulement", texte: "On ne part pas avant d'avoir vérifié avec vous que tout s'évacue." },
  { icone: ShieldCheck, titre: "Intervention garantie", texte: "Chaque forfait est garanti : si le bouchon revient, on revient." },
];

export function Engagements() {
  return (
    <section className="bg-sea-700 py-20 text-white">
      <Conteneur>
        <div className="[&_h2]:text-white [&_p]:text-white/80">
          <EnTete surtitre="Nos engagements" titre="Un artisan local, des règles simples" />
        </div>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENTS.map(({ icone: Icone, titre, texte }) => (
            <li key={titre}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10"><Icone aria-hidden className="h-6 w-6 text-sun-400" /></span>
              <h3 className="mt-4 text-lg font-bold">{titre}</h3>
              <p className="mt-2 text-white/75">{texte}</p>
            </li>
          ))}
        </ul>
      </Conteneur>
    </section>
  );
}
