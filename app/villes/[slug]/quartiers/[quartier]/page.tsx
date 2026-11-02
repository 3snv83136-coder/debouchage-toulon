import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, MapPin } from "lucide-react";
import { AsideAppel } from "@/components/cocon/AsideAppel";
import { CarteCasType } from "@/components/cocon/CarteCasType";
import { DonneesLocales } from "@/components/cocon/DonneesLocales";
import { ListeConseils } from "@/components/cocon/ListeConseils";
import { Bloc, Paragraphes } from "@/components/cocon/Texte";
import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { EnTetePage } from "@/components/sections/EnTetePage";
import { Conteneur } from "@/components/ui/Conteneur";
import { JsonLd } from "@/components/ui/JsonLd";
import { COCONS, getCocon, getQuartier } from "@/lib/cocon";
import { getService } from "@/lib/data/services";
import { PARAMETRE } from "@/lib/config";
import { jsonLdService, pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string; quartier: string } };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return COCONS.flatMap((v) => v.quartiers.map((q) => ({ slug: v.slug, quartier: q.slug })));
}

export function generateMetadata({ params }: Params): Metadata {
  const v = getCocon(params.slug);
  const q = v && getQuartier(v, params.quartier);
  if (!v || !q) return {};
  return pageMetadata({
    titre: `Débouchage ${q.nom}, ${v.nom} (${v.cp})`,
    description: `${q.accroche} Débouchage et hydrocurage à ${q.nom} (${v.nom}) : technicien en moins de ${PARAMETRE.DELAI_INTERVENTION}, ${PARAMETRE.HORAIRES}.`,
    chemin: `/villes/${v.slug}/quartiers/${q.slug}`,
  });
}

export default function PageQuartier({ params }: Params) {
  const v = getCocon(params.slug);
  const q = v && getQuartier(v, params.quartier);
  if (!v || !q) notFound();
  const chemin = `/villes/${v.slug}/quartiers/${q.slug}`;
  const autres = v.quartiers.filter((x) => x.slug !== q.slug);

  return (
    <>
      <JsonLd data={jsonLdService({ nom: `Débouchage ${q.nom} (${v.nom})`, description: q.accroche, chemin, zone: v.nom })} />
      <EnTetePage
        ariane={[{ nom: "Zones d'intervention", chemin: "/villes" }, { nom: v.nom, chemin: `/villes/${v.slug}` }, { nom: q.nom, chemin }]}
        icone={<MapPin className="h-7 w-7" />}
        titre={<>Débouchage {q.nom} <span className="text-sea-600">à {v.nom}</span></>}
        texte={q.accroche}
      />
      <Conteneur className="grid gap-12 py-14 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-14">
          <p className="inline-flex rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink-soft">Bâti : {q.bati}</p>
          <Bloc titre={`${q.nom}, le quartier`}><Paragraphes items={q.description} /></Bloc>
          <Bloc titre={`Les canalisations de ${q.nom}`}><Paragraphes items={q.reseau} /></Bloc>
          <Bloc titre="Les problèmes que nous rencontrons le plus">
            <ul className="grid gap-4 sm:grid-cols-3">
              {q.problemes.map((p) => (
                <li key={p.titre} className="rounded-2xl bg-sun-50 p-5">
                  <p className="flex items-center gap-2 font-bold text-ink"><AlertTriangle aria-hidden className="h-4 w-4 text-sun-600" /> {p.titre}</p>
                  <p className="mt-2 text-sm text-ink-soft">{p.texte}</p>
                </li>
              ))}
            </ul>
          </Bloc>
          <CarteCasType cas={q.casType} />
          <Bloc titre={`Nos conseils pour ${q.nom}`}><ListeConseils items={q.conseils} /></Bloc>
          <Bloc titre="Repères du quartier">
            <ul className="flex flex-wrap gap-2">
              {q.reperes.map((r) => <li key={r} className="rounded-full border border-ink/10 px-3 py-1 text-sm text-ink-soft">{r}</li>)}
            </ul>
          </Bloc>
          <DonneesLocales ville={v} />
          <Bloc titre={`Interventions courantes à ${v.nom}`}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {v.services.map((s) => (
                <li key={s.service}><Link href={`/villes/${v.slug}/${s.service}`} className="block rounded-2xl bg-sand p-4 font-semibold text-ink hover:bg-sea-50">{s.titre}</Link></li>
              ))}
            </ul>
          </Bloc>
          <Bloc titre={`Autres quartiers de ${v.nom}`}>
            <ul className="flex flex-wrap gap-3">
              {autres.map((x) => (
                <li key={x.slug}><Link href={`/villes/${v.slug}/quartiers/${x.slug}`} className="inline-flex rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink hover:border-sea-500">{x.nom}</Link></li>
              ))}
            </ul>
          </Bloc>
          <p className="text-sm text-ink-muted">Le matériel cité dans cette page est décrit en détail dans nos <Link href="/materiel" className="underline">fiches matériel</Link>. {getService("hydrocurage-haute-pression") && <>Découvrez aussi <Link href="/services/hydrocurage-haute-pression" className="underline">l&apos;hydrocurage</Link>.</>}</p>
        </article>
        <AsideAppel ville={v} actif={q.slug} />
      </Conteneur>
      <BandeauAppel titre={`Un bouchon à ${q.nom} ? On arrive.`} />
    </>
  );
}
