import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { IconeService } from "@/components/ui/IconeService";
import { getService } from "@/lib/data/services";
import type { VilleCocon } from "@/lib/cocon/types";

/** Liens internes du cocon : page ville, quartiers et services de la ville. */
export function MaillageVille({ ville, actif }: { ville: VilleCocon; actif?: string }) {
  return (
    <nav aria-label={`Débouchage à ${ville.nom}`} className="rounded-3xl border border-ink/10 bg-white p-6">
      <Link href={`/villes/${ville.slug}`} className={`flex items-center justify-between font-bold ${actif === "ville" ? "text-sea-700" : "text-ink hover:text-sea-700"}`}>
        Débouchage {ville.nom} <ArrowRight aria-hidden className="h-4 w-4" />
      </Link>
      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink-muted">Quartiers</p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {ville.quartiers.map((q) => (
          <li key={q.slug}>
            <Link href={`/villes/${ville.slug}/quartiers/${q.slug}`} className={`flex items-center gap-2 ${actif === q.slug ? "font-semibold text-sea-700" : "text-ink-soft hover:text-ink"}`}>
              <MapPin aria-hidden className="h-3.5 w-3.5 text-sea-600" /> {q.nom}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink-muted">Interventions</p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {ville.services.map((s) => {
          const g = getService(s.service);
          return (
            <li key={s.service}>
              <Link href={`/villes/${ville.slug}/${s.service}`} className={`flex items-center gap-2 ${actif === s.service ? "font-semibold text-sea-700" : "text-ink-soft hover:text-ink"}`}>
                {g && <IconeService nom={g.icone} className="h-3.5 w-3.5 text-sea-600" />} {g?.court ?? s.titre}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
