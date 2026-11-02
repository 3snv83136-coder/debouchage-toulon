import type { Materiau } from "@/lib/chemisage/types";

export const MATERIAUX: Materiau[] = [
  {
    slug: "fonte",
    nom: "Fonte",
    accroche: "Le matériau des colonnes d'immeuble jusqu'aux années 1980, qui rouille de l'intérieur.",
    histoire: [
      "La fonte grise a été pendant des décennies le matériau standard des descentes et des colonnes d'eaux usées dans les immeubles. Solide, peu bruyante, elle équipe encore une grande partie des bâtiments construits avant les années 1980.",
    ],
    vieillissement: [
      "La fonte rouille de l'intérieur. Des tubercules de rouille se forment, accrochent les matières et réduisent le passage. La paroi s'amincit jusqu'à se percer, surtout sur la partie basse où l'eau circule.",
      "En bord de mer, l'air salin accélère la corrosion des parties exposées.",
    ],
    chemisage: [
      "Le chemisage est particulièrement adapté à la fonte : après décroûtage, la gaine crée une nouvelle paroi lisse et autonome à l'intérieur de l'ancienne, sans démonter la colonne.",
    ],
    precautions: ["Décroûtage soigneux avant chemisage", "Inspection complète pour repérer les tronçons percés de part en part"],
    faqs: [{ q: "Peut-on chemiser une colonne en fonte dans un immeuble occupé ?", a: "Oui, c'est le cas le plus fréquent. Les évacuations sont coupées quelques heures seulement." }],
  },
  {
    slug: "gres",
    nom: "Grès vernissé",
    accroche: "Le matériau des réseaux anciens, solide mais aux joints fragiles, paradis des racines.",
    histoire: [
      "Le grès vernissé, une céramique cuite à haute température, a été largement utilisé pour les canalisations enterrées jusqu'aux années 1960. On le trouve sous les maisons anciennes, les villas de bord de mer et dans les centres historiques.",
    ],
    vieillissement: [
      "Le grès lui-même résiste bien à la corrosion. Ses points faibles sont ses joints, souvent au mortier, qui se fissurent avec les mouvements du sol et laissent entrer les racines. Les tronçons courts multiplient les joints.",
    ],
    chemisage: [
      "Le chemisage continu supprime tous les joints d'un coup. Sur le grès ancien, la préparation se fait avec une pression d'hydrocurage modérée pour ne pas aggraver les fissures existantes.",
    ],
    precautions: ["Curage à pression adaptée", "Coupe complète des racines avant chemisage"],
    faqs: [{ q: "Le grès est-il trop fragile pour être chemisé ?", a: "Non, tant qu'il n'est pas effondré. Le chemisage le protège au contraire." }],
  },
  {
    slug: "fibrociment",
    nom: "Fibrociment",
    accroche: "Un matériau ancien qu'on évite de casser : le chemisage permet de le réhabiliter sans le démolir.",
    histoire: [
      "Le fibrociment a été utilisé pour des canalisations et des descentes, notamment entre les années 1950 et 1990. Les fibrociments anciens peuvent contenir de l'amiante, interdite en France depuis 1997.",
    ],
    vieillissement: [
      "Avec le temps, le fibrociment se dégrade en surface, ses joints vieillissent et les racines s'y infiltrent.",
    ],
    chemisage: [
      "Réhabiliter de l'intérieur évite de démolir ou de découper ces canalisations. Toute intervention sur un matériau susceptible de contenir de l'amiante doit cependant respecter la réglementation en vigueur, notamment pour la préparation et le traitement des déchets.",
    ],
    precautions: ["Identification du matériau avant intervention", "Méthodes de préparation adaptées, sans découpe ni ponçage", "Respect de la réglementation amiante"],
    faqs: [{ q: "Pourquoi le chemisage est-il intéressant pour le fibrociment ?", a: "Parce qu'il permet de ne pas casser la canalisation existante, qui reste en place et sert de moule à la gaine." }],
  },
  {
    slug: "pvc",
    nom: "PVC",
    accroche: "Le matériau moderne, qui ne rouille pas, mais dont les raccords se déboîtent.",
    histoire: ["Le PVC s'est généralisé à partir des années 1970-1980 pour les évacuations et les branchements."],
    vieillissement: [
      "Le PVC ne rouille pas et résiste aux racines par lui-même. Ses faiblesses sont les raccords collés ou à joint qui se déboîtent avec les mouvements du sol, et la fragilité face aux chocs et aux charges.",
    ],
    chemisage: ["Le chemisage, ou plus souvent une manchette, traite efficacement un raccord déboîté ou une fissure sur PVC."],
    precautions: ["Vérifier l'absence de déformation importante"],
    faqs: [{ q: "Faut-il chemiser une canalisation PVC récente ?", a: "Rarement en totalité : une manchette suffit souvent sur le raccord défectueux." }],
  },
  {
    slug: "beton",
    nom: "Béton",
    accroche: "Utilisé pour les collecteurs et grands diamètres, attaqué par les gaz d'égout.",
    histoire: ["Le béton est employé pour les collecteurs et les canalisations de grand diamètre, en copropriété comme sur les réseaux publics."],
    vieillissement: ["Les gaz d'égout peuvent attaquer la partie haute des canalisations en béton, qui se désagrège. Les joints entre éléments vieillissent aussi."],
    chemisage: ["Le chemisage, souvent avec durcissement aux UV sur les grands diamètres, crée une paroi neuve résistante aux effluents."],
    precautions: ["Préparation soignée des surfaces dégradées"],
    faqs: [{ q: "Chemisez-vous les grands collecteurs ?", a: "Nous intervenons sur les réseaux privés (copropriétés, entreprises). Les réseaux publics relèvent de la collectivité." }],
  },
];

export function getMateriau(slug: string): Materiau | undefined {
  return MATERIAUX.find((m) => m.slug === slug);
}
