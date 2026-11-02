import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { Conteneur } from "@/components/ui/Conteneur";

export function BandeauFlash({ titre = "Canalisation fissurée ? On la répare sans casser.", texte = "Débouchage, passage caméra, puis devis de chemisage gratuit. Vous voyez les images avant de décider." }: { titre?: string; texte?: string }) {
  return (
    <section className="py-16">
      <Conteneur>
        <div className="relative overflow-hidden rounded-[2rem] border-4 border-ink bg-sun-500 p-8 text-white shadow-flash sm:p-12">
          <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-jaune opacity-80" />
          <div aria-hidden className="absolute -bottom-16 right-32 h-40 w-40 rounded-full bg-sea-600 opacity-80" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold uppercase leading-tight sm:text-4xl">{titre}</h2>
              <p className="mt-3 text-lg font-semibold text-white/90">{texte}</p>
            </div>
            <BoutonAppel variante="clair" taille="lg" />
          </div>
        </div>
      </Conteneur>
    </section>
  );
}
