import type { MaterielId } from "@/lib/cocon/types";

export type Materiel = {
  id: MaterielId;
  nom: string;
  court: string;
  role: string;
  principe: string[];
  caracteristiques: { label: string; valeur: string }[];
  quandOnLUtilise: string[];
  limites: string[];
  precautions: string[];
};

/**
 * Fiches matériel. Les caractéristiques sont des plages typiques pour ce type
 * d'appareil (pas des références de modèles précis).
 */
export const MATERIEL: Materiel[] = [
  {
    id: "pompe-pression",
    nom: "Pompe à pression professionnelle",
    court: "Pompe à pression",
    role: "Premier outil sur un WC, un évier ou une douche bouchés : il chasse le bouchon par une onde de pression, sans démontage.",
    principe: [
      "Le cylindre de la pompe est rempli d'eau, puis l'embout est plaqué de façon étanche sur la bonde ou le fond de la cuvette.",
      "Une poussée franche envoie une colonne d'eau sous pression dans le siphon. Le bouchon, comprimé, se déloge et part vers la canalisation, plus large.",
      "En tirant, l'appareil crée au contraire une dépression qui aspire les objets coincés près de la sortie (jouet, brosse, bouchon de coton).",
    ],
    caracteristiques: [
      { label: "Type", valeur: "Pompe manuelle à cylindre (aspiration et refoulement)" },
      { label: "Embouts", valeur: "Cuvette WC, bonde d'évier, siphon de douche, trop-plein" },
      { label: "Diamètres traités", valeur: "32 à 100 mm (évacuations intérieures)" },
      { label: "Énergie", valeur: "Aucune : fonctionne sans électricité ni produit" },
    ],
    quandOnLUtilise: ["Bouchon de papier ou de lingettes dans une cuvette", "Siphon d'évier engorgé de graisse récente", "Bonde de douche colmatée par des cheveux", "Objet tombé dans le WC"],
    limites: ["Inefficace si le bouchon est loin dans la canalisation (au-delà de quelques mètres)", "Ne retire pas le tartre ni les dépôts durcis sur les parois", "À éviter sur une canalisation en très mauvais état"],
    precautions: ["Obturer les trop-pleins pour que la pression ne s'échappe pas", "Protéger le sol de la salle de bains avant de commencer", "Ne jamais l'utiliser après un produit déboucheur chimique (projections)"],
  },
  {
    id: "furet-electrique",
    nom: "Furet électrique",
    court: "Furet électrique",
    role: "Une spirale d'acier en rotation qui avance dans la canalisation pour percer, accrocher ou désagréger le bouchon.",
    principe: [
      "Un tambour contient plusieurs mètres de spirale en acier trempé. Un moteur la fait tourner pendant que le technicien la pousse dans la canalisation.",
      "Au bout, une tête interchangeable : tête droite pour percer, tête en tire-bouchon pour accrocher et ramener, tête à couteaux pour gratter les dépôts.",
      "Le technicien sent la résistance dans la spirale : il sait si le bouchon est mou (papier, lingettes), dur (tartre) ou fibreux (racines).",
    ],
    caracteristiques: [
      { label: "Longueur de spirale", valeur: "De 7,5 m (petit modèle) à 30 m (tambour)" },
      { label: "Diamètre de spirale", valeur: "8 à 22 mm selon le diamètre de canalisation" },
      { label: "Diamètres traités", valeur: "32 à 150 mm" },
      { label: "Têtes", valeur: "Droite, tire-bouchon, bulbe, couteaux, chaîne" },
    ],
    quandOnLUtilise: ["Bouchon trop loin pour la pompe", "Évacuations anciennes avec coudes serrés", "Accès restreint (centre ancien, appartement en étage)", "Dépôts compacts que l'eau ne suffit pas à déloger"],
    limites: ["Il perce le bouchon mais ne nettoie pas toute la paroi", "Moins adapté aux grands diamètres (collecteurs)", "Ne remplace pas un diagnostic caméra si le problème revient"],
    precautions: ["Gants anti-coupure et lunettes obligatoires", "Spirale nettoyée et désinfectée entre deux chantiers", "Vitesse réduite sur les canalisations en grès ou en fonte ancienne"],
  },
  {
    id: "hydrocureuse-camion",
    nom: "Hydrocureuse sur véhicule",
    court: "Hydrocureuse",
    role: "Nettoie l'intégralité de la paroi d'une canalisation avec un jet d'eau à haute pression. C'est le curage, pas seulement le débouchage.",
    principe: [
      "Une pompe à pistons envoie de l'eau sous haute pression dans un flexible enroulé sur un tambour. Au bout du flexible, une buse percée de trous orientés vers l'arrière.",
      "Les jets arrière propulsent la buse vers l'avant tout en décollant les dépôts de la paroi et en les chassant vers l'aval. Un jet avant attaque le bouchon.",
      "Le technicien règle la pression selon le matériau de la canalisation : forte sur le PVC ou la fonte saine, réduite sur le grès ancien ou les joints fragiles.",
    ],
    caracteristiques: [
      { label: "Pression de travail", valeur: "Réglable, jusqu'à 150 à 200 bars selon les appareils" },
      { label: "Débit", valeur: "Environ 30 à 60 litres par minute" },
      { label: "Longueur de flexible", valeur: "De 40 à 80 m" },
      { label: "Diamètres traités", valeur: "40 à 300 mm" },
      { label: "Buses", valeur: "Pénétrante, rotative, chaîne, plate (sable), coupe-racines" },
    ],
    quandOnLUtilise: ["Bouchons à répétition sur la même canalisation", "Graisses figées (cuisines, restaurants)", "Sable et sédiments (bord de mer)", "Tartre épais", "Colonnes d'immeuble et collecteurs"],
    limites: ["Ne répare pas une canalisation cassée ou effondrée", "Demande un accès par un regard ou un tampon de visite", "Pression à adapter sur les réseaux fragiles : la puissance maximale n'est pas toujours la bonne réponse"],
    precautions: ["Vérification du matériau avant de choisir la pression", "Protection des pièces habitées contre les remontées d'eau", "Eau de curage évacuée vers le réseau d'eaux usées, jamais vers le pluvial"],
  },
  {
    id: "hydrocureuse-portative",
    nom: "Groupe haute pression portatif",
    court: "Groupe HP portatif",
    role: "Le principe de l'hydrocurage dans un format transportable à la main : pour les ruelles, les étages et les terrains inaccessibles aux véhicules.",
    principe: [
      "Un moteur et une pompe compacts, montés sur chariot ou sur un cadre portable, alimentés par l'eau du réseau de la maison.",
      "Même logique de buse à jets arrière que l'hydrocureuse sur véhicule, avec un flexible plus fin et une pression généralement plus modérée.",
    ],
    caracteristiques: [
      { label: "Pression de travail", valeur: "Généralement 100 à 150 bars" },
      { label: "Débit", valeur: "Environ 10 à 20 litres par minute" },
      { label: "Longueur de flexible", valeur: "20 à 40 m" },
      { label: "Diamètres traités", valeur: "32 à 125 mm" },
    ],
    quandOnLUtilise: ["Centre ancien et rues piétonnes", "Appartements en étage sans accès véhicule", "Jardins en pente et regards éloignés de la route", "Petits diamètres intérieurs (évier, douche) très entartrés"],
    limites: ["Moins de débit : moins efficace sur les gros collecteurs et le sable en quantité", "Dépend de l'alimentation en eau sur place"],
    precautions: ["Pression adaptée aux canalisations intérieures", "Bâches de protection dans les logements"],
  },
  {
    id: "camera-inspection",
    nom: "Caméra d'inspection de canalisations",
    court: "Caméra d'inspection",
    role: "Voir l'intérieur de la canalisation pour comprendre pourquoi elle se bouche : dépôt, racine, cassure, contre-pente ou raccord déboîté.",
    principe: [
      "Une tête de caméra étanche et éclairée est poussée dans la canalisation au bout d'un jonc semi-rigide gradué.",
      "L'image s'affiche en direct sur un écran. Le compteur indique à quelle distance se trouve chaque défaut.",
      "Sur les modèles autonivelants, l'image reste à l'endroit même quand la tête tourne : la lecture est plus fiable pour repérer une contre-pente ou un affaissement.",
    ],
    caracteristiques: [
      { label: "Tête", valeur: "Étanche, éclairage LED, souvent autonivelante" },
      { label: "Longueur de jonc", valeur: "30 à 60 m" },
      { label: "Diamètres inspectés", valeur: "40 à 250 mm environ" },
      { label: "Enregistrement", valeur: "Vidéo et photos horodatées, compteur de distance" },
    ],
    quandOnLUtilise: ["Bouchons récurrents", "Suspicion de racines ou de cassure", "Après un hydrocurage, pour contrôler le résultat", "Avant un achat immobilier ou pour un dossier d'assurance"],
    limites: ["Ne voit pas à travers un bouchon : il faut parfois déboucher d'abord", "Les coudes très serrés peuvent bloquer la tête"],
    precautions: ["Tête et jonc désinfectés après chaque inspection", "Vidéo remise au client sur demande"],
  },
  {
    id: "tete-coupe-racines",
    nom: "Tête coupe-racines",
    court: "Coupe-racines",
    role: "Découper les racines qui ont envahi une canalisation, de l'intérieur, sans ouvrir de tranchée dans le jardin.",
    principe: [
      "Deux technologies : une tête à lames montée sur le furet électrique (découpe mécanique), ou une buse rotative montée sur l'hydrocureuse (découpe par jets d'eau tournants).",
      "La tête est passée plusieurs fois dans la zone envahie, puis l'hydrocurage évacue les morceaux de racines vers l'aval.",
    ],
    caracteristiques: [
      { label: "Montage", valeur: "Sur furet électrique ou sur hydrocureuse" },
      { label: "Diamètres traités", valeur: "75 à 200 mm" },
      { label: "Contrôle", valeur: "Toujours suivi d'un passage caméra" },
    ],
    quandOnLUtilise: ["Villas avec jardin arboré (pins, platanes, figuiers, lauriers)", "Branchements anciens aux joints poreux", "Sortie de fosse septique envahie"],
    limites: ["Les racines repoussent tant que la fissure n'est pas réparée", "Sur une canalisation effondrée, la découpe ne suffit plus"],
    precautions: ["Inspection caméra avant pour évaluer l'état du conduit", "Découpe progressive pour ne pas aggraver une fissure"],
  },
  {
    id: "localisateur-sonde",
    nom: "Localisateur de sonde",
    court: "Localisateur",
    role: "Repérer depuis la surface, au centimètre près, l'endroit exact où se trouve la tête de caméra (et donc le défaut).",
    principe: [
      "La tête de caméra émet un signal radio à basse fréquence. En surface, le technicien balaie le sol avec un récepteur.",
      "Le récepteur indique la position et la profondeur approximative de la sonde. On peut ainsi marquer au sol l'endroit d'une cassure avant de réparer.",
    ],
    caracteristiques: [
      { label: "Fréquence", valeur: "Basse fréquence, compatible avec la sonde de la caméra" },
      { label: "Information", valeur: "Position et profondeur estimée" },
    ],
    quandOnLUtilise: ["Préparer une réparation localisée (sans casser toute la dalle)", "Retrouver un regard enterré ou un tracé de canalisation inconnu"],
    limites: ["Précision réduite à grande profondeur ou sous des structures métalliques"],
    precautions: ["Marquage au sol temporaire, sans dégradation"],
  },
  {
    id: "gaine-resine",
    nom: "Gaine de chemisage et résine",
    court: "Gaine & résine",
    role: "Le cœur du chemisage : une gaine souple imprégnée de résine qui devient, une fois durcie, une canalisation neuve.",
    principe: [
      "La gaine est un tube souple en feutre polyester ou en fibre de verre, recouvert d'un film étanche. Elle est imprégnée de résine juste avant la pose.",
      "Une fois plaquée contre la paroi et durcie, la résine transforme la gaine en un tube rigide, sans joint, collé à l'intérieur de l'ancienne canalisation.",
    ],
    caracteristiques: [
      { label: "Supports", valeur: "Feutre polyester ou fibre de verre" },
      { label: "Résines", valeur: "Époxy, polyester, vinylester, silicate selon les systèmes" },
      { label: "Épaisseur", valeur: "Quelques millimètres, selon le diamètre et l'usage" },
      { label: "Diamètres", valeur: "Des petites évacuations domestiques aux collecteurs" },
    ],
    quandOnLUtilise: ["Chemisage continu", "Manchettes", "Colonnes d'immeuble"],
    limites: ["Réduit légèrement le diamètre intérieur", "Ne passe pas dans une canalisation effondrée"],
    precautions: ["Imprégnation homogène sur toute la longueur", "Respect des temps et températures de durcissement du fabricant"],
  },
  {
    id: "inverseur",
    nom: "Inverseur (tambour d'inversion)",
    court: "Inverseur",
    role: "L'appareil qui retourne la gaine comme une chaussette et la fait avancer dans la canalisation sous pression.",
    principe: [
      "La gaine imprégnée est enroulée dans un tambour étanche. L'extrémité est fixée à la sortie, puis on met le tambour sous pression d'air.",
      "La gaine se retourne et se déroule dans la canalisation, face résinée contre la paroi, à vitesse contrôlée.",
    ],
    caracteristiques: [
      { label: "Énergie", valeur: "Air comprimé (ou eau selon les systèmes)" },
      { label: "Usage", valeur: "Branchements, colonnes, canalisations sous dalle" },
    ],
    quandOnLUtilise: ["Chemisage par inversion", "Accès par un seul côté"],
    limites: ["Demande un point d'accès compatible avec l'appareil"],
    precautions: ["Pression surveillée en continu"],
  },
  {
    id: "packer",
    nom: "Packer (ballon de manchette)",
    court: "Packer",
    role: "Un ballon gonflable qui transporte la manchette jusqu'au défaut et la plaque contre la paroi pendant le durcissement.",
    principe: [
      "La manchette imprégnée est enroulée autour du packer dégonflé. Le packer est poussé dans la canalisation jusqu'au défaut, à la distance mesurée par la caméra.",
      "Il est ensuite gonflé et maintenu sous pression le temps que la résine durcisse, puis dégonflé et retiré.",
    ],
    caracteristiques: [
      { label: "Usage", valeur: "Réparations ponctuelles (manchettes)" },
      { label: "Positionnement", valeur: "Guidé par caméra et compteur de distance" },
    ],
    quandOnLUtilise: ["Fissure isolée", "Joint ouvert", "Entrée de racines localisée"],
    limites: ["Une manchette par passage"],
    precautions: ["Positionnement contrôlé avant gonflage"],
  },
  {
    id: "robot-fraiseur",
    nom: "Robot fraiseur",
    court: "Robot fraiseur",
    role: "Un robot téléguidé avec caméra et fraise, qui rouvre les raccordements recouverts par la gaine.",
    principe: [
      "Le robot avance dans la canalisation chemisée. Le technicien le pilote à distance en regardant l'image de sa caméra.",
      "Au droit de chaque raccordement repéré avant le chemisage, la fraise découpe la gaine pour rouvrir le passage, puis ébavure les bords.",
    ],
    caracteristiques: [
      { label: "Commande", valeur: "Pilotage à distance avec caméra embarquée" },
      { label: "Usage", valeur: "Colonnes, collecteurs" },
    ],
    quandOnLUtilise: ["Réouverture des piquages d'une colonne", "Réouverture des branchements d'un collecteur"],
    limites: ["Repérage préalable indispensable"],
    precautions: ["Contrôle caméra de chaque réouverture"],
  },
  {
    id: "train-uv",
    nom: "Train de lampes UV",
    court: "Lampes UV",
    role: "Un chariot de lampes ultraviolettes qui durcit les gaines en fibre de verre en avançant à l'intérieur.",
    principe: [
      "Les gaines en fibre de verre sont imprégnées d'une résine qui durcit sous la lumière ultraviolette. Le train de lampes est tiré lentement dans la gaine gonflée.",
      "Une caméra embarquée et des capteurs de température permettent de contrôler le durcissement en direct.",
    ],
    caracteristiques: [
      { label: "Durcissement", valeur: "Rapide, à vitesse d'avancement contrôlée" },
      { label: "Usage", valeur: "Diamètres moyens à grands" },
    ],
    quandOnLUtilise: ["Chemisage par tractage de gaines en fibre de verre"],
    limites: ["Matériel plus lourd"],
    precautions: ["Vitesse et température surveillées"],
  },
];

export function getMateriel(id: string): Materiel | undefined {
  return MATERIEL.find((m) => m.id === id);
}
