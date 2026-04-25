import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation
} from 'react-router-dom';
import AdCampaignDashboard from './AdCampaignDashboard.tsx';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Droplets, 
  Camera, 
  Zap, 
  AlertCircle, 
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Menu,
  X,
  CreditCard,
  Star,
  ArrowRight,
  ArrowUp,
  Award,
  Medal,
  Building2,
  Users2,
  Hammer
} from 'lucide-react';

// --- Constants ---
const PHONE = "04 22 54 15 85";
const COMMUNES = [
  { 
    name: "Toulon", 
    slug: "toulon", 
    zip: "83000",
    neighborhoods: ["Le Mourillon", "Pont-du-Las", "Sainte-Musse", "Valbourdin", "Saint-Jean-du-Var"],
    localInsight: "Expertise spécifique sur les réseaux anciens en grès et fonte du centre historique, nécessitant un curage basse pression maîtrisé pour préserver l'intégrité des conduits centenaires.",
    bluf: "Expert Débouchage Toulon : Spécialiste des infrastructures hydrauliques anciennes du centre-ville. Intervention artisanale ciblée sur les réseaux en grès et fonte. Diagnostic structurel immédiat.",
    eaatEvidence: "Maîtrise documentée du patrimoine hydraulique toulonnais. Plus de 15 ans d'interventions techniques dans les immeubles haussmanniens de la place de la Liberté et du port.",
    faqs: [
      {
        q: "Combien coûte un débouchage à Toulon ?",
        a: "Le tarif pour un débouchage manuel à Toulon commence à 99€ TTC. Pour un hydrocurage haute pression, le forfait est de 149€ TTC. Nos prix sont fixes et annoncés avant l'intervention."
      },
      {
        q: "Quel est le délai d'intervention à Toulon Centre ?",
        a: "Nous intervenons généralement en moins de 30 minutes dans le centre-ville de Toulon (Pont-du-Las, Mourillon, etc.) grâce à notre proximité locale."
      }
    ],
    caseStudy: {
      title: "Restauration d'un collecteur en grès au Mourillon",
      desc: "Intervention délicate sur une canalisation du siècle dernier dans le quartier du Mourillon. Là où d'autres auraient tout cassé, notre hydrocurage basse pression contrôlé a permis de nettoyer le réseau sans créer de fissures supplémentaires. Un sauvetage patrimonial réussi.",
      technique: "Hydrocurage Basse Pression"
    }
  },
  { 
    name: "La Seyne-sur-Mer", 
    slug: "la-seyne-sur-mer", 
    zip: "83500",
    neighborhoods: ["Les Sablettes", "Tamaris", "Berthe", "Brégaillon"],
    localInsight: "Traitement spécifique de la corrosion saline et du compactage sédimentaire propre au littoral seynois.",
    bluf: "Débouchage La Seyne-sur-Mer : Expertise technique en milieu salin. Désensablage haute performance et curage anti-corrosion pour réseaux côtiers (Sablettes, Tamaris).",
    eaatEvidence: "Équipement d'aspiration cyclonique adapté aux sédiments marins. Partenaire technique privilégié des syndics de copropriété du front de mer seynois.",
    faqs: [
      {
        q: "Intervenez-vous aux Sablettes le week-end ?",
        a: "Oui, nous assurons un service d'urgence 24h/24 et 7j/7 à La Seyne-sur-Mer, y compris dans les quartiers balnéaires comme Les Sablettes et Tamaris."
      }
    ],
    caseStudy: {
      title: "Désensablage haute performance aux Sablettes",
      desc: "Suite à de fortes intempéries, le réseau d'une copropriété aux Sablettes était saturé de sable marin compacté. Nous avons procédé à une extraction par aspiration cyclonique et un nettoyage complet des regards pour éviter tout reflux futur.",
      technique: "Aspiration Cyclonique"
    }
  },
  { 
    name: "La Garde", 
    slug: "la-garde", 
    zip: "83130",
    neighborhoods: ["Le Rocher", "Sainte-Marguerite", "La Pauline"],
    localInsight: "Spécialisation en fraisage hydraulique pour l'élimination des racines de platanes et pins parasols en zone pavillonnaire.",
    bluf: "Expert Assainissement La Garde : Maîtrise du fraisage coupe-racines. Diagnostic caméra 4K systématique pour l'intégrité des réseaux de villas.",
    eaatEvidence: "Technique de fraisage hydraulique rotatif sans excavation. Agrément préfectoral pour la maintenance des systèmes d'assainissement individuels.",
    faqs: [
      {
        q: "Comment éliminer les racines dans mes canalisations à La Garde ?",
        a: "Nous utilisons un furet mécanique avec tête coupe-racines ou un fraisage hydraulique haute pression pour libérer vos canalisations sans endommager vos extérieurs."
      }
    ],
    caseStudy: {
      title: "Extraction de racines de platanes à Sainte-Marguerite",
      desc: "Une villa de Sainte-Marguerite subissait des refoulements chroniques. Notre caméra a révélé des racines de platanes massives. Utilisation d'une buse coupe-racines rotative haute performance pour libérer le conduit sans creuser le jardin.",
      technique: "Fraisage Hydraulique"
    }
  },
  { 
    name: "La Valette-du-Var", 
    slug: "la-valette-du-var", 
    zip: "83160",
    neighborhoods: ["Valgora", "La Coupiane", "Les Espaluns"],
    localInsight: "Maintenance préventive pour les grandes zones commerciales et copropriétés.",
    bluf: "Urgence WC bouché à La Valette-du-Var : intervention rapide par hydrocurage haute pression ou furet mécanique. Matériel professionnel, tarifs transparents et diagnostic précis.",
    eaatEvidence: "Maintenance technique pour les enseignes de Valgora. Expertise en réseaux à fort débit et entretien des bacs à graisse.",
    faqs: [
      {
        q: "Combien coûte un débouchage de WC à La Valette-du-Var ?",
        a: "Le prix dépend de la méthode utilisée. Pour un débouchage simple au furet mécanique, les tarifs commencent à 99€. Un hydrocurage haute pression peut être nécessaire pour les bouchons complexes."
      },
      {
        q: "Combien de temps dure une intervention à La Valette ?",
        a: "Un débouchage classique prend généralement entre 30 minutes et 1 heure. Nous intervenons rapidement autour de Valgora et du centre-ville."
      },
      {
        q: "Pourquoi mes WC se bouchent souvent ?",
        a: "Les causes fréquentes à La Valette sont l'accumulation de tartre (eau calcaire), les lingettes ou un affaissement partiel de la canalisation."
      }
    ],
    caseStudy: {
      title: "Curage d'urgence en zone commerciale Valgora",
      desc: "Intervention de nuit sur un bac à graisse saturé bloquant l'évacuation d'un restaurant à Valgora. Nettoyage complet et pompage des graisses pour permettre l'ouverture de l'établissement dès le lendemain matin.",
      technique: "Hydrocurage 200 Bars"
    }
  },
  { 
    name: "Ollioules", 
    slug: "ollioules", 
    zip: "83190",
    neighborhoods: ["Quartier de la Gare", "Faveyrolles", "Les Gorges"],
    localInsight: "Expertise sur les terrains en pente et réseaux d'assainissement complexes.",
    bluf: "Urgence Ollioules : Spécialiste terrains escarpés. Matériel compact pour accès difficiles. Intervention rapide même en zone reculée.",
    eaatEvidence: "Techniciens formés à la logistique en zone de collines. Équipement de pompage à longue portée (jusqu'à 80m).",
    caseStudy: {
      title: "Débouchage par gravité complexe aux Gorges",
      desc: "Résolution d'un bouchon situé en contrebas d'un terrain escarpé aux Gorges d'Ollioules. Utilisation de 60 mètres de flexible haute pression et d'un treuil pour atteindre le point de blocage inaccessible aux véhicules.",
      technique: "Pompage Longue Portée"
    }
  },
  { 
    name: "Saint-Mandrier-sur-Mer", 
    slug: "saint-mandrier-sur-mer", 
    zip: "83430",
    neighborhoods: ["Le Village", "Pin Rolland"],
    localInsight: "Logistique spécifique pour les interventions sur la presqu'île.",
    bluf: "Débouchage Saint-Mandrier : Intervention prioritaire presqu'île. Curage écologique littoral. Technicien local disponible immédiatement.",
    eaatEvidence: "Connaissance parfaite des contraintes d'accès de la presqu'île. Utilisation de produits biodégradables certifiés.",
    caseStudy: {
      title: "Assainissement littoral au Pin Rolland",
      desc: "Traitement d'une obstruction causée par des sédiments calcaires durcis au Pin Rolland. Nettoyage complet à l'eau claire recyclée, respectueux de l'écosystème marin fragile de la presqu'île.",
      technique: "Hydrocurage Éco-responsable"
    }
  },
  { 
    name: "Hyères", 
    slug: "hyeres", 
    zip: "83400",
    neighborhoods: ["Centre-Ville", "L'Ayguade", "Les Salins", "Le Port", "Giens", "Costebelle"],
    localInsight: "À Hyères, nous intervenons souvent dans le centre historique aux canalisations étroites ainsi que dans les résidences du bord de mer soumises au sel et au sable.",
    bluf: "Débouchage canalisation à Hyères : intervention rapide 24h/7j. Tarif fixe 99€ TTC. Experts locaux pour WC, éviers et réseaux d'assainissement.",
    eaatEvidence: "Notre équipe hyéroise a réalisé plus de 450 débouchages cette année, avec une connaissance parfaite des réseaux de l'Almanarre et du Port.",
    faqs: [
      { q: "Quel est le prix d'un débouchage à Hyères ?", a: "Le tarif est fixe : 99€ TTC pour un débouchage manuel ou à la pompe. Si l'utilisation de l'hydrocureur haute pression est nécessaire, le tarif est de 249€ TTC." },
      { q: "Intervenez-vous sur la presqu'île de Giens ?", a: "Oui, nous intervenons sur l'ensemble de la commune d'Hyères, y compris Giens, l'Ayguade et les zones excentrées, 24h/24 et 7j/7." }
    ],
    caseStudy: {
      title: "Réseau complexe en zone littorale",
      desc: "Débouchage d'un collecteur principal bouché par des racines et du sable sur la presqu'île de Giens. Hydrocurage haute pression avec buse rotative spéciale racines.",
      technique: "Hydrocurage haute pression"
    }
  },
  { 
    name: "Six-Fours-les-Plages", 
    slug: "six-fours-les-plages", 
    zip: "83140",
    neighborhoods: ["Le Brusc", "Les Lônes", "Reynier", "La Coudoulière", "Les Playes"],
    localInsight: "Nous connaissons bien les problématiques de Six-Fours, notamment les racines d'arbres qui s'infiltrent dans les réseaux des villas du Brusc.",
    bluf: "Urgence débouchage Six-Fours : technicien sur place en moins de 30 min. Tarif transparent 99€ TTC. Spécialiste WC et canalisations bouchées.",
    eaatEvidence: "Interventions régulières pour les commerces du centre et les résidences de bord de mer depuis plus de 8 ans.",
    faqs: [
      { q: "Combien de temps pour une intervention à Six-Fours ?", a: "Grâce à nos techniciens basés à proximité, nous intervenons généralement en moins de 30 minutes à Six-Fours-les-Plages." },
      { q: "Faites-vous l'inspection vidéo à Six-Fours ?", a: "Oui, nous utilisons des caméras HD pour inspecter vos canalisations et identifier précisément la cause du bouchon ou l'état de vos tuyaux." }
    ],
    caseStudy: {
      title: "Infiltration de racines au Brusc",
      desc: "Extraction de racines massives obstruant la sortie d'une fosse septique dans une villa. Inspection vidéo de contrôle.",
      technique: "Coupe-racines hydraulique"
    }
  },
  { 
    name: "Sanary-sur-Mer", 
    slug: "sanary-sur-mer", 
    zip: "83110",
    neighborhoods: ["Port", "La Gorguette", "Beaucours"],
    localInsight: "Accès restreint dans le centre historique, nécessite un matériel compact.",
    bluf: "Débouchage Sanary : Expert centre historique. Matériel compact pour ruelles étroites. Intervention discrète et rapide.",
    eaatEvidence: "Spécialiste des interventions en zone piétonne et portuaire.",
    faqs: [
      { q: "Intervenez-vous dans le centre piéton de Sanary ?", a: "Oui, nous disposons de matériel compact et de furets électriques silencieux adaptés aux interventions en zone piétonne et dans le centre historique." }
    ],
    caseStudy: {
      title: "Débouchage express sur le Port",
      desc: "Intervention rapide sur un restaurant du port de Sanary pendant le service du midi. Utilisation d'un furet électrique silencieux pour déboucher l'évier de cuisine sans perturber les clients en terrasse.",
      technique: "Furet Électrique Silencieux"
    }
  },
  { 
    name: "Le Pradet", 
    slug: "le-pradet", 
    zip: "83220",
    neighborhoods: ["La Garonne", "Les Oursinières", "Centre"],
    localInsight: "Zones pavillonnaires avec intrusions fréquentes de racines de pins.",
    bluf: "Urgence Le Pradet : Spécialiste coupe-racines. Diagnostic vidéo 4K offert. Intervention 7j/7.",
    eaatEvidence: "Maîtrise des techniques de fraisage pour réseaux de villas.",
    faqs: [
      { q: "Proposez-vous l'inspection vidéo au Pradet ?", a: "Oui, nous effectuons systématiquement une inspection vidéo après un débouchage complexe pour vérifier l'état des canalisations." }
    ],
    caseStudy: {
      title: "Extraction racines aux Oursinières",
      desc: "Libération d'un branchement de villa aux Oursinières envahi par des racines de pins parasols. Inspection vidéo finale pour confirmer l'intégrité du conduit.",
      technique: "Coupe-racines Hydraulique"
    }
  },
  { 
    name: "Carqueiranne", 
    slug: "carqueiranne", 
    zip: "83320",
    neighborhoods: ["Le Canebas", "Les Pins Penchés", "Port"],
    localInsight: "Corrosion saline et sédiments calcaires.",
    bluf: "Débouchage Carqueiranne : Curage haute pression littoral. Intervention rapide 24h/24. Prix transparent 99€.",
    eaatEvidence: "Équipement résistant à la corrosion pour interventions marines.",
    faqs: [
      { q: "Le sel abîme-t-il mes canalisations à Carqueiranne ?", a: "Oui, la proximité de la mer favorise la corrosion. Nous conseillons un curage préventif régulier pour protéger vos installations." }
    ],
    caseStudy: {
      title: "Assainissement Port de Carqueiranne",
      desc: "Nettoyage préventif des réseaux d'eaux usées du secteur portuaire. Extraction de graisses durcies et de sédiments marins.",
      technique: "Hydrocurage Préventif"
    }
  },
  { 
    name: "La Crau", 
    slug: "la-crau", 
    zip: "83260",
    neighborhoods: ["La Moutonne", "Les Martins", "Centre"],
    localInsight: "Réseaux mixtes urbains et ruraux, sédiments terreux.",
    bluf: "Urgence La Crau : Débouchage toutes canalisations. Spécialiste La Moutonne. Arrivée en 20 min. Devis gratuit.",
    eaatEvidence: "Connaissance approfondie des réseaux d'assainissement de la vallée du Gapeau.",
    faqs: [
      { q: "Intervenez-vous à La Moutonne ?", a: "Oui, nous intervenons très fréquemment à La Moutonne et sur l'ensemble de la commune de La Crau." }
    ],
    caseStudy: {
      title: "Curage fosse septique à La Moutonne",
      desc: "Intervention d'urgence sur un débordement de fosse septique à La Moutonne. Pompage, nettoyage des pré-filtres et remise en service du champ d'épandage.",
      technique: "Pompage et Curage"
    }
  },
  { 
    name: "Solliès-Pont", 
    slug: "sollies-pont", 
    zip: "83210",
    neighborhoods: ["Centre", "Les Sénès", "La Tour"],
    localInsight: "Réseaux impactés par les sédiments de la vallée du Gapeau.",
    bluf: "Débouchage Solliès-Pont : Expert assainissement vallée. Intervention express 24h/24. Tarif fixe 99€.",
    eaatEvidence: "Spécialiste des réseaux d'assainissement en zone péri-urbaine.",
    caseStudy: {
      title: "Curage préventif à Solliès-Pont",
      desc: "Entretien complet d'un réseau de villa à Solliès-Pont avant la saison des pluies. Extraction de dépôts de limon accumulés au fil des années pour prévenir tout risque d'inondation.",
      technique: "Hydrocurage Haute Pression"
    }
  },
  { 
    name: "Cuers", 
    slug: "cuers", 
    zip: "83390",
    neighborhoods: ["Centre", "Les Pas-du-Cerf", "Valcros"],
    localInsight: "Zones résidentielles et agricoles, racines et sédiments.",
    bluf: "Urgence Cuers : Débouchage rapide toutes canalisations. Spécialiste Valcros. Arrivée en 25 min.",
    eaatEvidence: "Interventions régulières sur les domaines viticoles et résidentiels de Cuers.",
    caseStudy: {
      title: "Débouchage d'urgence à Valcros",
      desc: "Rétablissement rapide de l'évacuation principale d'une résidence à Valcros. Le bouchon, causé par un amas de lingettes, a été pulvérisé par hydrocurage en moins de 30 minutes.",
      technique: "Hydrocurage Flash"
    }
  },
  { 
    name: "Belgentier", 
    slug: "belgentier", 
    zip: "83210",
    neighborhoods: ["Village", "Les Girauds"],
    localInsight: "Village de caractère, accès difficiles, réseaux anciens.",
    bluf: "Débouchage Belgentier : Expert accès difficiles. Matériel ultra-compact. Intervention rapide 7j/7.",
    eaatEvidence: "Maîtrise des interventions dans les villages anciens du Var.",
    caseStudy: {
      title: "Débouchage ruelle à Belgentier",
      desc: "Intervention réussie dans une ruelle médiévale de Belgentier inaccessible aux camions. Utilisation d'un groupe haute pression portatif pour déboucher un regard de visite enterré.",
      technique: "Groupe HP Portatif"
    }
  },
  { 
    name: "Évenos", 
    slug: "evenos", 
    zip: "83330",
    neighborhoods: ["Le Broussan", "Sainte-Anne-d'Évenos"],
    localInsight: "Zone de collines, terrains escarpés, fosses septiques.",
    bluf: "Urgence Évenos : Spécialiste assainissement individuel et collectif. Intervention rapide Le Broussan.",
    eaatEvidence: "Expertise en pompage et débouchage en zone de montagne varoise.",
    caseStudy: {
      title: "Pompage fosse à Sainte-Anne",
      desc: "Intervention d'urgence sur une fosse septique saturée à Sainte-Anne-d'Évenos. Accès complexe en zone escarpée maîtrisé grâce à notre véhicule 4x4 hydrocureur léger.",
      technique: "Hydrocureur 4x4"
    }
  }
];

const EXPERTISES = [
  { 
    slug: "debouchage-canalisation-pas-cher", 
    title: "Débouchage canalisation : Transparence Totale",
    bluf: "L'excellence technique accessible : Forfait fixe 99€ sans frais cachés. Nous refusons le jargon commercial pour une clarté tarifaire absolue dès le premier appel.",
    faqs: [
      { q: "Comment garantissez-vous vos prix ?", a: "Notre modèle repose sur une logistique locale optimisée dans le Var, éliminant les intermédiaires et les frais de déplacement superflus." }
    ]
  },
  { 
    slug: "urgence-wc-bouche", 
    title: "Urgence WC bouché",
    bluf: "WC bouché ? Intervention immédiate 24h/7j. Débouchage manuel ou mécanique. Tarif fixe annoncé avant intervention.",
    faqs: [
      { q: "Que faire en attendant le technicien ?", a: "N'essayez pas de tirer la chasse à plusieurs reprises pour éviter le débordement. Coupez l'arrivée d'eau si nécessaire." }
    ]
  },
  { 
    slug: "curage-canalisation-prix", 
    title: "Curage canalisation prix",
    bluf: "Curage technique : Nettoyage haute pression pour une longévité accrue de vos réseaux. Forfaits transparents selon le métrage.",
    faqs: [
      { q: "Quelle est la différence entre débouchage et curage ?", a: "Le débouchage élimine le bouchon immédiat, tandis que le curage nettoie les parois de la canalisation pour prévenir les futurs bouchons." }
    ]
  },
  { 
    slug: "inspection-camera-canalisation", 
    title: "Inspection caméra canalisation",
    bluf: "Diagnostic précis : Caméra HD pour localiser bouchons, racines ou cassures. Rapport vidéo fourni pour vos assurances.",
    faqs: [
      { q: "Quand faut-il faire une inspection caméra ?", a: "En cas de bouchons récurrents, avant un achat immobilier ou suite à un sinistre pour identifier la cause exacte du problème." }
    ]
  },
  { 
    slug: "debouchage-evier", 
    title: "Débouchage évier",
    bluf: "Évier bouché ? Intervention rapide pour libérer vos canalisations de cuisine. Utilisation de furet ou pompe haute pression. Tarif fixe 99€.",
    faqs: [
      { q: "Pourquoi mon évier se bouche-t-il souvent ?", a: "L'accumulation de graisses alimentaires et de résidus de savon est la cause principale. Un curage régulier peut prévenir ce problème." }
    ]
  },
  { 
    slug: "assainissement-canalisations", 
    title: "Assainissement canalisations",
    bluf: "Assainissement complet : Curage, pompage et entretien de vos réseaux d'eaux usées. Expertise certifiée pour particuliers et professionnels.",
    faqs: [
      { q: "Qu'est-ce que l'assainissement ?", a: "C'est l'ensemble des techniques de collecte, de transport et de traitement des eaux usées avant leur rejet dans le milieu naturel." }
    ]
  },
  { 
    slug: "plombier-debouchage-urgence", 
    title: "Plombier débouchage urgence",
    bluf: "Besoin d'un plombier en urgence ? Spécialiste du débouchage disponible 24h/7j. Arrivée rapide, diagnostic précis et dépannage immédiat.",
    faqs: [
      { q: "Intervenez-vous la nuit ?", a: "Oui, nous avons une équipe d'astreinte disponible 24h/24 pour toutes vos urgences de canalisations bouchées." }
    ]
  },
  { 
    slug: "hydrocurage-haute-pression", 
    title: "Hydrocurage haute pression",
    bluf: "Hydrocurage professionnel : Nettoyage en profondeur par jet d'eau haute pression (200 bars). Élimine tartre, graisses et résidus tenaces.",
    faqs: [
      { q: "L'hydrocurage est-il dangereux pour mes tuyaux ?", a: "Non, si la pression est maîtrisée par un professionnel, c'est la méthode la plus sûre et la plus efficace pour nettoyer vos réseaux." }
    ]
  },
  { 
    slug: "debouchage-douche-italienne", 
    title: "Débouchage douche",
    bluf: "Douche ou baignoire qui déborde ? Débouchage efficace sans démonter vos installations. Intervention propre et rapide.",
    faqs: [
      { q: "Comment déboucher une douche italienne ?", a: "Nous utilisons souvent une pompe à vide ou un furet fin pour passer dans le siphon sans endommager l'étanchéité." }
    ]
  },
  { 
    slug: "entreprise-debouchage-expert", 
    title: "Entreprise débouchage experte",
    bluf: "Expertise en assainissement : Votre partenaire de confiance pour tous problèmes de canalisations. Matériel de pointe et techniciens qualifiés.",
    faqs: [
      { q: "Quelles garanties offrez-vous ?", a: "Toutes nos interventions sont garanties. Nous effectuons un test d'écoulement systématique avant de quitter les lieux." }
    ]
  },
  { 
    slug: "debouchage-baignoire-bouchee", 
    title: "Débouchage baignoire bouchée",
    bluf: "Baignoire bouchée ? Nous intervenons pour rétablir l'écoulement rapidement. Solution durable et conseils d'entretien inclus.",
    faqs: [
      { q: "Puis-je utiliser des produits chimiques ?", a: "Nous le déconseillons fortement car ils peuvent endommager vos tuyaux et sont dangereux pour l'environnement et nos techniciens." }
    ]
  },
  { 
    slug: "curage-bac-a-graisse-restaurant", 
    title: "Curage bac à graisse",
    bluf: "Spécial restauration : Entretien et curage de bacs à graisse. Intervention discrète et conforme aux normes sanitaires en vigueur.",
    faqs: [
      { q: "À quelle fréquence vider un bac à graisse ?", a: "Pour un restaurant, nous préconisons une vidange et un curage tous les 3 à 6 mois selon l'activité." }
    ]
  },
  { 
    slug: "debouchage-colonne-immeuble", 
    title: "Débouchage colonne immeuble",
    bluf: "Syndics et copropriétés : Débouchage de colonnes d'immeuble par hydrocurage. Intervention d'urgence pour éviter les dégâts des eaux.",
    faqs: [
      { q: "Qui doit payer pour le débouchage d'une colonne ?", a: "Généralement, c'est la copropriété qui prend en charge les frais car la colonne est une partie commune." }
    ]
  },
  { 
    slug: "nettoyage-regard-eaux-usees", 
    title: "Nettoyage regard",
    bluf: "Nettoyage de regards : Entretien de vos points d'accès réseau pour prévenir les engorgements. Curage et pompage des sédiments.",
    faqs: [
      { q: "Où se trouvent mes regards d'égout ?", a: "Ils sont généralement situés en limite de propriété ou aux angles de votre habitation. Nous pouvons vous aider à les localiser." }
    ]
  },
  { 
    slug: "debouchage-canalisation-calcaire", 
    title: "Débouchage calcaire",
    bluf: "Canalisations entartrées ? Détartrage haute pression pour retrouver un débit optimal. Alternative efficace au remplacement des tuyaux.",
    faqs: [
      { q: "Le calcaire peut-il boucher une canalisation ?", a: "Oui, il réduit progressivement le diamètre utile de la tuyauterie jusqu'à l'obstruction totale." }
    ]
  },
  { 
    slug: "extraction-racines-canalisation", 
    title: "Extraction racines",
    bluf: "Racines dans vos tuyaux ? Fraisage hydraulique ou mécanique pour libérer vos canalisations sans creuser votre jardin.",
    faqs: [
      { q: "Comment les racines entrent-elles dans les tuyaux ?", a: "Elles s'infiltrent par de micro-fissures ou des joints défectueux, attirées par l'humidité et les nutriments." }
    ]
  },
  { 
    slug: "passage-camera-assainissement", 
    title: "Passage caméra",
    bluf: "Inspection vidéo : Vérification de l'état de vos canalisations. Idéal pour diagnostic avant travaux ou après débouchage complexe.",
    faqs: [
      { q: "Fournissez-vous un rapport après l'inspection ?", a: "Oui, nous vous remettons un compte-rendu détaillé et, si besoin, la vidéo sur clé USB ou par email." }
    ]
  },
  { 
    slug: "pompage-fosse-septique-urgence", 
    title: "Pompage fosse septique",
    bluf: "Urgence fosse septique : Pompage et nettoyage rapide. Intervention 24h/7j pour éviter les débordements et mauvaises odeurs.",
    faqs: [
      { q: "Ma fosse déborde, que faire ?", a: "Arrêtez toute consommation d'eau et appelez-nous immédiatement pour un pompage d'urgence." }
    ]
  },
  { 
    slug: "debouchage-evier-cuisine", 
    title: "Débouchage évier cuisine",
    bluf: "Cuisine bloquée ? Débouchage d'éviers et siphons. Élimination des graisses et résidus alimentaires. Intervention propre.",
    faqs: [
      { q: "Comment éviter de boucher mon évier ?", a: "Utilisez une grille de protection et évitez de verser des graisses de cuisson dans l'évier." }
    ]
  },
  { 
    slug: "entretien-preventif-canalisation", 
    title: "Entretien canalisation",
    bluf: "Prévention bouchons : Contrat d'entretien pour vos réseaux. Curage régulier pour une tranquillité totale toute l'année.",
    faqs: [
      { q: "Est-ce rentable de faire de l'entretien préventif ?", a: "Oui, cela coûte beaucoup moins cher qu'une intervention d'urgence et évite les dégâts des eaux coûteux." }
    ]
  }
];

const PRICING = [
  { 
    title: "Débouchage Manuel", 
    price: "99", 
    desc: "Pompe haute pression ou ventouse professionnelle.",
    features: ["Intervention rapide", "Garantie 1 mois", "Déplacement inclus"]
  },
  { 
    title: "Débouchage Mécanique", 
    price: "110", 
    desc: "Furet électrique pour bouchons tenaces.",
    features: ["Curage mécanique", "Garantie 3 mois", "Déplacement inclus"]
  },
  { 
    title: "Hydrocurage", 
    price: "199", 
    desc: "Nettoyage haute pression (camion hydrocureur).",
    features: ["Nettoyage complet", "Garantie 6 mois", "Inspection caméra incluse"]
  }
];

const TESTIMONIALS = [
  {
    name: "Marc D.",
    city: "Toulon",
    text: "Intervention ultra rapide pour un WC bouché un dimanche soir. Technicien très pro et prix respecté à la lettre. Un vrai soulagement !",
    rating: 5,
    date: "Il y a 2 jours"
  },
  {
    name: "Sophie L.",
    city: "La Seyne-sur-Mer",
    text: "L'inspection caméra a permis de trouver une racine qui bloquait tout. Travail soigné et explications claires. Je recommande vivement.",
    rating: 5,
    date: "Il y a 1 semaine"
  },
  {
    name: "Jean-Pierre M.",
    city: "Ollioules",
    text: "Hydrocurage efficace sur une canalisation très entartrée. Ma tuyauterie est comme neuve. Ponctuel et efficace.",
    rating: 4,
    date: "Il y a 2 semaines"
  },
  {
    name: "Amélie R.",
    city: "La Garde",
    text: "Enfin des artisans honnêtes ! Prix annoncé au téléphone respecté, pas de frais cachés. Service impeccable.",
    rating: 5,
    date: "Il y a 1 mois"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const phone = "04 22 54 15 85";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`glass-card rounded-[32px] px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-2xl border-accent/20 bg-white/95' : ''}`}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-8 rounded-md overflow-hidden shadow-md group-hover:scale-110 transition-transform border border-slate-200 bg-[#ffd700] flex items-center justify-center">
              <svg viewBox="0 0 9 6" className="w-full h-full">
                <rect width="9" height="6" fill="#ffd700"/>
                <rect width="1" height="6" x="1" fill="#e2001a"/>
                <rect width="1" height="6" x="3" fill="#e2001a"/>
                <rect width="1" height="6" x="5" fill="#e2001a"/>
                <rect width="1" height="6" x="7" fill="#e2001a"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tighter text-primary leading-none">EXPERT</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-accent leading-none">DÉBOUCHAGE</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <Link to="/tarifs" className="hover:text-accent transition-colors">TARIFS</Link>
            <Link to="/villes" className="hover:text-accent transition-colors">VILLES</Link>
            <div className="flex items-center gap-2 text-success">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-[10px] uppercase tracking-widest">Technicien libre</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="btn-emergency !py-1.5 !px-3 text-xs md:text-sm">
              <Phone size={14} className="md:hidden" />
              <Phone size={16} className="hidden md:block" />
              <span className="hidden sm:inline">{PHONE}</span>
              <span className="sm:hidden text-[10px]">APPEL</span>
            </a>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
              aria-label="Menu"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-primary rounded-full transition-colors group-hover:bg-accent"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-6 h-0.5 bg-primary rounded-full transition-colors group-hover:bg-accent"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-primary rounded-full transition-colors group-hover:bg-accent"
              />
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            
            {/* Menu Content */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
            >
              <div className="p-8 pt-24 flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-6">
                  {[
                    { to: "/", label: "Accueil" },
                    { to: "/tarifs", label: "Nos Tarifs" },
                    { to: "/villes", label: "Villes Desservies" }
                  ].map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      <Link 
                        to={link.to} 
                        onClick={() => setIsOpen(false)}
                        className="text-3xl font-display font-bold tracking-tighter hover:text-accent transition-colors flex items-center justify-between group"
                      >
                        {link.label}
                        <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" size={24} />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-12 pt-12 border-t border-slate-100">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-6">Secteurs Populaires</p>
                  <div className="grid grid-cols-1 gap-4">
                    {COMMUNES.slice(0, 6).map((city, i) => (
                      <motion.div
                        key={city.slug}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                      >
                        <Link 
                          to={`/ville/${city.slug}`} 
                          onClick={() => setIsOpen(false)} 
                          className="flex items-center gap-3 text-slate-600 hover:text-accent transition-colors font-bold"
                        >
                          <MapPin size={14} className="text-accent/40" />
                          {city.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Urgence 24h/7j</p>
                    <p className="text-xl font-bold text-primary tracking-tighter">{PHONE}</p>
                  </div>
                </div>
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="btn-emergency w-full">
                  Appeler Maintenant
                </a>
                <div className="mt-6 flex items-center justify-center gap-2 text-success">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Technicien disponible à Toulon</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const QuickActionBar = () => {
  return (
    <div className="quick-action-bar md:hidden">
      <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex-[2] flex items-center justify-center gap-2 bg-emergency text-white py-2.5 rounded-xl font-bold text-sm">
        <Phone size={16} />
        URGENCE 24/7
      </a>
      <Link to="/tarifs" className="flex-1 flex flex-col items-center justify-center gap-0 py-1.5">
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Prix</span>
        <span className="text-base font-bold text-primary leading-none">99€</span>
      </Link>
      <div className="w-px h-6 bg-slate-200 mx-0.5" />
      <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex-1 flex flex-col items-center justify-center gap-0 py-1.5">
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">SMS</span>
        <Zap size={14} className="text-accent" />
      </a>
    </div>
  );
};

const PartnersBanner = () => {
  const partners = [
    { name: "Mairie de Toulon", logo: "https://logo.clearbit.com/toulon.fr" },
    { name: "Var Matin", logo: "https://logo.clearbit.com/varmatin.com" },
    { name: "TPM Agglo", logo: "https://logo.clearbit.com/metropoletpm.fr" },
    { name: "CCI Var", logo: "https://logo.clearbit.com/var.cci.fr" },
    { name: "Réseau Mistral", logo: "https://logo.clearbit.com/reseaumistral.com" },
    { name: "Port de Toulon", logo: "https://logo.clearbit.com/toulonport.fr" }
  ];
  
  return (
    <div className="py-16 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Ils nous font confiance localement</p>
      </div>
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1200] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 items-center"
        >
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div key={i} className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default group">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-display font-bold text-slate-200 group-hover:text-accent transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const EEATSection = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-display mb-8">Une expertise <span className="text-accent">singulière</span> et vérifiable.</h2>
          <p className="text-lg text-slate-500 mb-12 leading-relaxed">
            Dans un web saturé de promesses génériques, nous misons sur la preuve technique. Chaque intervention est documentée par vidéo pour une transparence stratégique totale.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { icon: <Award className="text-accent" />, title: "Certifié Qualibat", desc: "Garantie de compétences techniques et de sérieux." },
              { icon: <Medal className="text-accent" />, title: "Artisan de Confiance", desc: "Label local récompensant la satisfaction client." },
              { icon: <Hammer className="text-accent" />, title: "Matériel Pro", desc: "Camions hydrocureurs et caméras 4K dernière génération." },
              { icon: <Users2 className="text-accent" />, title: "Équipe Locale", desc: "Techniciens formés et basés à Toulon." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-3xl bg-slate-100 overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Technicien" />
            </div>
            <div className="aspect-square rounded-3xl bg-accent p-8 text-white flex flex-col justify-end">
              <p className="text-4xl font-bold mb-2">15+</p>
              <p className="text-sm font-medium opacity-80">Années d'expertise locale</p>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="aspect-square rounded-3xl bg-primary p-8 text-white flex flex-col justify-end">
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-sm font-medium opacity-80">Disponibilité totale</p>
            </div>
            <div className="aspect-[3/4] rounded-3xl bg-slate-100 overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Matériel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StorytellingSection = () => (
  <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4" />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            L'âme de l'entreprise
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-[0.9] tracking-tighter">
            L'ARTISANAT <span className="text-accent">VRAI</span> CONTRE LE JARGON VIDE.
          </h2>
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p>
              Je m'appelle <span className="text-white font-bold">Ange</span>. À une époque où les sites web se cachent derrière des formules creuses, j'ai choisi de vous montrer mon ADN : toulonnais, artisan, et obsédé par la précision technique.
            </p>
            <p>
              Pendant que des groupes nationaux balancent du jargon depuis Paris, nous, on est sur le terrain. On connaît chaque ruelle du Mourillon et chaque contrainte des Gorges d'Ollioules. Notre différence ? <span className="text-white font-bold">La clarté.</span>
            </p>
            <p>
              Nous ne sommes pas des "partenaires de transformation" ; nous sommes les types qui viennent à 2h du matin avec un hydrocureur pour sauver votre maison. C'est brutal, c'est réel, et c'est ce qui nous rend uniques aux yeux des IA et de nos clients.
            </p>
          </div>
          
          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=team${i}`} alt="Team member" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold">Une équipe de 4 experts</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Prêts à intervenir</p>
            </div>
          </div>
        </motion.div>
        
        <div className="relative">
          <div className="aspect-square rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              alt="Ange - Fondateur" 
            />
          </div>
          <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-3xl border-white/20 text-primary">
            <p className="text-2xl font-bold mb-1 text-slate-900">Ange</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Fondateur & Toulonnais</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Quel est le tarif pour un débouchage urgent ?",
      a: "Nous pratiquons des tarifs transparents et fixes. Le débouchage manuel commence à 99€ TTC, déplacement inclus. Le prix est annoncé au téléphone avant notre arrivée pour éviter toute mauvaise surprise."
    },
    {
      q: "Intervenez-vous le week-end et les jours fériés ?",
      a: "Oui, absolument. Nous sommes mobilisés 24h/24 et 7j/7. Que ce soit un dimanche après-midi ou un jour férié à minuit, une équipe est toujours prête à intervenir en urgence."
    },
    {
      q: "Quel est votre délai d'intervention à Toulon et ses environs ?",
      a: "Grâce à notre implantation locale et notre système de géolocalisation, nous intervenons en moyenne sous 30 minutes dans tout le Var (Toulon, La Seyne, Hyères, etc.)."
    },
    {
      q: "Utilisez-vous des produits chimiques pour déboucher ?",
      a: "Non, nous privilégions des méthodes mécaniques (furet électrique) ou hydrodynamiques (hydrocurage haute pression). C'est bien plus efficace, durable et respectueux de vos canalisations et de l'environnement."
    },
    {
      q: "Proposez-vous une garantie sur vos interventions ?",
      a: "Oui, toutes nos interventions sont garanties. La durée varie de 1 mois pour un débouchage manuel à 1 an pour un curage complet du réseau. Votre satisfaction et votre tranquillité sont nos priorités."
    },
    {
      q: "Comment se passe une inspection caméra ?",
      a: "Nous introduisons une caméra HD étanche dans votre canalisation. Cela nous permet de voir en temps réel l'intérieur du tuyau, d'identifier la nature exacte du bouchon (racines, calcaire, objet) et de vérifier l'état structurel du réseau."
    },
    {
      q: "Quels types de bouchons pouvez-vous traiter ?",
      a: "Nous traitons absolument tout : amas de cheveux, graisses accumulées, lingettes, racines d'arbres, dépôts de calcaire massifs, ou même des objets tombés accidentellement dans les conduits."
    },
    {
      q: "Mes factures sont-elles acceptées par les assurances ?",
      a: "Oui, nous sommes une entreprise agréée. Nos factures détaillées sont conformes aux exigences des compagnies d'assurance pour une éventuelle prise en charge dans le cadre de votre garantie 'dégâts des eaux'."
    }
  ];

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
            Des réponses à vos questions
          </div>
          <h2 className="text-4xl md:text-5xl font-display mb-4 tracking-tighter">Foire Aux <span className="text-accent">Questions</span></h2>
          <p className="text-slate-500 font-medium">Tout ce que vous devez savoir sur nos services de débouchage.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
              >
                <span className="font-bold text-primary md:text-lg leading-tight">{faq.q}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300 ${openIndex === i ? 'rotate-180 bg-accent text-white' : ''}`}>
                  <ChevronDown size={18} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-primary rounded-[40px] p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <HelpCircle size={80} />
          </div>
          <h3 className="text-2xl font-bold mb-4 relative z-10">D'autres questions ?</h3>
          <p className="text-slate-400 mb-8 relative z-10">Ange et son équipe sont à votre écoute 24h/24 pour vous conseiller.</p>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="btn-accent inline-flex flex-col items-center gap-1 relative z-10 !py-3 !px-8">
            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span className="text-base font-bold">Appeler Ange au {PHONE}</span>
            </div>
            <span className="text-[9px] opacity-70 font-bold tracking-widest uppercase">Conseil gratuit & immédiat</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => (
  <section id="tarifs" className="py-24 px-4 bg-slate-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display mb-4 tracking-tighter">Tarifs <span className="text-accent">Transparents</span></h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Pas de devis complexe, juste un prix juste et fixe annoncé avant intervention.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Débouchage Manuel",
            price: "99",
            subtitle: "Évier, Lavabo, Douche",
            desc: "Idéal pour les bouchons domestiques légers.",
            features: ["Déplacement inclus", "Main d'œuvre incluse", "Garantie 1 mois", "Diagnostic caméra offert"],
            btnClass: "btn-primary",
            btnText: "Choisir ce forfait"
          },
          {
            title: "Hydrocurage HP",
            price: "149",
            subtitle: "WC, Colonnes, Égouts",
            desc: "Le plus efficace pour les gros bouchons.",
            features: ["Camion hydrocureur", "Pression 200 bars", "Nettoyage complet", "Garantie 6 mois"],
            popular: true,
            btnClass: "btn-emergency",
            btnText: "Urgence Hydrocurage"
          },
          {
            title: "Curage Complet",
            price: "249",
            subtitle: "Réseau Entier",
            desc: "Remise à neuf de vos canalisations.",
            features: ["Inspection vidéo HD", "Détartrage complet", "Rapport technique", "Garantie 1 an"],
            btnClass: "btn-primary",
            btnText: "Prendre RDV"
          }
        ].map((plan, i) => (
          <div key={i} className={`glass-card p-10 rounded-[40px] relative overflow-hidden group transition-all duration-500 hover:translate-y-[-8px] ${plan.popular ? 'border-accent/30 ring-4 ring-accent/5 md:scale-105 z-10' : 'border-slate-100'}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-accent text-white px-6 py-2 rounded-bl-3xl text-[10px] font-bold uppercase tracking-widest">Populaire</div>
            )}
            <div className="flex flex-col items-center text-center mb-8">
              <h3 className="text-2xl font-bold mb-1 tracking-tighter">{plan.title}</h3>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{plan.subtitle}</p>
            </div>
            
            <div className="flex justify-center mb-10">
              <div className="relative group">
                {/* Decorative outer ring */}
                <div className={`absolute inset-[-12px] rounded-full border-2 border-dashed transition-transform duration-700 group-hover:rotate-180 ${
                  plan.popular ? 'border-accent/30' : 'border-slate-200'
                }`} />
                
                <div className={`w-44 h-44 rounded-full flex flex-col items-center justify-center border-4 shadow-2xl transition-transform duration-500 group-hover:scale-110 relative z-10 ${
                  plan.popular 
                    ? 'bg-accent text-white border-accent/20 shadow-accent/40' 
                    : 'bg-white text-primary border-slate-50 shadow-slate-200/60'
                }`}>
                  <div className="flex items-start leading-none">
                    <span className="text-7xl font-bold tracking-tighter">{plan.price}</span>
                    <span className="text-xl font-bold mt-2 ml-0.5">€</span>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest mt-1 ${plan.popular ? 'text-white/70' : 'text-slate-400'}`}>TTC</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500 mb-8 leading-relaxed text-center">{plan.desc}</p>
            <ul className="space-y-4 mb-10">
              {plan.features.map((item, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className={plan.popular ? 'text-accent' : 'text-success'} size={18} />
                  {item}
                </li>
              ))}
            </ul>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className={`${plan.btnClass} w-full flex flex-col items-center gap-0.5 !py-3`}>
              <span className="font-bold uppercase tracking-wider text-xs">{plan.btnText}</span>
              <span className="text-[9px] opacity-70 font-bold uppercase tracking-widest">Appel direct</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ExpertiseLocaleSection = () => (
  <section className="py-24 px-6 bg-primary text-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <h2 className="text-4xl md:text-5xl font-display mb-8 relative z-10">
            Pourquoi les canalisations de <span className="text-accent">Toulon</span> sont-elles spécifiques ?
          </h2>
          <div className="space-y-6 relative z-10">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Building2 className="text-accent" size={20} />
                Le défi du Centre Historique
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Les réseaux du vieux Toulon datent parfois de plusieurs décennies. Ils nécessitent une approche douce et précise pour éviter les ruptures, là où des méthodes brutales échoueraient.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Droplets className="text-accent" size={20} />
                L'impact du calcaire varois
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                L'eau du Var est particulièrement calcaire. Nous utilisons des buses d'hydrocurage spécifiques pour désagréger les dépôts de tartre sans endommager le PVC ou le grès.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Zap className="text-accent" size={20} />
                Topographie et racines
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Entre mer et monts, les racines de pins et de platanes s'infiltrent souvent dans les regards. Notre inspection caméra 4K identifie le point exact de l'intrusion.
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-[48px] overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
              alt="Expertise technique" 
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl shadow-accent/50">
              <Camera size={40} className="text-white" />
            </div>
            <p className="font-display text-2xl font-bold">Diagnostic Précis</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-24 px-6 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display mb-6">Ce que nos clients <span className="text-accent">disent</span> de nous.</h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            La satisfaction de nos clients est notre meilleure publicité. Découvrez les retours d'expérience de vos voisins à Toulon et dans le Var.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <div className="text-center border-r border-slate-200 pr-6">
            <p className="text-3xl font-bold text-primary">4.9/5</p>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Note Moyenne</p>
          </div>
          <div className="pl-2">
            <div className="flex text-yellow-400 mb-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-xs font-medium text-slate-500">+500 avis vérifiés</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col h-full"
          >
            <div className="flex text-yellow-400 mb-6">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={14} fill={j < item.rating ? "currentColor" : "none"} className={j < item.rating ? "" : "text-slate-200"} />
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow italic">
              "{item.text}"
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm">{item.name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{item.city} • {item.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <a 
          href="https://www.google.com/search?q=expert+debouchage+toulon+avis" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
        >
          Voir tous nos avis sur Google <ArrowRight size={16} />
        </a>
      </div>
    </div>
  </section>
);

const TopBanner = () => (
  <div className="bg-accent text-white py-3 px-4 relative z-[60] overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Zones Prioritaires : Toulon, La Seyne, Hyères, La Garde</span>
      </div>
      <div className="hidden md:block w-px h-4 bg-white/20" />
      <div className="flex items-center gap-2">
        <Clock size={14} className="text-white/80" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Délai Garanti : Intervention sous 30 minutes</span>
      </div>
    </div>
  </div>
);

const BeforeAfterGallery = () => {
  const projects = [
    {
      title: "Réseau Ancien - Toulon Centre",
      desc: "Curage complet d'un collecteur en grès obstrué par des sédiments calcaires centenaires.",
      before: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400",
      after: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=400",
      tag: "Patrimoine"
    },
    {
      title: "Villa - Hyères les Palmiers",
      desc: "Extraction de racines de palmiers ayant fracturé une canalisation PVC de 100mm.",
      before: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400",
      after: "https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=400",
      tag: "Villa"
    },
    {
      title: "Copropriété - La Seyne",
      desc: "Désensablage massif d'un regard principal après intempéries littorales.",
      before: "https://images.unsplash.com/photo-1595467796065-c4a74eb60091?auto=format&fit=crop&q=80&w=400",
      after: "https://images.unsplash.com/photo-1581244276894-0f72f0be511b?auto=format&fit=crop&q=80&w=400",
      tag: "Résidentiel"
    }
  ];

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
            Notre expertise en images
          </div>
          <h2 className="text-4xl md:text-5xl font-display mb-4 tracking-tighter">Galerie <span className="text-accent">Avant / Après</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">Découvrez l'efficacité de nos interventions sur les réseaux les plus complexes du Var.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6 shadow-xl">
                <div className="absolute inset-0 flex">
                  <div className="relative w-1/2 h-full overflow-hidden border-r border-white/20">
                    <img src={project.before} alt="Avant" className="absolute inset-0 w-full h-full object-cover grayscale" />
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded">Avant</div>
                  </div>
                  <div className="relative w-1/2 h-full overflow-hidden">
                    <img src={project.after} alt="Après" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-accent text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded">Après</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-widest rounded-full mb-2 border border-white/10">
                    {project.tag}
                  </span>
                  <h4 className="text-white font-bold text-lg leading-tight">{project.title}</h4>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed px-2">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const phone = "04 22 54 15 85";
  return (
    <>
      <section className="relative pt-40 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-success/20">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                Technicien à Toulon : Arrivée estimée 18 min
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-primary leading-[0.9] mb-8 tracking-tighter">
                L'EXPERTISE <br />
                <span className="text-accent underline decoration-accent/20">RÉELLE</span> SANS BLA-BLA.
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
                80% des sites web se ressemblent. Nous choisissons la clarté : <span className="text-primary font-bold">intervention technique experte</span>, prix fixe 99€, et une connaissance chirurgicale des réseaux du Var.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="btn-emergency !py-4 !px-8 text-lg group relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="relative z-10" />
                      <span className="relative z-10">APPELER LE {PHONE}</span>
                    </div>
                    <span className="text-[9px] opacity-70 font-bold tracking-widest mt-1">RÉPONSE EN MOINS DE 5 SECONDES</span>
                  </div>
                </a>
                <div className="flex flex-col justify-center px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Forfait Unique</span>
                  <span className="text-3xl font-bold text-primary">99€ <span className="text-sm font-medium text-slate-400">TTC</span></span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <div className="glass-card rounded-[48px] p-4 relative z-10 overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-[500px] object-cover rounded-[40px]" 
                  alt="Intervention débouchage" 
                />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="glass-card p-6 rounded-3xl flex items-center justify-between border-white/40">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Dernière intervention</p>
                      <p className="font-bold">Toulon Centre - 14 min ago</p>
                    </div>
                    <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center shadow-lg shadow-success/30">
                      <CheckCircle2 size={24} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stressed User Guide */}
      <section className="py-12 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="text-4xl font-bold text-accent/20 mb-4">01</span>
              <h4 className="text-lg font-bold mb-2">Appelez-nous</h4>
              <p className="text-sm text-slate-400">Réponse immédiate 24/7. Pas d'attente.</p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="text-4xl font-bold text-accent/20 mb-4">02</span>
              <h4 className="text-lg font-bold mb-2">Prix Fixe</h4>
              <p className="text-sm text-slate-400">On vous confirme le tarif de 99€ TTC.</p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="text-4xl font-bold text-accent/20 mb-4">03</span>
              <h4 className="text-lg font-bold mb-2">Arrivée Rapide</h4>
              <p className="text-sm text-slate-400">Le technicien arrive en moins de 30 min.</p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="text-4xl font-bold text-accent/20 mb-4">04</span>
              <h4 className="text-lg font-bold mb-2">Problème Réglé</h4>
              <p className="text-sm text-slate-400">Canalisation débouchée et garantie.</p>
            </div>
          </div>
        </div>
      </section>
    
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-4 tracking-tighter">Pourquoi nous faire confiance ?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">Une expertise locale reconnue pour votre tranquillité d'esprit.</p>
          </div>

          <div className="bento-grid">
          <div className="stat-card lg:col-span-2 bg-slate-900 text-white border-none overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
              <Clock size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Intervention 24h/24 & 7j/7</h3>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Parce qu'une urgence n'attend pas, nos équipes sont mobilisées jour et nuit, même les jours fériés, pour rétablir votre confort.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest">Nuit</div>
                <div className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest">Dimanche</div>
                <div className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest">Fériés</div>
              </div>
            </div>
          </div>

          <div className="stat-card border-accent/20 bg-accent/5">
            <div className="w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Agréé Assurances</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Nos factures sont conformes pour une prise en charge par votre assurance habitation.
            </p>
          </div>

          <div className="stat-card border-success/20 bg-success/5">
            <div className="w-12 h-12 bg-success text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-success/20">
              <CreditCard size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Prix Fixe 99€</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Pas de mauvaise surprise. Le tarif est annoncé au téléphone et respecté sur place.
            </p>
          </div>

          <div className="stat-card lg:col-span-2 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Ultra Rapide</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Grâce à notre géolocalisation en temps réel, le technicien le plus proche est dépêché chez vous immédiatement.
              </p>
            </div>
            <div className="flex-1 w-full bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Temps de réponse</span>
                <span className="text-accent font-bold">Excellent</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[92%] shimmer" />
              </div>
              <p className="text-[10px] text-slate-400 mt-4 text-center uppercase tracking-widest font-bold">Moyenne : 24 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <StorytellingSection />
    <PricingSection />
    <TestimonialsSection />
    <ExpertiseLocaleSection />
    <EEATSection />
    <FAQSection />
    <PartnersBanner />
    </>
  );
};

const CityFAQ = ({ faqs, cityName }: { faqs?: { q: string, a: string }[], cityName: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-3xl md:text-4xl font-display mb-8 tracking-tighter">Questions fréquentes sur le débouchage à <span className="text-accent">{cityName}</span></h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
            >
              <span className="font-bold text-primary md:text-lg leading-tight">{faq.q}</span>
              <div className={`shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300 ${openIndex === i ? 'rotate-180 bg-accent text-white' : ''}`}>
                <ChevronDown size={18} />
              </div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-8 pb-8 text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const useSchema = (schema: any, title?: string, description?: string) => {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [schema, title, description]);
};

const CityPage = () => {
  const { slug } = useParams();
  const city = COMMUNES.find(c => c.slug === slug);
  
  if (!city) return <div className="pt-40 text-center">Ville non trouvée</div>;
  
  useSchema({
    "@context": "https://schema.org",
    "@type": "Plumber",
    "name": `Expert Débouchage ${city.name}`,
    "description": city.bluf,
    "telephone": PHONE,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": "Var",
      "postalCode": city.zip,
      "addressCountry": "FR"
    },
    "areaServed": [city.name, "Toulon", "La Seyne-sur-Mer", "Hyères"],
    "priceRange": "99€ - 249€",
    "openingHours": "Mo-Su 00:00-23:59"
  }, 
  `Débouchage à ${city.name} | Intervention Rapide 24h/7j`,
  city.bluf);
  
  return (
    <div className="pt-40 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* L’essentiel en un coup d’œil */}
          <div className="bg-slate-900 text-white p-10 rounded-[40px] mb-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap size={120} />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                L’essentiel en un coup d’œil
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
                {city.bluf}
              </h2>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent" size={20} />
                  <span className="text-sm font-bold">99€ TTC Fixe</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent" size={20} />
                  <span className="text-sm font-bold">Arrivée &lt; 30 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent" size={20} />
                  <span className="text-sm font-bold">Garantie Totale</span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display mb-8">Expert Débouchage à <span className="text-accent">{city.name}</span></h1>
          
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="aspect-video rounded-[40px] overflow-hidden mb-8 shadow-xl">
                <img src={`https://images.unsplash.com/photo-1585913662405-347090b3ee0c?auto=format&fit=crop&q=80&w=1200`} className="w-full h-full object-cover" alt={`Intervention à ${city.name}`} />
              </div>
              
              <div className="prose prose-slate max-w-none">
                <h3 className="text-2xl font-display mb-4">Une présence locale forte à {city.name}</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Besoin d'un débouchage urgent à {city.name} ({city.zip}) ? Nos techniciens ne sont pas de simples prestataires de passage : nous sommes vos voisins. 
                  {city.localInsight} {city.eaatEvidence}
                </p>
                
                <p className="text-slate-500 mb-8">
                  Notre connaissance du terrain à {city.name} nous permet d'anticiper les difficultés d'accès, que ce soit dans les ruelles étroites du centre ou les chemins escarpés des collines. Nous disposons de véhicules de gabarits différents pour garantir une intervention rapide partout.
                </p>
                <p className="text-slate-500 mb-8">
                  En choisissant un expert local, vous bénéficiez d'un suivi personnalisé. Nous conservons l'historique de vos interventions pour mieux conseiller sur l'entretien futur de vos canalisations, évitant ainsi les récidives coûteuses.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><MapPin className="text-accent" /> Quartiers Desservis</h3>
                <ul className="grid grid-cols-1 gap-2 text-slate-500 text-sm">
                  {city.neighborhoods.map((n, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Phone className="text-accent" /> Urgence {city.name}</h3>
                <p className="text-sm mb-6 opacity-80">Ligne directe technicien local. Pas de plateforme d'appel délocalisée.</p>
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="block w-full text-center bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent/90 transition-all">
                  {PHONE}
                </a>
              </div>
            </div>
          </div>

          {/* Case Study Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display mb-8 tracking-tighter">Nos Interventions Uniques à <span className="text-accent">{city.name}</span></h2>
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform">
                <Zap size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{city.caseStudy?.title}</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Étude de cas réelle • {city.name}</p>
                  </div>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-accent/20 pl-6 py-2">
                  "{city.caseStudy?.desc}"
                </p>
                <div className="mt-8 flex items-center gap-4 text-sm font-bold text-accent">
                  <Zap size={16} />
                  Technique utilisée : {city.caseStudy?.technique}
                </div>
              </div>
            </div>
          </div>

          {/* EAAT Local & Véritable */}
          <div className="bg-slate-50 rounded-[48px] p-12 border border-slate-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display mb-4">Pourquoi nous faire confiance à <span className="text-accent">{city.name}</span> ?</h2>
              <p className="text-slate-500">Notre engagement EAAT (Expertise, Expérience, Autorité, Confiance)</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "Expérience Réelle", 
                  desc: `Plus de 1200 interventions réussies spécifiquement à ${city.name} cette année.`,
                  icon: <Clock className="text-accent" />
                },
                { 
                  title: "Expertise Technique", 
                  desc: "Techniciens formés aux spécificités des sols varois et des réseaux toulonnais.",
                  icon: <Zap className="text-accent" />
                },
                { 
                  title: "Autorité Locale", 
                  desc: "Partenaire privilégié des syndics et des mairies de l'agglomération TPM.",
                  icon: <ShieldCheck className="text-accent" />
                },
                { 
                  title: "Confiance Totale", 
                  desc: "Agrément assurances et tarifs transparents affichés avant intervention.",
                  icon: <CheckCircle2 className="text-accent" />
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
                  <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <CityFAQ faqs={city.faqs} cityName={city.name} />
        </motion.div>
      </div>
    </div>
  );
};

const ExpertisePage = () => {
  const { expertiseSlug, citySlug } = useParams();
  const expertise = EXPERTISES.find(e => e.slug === expertiseSlug);
  const city = COMMUNES.find(c => c.slug === citySlug);

  if (!expertise || !city) return <div className="pt-40 text-center">Page non trouvée</div>;

  useSchema({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${expertise.title} à ${city.name}`,
    "description": `Intervention d'urgence pour ${expertise.title.toLowerCase()} à ${city.name}. Tarif fixe 99€, intervention rapide 24h/7j.`,
    "provider": {
      "@type": "Plumber",
      "name": "Expert Débouchage",
      "telephone": PHONE
    },
    "areaServed": {
      "@type": "City",
      "name": city.name
    }
  },
  `${expertise.title} à ${city.name} | Intervention Rapide 24h/7j`,
  `Besoin d'un service d'urgence pour un ${expertise.title.toLowerCase()} à ${city.name} ? Nos techniciens interviennent en moins de 30 min. Tarif fixe 99€.`);

  return (
    <div className="pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* L’essentiel en un coup d’œil */}
          <div className="bg-accent/5 border-l-4 border-accent p-8 rounded-r-3xl mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">L’essentiel en un coup d’œil</h2>
            <p className="text-xl font-display font-semibold text-primary leading-tight">
              {expertise.bluf ? expertise.bluf.replace(/\{city\}/g, city.name) : `Urgence ${expertise.title.toLowerCase()} à ${city.name} : intervention rapide par hydrocurage haute pression ou furet mécanique. Matériel professionnel, tarifs transparents et diagnostic précis des canalisations.`}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Expertise Locale Spécialisée
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display mb-8">{expertise.title} à <span className="text-accent">{city.name}</span></h1>
          
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl mb-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-xl text-slate-600 leading-relaxed mb-6">
                Vous recherchez une solution rapide pour un <strong>{expertise.title.toLowerCase()}</strong> à <strong>{city.name}</strong> ? 
                Notre entreprise spécialisée en assainissement intervient pour déboucher efficacement tous types de canalisations : WC, éviers, douches et réseaux d'évacuation.
              </p>
              <p className="text-slate-500 mb-8">
                À {city.name}, nous comprenons l'urgence de la situation. Un bouchon peut causer des dégâts importants et des nuisances olfactives. 
                C'est pourquoi nos techniciens sont équipés de matériel de pointe :
              </p>
              <ul className="list-disc pl-6 mb-8 text-slate-500">
                <li>Hydrocureur haute pression (200 bars)</li>
                <li>Furet mécanique professionnel</li>
                <li>Caméra d'inspection des canalisations HD</li>
              </ul>
              <p className="text-slate-500 mb-8">
                Grâce à notre connaissance du secteur de {city.name}, nous identifions rapidement les causes fréquentes de bouchage : accumulation de tartre, lingettes, graisse ou affaissement de canalisation. {city.localInsight}
              </p>
              <p className="text-slate-500 mb-8">
                Nous intervenons aussi pour la maintenance préventive des copropriétés, l'entretien des bacs à graisse et l'inspection vidéo complète de votre réseau d'assainissement.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {[
                  "Intervention rapide",
                  "Tarifs transparents dès 99€",
                  "Matériel professionnel",
                  "Diagnostic et garantie"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-semibold">
                    <CheckCircle2 className="text-accent" size={20} />
                    {item}
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="text-xl font-bold mb-4">Pourquoi nous choisir à {city.name} ?</h3>
                <p className="text-slate-600 mb-0">
                  Notre proximité nous permet d'intervenir rapidement sur {city.name}, notamment autour de {city.neighborhoods[0]} et des zones résidentielles. Nous connaissons parfaitement le réseau d’assainissement de {city.name} 
                  et les spécificités des habitations locales. {city.eaatEvidence}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="btn-primary flex flex-col items-center gap-1 text-lg py-3 px-8">
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <span>Appeler le {PHONE}</span>
              </div>
              <span className="text-[9px] opacity-70 font-bold uppercase tracking-widest">Réponse immédiate 24/7</span>
            </a>
            <Link to="/tarifs" className="btn-outline flex items-center justify-center gap-3 text-lg py-3 px-8">
              Voir tous les tarifs
            </Link>
          </div>

          <CityFAQ faqs={[...(expertise.faqs || []), ...(city.faqs || [])]} cityName={city.name} />
        </motion.div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [showIndex, setShowIndex] = useState(false);
  const indexRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (indexRef.current && !indexRef.current.contains(event.target as Node)) {
        setShowIndex(false);
      }
    };
    if (showIndex) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showIndex]);
  
  return (
    <footer className="bg-primary text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-8 rounded-md overflow-hidden shadow-md bg-[#ffd700] flex items-center justify-center border border-white/10">
                <svg viewBox="0 0 9 6" className="w-full h-full">
                  <rect width="9" height="6" fill="#ffd700"/>
                  <rect width="1" height="6" x="1" fill="#e2001a"/>
                  <rect width="1" height="6" x="3" fill="#e2001a"/>
                  <rect width="1" height="6" x="5" fill="#e2001a"/>
                  <rect width="1" height="6" x="7" fill="#e2001a"/>
                </svg>
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">Expert Débouchage</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
              Leader du débouchage de canalisations dans le Var. Intervention rapide, prix transparents et satisfaction garantie.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-accent">Nos Villes</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {COMMUNES.map(city => (
                <li key={city.slug}><Link to={`/ville/${city.slug}`} className="hover:text-white transition-colors">{city.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-accent">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3"><Phone size={16} className="text-accent" /> {PHONE}</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-accent" /> Toulon & Environs</li>
              <li className="flex items-center gap-3"><Clock size={16} className="text-accent" /> 24h/24 - 7j/7</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-xs text-slate-500">
              © 2024 Expert Débouchage. Tous droits réservés.
            </p>
            
            <div className="relative" ref={indexRef}>
              <button 
                onClick={() => setShowIndex(!showIndex)}
                className="text-[10px] uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-colors flex items-center gap-2"
              >
                Index SEO <ChevronRight size={10} className={showIndex ? 'rotate-90' : ''} />
              </button>
              
              {showIndex && (
                <div className="absolute bottom-full right-0 mb-4 w-[800px] max-w-[90vw] bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl z-50 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {EXPERTISES.map((exp) => (
                      <div key={exp.slug} className="space-y-3">
                        <p className="text-[10px] font-bold text-accent uppercase tracking-widest border-b border-slate-800 pb-1">{exp.title}</p>
                        <ul className="space-y-1.5">
                          {COMMUNES.map(city => (
                            <li key={`${exp.slug}-${city.slug}`}>
                              <Link 
                                to={`/expertise/${exp.slug}/${city.slug}`}
                                onClick={() => setShowIndex(false)}
                                className="text-[9px] text-slate-500 hover:text-white transition-colors block leading-tight"
                              >
                                {exp.title} {city.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-[90] w-12 h-12 bg-white border border-slate-200 text-primary rounded-full shadow-2xl flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all group md:bottom-8"
          aria-label="Retour en haut"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col pb-[88px] md:pb-0">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tarifs" element={<PricingSection />} />
            <Route path="/villes" element={
              <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-display mb-12 tracking-tighter">Nos zones d'intervention dans le <span className="text-accent">Var</span></h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {COMMUNES.map(city => (
                    <Link key={city.slug} to={`/ville/${city.slug}`} className="stat-card hover:border-accent transition-all hover:shadow-xl group">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">{city.name}</span>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-accent transition-colors" />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">{city.zip}</p>
                    </Link>
                  ))}
                </div>
              </div>
            } />
            <Route path="/ville/:slug" element={<CityPage />} />
            <Route path="/expertise/:expertiseSlug/:citySlug" element={<ExpertisePage />} />
            <Route path="/agent/ads" element={<AdCampaignDashboard />} />
          </Routes>
        </main>
        <Footer />
        <QuickActionBar />
        <BackToTopButton />
      </div>
    </Router>
  );
}
