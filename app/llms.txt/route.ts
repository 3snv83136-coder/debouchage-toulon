import { PARAMETRE, SITE_URL, TARIFS_ORDONNES } from "@/lib/config";
import { SERVICES } from "@/lib/data/services";
import { VILLES } from "@/lib/data/villes";
import { euros, remplir } from "@/lib/format";

export const dynamic = "force-static";

export function GET() {
  const lignes = [
    `# ${PARAMETRE.NOM_COMMERCIAL}`,
    "",
    `> Débouchage de canalisations, hydrocurage et inspection caméra à ${PARAMETRE.ZONE}. Intervention ${PARAMETRE.HORAIRES}, en moins de ${PARAMETRE.DELAI_INTERVENTION}. Prix fixe annoncé avant le déplacement.`,
    "",
    `Téléphone : ${PARAMETRE.TEL_PRINCIPAL}`,
    "",
    "## Tarifs (TTC, déplacement inclus)",
    ...TARIFS_ORDONNES.map((t) => `- ${t.titre} : ${euros(t.prix)} (garantie ${t.garantie})`),
    "",
    "## Services",
    ...SERVICES.map((s) => `- [${s.titre}](${SITE_URL}/services/${s.slug}) : ${remplir(s.accroche)}`),
    "",
    "## Zones d'intervention",
    ...VILLES.map((v) => `- [${v.nom} (${v.cp})](${SITE_URL}/villes/${v.slug})`),
    "",
  ];
  return new Response(lignes.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
