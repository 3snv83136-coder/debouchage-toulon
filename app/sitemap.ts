import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { SERVICES } from "@/lib/data/services";
import { VILLES } from "@/lib/data/villes";

export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();
  const page = (chemin: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${chemin}`,
    lastModified: maintenant,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/tarifs", 0.8),
    page("/services", 0.8),
    page("/villes", 0.8),
    ...SERVICES.map((s) => page(`/services/${s.slug}`, 0.7)),
    ...VILLES.map((v) => page(`/villes/${v.slug}`, v.slug === "toulon" ? 0.9 : 0.7)),
  ];
}
