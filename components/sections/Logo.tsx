import Link from "next/link";
import { PARAMETRE } from "@/lib/config";

export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${PARAMETRE.NOM_COMMERCIAL}, accueil`}>
      <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="9" className="fill-sea-600" />
        <path d="M16 6c-3.6 5-6 8.4-6 11.6a6 6 0 0 0 12 0C22 14.4 19.6 11 16 6Z" fill="#fff" />
        <path d="M13.2 18.2a2.8 2.8 0 0 0 2.8 2.8" stroke="#F26B1D" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <span className={`font-display text-[17px] font-bold leading-none tracking-tight ${clair ? "text-white" : "text-ink"}`}>
        {PARAMETRE.NOM_COURT}
        <span className={`block text-xs font-medium tracking-normal ${clair ? "text-white/70" : "text-ink-muted"}`}>Toulon · Var</span>
      </span>
    </Link>
  );
}
