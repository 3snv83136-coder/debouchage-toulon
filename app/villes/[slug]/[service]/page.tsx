import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { AsideAppel } from "@/components/cocon/AsideAppel";
import { CarteCasType } from "@/components/cocon/CarteCasType";
import { DonneesLocales } from "@/components/cocon/DonneesLocales";
import { ListeConseils } from "@/components/cocon/ListeConseils";
import { Bloc, Paragraphes } from "@/components/cocon/Texte";
import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { EnTetePage } from "@/components/sections/EnTetePage";
import { Conteneur } from "@/components/ui/Conteneur";
import { IconeService } from "@/components/ui/IconeService";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListeFaq } from "@/components/ui/ListeFaq";
import { COCONS, getCocon, getServiceVille, villesPourService } from "@/lib/cocon";
import { TARIF } from "@/lib/config";
import { getService } from "@/lib/data/services";
import { euros, remplir } from "@/lib/format";
import { jsonLdFaq, jsonLdService, pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string; service: string } };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return COCONS.flatMap((v) => v.services.map((s) => ({ slug: v.slug, service: s.service })));
}

export function generateMetadata({ params }: Params): Metadata {
  const v = getCocon(params.slug);
  const s = v && getServiceVille(v, params.service);
  if (!v || !s) return {};
  return pageMetadata({ titre: `${s.titre} (${v.cp})`, description: remplir(s.accroche), chemin: `/villes/${v.slug}/${s.service}` });
}

export default function PageServiceVille({ params }: Params) {
  const v = getCocon(params.slug);
  const s = v && getServiceVille(v, params.service);
  const g = getService(params.service);
  if (!v || !s || !g) notFound();
  const chemin = `/villes/${v.slug}/${s.service}`;
  const tarif = TARIF[g.tarif];
  const ailleurs = villesPourService(s.service).filter((x) => x.ville.slug !== v.slug);

  return (
    <>
      <JsonLd data={jsonLdService({ nom: s.titre, description: remplir(s.accroche), chemin, zone: v.nom })} />
      {s.faqs.length > 0 && <JsonLd data={jsonLdFaq(s.faqs)} />}
      <EnTetePage
        ariane={[{ nom: "Zones d'intervention", chemin: "/villes" }, { nom: v.nom, chemin: `/villes/${v.slug}` }, { nom: g.court, chemin }]}
        icone={<IconeService nom={g.icone} className="h-7 w-7" />}
        titre={s.titre}
        texte={remplir(s.accroche)}
      />
      <Conteneur className="grid gap-12 py-14 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-14">
          <Paragraphes items={s.intro} />
          <Bloc titre={`Ce qui est propre à ${v.nom}`}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {s.specificites.map((x) => (
                <li key={x.titre} className="rounded-2xl border border-ink/10 bg-white p-5">
                  <p className="font-bold text-ink">{x.titre}</p>
                  <p className="mt-2 text-sm text-ink-soft">{remplir(x.texte)}</p>
                </li>
              ))}
            </ul>
          </Bloc>
          <Bloc titre="Comment nous intervenons"><Paragraphes items={s.methode} /></Bloc>
          <Bloc titre="Les étapes, partout où nous intervenons">
            <ol className="space-y-4 border-l-2 border-sea-100 pl-6">
              {g.methode.map((m, i) => (
                <li key={m.titre} className="relative">
                  <span className="absolute -left-[37px] grid h-6 w-6 place-items-center rounded-full bg-sea-600 text-xs font-bold text-white">{i + 1}</span>
                  <p className="font-bold text-ink">{m.titre}</p>
                  <p className="text-ink-soft">{m.texte}</p>
                </li>
              ))}
            </ol>
          </Bloc>
          <CarteCasType cas={s.casType} />
          <div className="flex flex-col gap-4 rounded-3xl bg-sand p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-ink-muted">Forfait de référence à {v.nom}</p>
              <p className="font-bold text-ink">{tarif.titre}</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
                {tarif.inclus.map((x) => <li key={x} className="flex items-center gap-1"><Check aria-hidden className="h-4 w-4 text-sea-600" /> {x}</li>)}
              </ul>
            </div>
            <p className="font-display text-4xl font-extrabold text-ink">{euros(tarif.prix)}</p>
          </div>
          <Bloc titre="Nos conseils"><ListeConseils items={s.conseils} /></Bloc>
          {s.faqs.length > 0 && <Bloc titre="Questions fréquentes"><ListeFaq faqs={s.faqs} /></Bloc>}
          <DonneesLocales ville={v} />
          <Bloc titre={`${g.court} dans les quartiers de ${v.nom}`}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {v.quartiers.map((q) => (
                <li key={q.slug}><Link href={`/villes/${v.slug}/quartiers/${q.slug}`} className="block rounded-2xl border border-ink/10 p-4 hover:border-sea-500"><span className="font-semibold text-ink">{q.nom}</span><span className="mt-1 block text-sm text-ink-soft">{q.bati}</span></Link></li>
              ))}
            </ul>
          </Bloc>
          {ailleurs.length > 0 && (
            <Bloc titre={`${g.court} dans les autres villes`}>
              <ul className="flex flex-wrap gap-3">
                {ailleurs.map(({ ville }) => (
                  <li key={ville.slug}><Link href={`/villes/${ville.slug}/${s.service}`} className="inline-flex rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink hover:border-sea-500">{g.court} à {ville.nom}</Link></li>
                ))}
              </ul>
            </Bloc>
          )}
          <p className="text-sm text-ink-muted">Fiche générale : <Link href={`/services/${g.slug}`} className="underline">{g.titre}</Link>.</p>
        </article>
        <AsideAppel ville={v} actif={s.service} />
      </Conteneur>
      <BandeauAppel titre={`${g.court} à ${v.nom} ? On arrive.`} />
    </>
  );
}
