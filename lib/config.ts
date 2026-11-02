/**
 * Source unique des paramètres et des tarifs du site.
 * Aucun composant ne doit écrire un numéro de téléphone ou un prix en dur :
 * tout passe par PARAMETRE et TARIF (équivalent des tables Parametre / Tarif
 * des autres sites MONDOR, ce site n'ayant pas de base de données).
 */

export const PARAMETRE = {
  NOM_COMMERCIAL: "Expert Débouchage Toulon",
  NOM_COURT: "Expert Débouchage",
  TEL_PRINCIPAL: "04 22 54 15 85",
  DELAI_INTERVENTION: "30 minutes",
  HORAIRES: "24h/24, 7j/7",
  ZONE: "Toulon et l'aire toulonnaise (Var, 83)",
  GEO: { latitude: 43.1242, longitude: 5.928 },
  // À compléter avant mise en ligne (mentions légales)
  RAISON_SOCIALE: "",
  SIRET: "",
  ADRESSE: "",
  EMAIL: "",
} as const;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://debouchage-toulon.vercel.app").replace(/\/$/, "");

export type TarifKey = "manuel" | "mecanique" | "hydrocurage";

export type Tarif = {
  key: TarifKey;
  titre: string;
  prix: number;
  description: string;
  garantie: string;
  inclus: string[];
};

export const TARIF: Record<TarifKey, Tarif> = {
  manuel: {
    key: "manuel",
    titre: "Débouchage manuel",
    prix: 99,
    description: "Pompe professionnelle ou ventouse haute pression pour les bouchons simples (WC, évier, douche).",
    garantie: "1 mois",
    inclus: ["Déplacement inclus", "Test d'écoulement final", "Garantie 1 mois"],
  },
  mecanique: {
    key: "mecanique",
    titre: "Débouchage au furet",
    prix: 110,
    description: "Furet électrique pour les bouchons tenaces, profonds ou les dépôts accumulés.",
    garantie: "3 mois",
    inclus: ["Déplacement inclus", "Curage mécanique", "Garantie 3 mois"],
  },
  hydrocurage: {
    key: "hydrocurage",
    titre: "Hydrocurage haute pression",
    prix: 199,
    description: "Nettoyage complet des canalisations au jet haute pression : graisses, tartre, racines.",
    garantie: "6 mois",
    inclus: ["Déplacement inclus", "Inspection caméra incluse", "Garantie 6 mois"],
  },
};

export const TARIFS_ORDONNES: Tarif[] = [TARIF.manuel, TARIF.mecanique, TARIF.hydrocurage];

export const PRIX_MIN = Math.min(...TARIFS_ORDONNES.map((t) => t.prix));
export const PRIX_MAX = Math.max(...TARIFS_ORDONNES.map((t) => t.prix));
