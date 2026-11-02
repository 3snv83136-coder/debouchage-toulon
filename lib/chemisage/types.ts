import type { MaterielId } from "@/lib/cocon/types";
import type { Faq } from "@/lib/data/types";

/** Schémas SVG disponibles (components/schemas). */
export type SchemaId =
  | "coupe"
  | "etapes"
  | "comparatif"
  | "immeuble"
  | "manchette"
  | "inversion"
  | "branchement"
  | "couches"
  | "robot"
  | "uv";

export type Technique = {
  slug: string;
  nom: string;
  court: string;
  accroche: string;
  schema: SchemaId;
  principe: string[];
  etapes: { titre: string; texte: string }[];
  avantages: string[];
  limites: string[];
  pourQui: string[];
  faqs: Faq[];
};

export type Verdict = "oui" | "souvent" | "non";

export type Defaut = {
  slug: string;
  nom: string;
  accroche: string;
  verdict: Verdict;
  verdictTexte: string;
  description: string[];
  causes: string[];
  signes: string[];
  camera: string;
  solution: string[];
  techniques: string[];
  faqs: Faq[];
};

export type Materiau = {
  slug: string;
  nom: string;
  accroche: string;
  histoire: string[];
  vieillissement: string[];
  chemisage: string[];
  precautions: string[];
  faqs: Faq[];
};

export type ChantierType = {
  slug: string;
  ville: string;
  quartier?: string;
  titre: string;
  batiment: string;
  probleme: string;
  camera: string;
  technique: string;
  materiel: MaterielId[];
  deroulement: string[];
  dimensions: string;
  duree: string;
  evite: string;
  resultat: string;
};

export type QuartierChemisage = {
  /** slug du quartier (identique à celui du cocon débouchage quand il existe) */
  slug: string;
  nom: string;
  bati: string;
  accroche: string;
  texte: string[];
  defauts: string[];
  technique: string;
  pourquoi: string;
};

export type VilleChemisage = {
  slug: string;
  nom: string;
  cp: string;
  insee: string;
  coords: { lat: number; lon: number };
  accroche: string;
  intro: string[];
  pourquoi: { titre: string; texte: string }[];
  defauts: { defaut: string; explication: string }[];
  techniques: { technique: string; explication: string }[];
  batiments: { type: string; texte: string }[];
  quartiers: QuartierChemisage[];
  faqs: Faq[];
};
