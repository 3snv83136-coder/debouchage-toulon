import Link from "next/link";
import { Conteneur } from "@/components/ui/Conteneur";
import { Logo } from "@/components/sections/Logo";
import { PARAMETRE } from "@/lib/config";
import { SERVICES } from "@/lib/data/services";
import { DEFAUTS } from "@/lib/chemisage/defauts";
import { TECHNIQUES } from "@/lib/chemisage/techniques";
import { VILLES_CHEMISAGE } from "@/lib/chemisage/villes";
import { telHref } from "@/lib/format";

function Colonne({ titre, liens }: { titre: string; liens: { href: string; libelle: string }[] }) {
  return (
    <div>
      <p className="font-display text-sm font-extrabold uppercase text-lime">{titre}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {liens.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white">{l.libelle}</Link></li>)}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t-4 border-lime bg-ink pb-28 pt-16 text-white/75 sm:pb-10">
      <Conteneur>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo clair />
            <p className="mt-4 max-w-sm text-sm">{PARAMETRE.SLOGAN} Chemisage de canalisation sans tranchée, débouchage et inspection caméra à {PARAMETRE.ZONE}.</p>
            <a href={telHref()} className="mt-5 inline-block font-display text-2xl font-extrabold text-white hover:text-lime">{PARAMETRE.TEL_PRINCIPAL}</a>
          </div>
          <Colonne titre="Chemisage" liens={[{ href: "/chemisage", libelle: "Le guide complet" }, { href: "/chemisage/etapes", libelle: "Les étapes" }, { href: "/chemisage/comparatif", libelle: "Chemisage ou tranchée" }, { href: "/chemisage/prix", libelle: "Prix" }, { href: "/chemisage/faq", libelle: "FAQ" }, { href: "/chemisage/chantiers", libelle: "Chantiers types" }, { href: "/chemisage/materiaux", libelle: "Par matériau" }]} />
          <Colonne titre="Techniques" liens={TECHNIQUES.map((t) => ({ href: `/chemisage/techniques/${t.slug}`, libelle: t.court }))} />
          <Colonne titre="Défauts" liens={DEFAUTS.map((d) => ({ href: `/chemisage/defauts/${d.slug}`, libelle: d.nom }))} />
          <Colonne titre="Villes" liens={VILLES_CHEMISAGE.map((v) => ({ href: `/chemisage-canalisation/${v.slug}`, libelle: `Chemisage ${v.nom}` }))} />
        </div>
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="font-display text-xs font-extrabold uppercase text-white/50">La porte d&apos;entrée : débouchage & caméra</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.court}</Link></li>)}
            <li><Link href="/villes" className="hover:text-white">Zones de débouchage</Link></li>
          </ul>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {PARAMETRE.NOM_COMMERCIAL}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/tarifs" className="hover:text-white">Tarifs débouchage</Link>
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
