import type { Faq } from "@/lib/data/types";

/** Identifiants du matériel décrit dans lib/cocon/materiel.ts */
export type MaterielId =
  | "pompe-pression"
  | "furet-electrique"
  | "hydrocureuse-camion"
  | "hydrocureuse-portative"
  | "camera-inspection"
  | "tete-coupe-racines"
  | "localisateur-sonde";

export type Saison = "hiver" | "printemps" | "ete" | "automne";

/**
 * Cas type : scénario représentatif (non nominatif) d'une intervention
 * dans un contexte local précis. Toujours affiché comme « cas type ».
 */
export type CasType = {
  titre: string;
  lieu: string;
  contexte: string;
  symptomes: string[];
  diagnostic: string;
  intervention: string[];
  materiel: MaterielId[];
  duree: string;
  resultat: string;
  prevention: string;
};

export type Paragraphes = string[];

export type Quartier = {
  slug: string;
  nom: string;
  /** Type de bâti en quelques mots, ex. « villas 1900 et maisons de maître ». */
  bati: string;
  accroche: string;
  description: Paragraphes;
  reseau: Paragraphes;
  problemes: { titre: string; texte: string }[];
  conseils: string[];
  casType: CasType;
  reperes: string[];
};

/** Déclinaison locale d'un service global (lib/data/services.ts). */
export type ServiceVille = {
  service: string;
  titre: string;
  accroche: string;
  intro: Paragraphes;
  specificites: { titre: string; texte: string }[];
  methode: Paragraphes;
  casType: CasType;
  conseils: string[];
  faqs: Faq[];
};

export type VilleCocon = {
  slug: string;
  nom: string;
  insee: string;
  cp: string;
  coords: { lat: number; lon: number };
  meta: { titre: string; description: string };
  accroche: string;
  intro: Paragraphes;
  histoire: { titre: string; paragraphes: Paragraphes };
  urbanisme: { titre: string; paragraphes: Paragraphes; periodes: { epoque: string; bati: string; reseau: string }[] };
  sol: { titre: string; paragraphes: Paragraphes };
  reseaux: { titre: string; paragraphes: Paragraphes; materiaux: { nom: string; ou: string; risques: string }[] };
  eau: { titre: string; paragraphes: Paragraphes };
  saisons: Record<Saison, { titre: string; texte: string; conseil: string }>;
  environnement: { titre: string; paragraphes: Paragraphes };
  acces: { titre: string; points: { titre: string; texte: string }[] };
  quartiers: Quartier[];
  services: ServiceVille[];
  faqs: Faq[];
  glossaire: { terme: string; definition: string }[];
};
