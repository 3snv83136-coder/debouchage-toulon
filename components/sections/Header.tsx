import Link from "next/link";
import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { Conteneur } from "@/components/ui/Conteneur";
import { Logo } from "@/components/sections/Logo";
import { MenuMobile } from "@/components/sections/MenuMobile";
import { NAVIGATION } from "@/components/sections/navigation";
import { PARAMETRE } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="bg-ink text-white">
        <Conteneur className="flex h-9 items-center justify-between text-xs sm:text-sm">
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Urgence {PARAMETRE.HORAIRES}
          </p>
          <p className="hidden sm:block text-white/70">Prix annoncé avant le déplacement</p>
        </Conteneur>
      </div>
      <Conteneur className="relative flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-semibold text-ink-soft">
            {NAVIGATION.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">{l.libelle}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <BoutonAppel className="hidden sm:inline-flex" />
          <MenuMobile />
        </div>
      </Conteneur>
    </header>
  );
}
