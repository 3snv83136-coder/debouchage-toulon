import Link from "next/link";
import { ArrowRight, MapPin, Truck } from "lucide-react";
import { AsideAppel } from "@/components/cocon/AsideAppel";
import { CarteCasType } from "@/components/cocon/CarteCasType";
import { DonneesLocales } from "@/components/cocon/DonneesLocales";
import { Glossaire } from "@/components/cocon/Glossaire";
import { Saisons } from "@/components/cocon/Saisons";
import { Sommaire } from "@/components/cocon/Sommaire";
import { Bloc, Paragraphes } from "@/components/cocon/Texte";
import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { GrilleTarifs } from "@/components/sections/GrilleTarifs";
import { Hero } from "@/components/sections/Hero";
import { Conteneur } from "@/components/ui/Conteneur";
import { FilAriane } from "@/components/ui/FilAriane";
import { IconeService } from "@/components/ui/IconeService";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListeFaq } from "@/components/ui/ListeFaq";
import { PARAMETRE } from "@/lib/config";
import { getService } from "@/lib/data/services";
import { getVille } from "@/lib/data/villes";
import { remplir } from "@/lib/format";
import { jsonLdFaq, jsonLdService } from "@/lib/seo";
import type { VilleCocon } from "@/lib/cocon/types";

const SOMMAIRE = [
  { id: "en-direct", titre: "En ce moment" },
  { id: "histoire", titre: "Histoire et bâti" },
  { id: "epoques", titre: "Époques de construction" },
  { id: "sol", titre: "Sol et relief" },
  { id: "canalisations", titre: "Les canalisations" },
  { id: "eau", titre: "L'eau du robinet" },
  { id: "saisons", titre: "Saison par saison" },
  { id: "quartiers", titre: "Quartier par quartier" },
  { id: "interventions", titre: "Nos interventions" },
  { id: "cas-type", titre: "Cas type" },
  { id: "environnement", titre: "Environnement" },
  { id: "acces", titre: "Accès et délais" },
  { id: "faq", titre: "Questions fréquentes" },
  { id: "glossaire", titre: "Glossaire" },
];

export function PageVilleCocon({ ville }: { ville: VilleCocon }) {
  const chemin = `/villes/${ville.slug}`;
  const voisines = (getVille(ville.slug)?.voisines ?? []).map(getVille).filter((v) => v !== undefined);
  const cas = ville.quartiers[0]?.casType;

  return (
    <>
      <JsonLd data={jsonLdService({ nom: `Débouchage ${ville.nom}`, description: remplir(ville.meta.description), chemin, zone: ville.nom })} />
      <JsonLd data={jsonLdFaq(ville.faqs)} />
      <Hero
        avant={<div className="mb-8"><FilAriane items={[{ nom: "Zones d'intervention", chemin: "/villes" }, { nom: ville.nom, chemin }]} /></div>}
        surtitre={`${ville.nom} · ${ville.cp} · ${PARAMETRE.HORAIRES}`}
        titre={<>Débouchage <span className="text-sea-600">{ville.nom}</span></>}
        texte={remplir(ville.accroche)}
      />

      <Conteneur className="grid gap-12 py-14 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-16">
          <Paragraphes items={ville.intro} className="space-y-4 text-xl leading-relaxed text-ink-soft" />
          <Sommaire items={SOMMAIRE} />

          <div id="en-direct" className="scroll-mt-32"><DonneesLocales ville={ville} /></div>

          <Bloc id="histoire" surtitre="Histoire et bâti" titre={ville.histoire.titre}>
            <Paragraphes items={ville.histoire.paragraphes} />
          </Bloc>

          <Bloc id="epoques" surtitre="Urbanisme" titre={ville.urbanisme.titre}>
            <Paragraphes items={ville.urbanisme.paragraphes} />
            <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-sand text-ink"><tr><th className="p-4">Époque</th><th className="p-4">Bâti</th><th className="p-4">Canalisations</th></tr></thead>
                <tbody className="divide-y divide-ink/10 text-ink-soft">
                  {ville.urbanisme.periodes.map((p) => (
                    <tr key={p.epoque}><td className="p-4 font-semibold text-ink">{p.epoque}</td><td className="p-4">{p.bati}</td><td className="p-4">{p.reseau}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Bloc>

          <Bloc id="sol" surtitre="Géographie" titre={ville.sol.titre}><Paragraphes items={ville.sol.paragraphes} /></Bloc>

          <Bloc id="canalisations" surtitre="Réseaux" titre={ville.reseaux.titre}>
            <Paragraphes items={ville.reseaux.paragraphes} />
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {ville.reseaux.materiaux.map((m) => (
                <li key={m.nom} className="rounded-2xl border border-ink/10 bg-white p-5">
                  <p className="font-bold text-ink">{m.nom}</p>
                  <p className="mt-1 text-sm text-sea-700">{m.ou}</p>
                  <p className="mt-2 text-sm text-ink-soft">{m.risques}</p>
                </li>
              ))}
            </ul>
          </Bloc>

          <Bloc id="eau" surtitre="Eau potable" titre={ville.eau.titre}><Paragraphes items={ville.eau.paragraphes} /></Bloc>

          <Bloc id="saisons" surtitre="Calendrier" titre={`${ville.nom}, saison par saison`}><Saisons ville={ville} /></Bloc>

          <Bloc id="quartiers" surtitre="Quartiers" titre={`Débouchage quartier par quartier à ${ville.nom}`}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {ville.quartiers.map((q) => (
                <li key={q.slug}>
                  <Link href={`${chemin}/quartiers/${q.slug}`} className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-5 hover:border-sea-500">
                    <p className="flex items-center gap-2 text-lg font-bold text-ink"><MapPin aria-hidden className="h-4 w-4 text-sea-600" /> {q.nom}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">{q.bati}</p>
                    <p className="mt-3 flex-1 text-sm text-ink-soft">{q.accroche}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sea-600">Voir le quartier <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </Bloc>

          <Bloc id="interventions" surtitre="Services" titre={`Nos interventions à ${ville.nom}`}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {ville.services.map((s) => {
                const g = getService(s.service);
                return (
                  <li key={s.service}>
                    <Link href={`${chemin}/${s.service}`} className="group flex h-full gap-4 rounded-2xl bg-sand p-5 hover:bg-sea-50">
                      {g && <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-sea-600"><IconeService nom={g.icone} className="h-5 w-5" /></span>}
                      <span>
                        <span className="block font-bold text-ink">{s.titre}</span>
                        <span className="mt-1 block text-sm text-ink-soft">{remplir(s.accroche)}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Bloc>

          {cas && <div id="cas-type" className="scroll-mt-32"><CarteCasType cas={cas} /></div>}

          <Bloc id="environnement" surtitre="Environnement" titre={ville.environnement.titre}><Paragraphes items={ville.environnement.paragraphes} /></Bloc>

          <Bloc id="acces" surtitre="Sur le terrain" titre={ville.acces.titre}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {ville.acces.points.map((p) => (
                <li key={p.titre} className="flex gap-3 rounded-2xl border border-ink/10 bg-white p-5">
                  <Truck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sea-600" />
                  <span><span className="block font-bold text-ink">{p.titre}</span><span className="mt-1 block text-sm text-ink-soft">{p.texte}</span></span>
                </li>
              ))}
            </ul>
          </Bloc>

          <Bloc id="faq" surtitre="FAQ" titre={`Débouchage à ${ville.nom} : vos questions`}><ListeFaq faqs={ville.faqs} /></Bloc>

          <Bloc id="glossaire" surtitre="Lexique" titre="Les mots du métier"><Glossaire items={ville.glossaire} /></Bloc>

          {voisines.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold text-ink">Nous intervenons aussi près de {ville.nom}</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {voisines.map((v) => (
                  <li key={v.slug}><Link href={`/villes/${v.slug}`} className="inline-flex rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink hover:border-sea-500">Débouchage {v.nom}</Link></li>
                ))}
              </ul>
            </div>
          )}
        </article>
        <AsideAppel ville={ville} actif="ville" />
      </Conteneur>

      <GrilleTarifs titre={`Tarifs débouchage à ${ville.nom}`} />
      <BandeauAppel titre={`Un bouchon à ${ville.nom} ? On arrive.`} />
    </>
  );
}
