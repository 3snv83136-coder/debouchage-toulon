import Link from "next/link";
import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { PARAMETRE } from "@/lib/config";
import { VILLES_CHEMISAGE } from "@/lib/chemisage/villes";
import { TECHNIQUES } from "@/lib/chemisage/techniques";

export function AsideChemisage({ villeActive }: { villeActive?: string }) {
  const ville = VILLES_CHEMISAGE.find((v) => v.slug === villeActive);
  return (
    <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
      <div className="rounded-3xl border-4 border-ink bg-sea-600 p-6 text-white shadow-flash">
        <p className="font-display text-xl font-extrabold uppercase leading-tight">Devis chemisage gratuit</p>
        <p className="mt-2 text-sm text-white/85">Après débouchage et passage caméra. Vous voyez les images avant de décider. {PARAMETRE.HORAIRES}.</p>
        <BoutonAppel className="mt-5 w-full" />
      </div>
      {ville && (
        <nav aria-label={`Chemisage à ${ville.nom}`} className="rounded-3xl border-2 border-ink/10 bg-white p-6">
          <Link href={`/chemisage-canalisation/${ville.slug}`} className="font-display font-extrabold uppercase text-ink hover:text-sea-600">Chemisage {ville.nom}</Link>
          <ul className="mt-3 space-y-2 text-sm">
            {ville.quartiers.map((q) => <li key={q.slug}><Link href={`/chemisage-canalisation/${ville.slug}/${q.slug}`} className="text-ink-soft hover:text-sea-600">{q.nom}</Link></li>)}
          </ul>
        </nav>
      )}
      <nav aria-label="Techniques de chemisage" className="rounded-3xl bg-lime p-6">
        <p className="font-display font-extrabold uppercase text-ink">Les techniques</p>
        <ul className="mt-3 space-y-2 text-sm">
          {TECHNIQUES.map((t) => <li key={t.slug}><Link href={`/chemisage/techniques/${t.slug}`} className="font-semibold text-ink hover:underline">{t.court}</Link></li>)}
        </ul>
      </nav>
    </aside>
  );
}
