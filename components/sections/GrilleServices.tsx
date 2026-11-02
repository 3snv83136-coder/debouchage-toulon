import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Conteneur, EnTete } from "@/components/ui/Conteneur";
import { IconeService } from "@/components/ui/IconeService";
import { SERVICES } from "@/lib/data/services";
import { remplir } from "@/lib/format";

export function GrilleServices({ titre = "Tous types de bouchons, un seul numéro", surtitre = "Nos interventions" }: { titre?: string; surtitre?: string }) {
  return (
    <section className="bg-sand py-20">
      <Conteneur>
        <EnTete surtitre={surtitre} titre={titre} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-card transition-transform hover:-translate-y-0.5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-sea-50 text-sea-600">
                  <IconeService nom={s.icone} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.court}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{remplir(s.accroche)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sea-600">
                  En savoir plus <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Conteneur>
    </section>
  );
}
