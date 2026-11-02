import type { Defaut } from "@/lib/chemisage/types";

export const DEFAUTS: Defaut[] = [
  {
    slug: "canalisation-fissuree",
    nom: "Canalisation fissurée",
    accroche: "Une fissure laisse fuir les eaux usées dans le sol et entrer la terre et les racines. Le chemisage la referme pour de bon.",
    verdict: "oui",
    verdictTexte: "Le chemisage est la solution de référence pour une canalisation fissurée mais non effondrée.",
    description: [
      "Une fissure peut être longitudinale (dans le sens de la canalisation) ou circulaire (autour de la canalisation). Elle apparaît avec l'âge, les mouvements du sol, le passage de véhicules ou un choc lors de travaux.",
      "Au début, elle ne gêne pas l'écoulement. Mais elle laisse s'échapper de l'eau, qui ramollit le terrain autour, et elle laisse entrer terre et racines. Avec le temps, elle s'élargit.",
    ],
    causes: ["Mouvements de terrain (sols argileux)", "Vieillissement du matériau", "Charge en surface (allée carrossable, véhicules)", "Choc lors de travaux"],
    signes: ["Odeurs d'égout persistantes à l'extérieur", "Zone de jardin anormalement humide ou affaissée", "Bouchons répétés", "Terre retrouvée dans les regards"],
    camera: "La caméra montre un trait sombre sur la paroi, parfois avec un suintement ou de la terre qui entre. Le compteur indique la distance exacte.",
    solution: ["Curage de la canalisation", "Chemisage continu si plusieurs fissures, manchette si la fissure est isolée", "Contrôle caméra final"],
    techniques: ["chemisage-continu", "chemisage-partiel-manchette"],
    faqs: [
      { q: "Une petite fissure doit-elle être réparée ?", a: "Oui, car elle s'aggrave : l'eau qui fuit affouille le terrain et les racines finissent par entrer. La réparer tôt coûte bien moins cher." },
    ],
  },
  {
    slug: "racines-dans-canalisation",
    nom: "Racines dans la canalisation",
    accroche: "Couper les racines, c'est soulager. Chemiser, c'est empêcher qu'elles reviennent.",
    verdict: "oui",
    verdictTexte: "Après la coupe des racines, le chemisage supprime le joint ou la fissure par lequel elles entraient.",
    description: [
      "Les racines entrent dans une canalisation par un joint ouvert ou une fissure, attirées par l'humidité. Elles y grossissent jusqu'à boucher complètement le passage.",
      "La coupe des racines rétablit l'écoulement, mais ne règle pas la cause : tant que l'ouverture existe, elles reviennent, souvent en quelques mois. Le chemisage referme cette ouverture avec un tube sans joint.",
    ],
    causes: ["Joints de grès ou de fibrociment poreux", "Raccords PVC déboîtés", "Arbres plantés au-dessus du tracé"],
    signes: ["Bouchons qui reviennent après chaque débouchage", "Radicelles dans les regards", "Écoulement de plus en plus lent"],
    camera: "La caméra montre des radicelles en « queue de renard » à un joint, ou une masse de racines qui remplit la section.",
    solution: ["Coupe des racines (furet ou buse coupe-racines)", "Hydrocurage d'évacuation", "Chemisage continu ou manchettes sur chaque point d'entrée", "Contrôle caméra"],
    techniques: ["chemisage-continu", "chemisage-partiel-manchette", "chemisage-branchement"],
    faqs: [
      { q: "Faut-il abattre l'arbre ?", a: "Non. Une fois la canalisation chemisée, les racines n'ont plus d'ouverture pour entrer." },
    ],
  },
  {
    slug: "joint-deboite",
    nom: "Joint déboîté ou décalé",
    accroche: "Deux tronçons qui ne sont plus alignés : une marche dans la canalisation qui accroche tout. Le chemisage la gomme.",
    verdict: "souvent",
    verdictTexte: "Le chemisage convient si le décalage reste modéré ; un déboîtement important peut demander une reprise locale.",
    description: [
      "Un joint déboîté est un raccord entre deux tronçons qui s'est écarté ou décalé. Il crée une marche où les matières s'accrochent, et une ouverture par où entrent terre et racines.",
      "Si le décalage reste faible par rapport au diamètre, la gaine épouse la paroi et recouvre la marche. S'il est trop important, la gaine ne peut pas passer correctement.",
    ],
    causes: ["Mouvements du sol argileux", "Tassement du remblai", "Racines qui écartent les tronçons"],
    signes: ["Bouchons au même endroit", "Terre dans les regards"],
    camera: "La caméra montre un décalage net entre deux tronçons, parfois avec de la terre visible dans l'ouverture.",
    solution: ["Mesure du décalage à la caméra", "Manchette ou chemisage continu si le décalage le permet", "Sinon, reprise localisée du tronçon puis chemisage"],
    techniques: ["chemisage-partiel-manchette", "chemisage-continu"],
    faqs: [
      { q: "Comment savoir si le décalage est trop important ?", a: "C'est la caméra qui tranche, avec les limites indiquées par le fabricant de la gaine." },
    ],
  },
  {
    slug: "fonte-corrodee",
    nom: "Fonte corrodée",
    accroche: "La fonte rouille de l'intérieur jusqu'à se percer. Le chemisage crée une nouvelle paroi lisse, sans démonter la colonne.",
    verdict: "oui",
    verdictTexte: "C'est l'un des usages principaux du chemisage, notamment pour les colonnes d'immeuble.",
    description: [
      "La fonte grise a équipé la plupart des immeubles jusqu'aux années 1970-1980. Avec le temps, et plus vite en bord de mer, elle rouille de l'intérieur. La paroi devient rugueuse, s'amincit, puis se perce.",
      "Résultat : bouchons à répétition (la rouille accroche tout), puis fuites et odeurs dans les gaines techniques.",
    ],
    causes: ["Âge de l'installation", "Effluents agressifs (produits ménagers, gaz d'égout)", "Air salin en bord de mer"],
    signes: ["Taches de rouille et humidité sur les colonnes visibles", "Odeurs dans les gaines techniques", "Bouchons fréquents dans les étages bas"],
    camera: "La caméra montre une paroi couverte de tubercules de rouille, des zones amincies et parfois des perforations.",
    solution: ["Curage et décroûtage de la rouille", "Chemisage continu de la colonne", "Réouverture des piquages au robot"],
    techniques: ["chemisage-colonne-immeuble", "chemisage-continu", "reouverture-branchements-robot"],
    faqs: [
      { q: "Une fonte percée peut-elle être chemisée ?", a: "Oui, si le tronçon garde sa forme : la gaine crée une paroi autonome. Un tronçon très dégradé peut nécessiter une reprise ponctuelle avant." },
    ],
  },
  {
    slug: "infiltrations",
    nom: "Infiltrations d'eau claire",
    accroche: "Quand l'eau de la nappe ou de pluie entre dans vos canalisations, elle surcharge le réseau. Le chemisage les rend étanches.",
    verdict: "oui",
    verdictTexte: "Le chemisage rend la canalisation étanche et supprime les entrées d'eau parasite.",
    description: [
      "Sur les terrains bas ou proches de la mer, la nappe peut entrer dans les canalisations par les joints et les fissures. On parle d'eaux claires parasites.",
      "Elles surchargent le réseau, peuvent provoquer des refoulements et entraînent du sable et de la terre dans les canalisations.",
    ],
    causes: ["Nappe proche de la surface", "Joints non étanches", "Fissures"],
    signes: ["Regards qui se remplissent d'eau claire", "Sable dans les canalisations", "Refoulements en période de pluie"],
    camera: "La caméra montre des suintements ou de l'eau qui jaillit aux joints.",
    solution: ["Curage", "Chemisage continu pour une étanchéité complète"],
    techniques: ["chemisage-continu"],
    faqs: [
      { q: "Pourquoi mon regard est-il plein d'eau propre ?", a: "Souvent à cause d'infiltrations de la nappe. Une inspection caméra le confirme." },
    ],
  },
  {
    slug: "fuite-canalisation-enterree",
    nom: "Fuite de canalisation enterrée",
    accroche: "Les eaux usées qui fuient sous la maison ou le jardin, c'est un risque pour les fondations et le terrain. On colmate de l'intérieur.",
    verdict: "oui",
    verdictTexte: "Le chemisage rend la canalisation étanche sans creuser.",
    description: [
      "Une canalisation d'eaux usées qui fuit déverse ses effluents dans le sol. Sous une maison, l'eau peut affouiller le terrain sous la dalle ; dans un jardin, elle crée des zones humides et malodorantes.",
      "Sous une dalle, la seule alternative au chemisage est souvent de casser le sol.",
    ],
    causes: ["Fissures", "Joints ouverts", "Corrosion"],
    signes: ["Odeurs sous la maison", "Humidité en pied de mur", "Affaissement localisé du sol"],
    camera: "La caméra localise la zone de fuite ; le localisateur la marque en surface.",
    solution: ["Localisation précise", "Manchette ou chemisage continu", "Contrôle"],
    techniques: ["chemisage-sous-dalle", "chemisage-partiel-manchette", "chemisage-continu"],
    faqs: [
      { q: "Une fuite d'eaux usées peut-elle abîmer mes fondations ?", a: "À la longue, l'eau qui s'écoule sous une construction peut affouiller le terrain. Mieux vaut traiter rapidement." },
    ],
  },
  {
    slug: "canalisation-ovalisee",
    nom: "Canalisation ovalisée ou déformée",
    accroche: "Une canalisation écrasée en ovale par le poids du sol : le chemisage peut la renforcer si la déformation reste limitée.",
    verdict: "souvent",
    verdictTexte: "Possible tant que la déformation reste limitée ; au-delà, il faut reprendre le tronçon.",
    description: [
      "Certaines canalisations souples ou anciennes se déforment sous le poids du remblai ou des véhicules. La section n'est plus ronde mais ovale.",
      "Une gaine structurante peut reprendre une partie des efforts, à condition que la déformation reste dans les limites admises par le système utilisé.",
    ],
    causes: ["Charges en surface", "Remblai mal compacté", "Canalisation sous-dimensionnée pour sa profondeur"],
    signes: ["Bouchons", "Écoulement ralenti"],
    camera: "La caméra montre une section aplatie.",
    solution: ["Mesure de la déformation", "Chemisage structurant si possible, sinon reprise"],
    techniques: ["chemisage-continu"],
    faqs: [
      { q: "Toutes les gaines sont-elles structurantes ?", a: "Non. Selon l'épaisseur et le matériau, une gaine peut être simplement étanche ou réellement structurante. Le choix dépend du diagnostic." },
    ],
  },
  {
    slug: "contre-pente",
    nom: "Contre-pente",
    accroche: "Le chemisage ne corrige pas une contre-pente. On vous le dit franchement, et on vous dit quoi faire à la place.",
    verdict: "non",
    verdictTexte: "Le chemisage suit le tracé existant : il ne rattrape pas une pente.",
    description: [
      "Une contre-pente est un creux dans la canalisation où l'eau stagne. La gaine épouse exactement l'ancienne canalisation : le creux reste un creux.",
      "Si votre problème principal est une contre-pente, les solutions sont l'entretien régulier (hydrocurage) ou la reprise du tronçon en tranchée, localement.",
    ],
    causes: ["Tassement du sol", "Pose initiale défectueuse"],
    signes: ["Bouchons récurrents au même endroit", "Eau stagnante visible à la caméra"],
    camera: "La caméra autonivelante montre une flaque permanente sur plusieurs mètres.",
    solution: ["Hydrocurage régulier", "Reprise localisée en tranchée si nécessaire", "Chemisage éventuel des autres tronçons défectueux"],
    techniques: [],
    faqs: [
      { q: "Pourquoi ne pas chemiser quand même ?", a: "Parce que le problème resterait entier. Nous préférons vous orienter vers la bonne solution." },
    ],
  },
  {
    slug: "canalisation-effondree",
    nom: "Canalisation effondrée",
    accroche: "Quand la canalisation s'est écrasée, la gaine ne peut plus passer. Il faut d'abord reprendre le tronçon.",
    verdict: "non",
    verdictTexte: "Une canalisation effondrée ne peut pas être chemisée en l'état.",
    description: [
      "Un effondrement est la rupture complète d'un tronçon : la terre a pris la place de la canalisation. Aucune gaine ne peut passer.",
      "La solution est une reprise localisée, en ouvrant uniquement au droit de l'effondrement. Les autres tronçons défectueux peuvent ensuite être chemisés pour éviter de tout ouvrir.",
    ],
    causes: ["Fissure non traitée qui s'aggrave", "Racines massives", "Charge en surface"],
    signes: ["Bouchon total et immédiat", "Affaissement du sol en surface"],
    camera: "La caméra s'arrête sur de la terre ou des débris.",
    solution: ["Localisation au localisateur", "Reprise localisée en tranchée", "Chemisage du reste si nécessaire"],
    techniques: [],
    faqs: [
      { q: "Faut-il alors tout ouvrir ?", a: "Non : seulement au droit de l'effondrement. Le chemisage permet de traiter le reste sans tranchée." },
    ],
  },
];

export function getDefaut(slug: string): Defaut | undefined {
  return DEFAUTS.find((d) => d.slug === slug);
}
