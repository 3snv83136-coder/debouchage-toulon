import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { Conteneur } from "@/components/ui/Conteneur";
import { PARAMETRE } from "@/lib/config";

export function BandeauAppel({ titre = "Un bouchon ? On s'en occupe maintenant." }: { titre?: string }) {
  return (
    <section className="py-16">
      <Conteneur>
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-sun-500 p-8 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{titre}</h2>
            <p className="mt-2 text-white/85">Technicien disponible {PARAMETRE.HORAIRES}. Prix annoncé avant le déplacement.</p>
          </div>
          <BoutonAppel variante="clair" taille="lg" />
        </div>
      </Conteneur>
    </section>
  );
}
