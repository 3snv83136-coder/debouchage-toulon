import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { EnTetePage } from "@/components/sections/EnTetePage";
import { SectionFaq } from "@/components/sections/SectionFaq";
import { Zones } from "@/components/sections/Zones";
import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { Conteneur } from "@/components/ui/Conteneur";
import { IconeService } from "@/components/ui/IconeService";
import { JsonLd } from "@/components/ui/JsonLd";
import { TARIF } from "@/lib/config";
import { SERVICES, getService } from "@/lib/data/services";
import { villesPourService } from "@/lib/cocon";
import { euros, remplir } from "@/lib/format";
import { jsonLdService, pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return pageMetadata({ titre: `${s.titre} à Toulon`, description: remplir(s.accroche), chemin: `/services/${s.slug}` });
}

export default function PageService({ params }: Params) {
  const s = getService(params.slug);
  if (!s) notFound();
  const tarif = TARIF[s.tarif];
  const autres = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 4);
  const declinaisons = villesPourService(s.slug);

  return (
    <>
      <JsonLd data={jsonLdService({ nom: s.titre, description: remplir(s.accroche), chemin: `/services/${s.slug}` })} />
      <EnTetePage
        ariane={[{ nom: "Services", chemin: "/services" }, { nom: s.court, chemin: `/services/${s.slug}` }]}
        icone={<IconeService nom={s.icone} className="h-7 w-7" />}
        titre={<>{s.titre} <span className="text-sea-600">à Toulon</span></>}
        texte={remplir(s.accroche)}
      />

      <section className="py-16">
        <Conteneur className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-12">
            <div className="space-y-4 text-lg text-ink-soft">
              {s.intro.map((p) => <p key={p}>{remplir(p)}</p>)}
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Les signes qui doivent vous alerter</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {s.signes.map((x) => (
                  <li key={x} className="flex gap-3 rounded-xl bg-sun-50 p-4 text-ink">
                    <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sun-600" /> {x}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Notre méthode</h2>
              <ol className="mt-6 space-y-6 border-l-2 border-sea-100 pl-6">
                {s.methode.map((m, i) => (
                  <li key={m.titre} className="relative">
                    <span className="absolute -left-[37px] grid h-6 w-6 place-items-center rounded-full bg-sea-600 text-xs font-bold text-white">{i + 1}</span>
                    <h3 className="font-bold text-ink">{m.titre}</h3>
                    <p className="mt-1 text-ink-soft">{m.texte}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-3xl bg-ink p-7 text-white">
              <p className="text-sm text-white/70">Forfait de référence</p>
              <p className="mt-1 font-bold">{tarif.titre}</p>
              <p className="mt-4 font-display text-5xl font-extrabold">{euros(tarif.prix)}</p>
              <p className="mt-2 text-sm text-white/70">Déplacement inclus · garantie {tarif.garantie}</p>
              <BoutonAppel className="mt-6 w-full" />
              <Link href="/tarifs" className="mt-4 block text-center text-sm text-white/70 underline-offset-4 hover:underline">Voir tous les tarifs</Link>
            </div>
            {declinaisons.length > 0 && (
              <div className="mt-6 rounded-3xl border border-ink/10 p-6">
                <p className="font-bold text-ink">{s.court} près de chez vous</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {declinaisons.map(({ ville }) => (
                    <li key={ville.slug}><Link href={`/villes/${ville.slug}/${s.slug}`} className="text-sea-700 hover:underline">{s.court} à {ville.nom}</Link></li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 rounded-3xl border border-ink/10 p-6">
              <p className="font-bold text-ink">Autres interventions</p>
              <ul className="mt-3 space-y-2 text-sm">
                {autres.map((x) => (
                  <li key={x.slug}><Link href={`/services/${x.slug}`} className="text-sea-700 hover:underline">{x.titre}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </Conteneur>
      </section>

      <SectionFaq faqs={s.faqs} titre={`${s.court} : vos questions`} />
      <Zones />
      <BandeauAppel />
    </>
  );
}
