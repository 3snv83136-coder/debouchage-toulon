import type { Faq } from "@/lib/data/types";

export type Ville = {
  nom: string;
  slug: string;
  cp: string;
  quartiers: string[];
  /** Ce qui rend les canalisations de la commune particulières. */
  contexte: string;
  problemes: string[];
  casType: { titre: string; description: string; technique: string };
  faqs: Faq[];
  voisines: string[];
};

// Jetons disponibles dans les textes : voir remplir() dans lib/format.ts
export const VILLES: Ville[] = [
  {
    nom: "Toulon",
    slug: "toulon",
    cp: "83000",
    quartiers: ["Centre-ville", "Le Mourillon", "Pont-du-Las", "Sainte-Musse", "Valbourdin", "Saint-Jean-du-Var", "Le Port"],
    contexte:
      "Le centre ancien de Toulon repose sur des réseaux en grès et en fonte, souvent centenaires. Ces conduits supportent mal les pressions excessives : on les débouche avec une pression maîtrisée, après un diagnostic caméra si besoin, pour ne pas aggraver les fissures existantes.",
    problemes: ["Colonnes d'immeuble anciennes encrassées", "Canalisations en grès fissurées", "WC et éviers bouchés en appartement"],
    casType: {
      titre: "Collecteur en grès au Mourillon",
      description:
        "Canalisation ancienne d'un immeuble du Mourillon obstruée par des dépôts. Hydrocurage à pression réduite pour nettoyer le réseau sans fragiliser le grès, puis contrôle caméra.",
      technique: "Hydrocurage basse pression",
    },
    faqs: [
      {
        q: "Combien coûte un débouchage à Toulon ?",
        a: "Le débouchage manuel est à {prix:manuel}, le furet électrique à {prix:mecanique} et l'hydrocurage haute pression à {prix:hydrocurage}. Le prix est annoncé au téléphone, avant le déplacement.",
      },
      {
        q: "Quel est le délai d'intervention à Toulon centre ?",
        a: "Nous intervenons en général en moins de {delai} dans Toulon (Pont-du-Las, Mourillon, centre, Sainte-Musse…), {horaires}.",
      },
    ],
    voisines: ["la-seyne-sur-mer", "la-valette-du-var", "la-garde", "ollioules"],
  },
  {
    nom: "La Seyne-sur-Mer",
    slug: "la-seyne-sur-mer",
    cp: "83500",
    quartiers: ["Centre", "Les Sablettes", "Tamaris", "Berthe", "Brégaillon", "Mar Vivo"],
    contexte:
      "En bord de mer, les réseaux seynois subissent la corrosion saline et l'ensablement. Après de fortes pluies, le sable compacté peut saturer les regards et les collecteurs des copropriétés du front de mer.",
    problemes: ["Sable compacté dans les regards", "Corrosion des canalisations métalliques", "Refoulements après orage"],
    casType: {
      titre: "Désensablage d'une copropriété aux Sablettes",
      description:
        "Réseau d'une résidence saturé de sable après des intempéries. Hydrocurage des collecteurs et nettoyage complet des regards pour éviter un nouveau reflux.",
      technique: "Hydrocurage et pompage",
    },
    faqs: [
      {
        q: "Intervenez-vous aux Sablettes le week-end ?",
        a: "Oui, nous intervenons {horaires} à La Seyne-sur-Mer, y compris aux Sablettes, à Tamaris et à Mar Vivo.",
      },
    ],
    voisines: ["toulon", "six-fours-les-plages", "saint-mandrier-sur-mer", "ollioules"],
  },
  {
    nom: "La Garde",
    slug: "la-garde",
    cp: "83130",
    quartiers: ["Centre", "Le Rocher", "Sainte-Marguerite", "La Pauline"],
    contexte:
      "Les zones pavillonnaires de La Garde sont plantées de platanes et de pins parasols dont les racines s'infiltrent dans les joints des canalisations. Elles finissent par former de véritables bouchons végétaux.",
    problemes: ["Racines dans les canalisations de jardin", "Refoulements chroniques en villa", "Regards encombrés"],
    casType: {
      titre: "Racines de platane à Sainte-Marguerite",
      description:
        "Refoulements à répétition dans une villa. L'inspection caméra montre des racines dans le conduit ; elles sont découpées par une buse rotative coupe-racines, sans creuser le jardin.",
      technique: "Fraisage hydraulique",
    },
    faqs: [
      {
        q: "Comment éliminer les racines dans mes canalisations à La Garde ?",
        a: "Nous utilisons un furet avec tête coupe-racines ou une buse rotative à haute pression. Les racines sont découpées de l'intérieur, sans tranchée ni dégâts dans le jardin.",
      },
    ],
    voisines: ["toulon", "la-valette-du-var", "le-pradet", "la-crau"],
  },
  {
    nom: "La Valette-du-Var",
    slug: "la-valette-du-var",
    cp: "83160",
    quartiers: ["Centre", "Valgora", "La Coupiane", "Les Espaluns"],
    contexte:
      "Entre copropriétés, pavillons et la zone commerciale de Valgora, La Valette combine des réseaux domestiques et des réseaux à fort débit. L'eau calcaire favorise aussi l'entartrage des évacuations.",
    problemes: ["WC bouchés (tartre, lingettes)", "Bacs à graisse de restaurants saturés", "Colonnes de copropriété"],
    casType: {
      titre: "Bac à graisse saturé à Valgora",
      description:
        "Évacuation d'un restaurant bloquée par un bac à graisse plein. Pompage des graisses et hydrocurage de la sortie pour une réouverture le lendemain matin.",
      technique: "Pompage et hydrocurage",
    },
    faqs: [
      {
        q: "Combien coûte un débouchage de WC à La Valette-du-Var ?",
        a: "Un WC bouché se règle le plus souvent par un débouchage manuel à {prix:manuel}. Si le bouchon est plus loin dans la canalisation, le furet électrique est à {prix:mecanique}.",
      },
      {
        q: "Combien de temps dure une intervention ?",
        a: "Un débouchage classique prend en général entre 30 minutes et 1 heure sur place.",
      },
      {
        q: "Pourquoi mes WC se bouchent-ils souvent ?",
        a: "Les causes fréquentes sont le tartre (eau calcaire), les lingettes et le papier en excès, ou une canalisation à faible pente. Un hydrocurage permet de retrouver le diamètre d'origine.",
      },
    ],
    voisines: ["toulon", "la-garde", "la-crau", "le-pradet"],
  },
  {
    nom: "Ollioules",
    slug: "ollioules",
    cp: "83190",
    quartiers: ["Centre", "Quartier de la Gare", "Faveyrolles", "Les Gorges"],
    contexte:
      "À Ollioules, de nombreuses maisons sont construites sur des terrains en pente, avec des réseaux longs et des regards parfois difficiles d'accès pour un véhicule.",
    problemes: ["Regards en contrebas difficiles d'accès", "Réseaux longs en terrain pentu", "Fosses septiques"],
    casType: {
      titre: "Bouchon en contrebas aux Gorges",
      description:
        "Bouchon situé en bas d'un terrain escarpé, hors de portée du véhicule. Intervention avec un flexible haute pression de grande longueur.",
      technique: "Hydrocurage longue portée",
    },
    faqs: [
      {
        q: "Pouvez-vous intervenir si le regard est loin de la route ?",
        a: "Oui. Nous disposons de flexibles de grande longueur et de matériel portatif pour atteindre les regards situés en fond de terrain.",
      },
    ],
    voisines: ["toulon", "la-seyne-sur-mer", "sanary-sur-mer", "evenos"],
  },
  {
    nom: "Saint-Mandrier-sur-Mer",
    slug: "saint-mandrier-sur-mer",
    cp: "83430",
    quartiers: ["Le Village", "Pin Rolland", "Le Port"],
    contexte:
      "Sur la presqu'île, les réseaux sont exposés au sel et aux dépôts calcaires. L'accès se fait par une seule route : mieux vaut appeler tôt en cas de débordement.",
    problemes: ["Dépôts calcaires durcis", "Corrosion saline", "Résidences secondaires peu utilisées"],
    casType: {
      titre: "Dépôts calcaires au Pin Rolland",
      description: "Obstruction due à des sédiments calcaires durcis. Hydrocurage complet du branchement et test d'écoulement.",
      technique: "Hydrocurage",
    },
    faqs: [
      {
        q: "Intervenez-vous sur toute la presqu'île ?",
        a: "Oui, sur l'ensemble de Saint-Mandrier, du village au Pin Rolland, {horaires}.",
      },
    ],
    voisines: ["la-seyne-sur-mer", "toulon", "six-fours-les-plages"],
  },
  {
    nom: "Hyères",
    slug: "hyeres",
    cp: "83400",
    quartiers: ["Centre-ville", "L'Ayguade", "Les Salins", "Le Port", "Giens", "Costebelle", "L'Almanarre"],
    contexte:
      "Hyères combine un centre historique aux canalisations étroites et des résidences de bord de mer exposées au sable et au sel. Sur la presqu'île de Giens, les racines de pins sont aussi une cause fréquente de bouchons.",
    problemes: ["Canalisations étroites du centre ancien", "Sable et sel en bord de mer", "Racines à Giens"],
    casType: {
      titre: "Collecteur bouché sur la presqu'île de Giens",
      description: "Collecteur principal obstrué par des racines et du sable. Hydrocurage avec buse rotative spéciale racines, puis contrôle caméra.",
      technique: "Hydrocurage et coupe-racines",
    },
    faqs: [
      {
        q: "Quel est le prix d'un débouchage à Hyères ?",
        a: "À partir de {prix:manuel} pour un débouchage manuel. Si l'hydrocurage haute pression est nécessaire, le forfait est de {prix:hydrocurage}. Le prix est confirmé avant l'intervention.",
      },
      {
        q: "Intervenez-vous sur la presqu'île de Giens ?",
        a: "Oui, sur toute la commune d'Hyères : Giens, l'Ayguade, les Salins et les zones excentrées, {horaires}.",
      },
    ],
    voisines: ["carqueiranne", "la-crau", "le-pradet"],
  },
  {
    nom: "Six-Fours-les-Plages",
    slug: "six-fours-les-plages",
    cp: "83140",
    quartiers: ["Centre", "Le Brusc", "Les Lônes", "Reynier", "La Coudoulière", "Les Playes"],
    contexte:
      "Les villas de Six-Fours, notamment au Brusc, sont souvent entourées d'arbres dont les racines s'infiltrent dans les canalisations et les sorties de fosses septiques.",
    problemes: ["Racines dans les branchements de villa", "Fosses septiques", "Résidences de bord de mer"],
    casType: {
      titre: "Racines en sortie de fosse au Brusc",
      description: "Racines obstruant la sortie d'une fosse septique. Coupe-racines hydraulique puis inspection vidéo de contrôle.",
      technique: "Coupe-racines hydraulique",
    },
    faqs: [
      {
        q: "Combien de temps pour une intervention à Six-Fours ?",
        a: "Nous intervenons en général en moins de {delai} à Six-Fours-les-Plages.",
      },
      {
        q: "Faites-vous l'inspection vidéo à Six-Fours ?",
        a: "Oui, nous utilisons une caméra HD pour inspecter les canalisations et localiser précisément la cause du bouchon.",
      },
    ],
    voisines: ["sanary-sur-mer", "la-seyne-sur-mer", "saint-mandrier-sur-mer", "ollioules"],
  },
  {
    nom: "Sanary-sur-Mer",
    slug: "sanary-sur-mer",
    cp: "83110",
    quartiers: ["Port", "Centre historique", "La Gorguette", "Beaucours", "Portissol"],
    contexte:
      "Le centre de Sanary est en grande partie piéton, avec des ruelles étroites : on y intervient avec du matériel compact et des furets électriques peu bruyants.",
    problemes: ["Accès restreint en zone piétonne", "Cuisines de restaurants", "Réseaux anciens"],
    casType: {
      titre: "Évier de restaurant sur le port",
      description: "Évier de cuisine bouché pendant le service du midi. Furet électrique compact pour déboucher sans perturber la salle.",
      technique: "Furet électrique",
    },
    faqs: [
      {
        q: "Intervenez-vous dans le centre piéton de Sanary ?",
        a: "Oui, avec du matériel compact et des furets électriques adaptés aux ruelles et aux zones piétonnes.",
      },
    ],
    voisines: ["six-fours-les-plages", "ollioules", "la-seyne-sur-mer"],
  },
  {
    nom: "Le Pradet",
    slug: "le-pradet",
    cp: "83220",
    quartiers: ["Centre", "La Garonne", "Les Oursinières"],
    contexte: "Les quartiers pavillonnaires du Pradet sont plantés de pins parasols : les intrusions de racines dans les canalisations y sont fréquentes.",
    problemes: ["Racines de pins", "Branchements de villa", "Écoulement lent récurrent"],
    casType: {
      titre: "Racines de pins aux Oursinières",
      description: "Branchement de villa envahi par des racines. Coupe-racines puis inspection vidéo pour vérifier l'état du conduit.",
      technique: "Coupe-racines hydraulique",
    },
    faqs: [
      {
        q: "Proposez-vous l'inspection vidéo au Pradet ?",
        a: "Oui. Après un débouchage complexe, nous recommandons une inspection caméra pour vérifier l'état des canalisations. Elle est incluse avec l'hydrocurage.",
      },
    ],
    voisines: ["la-garde", "carqueiranne", "toulon", "la-valette-du-var"],
  },
  {
    nom: "Carqueiranne",
    slug: "carqueiranne",
    cp: "83320",
    quartiers: ["Centre", "Le Canebas", "Les Pins Penchés", "Le Port"],
    contexte: "Proche de la mer, Carqueiranne cumule corrosion saline et dépôts calcaires dans les réseaux. Un curage préventif régulier prolonge la durée de vie des canalisations.",
    problemes: ["Corrosion saline", "Dépôts calcaires", "Graisses durcies"],
    casType: {
      titre: "Curage préventif près du port",
      description: "Nettoyage préventif d'un réseau d'eaux usées : extraction des graisses durcies et des sédiments.",
      technique: "Hydrocurage préventif",
    },
    faqs: [
      {
        q: "Le sel abîme-t-il mes canalisations à Carqueiranne ?",
        a: "Oui, la proximité de la mer favorise la corrosion. Un curage préventif régulier aide à protéger vos installations.",
      },
    ],
    voisines: ["le-pradet", "hyeres", "la-garde"],
  },
  {
    nom: "La Crau",
    slug: "la-crau",
    cp: "83260",
    quartiers: ["Centre", "La Moutonne", "Les Martins"],
    contexte: "La Crau mêle réseaux urbains et maisons en zone rurale, souvent équipées de fosses septiques. Les sédiments terreux y encrassent les canalisations.",
    problemes: ["Fosses septiques", "Sédiments terreux", "Réseaux mixtes ville/campagne"],
    casType: {
      titre: "Fosse septique qui déborde à La Moutonne",
      description: "Débordement de fosse septique. Pompage, nettoyage des préfiltres et remise en service de l'évacuation.",
      technique: "Pompage et curage",
    },
    faqs: [
      {
        q: "Intervenez-vous à La Moutonne ?",
        a: "Oui, à La Moutonne, aux Martins et sur toute la commune de La Crau.",
      },
    ],
    voisines: ["la-garde", "hyeres", "la-valette-du-var", "sollies-pont"],
  },
  {
    nom: "Solliès-Pont",
    slug: "sollies-pont",
    cp: "83210",
    quartiers: ["Centre", "Les Sénès", "La Tour"],
    contexte: "Dans la vallée du Gapeau, les réseaux accumulent du limon au fil des années. Un curage avant la saison des pluies limite les risques de refoulement.",
    problemes: ["Limon et sédiments", "Refoulements en saison des pluies", "Maisons individuelles"],
    casType: {
      titre: "Curage préventif avant l'automne",
      description: "Entretien complet d'un réseau de villa : extraction des dépôts de limon accumulés pour éviter les refoulements.",
      technique: "Hydrocurage haute pression",
    },
    faqs: [],
    voisines: ["la-crau", "cuers", "belgentier"],
  },
  {
    nom: "Cuers",
    slug: "cuers",
    cp: "83390",
    quartiers: ["Centre", "Les Pas-du-Cerf", "Valcros"],
    contexte: "Entre résidences et domaines agricoles, Cuers compte de nombreux réseaux longs, exposés aux racines et aux sédiments.",
    problemes: ["Lingettes et bouchons ménagers", "Racines", "Réseaux longs"],
    casType: {
      titre: "Évacuation principale bouchée à Valcros",
      description: "Bouchon de lingettes dans l'évacuation principale d'une résidence. Hydrocurage et test d'écoulement.",
      technique: "Hydrocurage",
    },
    faqs: [],
    voisines: ["sollies-pont", "la-crau", "belgentier"],
  },
  {
    nom: "Belgentier",
    slug: "belgentier",
    cp: "83210",
    quartiers: ["Village", "Les Girauds"],
    contexte: "Village ancien aux ruelles étroites, Belgentier demande du matériel portatif : les camions n'accèdent pas partout.",
    problemes: ["Ruelles inaccessibles aux camions", "Réseaux anciens", "Regards enterrés"],
    casType: {
      titre: "Regard enterré dans une ruelle",
      description: "Regard de visite bouché dans une ruelle inaccessible aux véhicules. Débouchage avec un groupe haute pression portatif.",
      technique: "Groupe haute pression portatif",
    },
    faqs: [],
    voisines: ["sollies-pont", "cuers"],
  },
  {
    nom: "Évenos",
    slug: "evenos",
    cp: "83330",
    quartiers: ["Le Broussan", "Sainte-Anne-d'Évenos", "Le Village"],
    contexte: "Commune de collines aux terrains escarpés, Évenos compte beaucoup de maisons en assainissement individuel (fosses septiques).",
    problemes: ["Fosses septiques saturées", "Accès en terrain escarpé", "Réseaux longs"],
    casType: {
      titre: "Fosse septique saturée à Sainte-Anne",
      description: "Fosse septique saturée en zone escarpée. Pompage d'urgence et nettoyage de la sortie.",
      technique: "Pompage",
    },
    faqs: [],
    voisines: ["ollioules", "toulon", "la-seyne-sur-mer"],
  },
];

export function getVille(slug: string): Ville | undefined {
  return VILLES.find((v) => v.slug === slug);
}
