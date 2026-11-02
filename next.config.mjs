/** Anciennes URLs "expertise" du site Vite → nouvelles pages. */
const ANCIENS_SERVICES = {
  "debouchage-canalisation-pas-cher": "/tarifs",
  "urgence-wc-bouche": "/services/wc-bouche",
  "curage-canalisation-prix": "/services/hydrocurage-haute-pression",
  "inspection-camera-canalisation": "/services/inspection-camera-canalisation",
  "debouchage-evier": "/services/debouchage-evier",
  "debouchage-evier-cuisine": "/services/debouchage-evier",
  "assainissement-canalisations": "/services/debouchage-canalisation",
  "plombier-debouchage-urgence": "/services/debouchage-canalisation",
  "hydrocurage-haute-pression": "/services/hydrocurage-haute-pression",
  "debouchage-douche-italienne": "/services/debouchage-douche-baignoire",
  "debouchage-baignoire-bouchee": "/services/debouchage-douche-baignoire",
  "entreprise-debouchage-expert": "/",
  "curage-bac-a-graisse-restaurant": "/services/curage-bac-a-graisse",
  "debouchage-colonne-immeuble": "/services/debouchage-colonne-immeuble",
  "nettoyage-regard-eaux-usees": "/services/entretien-preventif-canalisation",
  "debouchage-canalisation-calcaire": "/services/hydrocurage-haute-pression",
  "extraction-racines-canalisation": "/services/extraction-racines-canalisation",
  "passage-camera-assainissement": "/services/inspection-camera-canalisation",
  "pompage-fosse-septique-urgence": "/services/pompage-fosse-septique",
  "entretien-preventif-canalisation": "/services/entretien-preventif-canalisation",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/ville/:slug", destination: "/villes/:slug", permanent: true },
      // Ancien site WordPress sur debouchage-toulon.fr
      { source: "/contact", destination: "/", permanent: true },
      ...Object.entries(ANCIENS_SERVICES).map(([ancien, destination]) => ({
        source: `/expertise/${ancien}/:ville`,
        destination,
        permanent: true,
      })),
      { source: "/expertise/:service/:ville", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
