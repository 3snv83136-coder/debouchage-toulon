import type { SchemaId } from "@/lib/chemisage/types";

/* Palette des schémas (identique au thème) */
const C = {
  ink: "#13072E",
  violet: "#6420F5",
  violetClair: "#E2D6FF",
  rose: "#FF2D87",
  lime: "#C8FF2E",
  cyan: "#00D9FF",
  jaune: "#FFE14D",
  terre: "#B98B5E",
  terreFonce: "#8A6240",
  gris: "#9AA0B4",
  blanc: "#FFFFFF",
};

const T = { fontFamily: "var(--font-display), system-ui, sans-serif", fontWeight: 800 } as const;
const t = { fontFamily: "var(--font-sans), system-ui, sans-serif", fontWeight: 700 } as const;

function Cadre({ titre, legende, children, viewBox }: { titre: string; legende: string; children: React.ReactNode; viewBox: string }) {
  return (
    <figure className="overflow-hidden rounded-3xl border-4 border-ink bg-white shadow-flash">
      <svg viewBox={viewBox} role="img" aria-label={titre} className="h-auto w-full">
        <title>{titre}</title>
        {children}
      </svg>
      <figcaption className="border-t-4 border-ink bg-lime px-5 py-3 text-sm font-bold text-ink">{legende}</figcaption>
    </figure>
  );
}

/** Coupe transversale : canalisation abîmée → canalisation chemisée. */
export function SchemaCoupe() {
  return (
    <Cadre viewBox="0 0 800 380" titre="Coupe d'une canalisation avant et après chemisage" legende="Avant : fissures, racines, dépôts. Après : une gaine neuve, lisse et sans joint, collée à l'intérieur de l'ancienne canalisation.">
      <rect width="800" height="380" fill={C.violetClair} />
      {/* Avant */}
      <text x="200" y="48" textAnchor="middle" fontSize="30" fill={C.ink} {...T}>AVANT</text>
      <circle cx="200" cy="200" r="120" fill={C.gris} stroke={C.ink} strokeWidth="6" />
      <circle cx="200" cy="200" r="96" fill={C.ink} />
      <path d="M200 80 L212 120 L196 150 L210 175" stroke={C.rose} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M300 250 L268 236 L252 254" stroke={C.rose} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M120 140 C150 170 140 200 175 215 M140 160 C160 160 170 175 165 190 M130 180 C150 200 165 196 180 232" stroke="#4CAF50" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M118 262 Q200 300 282 262 L282 285 Q200 300 118 285 Z" fill={C.terreFonce} />
      <rect x="40" y="320" width="320" height="40" rx="20" fill={C.rose} />
      <text x="200" y="347" textAnchor="middle" fontSize="18" fill={C.blanc} {...t}>Fissures · racines · dépôts</text>
      {/* Flèche */}
      <path d="M375 200 L425 200" stroke={C.ink} strokeWidth="10" strokeLinecap="round" />
      <path d="M415 180 L440 200 L415 220 Z" fill={C.ink} />
      {/* Après */}
      <text x="600" y="48" textAnchor="middle" fontSize="30" fill={C.ink} {...T}>APRÈS</text>
      <circle cx="600" cy="200" r="120" fill={C.gris} stroke={C.ink} strokeWidth="6" />
      <circle cx="600" cy="200" r="96" fill={C.lime} />
      <circle cx="600" cy="200" r="80" fill={C.cyan} opacity="0.35" />
      <circle cx="600" cy="200" r="80" fill="none" stroke={C.ink} strokeWidth="3" strokeDasharray="6 6" />
      <text x="600" y="196" textAnchor="middle" fontSize="20" fill={C.ink} {...T}>GAINE</text>
      <text x="600" y="222" textAnchor="middle" fontSize="16" fill={C.ink} {...t}>neuve et lisse</text>
      <rect x="440" y="320" width="320" height="40" rx="20" fill={C.violet} />
      <text x="600" y="347" textAnchor="middle" fontSize="18" fill={C.blanc} {...t}>Étanche · sans joint · lisse</text>
    </Cadre>
  );
}

/** Les étapes du chemisage, du débouchage au contrôle. */
export function SchemaEtapes() {
  const etapes = [
    { n: "1", titre: "Débouchage", couleur: C.cyan },
    { n: "2", titre: "Caméra", couleur: C.jaune },
    { n: "3", titre: "Imprégnation", couleur: C.rose },
    { n: "4", titre: "Pose", couleur: C.lime },
    { n: "5", titre: "Durcissement", couleur: C.violet },
    { n: "6", titre: "Contrôle", couleur: C.cyan },
  ];
  return (
    <Cadre viewBox="0 0 900 300" titre="Les six étapes d'un chemisage" legende="Toujours dans cet ordre : on débouche, on filme, on imprègne la gaine, on la pose, on la durcit, on contrôle à la caméra.">
      <rect width="900" height="300" fill={C.ink} />
      <rect x="40" y="140" width="820" height="36" rx="18" fill={C.gris} />
      <rect x="40" y="148" width="820" height="20" rx="10" fill={C.lime} />
      {etapes.map((e, i) => {
        const x = 90 + i * 144;
        return (
          <g key={e.n}>
            <circle cx={x} cy="158" r="44" fill={e.couleur} stroke={C.blanc} strokeWidth="5" />
            <text x={x} y="172" textAnchor="middle" fontSize="40" fill={C.ink} {...T}>{e.n}</text>
            <text x={x} y={i % 2 === 0 ? 80 : 250} textAnchor="middle" fontSize="19" fill={C.blanc} {...T}>{e.titre.toUpperCase()}</text>
          </g>
        );
      })}
    </Cadre>
  );
}

/** Tranchée contre chemisage. */
export function SchemaComparatif() {
  return (
    <Cadre viewBox="0 0 900 420" titre="Tranchée classique contre chemisage sans casse" legende="À gauche, la tranchée : jardin, allée et terrasse détruits. À droite, le chemisage : on travaille depuis les regards, la surface ne bouge pas.">
      <rect width="900" height="420" fill={C.blanc} />
      {/* Gauche : tranchée */}
      <rect x="0" y="0" width="450" height="420" fill="#FFE3EE" />
      <text x="225" y="44" textAnchor="middle" fontSize="28" fill={C.rose} {...T}>TRANCHÉE</text>
      <rect x="20" y="150" width="410" height="250" fill={C.terre} />
      <rect x="20" y="130" width="410" height="20" fill="#6BCB77" />
      <path d="M110 130 L140 330 L310 330 L340 130 Z" fill={C.terreFonce} />
      <rect x="140" y="300" width="170" height="26" rx="13" fill={C.gris} stroke={C.ink} strokeWidth="3" />
      {/* tas de terre */}
      <path d="M350 130 Q395 60 430 130 Z" fill={C.terreFonce} />
      <path d="M20 130 Q60 70 100 130 Z" fill={C.terreFonce} />
      {/* pelleteuse simplifiée */}
      <rect x="45" y="80" width="60" height="30" rx="6" fill={C.jaune} stroke={C.ink} strokeWidth="3" />
      <path d="M100 85 L150 60 L175 110" stroke={C.ink} strokeWidth="8" fill="none" strokeLinecap="round" />
      <text x="225" y="380" textAnchor="middle" fontSize="20" fill={C.ink} {...t}>Plusieurs jours · gravats · tout à refaire</text>
      {/* Droite : chemisage */}
      <rect x="450" y="0" width="450" height="420" fill="#EEFFC2" />
      <text x="675" y="44" textAnchor="middle" fontSize="28" fill={C.violet} {...T}>CHEMISAGE</text>
      <rect x="470" y="150" width="410" height="250" fill={C.terre} />
      <rect x="470" y="130" width="410" height="20" fill="#6BCB77" />
      {/* arbre et terrasse intacts */}
      <rect x="630" y="100" width="90" height="30" fill={C.violetClair} stroke={C.ink} strokeWidth="3" />
      <rect x="772" y="70" width="10" height="60" fill={C.terreFonce} />
      <circle cx="777" cy="62" r="28" fill="#4CAF50" />
      {/* regards */}
      <rect x="490" y="130" width="34" height="180" fill={C.gris} stroke={C.ink} strokeWidth="3" />
      <rect x="826" y="130" width="34" height="180" fill={C.gris} stroke={C.ink} strokeWidth="3" />
      {/* canalisation chemisée */}
      <rect x="507" y="290" width="336" height="28" rx="14" fill={C.gris} stroke={C.ink} strokeWidth="3" />
      <rect x="507" y="296" width="336" height="16" rx="8" fill={C.lime} />
      <text x="675" y="380" textAnchor="middle" fontSize="20" fill={C.ink} {...t}>Souvent 1 journée · rien à casser</text>
    </Cadre>
  );
}

/** Colonne d'immeuble chemisée avec piquages rouverts. */
export function SchemaImmeuble() {
  const etages = [0, 1, 2, 3, 4];
  return (
    <Cadre viewBox="0 0 700 560" titre="Chemisage d'une colonne d'immeuble" legende="La gaine est posée dans la colonne sur toute la hauteur, puis chaque raccordement d'appartement (piquage) est rouvert au robot fraiseur.">
      <rect width="700" height="560" fill={C.violetClair} />
      <rect x="120" y="40" width="460" height="460" fill={C.blanc} stroke={C.ink} strokeWidth="6" />
      {etages.map((e) => (
        <g key={e}>
          <line x1="120" y1={40 + e * 92} x2="580" y2={40 + e * 92} stroke={C.ink} strokeWidth="4" />
          <rect x="160" y={70 + e * 92} width="70" height="45" rx="6" fill={C.cyan} opacity="0.5" />
          <path d={`M300 ${110 + e * 92} L340 ${110 + e * 92}`} stroke={C.rose} strokeWidth="10" strokeLinecap="round" />
          <circle cx="345" cy={110 + e * 92} r="9" fill={C.jaune} stroke={C.ink} strokeWidth="3" />
        </g>
      ))}
      {/* colonne */}
      <rect x="340" y="20" width="44" height="520" fill={C.gris} stroke={C.ink} strokeWidth="4" />
      <rect x="350" y="20" width="24" height="520" fill={C.lime} />
      <text x="420" y="300" fontSize="22" fill={C.ink} {...T}>GAINE</text>
      <text x="420" y="326" fontSize="16" fill={C.ink} {...t}>sur toute la hauteur</text>
      <text x="170" y="530" fontSize="16" fill={C.ink} {...t}>● piquage rouvert au robot</text>
      <rect x="0" y="500" width="700" height="60" fill={C.terre} opacity="0.6" />
    </Cadre>
  );
}

/** Pose d'une manchette avec un packer. */
export function SchemaManchette() {
  return (
    <Cadre viewBox="0 0 900 300" titre="Pose d'une manchette au packer" legende="Le packer (ballon gonflable) amène la manchette exactement sur le défaut, puis la plaque contre la paroi le temps que la résine durcisse.">
      <rect width="900" height="300" fill={C.ink} />
      <rect x="40" y="100" width="820" height="110" rx="10" fill={C.gris} />
      <rect x="40" y="118" width="820" height="74" fill="#2A1A55" />
      {/* fissure */}
      <path d="M520 100 L530 118 M540 192 L550 210" stroke={C.rose} strokeWidth="8" strokeLinecap="round" />
      {/* packer + manchette */}
      <rect x="430" y="118" width="200" height="74" rx="37" fill={C.lime} />
      <rect x="450" y="132" width="160" height="46" rx="23" fill={C.cyan} />
      <text x="530" y="162" textAnchor="middle" fontSize="18" fill={C.ink} {...T}>PACKER</text>
      {/* tuyau d'air */}
      <path d="M40 155 L430 155" stroke={C.jaune} strokeWidth="8" strokeDasharray="14 10" />
      <text x="200" y="80" textAnchor="middle" fontSize="20" fill={C.blanc} {...T}>AIR →</text>
      <text x="530" y="250" textAnchor="middle" fontSize="20" fill={C.lime} {...T}>MANCHETTE SUR LE DÉFAUT</text>
      <text x="770" y="80" textAnchor="middle" fontSize="18" fill={C.rose} {...T}>FISSURE</text>
    </Cadre>
  );
}

/** Pose par inversion. */
export function SchemaInversion() {
  return (
    <Cadre viewBox="0 0 900 340" titre="Chemisage par inversion" legende="La gaine se retourne comme une chaussette sous la pression de l'air et se déroule dans la canalisation, face résinée contre la paroi.">
      <rect width="900" height="340" fill={C.blanc} />
      {/* tambour */}
      <circle cx="120" cy="150" r="80" fill={C.violet} stroke={C.ink} strokeWidth="6" />
      <circle cx="120" cy="150" r="40" fill={C.lime} stroke={C.ink} strokeWidth="4" />
      <text x="120" y="270" textAnchor="middle" fontSize="20" fill={C.ink} {...T}>INVERSEUR</text>
      <path d="M190 190 L250 230" stroke={C.ink} strokeWidth="14" />
      {/* canalisation */}
      <rect x="250" y="200" width="620" height="70" rx="8" fill={C.gris} stroke={C.ink} strokeWidth="4" />
      {/* gaine en cours d'inversion */}
      <rect x="250" y="210" width="400" height="50" fill={C.lime} />
      <path d="M650 210 Q700 235 650 260" fill={C.rose} />
      <path d="M600 235 L700 235" stroke={C.ink} strokeWidth="6" />
      <path d="M690 220 L720 235 L690 250 Z" fill={C.ink} />
      <text x="450" y="242" textAnchor="middle" fontSize="18" fill={C.ink} {...T}>GAINE RETOURNÉE</text>
      <text x="700" y="320" textAnchor="middle" fontSize="18" fill={C.rose} {...T}>FRONT D&apos;INVERSION</text>
      <text x="560" y="120" textAnchor="middle" fontSize="22" fill={C.violet} {...T}>PRESSION D&apos;AIR →</text>
    </Cadre>
  );
}

/** Branchement de maison chemisé depuis le regard. */
export function SchemaBranchement() {
  return (
    <Cadre viewBox="0 0 900 400" titre="Chemisage du branchement d'une maison" legende="De la maison au regard de branchement : la gaine est posée sous le jardin, l'allée et la terrasse sans rien démolir.">
      <rect width="900" height="400" fill="#D6F8FF" />
      <rect x="0" y="180" width="900" height="220" fill={C.terre} />
      <rect x="0" y="168" width="900" height="16" fill="#6BCB77" />
      {/* maison */}
      <rect x="40" y="70" width="180" height="110" fill={C.jaune} stroke={C.ink} strokeWidth="5" />
      <path d="M25 75 L130 10 L235 75 Z" fill={C.rose} stroke={C.ink} strokeWidth="5" />
      <rect x="110" y="120" width="40" height="60" fill={C.violet} />
      {/* arbre + terrasse + piscine */}
      <rect x="330" y="150" width="140" height="22" fill={C.violetClair} stroke={C.ink} strokeWidth="3" />
      <text x="400" y="140" textAnchor="middle" fontSize="15" fill={C.ink} {...t}>terrasse intacte</text>
      <rect x="545" y="110" width="12" height="60" fill={C.terreFonce} />
      <circle cx="551" cy="95" r="38" fill="#4CAF50" />
      <text x="551" y="40" textAnchor="middle" fontSize="15" fill={C.ink} {...t}>arbre conservé</text>
      {/* regard */}
      <rect x="760" y="168" width="44" height="170" fill={C.gris} stroke={C.ink} strokeWidth="4" />
      <text x="782" y="155" textAnchor="middle" fontSize="16" fill={C.ink} {...T}>REGARD</text>
      {/* canalisation */}
      <path d="M130 180 L130 290 L760 320" stroke={C.gris} strokeWidth="30" fill="none" strokeLinejoin="round" />
      <path d="M130 180 L130 290 L760 320" stroke={C.lime} strokeWidth="16" fill="none" strokeLinejoin="round" />
      <text x="450" y="370" textAnchor="middle" fontSize="20" fill={C.ink} {...T}>BRANCHEMENT CHEMISÉ</text>
    </Cadre>
  );
}

/** Composition d'une gaine. */
export function SchemaCouches() {
  const couches = [
    { y: 60, h: 50, c: C.gris, label: "Ancienne canalisation (le moule)" },
    { y: 110, h: 60, c: C.rose, label: "Résine (colle et rigidifie)" },
    { y: 170, h: 60, c: C.jaune, label: "Feutre ou fibre de verre (l'armature)" },
    { y: 230, h: 30, c: C.cyan, label: "Film intérieur lisse (l'écoulement)" },
  ];
  return (
    <Cadre viewBox="0 0 800 320" titre="Les couches d'une gaine de chemisage" legende="Une gaine, c'est une armature (feutre ou fibre de verre), une résine qui durcit et un film intérieur lisse.">
      <rect width="800" height="320" fill={C.blanc} />
      {couches.map((k) => (
        <g key={k.label}>
          <rect x="40" y={k.y} width="300" height={k.h} fill={k.c} stroke={C.ink} strokeWidth="3" />
          <line x1="345" y1={k.y + k.h / 2} x2="400" y2={k.y + k.h / 2} stroke={C.ink} strokeWidth="3" />
          <text x="410" y={k.y + k.h / 2 + 7} fontSize="20" fill={C.ink} {...t}>{k.label}</text>
        </g>
      ))}
      <text x="40" y="40" fontSize="22" fill={C.violet} {...T}>DE L&apos;EXTÉRIEUR VERS L&apos;INTÉRIEUR</text>
    </Cadre>
  );
}

/** Robot fraiseur. */
export function SchemaRobot() {
  return (
    <Cadre viewBox="0 0 900 300" titre="Réouverture d'un raccordement au robot fraiseur" legende="Le robot, piloté à distance avec sa caméra, découpe la gaine pile à l'endroit de chaque raccordement repéré avant le chemisage.">
      <rect width="900" height="300" fill={C.ink} />
      <rect x="40" y="130" width="820" height="100" fill={C.gris} />
      <rect x="40" y="142" width="820" height="76" fill={C.lime} />
      {/* raccordement */}
      <rect x="560" y="40" width="50" height="102" fill={C.gris} />
      <rect x="570" y="40" width="30" height="102" fill="#2A1A55" />
      {/* robot */}
      <rect x="380" y="160" width="160" height="50" rx="12" fill={C.violet} stroke={C.blanc} strokeWidth="4" />
      <circle cx="410" cy="215" r="12" fill={C.ink} stroke={C.blanc} strokeWidth="3" />
      <circle cx="510" cy="215" r="12" fill={C.ink} stroke={C.blanc} strokeWidth="3" />
      <path d="M540 175 L585 145" stroke={C.blanc} strokeWidth="10" strokeLinecap="round" />
      <circle cx="588" cy="142" r="14" fill={C.rose} stroke={C.blanc} strokeWidth="3" />
      <circle cx="395" cy="170" r="7" fill={C.cyan} />
      <path d="M40 185 L380 185" stroke={C.jaune} strokeWidth="6" strokeDasharray="12 8" />
      <text x="200" y="100" textAnchor="middle" fontSize="20" fill={C.blanc} {...T}>PILOTAGE À DISTANCE</text>
      <text x="700" y="100" textAnchor="middle" fontSize="20" fill={C.rose} {...T}>FRAISE</text>
    </Cadre>
  );
}

/** Durcissement UV. */
export function SchemaUV() {
  return (
    <Cadre viewBox="0 0 900 300" titre="Durcissement aux ultraviolets" legende="Le train de lampes UV avance lentement dans la gaine gonflée : la résine durcit à son passage.">
      <rect width="900" height="300" fill={C.ink} />
      <rect x="40" y="100" width="820" height="110" rx="12" fill={C.gris} />
      <rect x="40" y="114" width="430" height="82" fill={C.lime} />
      <rect x="470" y="114" width="390" height="82" fill={C.jaune} opacity="0.6" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={420 + i * 70} y="135" width="56" height="40" rx="10" fill={C.violet} stroke={C.blanc} strokeWidth="3" />
          <circle cx={448 + i * 70} cy="155" r="10" fill={C.cyan} />
          <path d={`M${448 + i * 70} 135 L${448 + i * 70} 115`} stroke={C.cyan} strokeWidth="4" />
          <path d={`M${448 + i * 70} 175 L${448 + i * 70} 195`} stroke={C.cyan} strokeWidth="4" />
        </g>
      ))}
      <text x="250" y="80" textAnchor="middle" fontSize="20" fill={C.lime} {...T}>DURCI</text>
      <text x="700" y="80" textAnchor="middle" fontSize="20" fill={C.jaune} {...T}>À DURCIR</text>
      <text x="520" y="255" textAnchor="middle" fontSize="20" fill={C.cyan} {...T}>← TRAIN DE LAMPES UV</text>
    </Cadre>
  );
}

const SCHEMAS: Record<SchemaId, () => JSX.Element> = {
  coupe: SchemaCoupe,
  etapes: SchemaEtapes,
  comparatif: SchemaComparatif,
  immeuble: SchemaImmeuble,
  manchette: SchemaManchette,
  inversion: SchemaInversion,
  branchement: SchemaBranchement,
  couches: SchemaCouches,
  robot: SchemaRobot,
  uv: SchemaUV,
};

export function Schema({ id }: { id: SchemaId }) {
  const S = SCHEMAS[id];
  return <S />;
}
