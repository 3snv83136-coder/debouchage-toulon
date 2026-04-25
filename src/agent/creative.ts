import { GoogleGenAI } from "@google/genai";
import type { Ad, Campaign } from "./types.ts";

interface CreativeBrief {
  city: string;
  service: string;
  angle: string;
  pricePoint: string;
}

const FALLBACK_CREATIVES: Array<Omit<Ad, "id" | "campaignId" | "createdAt" | "updatedAt" | "alpha" | "beta" | "impressions" | "clicks" | "conversions" | "spendEur" | "revenueEur" | "status" | "bidEur">> = [
  {
    headline: "Débouchage Toulon 99€ - Intervention en 30 min",
    description: "Artisan local. Tarif fixe annoncé avant intervention. Caméra incluse.",
    cta: "Appeler maintenant",
    keywords: ["debouchage toulon", "urgence canalisation 83", "plombier toulon"],
  },
  {
    headline: "WC Bouché à Toulon ? Forfait 99€ TTC",
    description: "Hydrocurage haute pression. Garantie résultat. Devis gratuit.",
    cta: "SOS Débouchage",
    keywords: ["wc bouche toulon", "deboucheur 83000", "urgence wc"],
  },
  {
    headline: "Curage Canalisation Var - Tarif Fixe",
    description: "Réseaux anciens, fosses, regards. Vidéo incluse. 24/7.",
    cta: "Devis immédiat",
    keywords: ["curage canalisation var", "debouchage la seyne", "assainissement toulon"],
  },
];

function defaultBriefs(): CreativeBrief[] {
  return [
    { city: "Toulon", service: "Débouchage WC", angle: "urgence 30 min", pricePoint: "99€ fixe" },
    { city: "La Seyne-sur-Mer", service: "Hydrocurage", angle: "anti-corrosion saline", pricePoint: "149€" },
    { city: "La Garde", service: "Coupe-racines", angle: "fraisage sans excavation", pricePoint: "Devis gratuit" },
    { city: "La Valette", service: "Bac à graisse", angle: "maintenance commerciale", pricePoint: "Forfait pro" },
    { city: "Ollioules", service: "Recherche fuite", angle: "caméra 4K", pricePoint: "Diagnostic 79€" },
  ];
}

export async function generateCreatives(
  campaign: Campaign,
  count: number,
  apiKey: string | undefined
): Promise<Array<{ headline: string; description: string; cta: string; keywords: string[] }>> {
  const briefs = defaultBriefs().slice(0, count);

  if (!apiKey) {
    return briefs.map((b, i) => {
      const fb = FALLBACK_CREATIVES[i % FALLBACK_CREATIVES.length];
      return {
        ...fb,
        headline: fb.headline.replace("Toulon", b.city),
      };
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Tu es media-buyer expert en search ads pour un service de débouchage de canalisations dans le Var (France).
Campagne: ${campaign.name} | Channel: ${campaign.channel} | Géo: ${campaign.geo} | CPA cible: ${campaign.targetCpaEur}€.

Génère ${count} variantes d'annonces pour les briefs suivants. Optimise pour ROAS maximal et CPA minimal.
Briefs:
${briefs.map((b, i) => `${i + 1}. Ville=${b.city}, Service=${b.service}, Angle=${b.angle}, Prix=${b.pricePoint}`).join("\n")}

Réponds STRICTEMENT en JSON, tableau d'objets {headline, description, cta, keywords}.
- headline: <= 30 caractères, urgence + ville + prix.
- description: <= 90 caractères, preuve technique + garantie.
- cta: <= 15 caractères, verbe d'action.
- keywords: 3-5 mots-clés exact-match basse-concurrence.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              headline: { type: "string" },
              description: { type: "string" },
              cta: { type: "string" },
              keywords: { type: "array", items: { type: "string" } },
            },
            required: ["headline", "description", "cta", "keywords"],
          },
        },
      },
    });

    const text = response.text ?? "[]";
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("empty creative response");
    return parsed.slice(0, count);
  } catch (err) {
    console.warn("[creative] Gemini fallback:", (err as Error).message);
    return briefs.map((b, i) => {
      const fb = FALLBACK_CREATIVES[i % FALLBACK_CREATIVES.length];
      return { ...fb, headline: fb.headline.replace("Toulon", b.city) };
    });
  }
}
