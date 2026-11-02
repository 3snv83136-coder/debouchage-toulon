import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { EnTetePage } from "@/components/sections/EnTetePage";
import { Conteneur } from "@/components/ui/Conteneur";
import { CHARTE } from "@/lib/cocon/charte";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titre: "Notre charte d'intervention",
  description: "Prix annoncé avant le déplacement, technique la plus douce d'abord, pas de travaux inutiles, zéro produit chimique, respect de la mer : nos engagements.",
  chemin: "/charte",
});

export default function PageCharte() {
  return (
    <>
      <EnTetePage ariane={[{ nom: "Charte", chemin: "/charte" }]} titre="Notre charte d'intervention" texte="Sept engagements simples, que nos techniciens appliquent à chaque intervention, de Six-Fours à Hyères." />
      <section className="py-16">
        <Conteneur className="max-w-4xl space-y-6">
          {CHARTE.map((e, i) => (
            <article key={e.titre} className="rounded-3xl border border-ink/10 bg-white p-7">
              <p className="text-sm font-bold text-sea-600">Engagement {i + 1}</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink">{e.titre}</h2>
              <p className="mt-3 text-lg text-ink-soft">{e.texte}</p>
              <ul className="mt-4 space-y-2">
                {e.concretement.map((c) => <li key={c} className="flex gap-2 text-ink"><CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sea-600" />{c}</li>)}
              </ul>
            </article>
          ))}
          <p className="rounded-2xl bg-sand p-6 text-ink-soft">Ces engagements sont appliqués par <Link href="/equipe" className="font-semibold text-sea-700 underline">Laurent et Ange</Link>, avec le <Link href="/materiel" className="font-semibold text-sea-700 underline">matériel décrit ici</Link>.</p>
        </Conteneur>
      </section>
      <BandeauAppel />
    </>
  );
}
