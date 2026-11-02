import type { Faq } from "@/lib/data/types";

export const GUIDE = {
  definition: [
    "Le chemisage de canalisation consiste à créer une canalisation neuve à l'intérieur de l'ancienne. On y introduit une gaine souple imprégnée de résine, on la plaque contre la paroi, puis on la fait durcir. L'ancienne canalisation sert de moule ; la gaine durcie devient le nouveau tuyau.",
    "Tout se fait depuis les accès existants : regard, pied de colonne, évacuation. Pas de tranchée, pas de carrelage cassé, pas de jardin retourné. C'est pour cela qu'on parle de réhabilitation « sans tranchée » ou « sans casse ».",
  ],
  histoire: [
    "La technique est née au début des années 1970 au Royaume-Uni : l'ingénieur Eric Wood a réhabilité un égout londonien en y durcissant une gaine imprégnée de résine. Le procédé, appelé CIPP (Cured-In-Place Pipe), s'est ensuite diffusé dans le monde entier.",
    "D'abord réservé aux grands réseaux publics, le chemisage s'est miniaturisé. Il est aujourd'hui couramment utilisé pour les branchements de maison, les canalisations sous dalle et les colonnes d'immeuble.",
    "Il est encadré par des normes, notamment la norme internationale NF EN ISO 11296-4 pour la rénovation des réseaux d'assainissement par tubes durcis en place, et la norme américaine ASTM F1216 pour la méthode par inversion.",
  ],
  parcours: [
    { titre: "1. Débouchage", texte: "On commence par libérer et curer la canalisation. C'est souvent à ce moment qu'on découvre qu'elle est abîmée." },
    { titre: "2. Passage caméra", texte: "La caméra montre précisément le défaut, sa position et l'état de toute la canalisation. Sans caméra, pas de chemisage." },
    { titre: "3. Diagnostic et devis", texte: "On vous montre les images, on vous dit si le chemisage est adapté (et quand il ne l'est pas), et on établit un devis." },
    { titre: "4. Chemisage", texte: "Manchette ou chemisage continu, selon les défauts. Souvent en une journée pour une maison." },
    { titre: "5. Caméra de contrôle", texte: "Un dernier passage caméra montre la canalisation réhabilitée. Vous recevez la vidéo." },
  ],
  avantages: [
    { titre: "Rien à casser", texte: "Jardin, allée, terrasse, carrelage, murs : tout reste en place." },
    { titre: "Rapide", texte: "Souvent une journée pour un branchement de maison, contre plusieurs jours de travaux de terrassement." },
    { titre: "Durable", texte: "Une canalisation neuve, sans joint, conçue pour durer des décennies." },
    { titre: "Fini les racines", texte: "Plus de joint, plus d'entrée possible pour les racines." },
    { titre: "Meilleur écoulement", texte: "La paroi lisse de la gaine compense largement la légère perte de diamètre." },
    { titre: "Propre", texte: "Pas de gravats, pas de poussière, pas de camion-benne." },
  ],
  limites: [
    "Une canalisation effondrée ou écrasée ne peut pas être chemisée en l'état.",
    "Une contre-pente n'est pas corrigée : la gaine suit le tracé existant.",
    "Le diamètre intérieur diminue de quelques millimètres.",
    "La canalisation doit être accessible par au moins un point (regard, évacuation, pied de colonne).",
  ],
};

export const COMPARATIF = [
  { critere: "Travaux en surface", chemisage: "Aucun", tranchee: "Tranchée sur toute la longueur" },
  { critere: "Jardin, allée, carrelage", chemisage: "Intacts", tranchee: "À démolir puis à refaire" },
  { critere: "Durée habituelle (maison)", chemisage: "Souvent une journée", tranchee: "Plusieurs jours" },
  { critere: "Gravats et poussière", chemisage: "Aucun", tranchee: "Importants" },
  { critere: "Logement utilisable", chemisage: "Oui, coupure de quelques heures", tranchee: "Gêne pendant toute la durée" },
  { critere: "Joints", chemisage: "Aucun (tube continu)", tranchee: "Nouveaux joints à chaque raccord" },
  { critere: "Remise en état", chemisage: "Aucune", tranchee: "Maçonnerie, carrelage, espaces verts" },
  { critere: "Canalisation effondrée", chemisage: "Impossible", tranchee: "Possible" },
  { critere: "Correction de pente", chemisage: "Impossible", tranchee: "Possible" },
];

export const FACTEURS_PRIX = [
  { titre: "La longueur", texte: "Le chemisage se chiffre généralement au mètre linéaire. Une manchette ponctuelle coûte bien moins qu'une gaine sur toute la longueur." },
  { titre: "Le diamètre", texte: "Plus le diamètre est grand, plus il faut de gaine et de résine." },
  { titre: "Les coudes et les branchements", texte: "Chaque coude et chaque raccordement à rouvrir ajoute du temps et du matériel." },
  { titre: "L'état de la canalisation", texte: "Une canalisation très encrassée ou corrodée demande plus de préparation (curage, décroûtage, coupe des racines)." },
  { titre: "L'accès", texte: "Un regard accessible en bord de rue n'a rien à voir avec une colonne au cœur d'un immeuble occupé." },
  { titre: "La technique", texte: "Manchette, chemisage continu, durcissement à froid ou aux UV : le système dépend du diagnostic." },
];

export const FAQ_CHEMISAGE: Faq[] = [
  { q: "Qu'est-ce que le chemisage de canalisation ?", a: "C'est une technique de réparation qui crée une canalisation neuve à l'intérieur de l'ancienne, grâce à une gaine imprégnée de résine durcie en place. Aucune tranchée n'est nécessaire." },
  { q: "Combien coûte un chemisage ?", a: "Le prix dépend de la longueur, du diamètre, du nombre de coudes, de l'état de la canalisation et de l'accès. Il est établi sur devis gratuit, après débouchage et passage caméra. Le passage caméra est inclus dans notre forfait hydrocurage à {prix:hydrocurage}." },
  { q: "Combien de temps dure le chantier ?", a: "Pour un branchement de maison, souvent une journée. Une colonne d'immeuble se planifie sur plusieurs jours selon le nombre d'étages." },
  { q: "Quelle est la durée de vie d'un chemisage ?", a: "Les gaines sont conçues pour durer plusieurs décennies. De nombreux fabricants annoncent une durée de vie de l'ordre de 50 ans dans des conditions normales d'utilisation." },
  { q: "Le chemisage réduit-il le diamètre ?", a: "De quelques millimètres seulement, l'épaisseur de la gaine. La paroi étant parfaitement lisse, l'écoulement est généralement meilleur qu'avant." },
  { q: "Peut-on chemiser une canalisation avec des coudes ?", a: "Oui, la plupart des systèmes passent les coudes courants, notamment par inversion. La caméra permet de vérifier que les coudes sont compatibles." },
  { q: "Le chemisage fonctionne-t-il sur toutes les canalisations ?", a: "Non. Une canalisation effondrée ne peut pas être chemisée en l'état, et une contre-pente n'est pas corrigée. Nous vous le disons dès le passage caméra." },
  { q: "Faut-il quitter le logement ?", a: "Non. Les évacuations concernées sont simplement hors service pendant quelques heures." },
  { q: "Le chemisage arrête-t-il les racines ?", a: "Oui. Après la coupe des racines, la gaine sans joint supprime les ouvertures par lesquelles elles entraient." },
  { q: "Pourquoi commencer par un débouchage ?", a: "Parce que la gaine doit se coller sur une paroi propre, et que la caméra ne peut inspecter qu'une canalisation dégagée. Le débouchage est la première étape de tout chemisage." },
  { q: "Le chemisage est-il écologique ?", a: "Il évite les terrassements, les gravats et les allers-retours de camions. L'ancienne canalisation reste en place au lieu de finir en décharge." },
  { q: "Intervenez-vous sur le réseau public ?", a: "Non. Nous intervenons sur les canalisations privées, du logement jusqu'au regard de branchement. Le réseau public relève de la collectivité." },
];

export const GLOSSAIRE_CHEMISAGE = [
  { terme: "CIPP", definition: "Cured-In-Place Pipe : tuyau durci en place. Nom international du chemisage." },
  { terme: "Gaine", definition: "Tube souple en feutre ou en fibre de verre, imprégné de résine, qui devient la nouvelle canalisation." },
  { terme: "Manchette", definition: "Courte gaine posée sur un défaut ponctuel." },
  { terme: "Packer", definition: "Ballon gonflable qui plaque la manchette contre la paroi pendant le durcissement." },
  { terme: "Inversion", definition: "Méthode de pose où la gaine se retourne sous pression et se déroule dans la canalisation." },
  { terme: "Polymérisation", definition: "Durcissement de la résine, à froid, à la chaleur ou aux UV." },
  { terme: "Piquage", definition: "Raccordement d'une évacuation secondaire sur une colonne ou un collecteur." },
  { terme: "Robot fraiseur", definition: "Robot téléguidé qui rouvre les piquages après chemisage." },
  { terme: "Regard", definition: "Point d'accès à une canalisation enterrée." },
  { terme: "Réhabilitation sans tranchée", definition: "Ensemble des techniques qui réparent une canalisation sans l'excaver." },
];
