import { Conteneur, EnTete } from "@/components/ui/Conteneur";
import { PARAMETRE } from "@/lib/config";

const ETAPES = [
  { titre: "Vous appelez", texte: `Un technicien vous répond ${PARAMETRE.HORAIRES} et pose quelques questions pour comprendre le problème.` },
  { titre: "Prix confirmé", texte: "On vous annonce le forfait adapté avant de se déplacer. Pas de surprise sur la facture." },
  { titre: "Intervention", texte: `Le technicien arrive en moins de ${PARAMETRE.DELAI_INTERVENTION} avec le matériel adapté.` },
  { titre: "Contrôle", texte: "Test d'écoulement devant vous, conseils pour éviter que ça recommence." },
];

export function Etapes() {
  return (
    <section className="py-20">
      <Conteneur>
        <EnTete surtitre="Comment ça se passe" titre="Quatre étapes, aucune mauvaise surprise" />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="relative rounded-2xl border border-ink/10 bg-white p-6">
              <span className="font-display text-5xl font-extrabold text-sea-100">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold text-ink">{e.titre}</h3>
              <p className="mt-2 text-ink-soft">{e.texte}</p>
            </li>
          ))}
        </ol>
      </Conteneur>
    </section>
  );
}
