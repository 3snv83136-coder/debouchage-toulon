import Link from "next/link";
import { PARAMETRE } from "@/lib/config";

/** Logo : une canalisation vue en coupe, avec sa gaine de chemisage (anneau citron). */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${PARAMETRE.NOM_COMMERCIAL}, accueil`}>
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden>
        <rect width="40" height="40" rx="12" className="fill-sea-600" />
        <circle cx="20" cy="20" r="12" fill="#13072E" />
        <circle cx="20" cy="20" r="9.5" fill="none" stroke="#C8FF2E" strokeWidth="3" />
        <circle cx="20" cy="20" r="5" className="fill-sun-500" />
      </svg>
      <span className={`font-display text-[15px] font-extrabold uppercase leading-none tracking-tight ${clair ? "text-white" : "text-ink"}`}>
        {PARAMETRE.NOM_COURT}
        <span className={`mt-1 block text-[11px] font-bold tracking-[0.18em] ${clair ? "text-lime" : "text-sun-500"}`}>SANS CASSE</span>
      </span>
    </Link>
  );
}
