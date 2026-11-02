import type { MaterielId } from "@/lib/cocon/types";

export type Technicien = {
  slug: string;
  prenom: string;
  role: string;
  presentation: string[];
  /** À compléter : laissés vides, ils ne s'affichent pas. */
  depuis?: string;
  formations?: string[];
  specialites?: string[];
  materiel: MaterielId[];
};

export const EQUIPE: Technicien[] = [
  {
    slug: "laurent",
    prenom: "Laurent",
    role: "Technicien débouchage et hydrocurage",
    presentation: [
      "Laurent intervient sur l'ensemble de nos zones, de La Seyne à Hyères, en urgence comme en entretien programmé.",
      "Sur place, il commence toujours par expliquer ce qu'il a trouvé et quelle technique il propose, avec le prix, avant de sortir le matériel.",
    ],
    materiel: ["pompe-pression", "furet-electrique", "hydrocureuse-camion", "hydrocureuse-portative", "camera-inspection", "tete-coupe-racines", "localisateur-sonde"],
  },
  {
    slug: "ange",
    prenom: "Ange",
    role: "Technicien débouchage et inspection caméra",
    presentation: [
      "Ange intervient sur l'ensemble de nos zones, chez les particuliers, les commerçants et les copropriétés.",
      "Il termine chaque intervention par un test d'écoulement devant le client et, quand c'est utile, par un contrôle caméra pour montrer le résultat.",
    ],
    materiel: ["pompe-pression", "furet-electrique", "hydrocureuse-camion", "hydrocureuse-portative", "camera-inspection", "tete-coupe-racines", "localisateur-sonde"],
  },
];
