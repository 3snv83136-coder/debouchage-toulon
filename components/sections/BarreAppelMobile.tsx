import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { PRIX_MIN } from "@/lib/config";
import { euros } from "@/lib/format";

export function BarreAppelMobile() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 py-3 backdrop-blur sm:hidden">
      <div className="flex items-center gap-3">
        <p className="text-xs leading-tight text-ink-soft">
          Dès <strong className="block text-base text-ink">{euros(PRIX_MIN)}</strong>
        </p>
        <BoutonAppel libelle="Appeler un technicien" className="flex-1" />
      </div>
    </div>
  );
}
