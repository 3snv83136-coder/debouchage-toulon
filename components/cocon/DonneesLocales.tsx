import { CloudRain, Droplets, Thermometer, Users } from "lucide-react";
import { alertePluie, dateFr, getCommune, getEau, getMeteo, nombreFr, qualifierDurete } from "@/lib/donnees";
import type { VilleCocon } from "@/lib/cocon/types";

const COULEURS = {
  calme: "border-emerald-200 bg-emerald-50 text-emerald-900",
  vigilance: "border-amber-200 bg-amber-50 text-amber-900",
  alerte: "border-red-200 bg-red-50 text-red-900",
} as const;

/** Bloc de données publiques en direct (météo, dureté de l'eau, population). */
export async function DonneesLocales({ ville }: { ville: Pick<VilleCocon, "nom" | "insee" | "coords"> }) {
  const [meteo, eau, commune] = await Promise.all([
    getMeteo(ville.coords.lat, ville.coords.lon),
    getEau(ville.insee),
    getCommune(ville.insee),
  ]);
  if (!meteo && !eau && !commune) return null;
  const alerte = meteo ? alertePluie(meteo) : null;
  const durete = eau ? qualifierDurete(eau.mediane) : null;

  return (
    <section aria-labelledby="donnees-titre" className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="donnees-titre" className="font-display text-xl font-bold text-ink">{ville.nom} en ce moment</h2>
        <p className="text-xs text-ink-muted">Données publiques mises à jour automatiquement</p>
      </div>

      {alerte && (
        <p className={`mt-5 rounded-2xl border p-4 text-sm font-medium ${COULEURS[alerte.niveau]}`}>{alerte.message}</p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {meteo && (
          <div className="rounded-2xl bg-sand p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-soft"><Thermometer aria-hidden className="h-4 w-4 text-sea-600" /> Météo</p>
            <p className="mt-2 font-display text-3xl font-bold text-ink">{Math.round(meteo.temperature)}°C</p>
            <p className="text-sm text-ink-soft">{meteo.libelle} · vent {Math.round(meteo.vent)} km/h</p>
            <ul className="mt-3 space-y-1 text-xs text-ink-muted">
              {meteo.jours.map((j) => (
                <li key={j.date} className="flex justify-between gap-2">
                  <span>{dateFr(j.date, { weekday: "short", day: "numeric" })}</span>
                  <span className="flex items-center gap-1"><CloudRain aria-hidden className="h-3 w-3" /> {j.pluie} mm · {j.probabilite} %</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {eau && durete && (
          <div className="rounded-2xl bg-sand p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-soft"><Droplets aria-hidden className="h-4 w-4 text-sea-600" /> Dureté de l&apos;eau</p>
            <p className="mt-2 font-display text-3xl font-bold text-ink">{eau.mediane} °f</p>
            <p className="text-sm text-ink-soft">{durete.libelle} (de {eau.min} à {eau.max} °f sur {eau.nb} analyses)</p>
            <p className="mt-3 text-xs text-ink-muted">{durete.impact} Dernier prélèvement : {dateFr(eau.dernier)}{eau.distributeur ? ` · ${eau.distributeur}` : ""}.</p>
          </div>
        )}
        {commune && (
          <div className="rounded-2xl bg-sand p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-soft"><Users aria-hidden className="h-4 w-4 text-sea-600" /> Commune</p>
            <p className="mt-2 font-display text-3xl font-bold text-ink">{nombreFr(commune.population)}</p>
            <p className="text-sm text-ink-soft">habitants · {nombreFr(commune.surfaceKm2)} km²</p>
            <p className="mt-3 text-xs text-ink-muted">Densité : {nombreFr(commune.densite)} hab./km² · code INSEE {ville.insee}</p>
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-ink-muted">
        Sources : <a className="underline" href="https://open-meteo.com/" rel="noopener">Open-Meteo</a>, <a className="underline" href="https://hubeau.eaufrance.fr/" rel="noopener">Hub&apos;eau (contrôle sanitaire des eaux)</a>, <a className="underline" href="https://geo.api.gouv.fr/" rel="noopener">API Géo (INSEE)</a>.
        {meteo && ` Météo relevée le ${dateFr(meteo.majA, { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}.`}
      </p>
    </section>
  );
}
