import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Wrench } from "lucide-react";
import { BandeauAppel } from "@/components/sections/BandeauAppel";
import { GrilleServices } from "@/components/sections/GrilleServices";
import { GrilleTarifs } from "@/components/sections/GrilleTarifs";
import { Hero } from "@/components/sections/Hero";
import { SectionFaq } from "@/components/sections/SectionFaq";
import { Conteneur } from "@/components/ui/Conteneur";
import { FilAriane } from "@/components/ui/FilAriane";
import { JsonLd } from "@/components/ui/JsonLd";
import { PARAMETRE } from "@/lib/config";
import type { Faq } from "@/lib/data/types";
import { VILLES, getVille, type Ville } from "@/lib/data/villes";
import { jsonLdService, pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return VILLES.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const v = getVille(params.slug);
  if (!v) return {};
  return pageMetadata({
    titre: `Débouchage ${v.nom} (${v.cp}) 24h/24`,
    description: `Débouchage de canalisation, WC et évier à ${v.nom} (${v.cp}) : technicien en moins de ${PARAMETRE.DELAI_INTERVENTION}, ${PARAMETRE.HORAIRES}. Prix fixe annoncé avant le déplacement.`,
    chemin: `/villes/${v.slug}`,
  });
}

/** FAQ propres à la ville, complétées par les questions prix et horaires si elles manquent. */
function faqsVille(v: Ville): Faq[] {
  const questions = v.faqs.map((f) => f.q.toLowerCase());
  const parleDe = (...mots: string[]) => questions.some((q) => mots.some((m) => q.includes(m)));
  const ajouts: Faq[] = [];
  if (!parleDe("prix", "coûte")) {
    ajouts.push({ q: `Combien coûte un débouchage à ${v.nom} ?`, a: "Débouchage manuel {prix:manuel}, furet électrique {prix:mecanique}, hydrocurage {prix:hydrocurage}. Déplacement inclus, prix confirmé avant l'intervention." });
  }
  if (!parleDe("nuit", "week-end")) {
    ajouts.push({ q: `Intervenez-vous la nuit et le week-end à ${v.nom} ?`, a: `Oui, nous intervenons {horaires} à ${v.nom}, notamment ${v.quartiers.slice(0, 3).join(", ")}.` });
  }
  return [...v.faqs, ...ajouts];
}

export default function PageVille({ params }: Params) {
  const v = getVille(params.slug);
  if (!v) notFound();
  const voisines = v.voisines.map(getVille).filter((x): x is Ville => Boolean(x));
  const chemin = `/villes/${v.slug}`;

  return (
    <>
      <JsonLd data={jsonLdService({ nom: `Débouchage ${v.nom}`, description: v.contexte, chemin, zone: v.nom })} />
      <Hero
        avant={<div className="mb-8"><FilAriane items={[{ nom: "Zones d'intervention", chemin: "/villes" }, { nom: v.nom, chemin }]} /></div>}
        surtitre={`${v.nom} · ${v.cp}`}
        titre={<>Débouchage <span className="text-sea-600">{v.nom}</span></>}
        texte={`WC, évier ou canalisation bouchée à ${v.nom} ? Un technicien sur place en moins de ${PARAMETRE.DELAI_INTERVENTION}, ${PARAMETRE.HORAIRES}. Le prix est fixé avant le déplacement.`}
      />

      <section className="py-16">
        <Conteneur className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink">Les canalisations à {v.nom}</h2>
            <p className="mt-4 text-lg text-ink-soft">{v.contexte}</p>
            <h3 className="mt-8 font-bold text-ink">Problèmes les plus fréquents</h3>
            <ul className="mt-3 space-y-2">
              {v.problemes.map((p) => (
                <li key={p} className="flex items-center gap-2 text-ink-soft"><Wrench aria-hidden className="h-4 w-4 text-sea-600" /> {p}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-bold text-ink">Quartiers desservis</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {v.quartiers.map((q) => (
                <li key={q} className="inline-flex items-center gap-1 rounded-full bg-sea-50 px-3 py-1 text-sm text-sea-700"><MapPin aria-hidden className="h-3.5 w-3.5" /> {q}</li>
              ))}
            </ul>
          </div>
          <article className="self-start rounded-3xl border border-ink/10 bg-white p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-wider text-sun-600">Exemple d&apos;intervention</p>
            <h3 className="mt-2 text-2xl font-bold text-ink">{v.casType.titre}</h3>
            <p className="mt-4 text-ink-soft">{v.casType.description}</p>
            <p className="mt-6 inline-flex rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-white">{v.casType.technique}</p>
          </article>
        </Conteneur>
      </section>

      <GrilleServices surtitre={`Nos services à ${v.nom}`} titre="Ce que nous débouchons" />
      <GrilleTarifs titre={`Tarifs débouchage à ${v.nom}`} />
      <SectionFaq faqs={faqsVille(v)} titre={`Débouchage à ${v.nom} : vos questions`} />

      {voisines.length > 0 && (
        <section className="py-16">
          <Conteneur>
            <h2 className="font-display text-2xl font-bold text-ink">Nous intervenons aussi près de {v.nom}</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {voisines.map((x) => (
                <li key={x.slug}>
                  <Link href={`/villes/${x.slug}`} className="inline-flex rounded-full border border-ink/10 px-4 py-2 font-semibold text-ink hover:border-sea-500 hover:text-sea-700">
                    Débouchage {x.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </Conteneur>
        </section>
      )}
      <BandeauAppel titre={`Un bouchon à ${v.nom} ? On arrive.`} />
    </>
  );
}
