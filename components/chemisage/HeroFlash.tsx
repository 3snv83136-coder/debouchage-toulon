import type { ReactNode } from "react";
import Link from "next/link";
import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { Conteneur } from "@/components/ui/Conteneur";
import { FilAriane } from "@/components/ui/FilAriane";

type Props = {
  surtitre: string;
  titre: ReactNode;
  texte: string;
  ariane?: { nom: string; chemin: string }[];
  visuel?: ReactNode;
  badges?: string[];
};

/** En-tête flashy des pages chemisage. */
export function HeroFlash({ surtitre, titre, texte, ariane, visuel, badges = ["Sans tranchée", "Sans casse", "Devis gratuit"] }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sea-600 opacity-60 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sun-500 opacity-50 blur-3xl" />
      <div aria-hidden className="absolute right-1/3 top-0 h-40 w-40 rounded-full bg-cyan opacity-30 blur-3xl" />
      <Conteneur className={`relative grid gap-10 py-12 sm:py-16 ${visuel ? "lg:grid-cols-[1.1fr_0.9fr] lg:items-center" : ""}`}>
        <div>
          {ariane && <div className="mb-6 [&_a:hover]:text-white [&_a]:text-white/70 [&_span]:text-white/90 [&_nav]:text-white/60"><FilAriane items={ariane} /></div>}
          <p className="inline-block -rotate-1 rounded-lg bg-lime px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider text-ink">{surtitre}</p>
          <h1 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">{titre}</h1>
          <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">{texte}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BoutonAppel taille="lg" libelle="Devis chemisage gratuit" />
            <Link href="/chemisage/etapes" className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/30 px-7 font-bold text-white hover:border-lime hover:text-lime">Comment ça marche</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <li key={b} className={`rounded-full px-4 py-1.5 text-sm font-extrabold uppercase ${["bg-sun-500 text-white", "bg-cyan text-ink", "bg-jaune text-ink"][i % 3]}`}>{b}</li>
            ))}
          </ul>
        </div>
        {visuel && <div className="text-ink">{visuel}</div>}
      </Conteneur>
    </section>
  );
}
