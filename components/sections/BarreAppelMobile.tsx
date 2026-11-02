import { BoutonAppel } from "@/components/ui/BoutonAppel";

export function BarreAppelMobile() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-ink bg-lime px-4 py-3 sm:hidden">
      <div className="flex items-center gap-3">
        <p className="font-display text-xs font-extrabold uppercase leading-tight text-ink">Chemisage<br />sans casse</p>
        <BoutonAppel libelle="Devis gratuit" className="flex-1" />
      </div>
    </div>
  );
}
