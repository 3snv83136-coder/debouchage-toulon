import type { ReactNode } from "react";
import { BadgeEuro, Clock, ShieldCheck } from "lucide-react";
import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { Conteneur } from "@/components/ui/Conteneur";
import { PARAMETRE, TARIFS_ORDONNES } from "@/lib/config";
import { euros } from "@/lib/format";

type Props = {
  surtitre: string;
  titre: ReactNode;
  texte: string;
  avant?: ReactNode;
};

export function Hero({ surtitre, titre, texte, avant }: Props) {
  return (
    <section className="relative overflow-hidden bg-sand">
      <svg aria-hidden className="absolute -right-40 -top-24 h-[520px] w-[520px] text-sea-100" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="100" fill="currentColor" />
      </svg>
      <Conteneur className="relative grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
        <div>
          {avant}
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-sea-700 shadow-card">
            {surtitre}
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">{titre}</h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{texte}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BoutonAppel taille="lg" />
            <a href="#tarifs" className="inline-flex h-14 items-center justify-center rounded-full border border-ink/15 bg-white px-7 font-semibold text-ink hover:border-ink/40">
              Voir les tarifs
            </a>
          </div>
          <ul className="mt-8 grid gap-3 text-sm text-ink-soft sm:grid-cols-3">
            <li className="flex items-center gap-2"><Clock aria-hidden className="h-5 w-5 text-sea-600" /> Sur place en moins de {PARAMETRE.DELAI_INTERVENTION}</li>
            <li className="flex items-center gap-2"><BadgeEuro aria-hidden className="h-5 w-5 text-sea-600" /> Prix fixe annoncé avant</li>
            <li className="flex items-center gap-2"><ShieldCheck aria-hidden className="h-5 w-5 text-sea-600" /> Intervention garantie</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-ink-muted">Nos forfaits, déplacement inclus</p>
          <ul className="mt-5 divide-y divide-ink/10">
            {TARIFS_ORDONNES.map((t) => (
              <li key={t.key} className="flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className="block font-semibold text-ink">{t.titre}</span>
                  <span className="text-sm text-ink-muted">Garantie {t.garantie}</span>
                </span>
                <span className="whitespace-nowrap font-display text-2xl font-bold text-ink">{euros(t.prix)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl bg-sea-50 p-4 text-sm text-sea-700">
            Le technicien vous confirme le forfait par téléphone. Aucun supplément sans votre accord.
          </p>
        </div>
      </Conteneur>
    </section>
  );
}
