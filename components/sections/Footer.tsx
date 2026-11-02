import Link from "next/link";
import { Conteneur } from "@/components/ui/Conteneur";
import { Logo } from "@/components/sections/Logo";
import { PARAMETRE } from "@/lib/config";
import { SERVICES } from "@/lib/data/services";
import { VILLES } from "@/lib/data/villes";
import { telHref } from "@/lib/format";

export function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-16 text-white/80 sm:pb-10">
      <Conteneur>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo clair />
            <p className="mt-4 max-w-sm text-sm">
              Débouchage de canalisations, hydrocurage et inspection caméra à {PARAMETRE.ZONE}. Intervention {PARAMETRE.HORAIRES}.
            </p>
            <a href={telHref()} className="mt-5 inline-block font-display text-2xl font-bold text-white hover:text-sun-400">
              {PARAMETRE.TEL_PRINCIPAL}
            </a>
          </div>
          <div>
            <p className="font-semibold text-white">Services</p>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-white">{s.court}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Zones d&apos;intervention</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-1">
              {VILLES.map((v) => (
                <li key={v.slug}>
                  <Link href={`/villes/${v.slug}`} className="hover:text-white">{v.nom}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {PARAMETRE.NOM_COMMERCIAL}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/tarifs" className="hover:text-white">Tarifs</Link>
            <Link href="/materiel" className="hover:text-white">Matériel</Link>
            <Link href="/equipe" className="hover:text-white">Équipe</Link>
            <Link href="/charte" className="hover:text-white">Charte</Link>
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
          </div>
        </div>
      </Conteneur>
    </footer>
  );
}
