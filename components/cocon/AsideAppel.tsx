import Link from "next/link";
import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { MaillageVille } from "@/components/cocon/MaillageVille";
import { PARAMETRE, PRIX_MIN } from "@/lib/config";
import { euros } from "@/lib/format";
import type { VilleCocon } from "@/lib/cocon/types";

export function AsideAppel({ ville, actif }: { ville: VilleCocon; actif?: string }) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
      <div className="rounded-3xl bg-ink p-6 text-white">
        <p className="text-sm text-white/70">Urgence à {ville.nom}</p>
        <p className="mt-1 font-display text-2xl font-bold">Sur place en moins de {PARAMETRE.DELAI_INTERVENTION}</p>
        <p className="mt-2 text-sm text-white/70">Dès {euros(PRIX_MIN)}, déplacement inclus. {PARAMETRE.HORAIRES}.</p>
        <BoutonAppel className="mt-5 w-full" />
        <p className="mt-4 text-center text-xs text-white/60">
          <Link href="/equipe" className="underline-offset-4 hover:underline">Laurent et Ange</Link> · <Link href="/charte" className="underline-offset-4 hover:underline">Notre charte</Link>
        </p>
      </div>
      <MaillageVille ville={ville} actif={actif} />
    </aside>
  );
}
