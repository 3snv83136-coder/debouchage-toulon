import type { Quartier, ServiceVille, VilleCocon } from "@/lib/cocon/types";
import { HYERES } from "@/lib/cocon/villes/hyeres";
import { LA_GARDE } from "@/lib/cocon/villes/la-garde";
import { LA_SEYNE } from "@/lib/cocon/villes/la-seyne-sur-mer";
import { LA_VALETTE } from "@/lib/cocon/villes/la-valette-du-var";
import { SIX_FOURS } from "@/lib/cocon/villes/six-fours-les-plages";

export const COCONS: VilleCocon[] = [LA_SEYNE, LA_GARDE, LA_VALETTE, SIX_FOURS, HYERES];

export function getCocon(slug: string): VilleCocon | undefined {
  return COCONS.find((c) => c.slug === slug);
}

export function getQuartier(ville: VilleCocon, slug: string): Quartier | undefined {
  return ville.quartiers.find((q) => q.slug === slug);
}

export function getServiceVille(ville: VilleCocon, slug: string): ServiceVille | undefined {
  return ville.services.find((s) => s.service === slug);
}

/** Villes du cocon qui déclinent un service global donné. */
export function villesPourService(serviceSlug: string): { ville: VilleCocon; sv: ServiceVille }[] {
  return COCONS.flatMap((ville) => {
    const sv = getServiceVille(ville, serviceSlug);
    return sv ? [{ ville, sv }] : [];
  });
}
