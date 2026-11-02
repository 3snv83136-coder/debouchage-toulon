export type Engagement = { titre: string; texte: string; concretement: string[] };

export const CHARTE: Engagement[] = [
  {
    titre: "Le prix avant le déplacement",
    texte: "Le forfait est annoncé au téléphone, en fonction de ce que vous décrivez. Il est confirmé sur place avant de commencer.",
    concretement: [
      "Aucun « diagnostic payant » imposé à l'arrivée",
      "Si une autre technique est nécessaire, on explique pourquoi et on attend votre accord",
      "Facture détaillée remise à la fin : technique, matériel, durée",
    ],
  },
  {
    titre: "La technique la plus douce d'abord",
    texte: "On commence par la méthode qui abîme le moins : pompe, puis furet, puis hydrocurage. On ne casse pas ce qui peut être débouché.",
    concretement: [
      "Pas de casse de carrelage, de dalle ou de mur pour un simple bouchon",
      "Pression d'hydrocurage adaptée au matériau de la canalisation",
      "Inspection caméra avant toute recommandation de travaux",
    ],
  },
  {
    titre: "Pas de travaux inutiles",
    texte: "Une canalisation qui se bouche une fois n'a pas forcément besoin d'être remplacée. On vous montre les images avant de parler de réparation.",
    concretement: [
      "Vidéo de l'inspection remise sur demande",
      "Si des travaux sont nécessaires, on vous explique lesquels et pourquoi, sans obligation de nous les confier",
    ],
  },
  {
    titre: "Zéro produit chimique agressif",
    texte: "Les déboucheurs à base de soude ou d'acide abîment les canalisations et finissent dans la mer. Nous n'en utilisons pas.",
    concretement: [
      "Débouchage mécanique et à l'eau uniquement",
      "Conseils d'entretien sans produit (eau chaude, grille, bac à graisse)",
    ],
  },
  {
    titre: "Respect du réseau et de la mer",
    texte: "Les eaux de curage partent dans le réseau d'eaux usées, jamais dans le pluvial qui rejoint directement la Méditerranée.",
    concretement: [
      "Déchets solides (lingettes, graisses, racines) récupérés et évacués",
      "Matériel nettoyé et désinfecté entre deux chantiers",
    ],
  },
  {
    titre: "Un logement laissé propre",
    texte: "Bâches au sol, protections autour des sanitaires, nettoyage en fin d'intervention.",
    concretement: ["Surchaussures dans les logements", "Nettoyage de la zone de travail avant de partir"],
  },
  {
    titre: "Une garantie qui veut dire quelque chose",
    texte: "Chaque forfait est garanti. Si le même bouchon revient pendant la période de garantie, on revient sans frais.",
    concretement: ["Garantie de 1 à 6 mois selon la technique", "Test d'écoulement réalisé devant vous"],
  },
];
