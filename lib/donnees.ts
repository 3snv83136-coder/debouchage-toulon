/**
 * Données publiques en direct, mises en cache côté serveur (ISR).
 * Chaque fonction renvoie null en cas d'échec : la page s'affiche sans le bloc.
 */
import type { Saison } from "@/lib/cocon/types";

const HEURE = 3600;
const JOUR = 24 * HEURE;

async function json<T>(url: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/* ---------- Météo (Open-Meteo, sans clé) ---------- */

export type Meteo = {
  temperature: number;
  vent: number;
  libelle: string;
  pluieAujourdhui: number;
  jours: { date: string; pluie: number; probabilite: number; tmax: number }[];
  pluie3j: number;
  majA: string;
};

type OpenMeteo = {
  current: { time: string; temperature_2m: number; weather_code: number; wind_speed_10m: number };
  daily: { time: string[]; precipitation_sum: number[]; precipitation_probability_max: number[]; temperature_2m_max: number[] };
};

const WMO: Record<number, string> = {
  0: "Ciel dégagé", 1: "Plutôt dégagé", 2: "Partiellement nuageux", 3: "Couvert",
  45: "Brouillard", 48: "Brouillard givrant",
  51: "Bruine légère", 53: "Bruine", 55: "Bruine dense",
  61: "Pluie faible", 63: "Pluie", 65: "Forte pluie",
  80: "Averses", 81: "Averses fortes", 82: "Averses violentes",
  95: "Orage", 96: "Orage avec grêle", 99: "Orage violent avec grêle",
};

export async function getMeteo(lat: number, lon: number): Promise<Meteo | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    "&current=temperature_2m,weather_code,wind_speed_10m" +
    "&daily=precipitation_sum,precipitation_probability_max,temperature_2m_max" +
    "&timezone=Europe%2FParis&forecast_days=3";
  const d = await json<OpenMeteo>(url, HEURE);
  if (!d) return null;
  const jours = d.daily.time.map((date, i) => ({
    date,
    pluie: d.daily.precipitation_sum[i] ?? 0,
    probabilite: d.daily.precipitation_probability_max[i] ?? 0,
    tmax: d.daily.temperature_2m_max[i] ?? 0,
  }));
  return {
    temperature: d.current.temperature_2m,
    vent: d.current.wind_speed_10m,
    libelle: WMO[d.current.weather_code] ?? "Conditions variables",
    pluieAujourdhui: jours[0]?.pluie ?? 0,
    jours,
    pluie3j: Math.round(jours.reduce((s, j) => s + j.pluie, 0) * 10) / 10,
    majA: d.current.time,
  };
}

export type NiveauAlerte = "calme" | "vigilance" | "alerte";

export function alertePluie(m: Meteo): { niveau: NiveauAlerte; message: string } {
  if (m.pluie3j >= 30) return { niveau: "alerte", message: `Fortes pluies annoncées (${m.pluie3j} mm sur 3 jours) : risque de refoulement dans les rez-de-chaussée et les regards bas.` };
  if (m.pluie3j >= 8) return { niveau: "vigilance", message: `Pluie annoncée (${m.pluie3j} mm sur 3 jours) : vérifiez que vos regards et siphons extérieurs sont dégagés.` };
  return { niveau: "calme", message: "Pas de pluie significative annoncée dans les 3 prochains jours." };
}

/* ---------- Dureté de l'eau (Hub'eau, contrôle sanitaire) ---------- */

export type Eau = { mediane: number; min: number; max: number; nb: number; dernier: string; distributeur: string | null; reseau: string | null };

type HubEau = { data: { date_prelevement: string; resultat_numerique: number | null; nom_distributeur?: string; nom_uge?: string }[] };

export async function getEau(insee: string): Promise<Eau | null> {
  const url =
    `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_commune=${insee}` +
    "&code_parametre=1345&size=30&sort=desc&fields=date_prelevement,resultat_numerique,nom_distributeur,nom_uge";
  const d = await json<HubEau>(url, JOUR);
  const valeurs = (d?.data ?? []).map((x) => x.resultat_numerique).filter((v): v is number => typeof v === "number");
  if (!d || valeurs.length === 0) return null;
  const tri = [...valeurs].sort((a, b) => a - b);
  const mediane = tri[Math.floor(tri.length / 2)] ?? 0;
  return {
    mediane: Math.round(mediane * 10) / 10,
    min: Math.round((tri[0] ?? 0) * 10) / 10,
    max: Math.round((tri[tri.length - 1] ?? 0) * 10) / 10,
    nb: valeurs.length,
    dernier: d.data[0]?.date_prelevement.slice(0, 10) ?? "",
    distributeur: d.data[0]?.nom_distributeur ?? null,
    reseau: d.data[0]?.nom_uge ?? null,
  };
}

export function qualifierDurete(th: number): { libelle: string; impact: string } {
  if (th < 15) return { libelle: "eau douce", impact: "Peu de tartre dans les canalisations." };
  if (th < 25) return { libelle: "eau moyennement calcaire", impact: "Tartre modéré, surtout dans les évacuations d'eau chaude." };
  if (th < 35) return { libelle: "eau calcaire", impact: "Le tartre réduit progressivement le diamètre des canalisations." };
  return { libelle: "eau très calcaire", impact: "Croûte de tartre rapide : un détartrage par hydrocurage est souvent nécessaire." };
}

/* ---------- Commune (API Géo / INSEE) ---------- */

export type Commune = { population: number; surfaceKm2: number; densite: number };

/** Valeurs API Géo relevées le 2 novembre 2026, utilisées si l'API ne répond pas. */
const COMMUNES_SECOURS: Record<string, { population: number; surface: number }> = {
  "83137": { population: 179116, surface: 4405.92 },
  "83126": { population: 63732, surface: 2348.37 },
  "83062": { population: 26476, surface: 1560.47 },
  "83144": { population: 23719, surface: 1543.45 },
  "83129": { population: 37109, surface: 2668.64 },
  "83069": { population: 55858, surface: 13361.08 },
};

export async function getCommune(insee: string): Promise<Commune | null> {
  const api = await json<{ population?: number; surface?: number }>(`https://geo.api.gouv.fr/communes/${insee}?fields=population,surface`, 7 * JOUR);
  const d = api?.population && api.surface ? api : COMMUNES_SECOURS[insee];
  if (!d?.population || !d.surface) return null;
  const surfaceKm2 = d.surface / 100;
  return { population: d.population, surfaceKm2: Math.round(surfaceKm2 * 10) / 10, densite: Math.round(d.population / surfaceKm2) };
}

/* ---------- Saison ---------- */

export function saisonDe(date: Date): Saison {
  const m = date.getMonth();
  if (m <= 1 || m === 11) return "hiver";
  if (m <= 4) return "printemps";
  if (m <= 7) return "ete";
  return "automne";
}

export const NOMS_SAISONS: Record<Saison, string> = { hiver: "Hiver", printemps: "Printemps", ete: "Été", automne: "Automne" };

export function dateFr(iso: string, options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }): string {
  return new Date(iso).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris", ...options });
}

export const nombreFr = (n: number) => n.toLocaleString("fr-FR");
