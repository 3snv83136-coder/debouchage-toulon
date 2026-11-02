import Link from "next/link";
import { MapPin } from "lucide-react";
import { Conteneur, EnTete } from "@/components/ui/Conteneur";
import { VILLES } from "@/lib/data/villes";

export function Zones({ exclure }: { exclure?: string }) {
  const villes = VILLES.filter((v) => v.slug !== exclure);
  return (
    <section className="py-20">
      <Conteneur>
        <EnTete surtitre="Zones d'intervention" titre="Toulon et toute l'aire toulonnaise" texte="Nos techniciens interviennent dans les communes suivantes. Votre ville n'y est pas ? Appelez, on vous dit tout de suite si on peut venir." />
        <ul className="mt-10 flex flex-wrap gap-3">
          {villes.map((v) => (
            <li key={v.slug}>
              <Link href={`/villes/${v.slug}`} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-sea-500 hover:text-sea-700">
                <MapPin aria-hidden className="h-4 w-4 text-sea-600" /> {v.nom} <span className="font-normal text-ink-muted">{v.cp}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Conteneur>
    </section>
  );
}
