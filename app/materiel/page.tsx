import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { EnTetePage } from "@/components/sections/EnTetePage";
import { Conteneur } from "@/components/ui/Conteneur";
import { MATERIEL } from "@/lib/cocon/materiel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "Notre matériel de débouchage",
  description: "Pompe à pression, furet électrique, hydrocureuse, caméra d'inspection, coupe-racines, localisateur : à quoi sert chaque appareil, ses caractéristiques et ses limites.",
  chemin: "/materiel",
});

export default function PageMateriel() {
  return (
    <>
      <EnTetePage
        ariane={[{ nom: "Matériel", chemin: "/materiel" }]}
        titre="Notre matériel, expliqué simplement"
        texte="Chaque bouchon a son outil. Voici ce que nous utilisons, comment ça marche, et surtout quand on ne l'utilise pas."
      />
      <section className="py-16">
        <Conteneur>
          <ul className="grid gap-5 md:grid-cols-2">
            {MATERIEL.map((m) => (
              <li key={m.id}>
                <Link href={`/materiel/${m.id}`} className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-7 hover:border-sea-500">
                  <h2 className="font-display text-xl font-bold text-ink">{m.nom}</h2>
                  <p className="mt-2 flex-1 text-ink-soft">{m.role}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    {m.caracteristiques.slice(0, 2).map((c) => (
                      <div key={c.label}><dt className="text-ink-muted">{c.label}</dt><dd className="font-semibold text-ink">{c.valeur}</dd></div>
                    ))}
                  </dl>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sea-600">Fiche complète <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </Conteneur>
      </section>
      <BandeauAppel />
    </>
  );
}
