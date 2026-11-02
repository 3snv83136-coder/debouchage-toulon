import type { Metadata } from "next";
import { PARAMETRE, PRIX_MAX, PRIX_MIN, SITE_URL, TARIFS_ORDONNES } from "@/lib/config";
import type { Faq } from "@/lib/data/types";
import { VILLES } from "@/lib/data/villes";
import { remplir, telE164 } from "@/lib/format";

export function pageMetadata({ titre, description, chemin }: { titre: string; description: string; chemin: string }): Metadata {
  const url = `${SITE_URL}${chemin}`;
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: { title: titre, description, url, type: "website", locale: "fr_FR", siteName: PARAMETRE.NOM_COMMERCIAL },
  };
}

const BUSINESS_ID = `${SITE_URL}/#entreprise`;

export function jsonLdEntreprise() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": BUSINESS_ID,
    name: PARAMETRE.NOM_COMMERCIAL,
    url: SITE_URL,
    telephone: telE164(),
    priceRange: `${PRIX_MIN} € - ${PRIX_MAX} €`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    geo: { "@type": "GeoCoordinates", ...PARAMETRE.GEO },
    areaServed: VILLES.map((v) => ({ "@type": "City", name: v.nom })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tarifs débouchage",
      itemListElement: TARIFS_ORDONNES.map((t) => ({
        "@type": "Offer",
        price: t.prix,
        priceCurrency: "EUR",
        itemOffered: { "@type": "Service", name: t.titre, description: t.description },
      })),
    },
  };
}

export function jsonLdFaq(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: remplir(f.a) },
    })),
  };
}

export function jsonLdFilAriane(items: { nom: string; chemin: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nom,
      item: `${SITE_URL}${it.chemin}`,
    })),
  };
}

export function jsonLdService({ nom, description, chemin, zone }: { nom: string; description: string; chemin: string; zone?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: nom,
    description,
    url: `${SITE_URL}${chemin}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: zone ? { "@type": "City", name: zone } : VILLES.map((v) => ({ "@type": "City", name: v.nom })),
  };
}
