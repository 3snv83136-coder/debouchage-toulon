import type { ReactNode } from "react";
import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { Conteneur } from "@/components/ui/Conteneur";
import { FilAriane } from "@/components/ui/FilAriane";

type Props = {
  ariane: { nom: string; chemin: string }[];
  titre: ReactNode;
  texte: string;
  icone?: ReactNode;
  appel?: boolean;
};

export function EnTetePage({ ariane, titre, texte, icone, appel = true }: Props) {
  return (
    <section className="bg-sand">
      <Conteneur className="py-10 sm:py-14">
        <FilAriane items={ariane} />
        <div className="mt-8 max-w-3xl">
          {icone && <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-white text-sea-600 shadow-card">{icone}</span>}
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">{titre}</h1>
          <p className="mt-5 text-lg text-ink-soft">{texte}</p>
          {appel && <BoutonAppel taille="lg" className="mt-8" />}
        </div>
      </Conteneur>
    </section>
  );
}
