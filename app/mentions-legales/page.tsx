import { EnTetePage } from "@/components/sections/EnTetePage";
import { Conteneur } from "@/components/ui/Conteneur";
import { PARAMETRE, SITE_URL } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { PHOTOS } from "@/lib/photos";

export const metadata = { ...pageMetadata({ titre: "Mentions légales", description: `Mentions légales du site ${PARAMETRE.NOM_COMMERCIAL}.`, chemin: "/mentions-legales" }), robots: { index: false } };

const A_COMPLETER = "À compléter";

export default function MentionsLegales() {
  return (
    <>
      <EnTetePage appel={false} ariane={[{ nom: "Mentions légales", chemin: "/mentions-legales" }]} titre="Mentions légales" texte={`Informations légales relatives au site ${SITE_URL.replace(/^https?:\/\//, "")}.`} />
      <section className="py-16">
        <Conteneur className="max-w-3xl space-y-8 text-ink-soft">
          <div>
            <h2 className="text-xl font-bold text-ink">Éditeur du site</h2>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              <dt>Nom commercial</dt><dd className="text-ink">{PARAMETRE.NOM_COMMERCIAL}</dd>
              <dt>Raison sociale</dt><dd className="text-ink">{PARAMETRE.RAISON_SOCIALE || A_COMPLETER}</dd>
              <dt>SIRET</dt><dd className="text-ink">{PARAMETRE.SIRET || A_COMPLETER}</dd>
              <dt>Adresse</dt><dd className="text-ink">{PARAMETRE.ADRESSE || A_COMPLETER}</dd>
              <dt>Téléphone</dt><dd className="text-ink">{PARAMETRE.TEL_PRINCIPAL}</dd>
              <dt>E-mail</dt><dd className="text-ink">{PARAMETRE.EMAIL || A_COMPLETER}</dd>
            </dl>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">Hébergement</h2>
            <p className="mt-3">Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">Crédits photos</h2>
            <p className="mt-3">Les photos du site sont des illustrations sous licence libre, issues de Wikimedia Commons. Elles ne représentent pas nos propres chantiers.</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {Object.values(PHOTOS).map((p) => (
                <li key={p.id}>{p.legende} : © {p.auteur}, <a href={p.source} rel="noopener" className="underline">source</a>, {p.licenceUrl ? <a href={p.licenceUrl} rel="noopener license" className="underline">{p.licence}</a> : p.licence}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">Données personnelles</h2>
            <p className="mt-3">Ce site ne contient pas de formulaire et ne dépose pas de cookie publicitaire. Les informations communiquées par téléphone servent uniquement à organiser l&apos;intervention.</p>
          </div>
        </Conteneur>
      </section>
    </>
  );
}
