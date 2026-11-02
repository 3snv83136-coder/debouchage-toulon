import type { TarifKey } from "@/lib/config";
import type { Faq } from "@/lib/data/types";

export type IconeService =
  | "toilet"
  | "evier"
  | "douche"
  | "canalisation"
  | "hydrocurage"
  | "camera"
  | "racines"
  | "graisse"
  | "colonne"
  | "fosse"
  | "entretien";

export type Service = {
  slug: string;
  titre: string;
  /** Titre court pour les cartes et le menu. */
  court: string;
  icone: IconeService;
  accroche: string;
  intro: string[];
  signes: string[];
  methode: { titre: string; texte: string }[];
  tarif: TarifKey;
  faqs: Faq[];
};

// Jetons disponibles dans les textes : voir remplir() dans lib/format.ts
export const SERVICES: Service[] = [
  {
    slug: "wc-bouche",
    titre: "Débouchage de WC bouché",
    court: "WC bouché",
    icone: "toilet",
    accroche: "Toilettes qui débordent ou se vident mal : un technicien chez vous en moins de {delai}.",
    intro: [
      "Un WC bouché ne peut pas attendre. Le plus souvent, le bouchon vient d'un excès de papier, de lingettes ou d'un objet tombé dans la cuvette. Parfois, il est plus loin : dans la colonne ou la canalisation d'évacuation.",
      "Nous commençons toujours par la méthode la plus douce. La pompe professionnelle règle la majorité des cas. Si le bouchon résiste, nous passons au furet électrique.",
    ],
    signes: ["L'eau monte dans la cuvette au lieu de s'évacuer", "Gargouillements dans les autres évacuations", "Odeurs persistantes", "La chasse se vide très lentement"],
    methode: [
      { titre: "Diagnostic", texte: "On localise le bouchon : cuvette, pipe de raccordement ou canalisation." },
      { titre: "Pompe professionnelle", texte: "Une pression contrôlée chasse le bouchon sans démonter la cuvette." },
      { titre: "Furet si nécessaire", texte: "Pour un bouchon profond, le furet électrique le désagrège." },
      { titre: "Test d'écoulement", texte: "Plusieurs chasses d'eau pour vérifier que tout s'évacue normalement." },
    ],
    tarif: "manuel",
    faqs: [
      { q: "Que faire en attendant le technicien ?", a: "Ne tirez plus la chasse pour éviter le débordement. Si l'eau monte, coupez le robinet d'arrivée d'eau derrière la cuvette." },
      { q: "Les produits déboucheurs sont-ils efficaces ?", a: "Rarement sur un vrai bouchon, et ils abîment les canalisations. Ils rendent aussi l'intervention dangereuse pour le technicien. Mieux vaut s'en passer." },
    ],
  },
  {
    slug: "debouchage-evier",
    titre: "Débouchage d'évier et de lavabo",
    court: "Évier bouché",
    icone: "evier",
    accroche: "Évier de cuisine ou lavabo qui ne s'écoule plus : débouchage propre, sans démontage inutile.",
    intro: [
      "Dans une cuisine, la cause principale est l'accumulation de graisses et de résidus alimentaires qui se figent dans le siphon et la canalisation. Dans une salle de bains, ce sont plutôt les cheveux et le savon.",
      "Nous nettoyons le siphon, puis la canalisation jusqu'à la colonne si nécessaire, pour un résultat durable.",
    ],
    signes: ["L'eau stagne dans l'évier", "Écoulement de plus en plus lent", "Mauvaises odeurs remontant du siphon", "Bruits de gargouillement"],
    methode: [
      { titre: "Siphon", texte: "Démontage et nettoyage du siphon, cause la plus fréquente." },
      { titre: "Canalisation", texte: "Pompe ou furet pour retirer le bouchon de graisse plus loin." },
      { titre: "Hydrocurage si besoin", texte: "Pour les canalisations très encrassées, nettoyage des parois à haute pression." },
      { titre: "Conseils", texte: "On vous indique comment éviter que le problème revienne." },
    ],
    tarif: "manuel",
    faqs: [
      { q: "Pourquoi mon évier se bouche-t-il souvent ?", a: "Les graisses de cuisson figent dans les canalisations et piègent les résidus. Un hydrocurage nettoie les parois et évite la récidive." },
      { q: "Comment éviter de boucher mon évier ?", a: "Utilisez une grille de protection et ne versez pas de graisse de cuisson dans l'évier : essuyez les poêles avec du papier avant de les laver." },
    ],
  },
  {
    slug: "debouchage-douche-baignoire",
    titre: "Débouchage de douche et baignoire",
    court: "Douche & baignoire",
    icone: "douche",
    accroche: "Douche à l'italienne, bac ou baignoire qui déborde : débouchage sans abîmer l'étanchéité.",
    intro: [
      "Cheveux, savon et calcaire forment un bouchon compact dans la bonde ou le siphon de sol. Sur une douche à l'italienne, il faut intervenir sans abîmer l'étanchéité du receveur.",
      "Nous utilisons une pompe à vide ou un furet fin adapté aux petits diamètres.",
    ],
    signes: ["L'eau s'accumule pendant la douche", "Odeurs d'égout dans la salle de bains", "Bonde qui se vide très lentement"],
    methode: [
      { titre: "Bonde et siphon", texte: "Nettoyage de la bonde et extraction des cheveux." },
      { titre: "Pompe ou furet fin", texte: "Matériel adapté aux siphons de sol sans démontage du receveur." },
      { titre: "Test d'écoulement", texte: "On vérifie le débit avant de partir." },
    ],
    tarif: "manuel",
    faqs: [
      { q: "Pouvez-vous déboucher une douche à l'italienne sans casser le carrelage ?", a: "Oui. Le passage se fait par le siphon de sol, avec un matériel fin qui ne touche pas à l'étanchéité." },
      { q: "Puis-je utiliser des produits chimiques ?", a: "Nous le déconseillons : ils abîment les joints et les canalisations, et sont dangereux pour l'environnement." },
    ],
  },
  {
    slug: "debouchage-canalisation",
    titre: "Débouchage de canalisation",
    court: "Canalisation bouchée",
    icone: "canalisation",
    accroche: "Canalisation principale, évacuation ou regard bouché : diagnostic et débouchage au bon outil.",
    intro: [
      "Quand plusieurs évacuations se bouchent en même temps, le problème est souvent dans la canalisation principale ou dans un regard extérieur.",
      "Selon la cause (lingettes, graisses, tartre, racines, affaissement), nous choisissons le furet électrique ou l'hydrocurage. Une inspection caméra permet de confirmer le diagnostic.",
    ],
    signes: ["Plusieurs évacuations bouchées en même temps", "Refoulement par le point le plus bas de la maison", "Regard extérieur plein", "Odeurs d'égout"],
    methode: [
      { titre: "Localisation", texte: "Ouverture des regards et repérage du point de blocage." },
      { titre: "Furet électrique", texte: "Pour désagréger les bouchons dans la canalisation." },
      { titre: "Hydrocurage", texte: "Si les parois sont encrassées, nettoyage complet à haute pression." },
      { titre: "Contrôle", texte: "Test d'écoulement, et inspection caméra si le problème est récurrent." },
    ],
    tarif: "mecanique",
    faqs: [
      { q: "Quelle est la différence entre débouchage et curage ?", a: "Le débouchage retire le bouchon. Le curage nettoie toute la paroi de la canalisation pour éviter qu'un nouveau bouchon se forme." },
      { q: "Le calcaire peut-il boucher une canalisation ?", a: "Oui : il réduit petit à petit le diamètre de la canalisation jusqu'à l'obstruction. L'hydrocurage permet de le retirer." },
    ],
  },
  {
    slug: "hydrocurage-haute-pression",
    titre: "Hydrocurage haute pression",
    court: "Hydrocurage",
    icone: "hydrocurage",
    accroche: "Nettoyage complet des canalisations au jet haute pression : graisses, tartre, sable et racines.",
    intro: [
      "L'hydrocurage consiste à envoyer de l'eau sous haute pression dans la canalisation grâce à une buse orientée. Le jet décolle les dépôts des parois et les évacue vers l'égout.",
      "C'est la solution la plus efficace pour les canalisations très encrassées et pour l'entretien préventif. Sur les réseaux anciens (grès, fonte), nous adaptons la pression pour ne pas fragiliser les conduits.",
    ],
    signes: ["Bouchons à répétition", "Écoulement lent malgré les débouchages", "Canalisations entartrées", "Avant une vente ou des travaux"],
    methode: [
      { titre: "Choix de la buse", texte: "Buse adaptée au diamètre et au type de dépôt (graisse, tartre, racines)." },
      { titre: "Curage", texte: "Passage de l'amont vers l'aval pour évacuer tous les dépôts." },
      { titre: "Inspection caméra", texte: "Contrôle de la canalisation nettoyée, incluse dans le forfait." },
    ],
    tarif: "hydrocurage",
    faqs: [
      { q: "L'hydrocurage abîme-t-il les canalisations ?", a: "Non, si la pression est adaptée au matériau. Nous réduisons la pression sur les conduits anciens en grès ou en fonte." },
      { q: "À quelle fréquence faire un hydrocurage ?", a: "Pour une maison, tous les 2 à 3 ans suffisent en général. Pour un restaurant ou une copropriété, plutôt une fois par an." },
    ],
  },
  {
    slug: "inspection-camera-canalisation",
    titre: "Inspection caméra des canalisations",
    court: "Inspection caméra",
    icone: "camera",
    accroche: "Voir l'intérieur de vos canalisations pour trouver la cause exacte d'un bouchon ou d'une fuite.",
    intro: [
      "Une caméra étanche est poussée dans la canalisation. Elle permet de voir les bouchons, les racines, les fissures, les contre-pentes et les raccords déboîtés, sans rien casser.",
      "C'est utile en cas de bouchons à répétition, avant un achat immobilier ou après un sinistre pour votre assurance.",
    ],
    signes: ["Bouchons récurrents au même endroit", "Suspicion de racines ou de canalisation cassée", "Achat ou vente d'un bien", "Déclaration de sinistre"],
    methode: [
      { titre: "Passage caméra", texte: "Inspection de la canalisation depuis un regard ou une évacuation." },
      { titre: "Repérage", texte: "Localisation précise des défauts et de leur profondeur." },
      { titre: "Compte rendu", texte: "Vidéo et compte rendu remis par e-mail sur demande." },
    ],
    tarif: "hydrocurage",
    faqs: [
      { q: "Fournissez-vous un rapport après l'inspection ?", a: "Oui, nous remettons un compte rendu et, sur demande, la vidéo de l'inspection par e-mail." },
      { q: "L'inspection caméra est-elle incluse avec l'hydrocurage ?", a: "Oui, le forfait hydrocurage à {prix:hydrocurage} inclut un contrôle caméra de la canalisation nettoyée." },
    ],
  },
  {
    slug: "extraction-racines-canalisation",
    titre: "Extraction de racines dans les canalisations",
    court: "Racines",
    icone: "racines",
    accroche: "Pins, platanes, figuiers : on découpe les racines de l'intérieur, sans creuser le jardin.",
    intro: [
      "Attirées par l'humidité, les racines entrent dans les canalisations par les joints ou les micro-fissures, puis grossissent jusqu'à boucher complètement le conduit. Dans le Var, pins parasols et platanes sont les plus fréquents.",
      "Nous les découpons avec une tête coupe-racines ou une buse rotative à haute pression, puis nous contrôlons à la caméra.",
    ],
    signes: ["Bouchons récurrents dans une maison avec jardin", "Écoulement lent en extérieur", "Regard encombré de radicelles"],
    methode: [
      { titre: "Inspection caméra", texte: "Localisation des racines et évaluation de l'état du conduit." },
      { titre: "Découpe", texte: "Fraisage mécanique ou hydraulique des racines." },
      { titre: "Évacuation", texte: "Hydrocurage pour évacuer les résidus." },
      { titre: "Recommandations", texte: "Si la canalisation est cassée, on vous oriente vers une réparation." },
    ],
    tarif: "hydrocurage",
    faqs: [
      { q: "Comment les racines entrent-elles dans les tuyaux ?", a: "Par des micro-fissures ou des joints défectueux, attirées par l'humidité et les nutriments." },
      { q: "Les racines peuvent-elles revenir ?", a: "Oui, tant que la canalisation n'est pas réparée. Un contrôle annuel permet de les couper avant qu'elles ne bouchent." },
    ],
  },
  {
    slug: "curage-bac-a-graisse",
    titre: "Curage de bac à graisse",
    court: "Bac à graisse",
    icone: "graisse",
    accroche: "Restaurants et commerces de bouche : vidange et curage du bac à graisse, en dehors des heures de service.",
    intro: [
      "Le bac à graisse retient les graisses de cuisine avant le réseau public. S'il n'est pas vidé régulièrement, il déborde, dégage de fortes odeurs et bloque l'évacuation de la cuisine.",
      "Nous intervenons tôt le matin ou après le service pour ne pas gêner votre activité.",
    ],
    signes: ["Odeurs fortes en cuisine", "Évacuation de la plonge lente", "Bac plein ou figé"],
    methode: [
      { titre: "Pompage", texte: "Vidange complète du bac." },
      { titre: "Curage", texte: "Nettoyage des parois et de la canalisation de sortie." },
      { titre: "Contrôle", texte: "Vérification de l'écoulement avant la reprise du service." },
    ],
    tarif: "hydrocurage",
    faqs: [
      { q: "À quelle fréquence vider un bac à graisse ?", a: "Pour un restaurant, une vidange et un curage tous les 3 à 6 mois selon l'activité." },
      { q: "Pouvez-vous intervenir hors des heures de service ?", a: "Oui, nous intervenons {horaires}, y compris tôt le matin ou tard le soir." },
    ],
  },
  {
    slug: "debouchage-colonne-immeuble",
    titre: "Débouchage de colonne d'immeuble",
    court: "Colonne d'immeuble",
    icone: "colonne",
    accroche: "Syndics et copropriétés : débouchage des colonnes d'eaux usées avant le dégât des eaux.",
    intro: [
      "Quand une colonne d'immeuble se bouche, ce sont les appartements des étages bas qui subissent les refoulements. Il faut agir vite pour éviter le dégât des eaux.",
      "Nous débouchons la colonne par hydrocurage depuis le pied de chute ou un tampon de visite, et nous pouvons proposer un curage préventif annuel.",
    ],
    signes: ["Refoulements dans les appartements du rez-de-chaussée", "Plusieurs logements touchés", "Odeurs dans les parties communes"],
    methode: [
      { titre: "Repérage", texte: "Identification du tronçon bouché avec le syndic ou le gardien." },
      { titre: "Hydrocurage", texte: "Débouchage et nettoyage de la colonne." },
      { titre: "Compte rendu", texte: "Rapport d'intervention pour le syndic et l'assurance." },
    ],
    tarif: "hydrocurage",
    faqs: [
      { q: "Qui paie le débouchage d'une colonne ?", a: "En général la copropriété, car la colonne est une partie commune. Le règlement de copropriété le précise." },
    ],
  },
  {
    slug: "pompage-fosse-septique",
    titre: "Pompage et débouchage de fosse septique",
    court: "Fosse septique",
    icone: "fosse",
    accroche: "Fosse qui déborde ou évacuation bloquée en assainissement individuel : intervention d'urgence.",
    intro: [
      "Dans l'arrière-pays toulonnais, beaucoup de maisons ne sont pas reliées au tout-à-l'égout. Une fosse pleine ou un préfiltre colmaté provoque des débordements et des odeurs.",
      "Nous débouchons les canalisations d'entrée et de sortie, nettoyons les préfiltres et organisons le pompage si nécessaire.",
    ],
    signes: ["Débordement au niveau de la fosse", "Évacuations de la maison lentes", "Fortes odeurs à l'extérieur"],
    methode: [
      { titre: "Diagnostic", texte: "On vérifie le niveau de la fosse et l'état des canalisations." },
      { titre: "Débouchage", texte: "Entrée, sortie et préfiltre." },
      { titre: "Pompage", texte: "Vidange de la fosse si elle est pleine." },
    ],
    tarif: "hydrocurage",
    faqs: [
      { q: "Ma fosse déborde, que faire ?", a: "Réduisez au maximum votre consommation d'eau (douche, lave-linge, chasse) et appelez-nous au {tel}." },
    ],
  },
  {
    slug: "entretien-preventif-canalisation",
    titre: "Entretien préventif des canalisations",
    court: "Entretien préventif",
    icone: "entretien",
    accroche: "Curage régulier des canalisations et des regards pour ne plus subir de bouchons.",
    intro: [
      "Un entretien régulier coûte bien moins cher qu'une intervention d'urgence et évite les dégâts des eaux. Il est particulièrement utile pour les copropriétés, les restaurants et les maisons avec jardin arboré.",
      "Nous nettoyons les canalisations, les regards et les siphons de sol, puis nous contrôlons à la caméra.",
    ],
    signes: ["Bouchons déjà survenus par le passé", "Canalisations anciennes", "Commerces et copropriétés"],
    methode: [
      { titre: "Curage", texte: "Hydrocurage des canalisations principales." },
      { titre: "Regards", texte: "Nettoyage des regards et des sédiments." },
      { titre: "Contrôle", texte: "Inspection caméra et recommandations." },
    ],
    tarif: "hydrocurage",
    faqs: [
      { q: "L'entretien préventif est-il rentable ?", a: "Oui : il coûte nettement moins cher qu'une intervention d'urgence et évite les dégâts des eaux." },
      { q: "Où se trouvent mes regards ?", a: "En général en limite de propriété ou aux angles de la maison. Nous pouvons vous aider à les localiser." },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
