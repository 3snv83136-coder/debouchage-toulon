import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { BarreAppelMobile } from "@/components/sections/BarreAppelMobile";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { PARAMETRE, SITE_URL } from "@/lib/config";
import { jsonLdEntreprise } from "@/lib/seo";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Unbounded({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `Chemisage canalisation sans casse à Toulon et dans le Var | ${PARAMETRE.NOM_COMMERCIAL}`, template: `%s | ${PARAMETRE.NOM_COMMERCIAL}` },
  description: "Chemisage de canalisation sans tranchée à Toulon, La Seyne, Hyères, La Garde, La Valette et Six-Fours : on répare fissures, racines et fonte corrodée de l'intérieur, après débouchage et inspection caméra. Devis gratuit.",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#13072E" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">
        <JsonLd data={jsonLdEntreprise()} />
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <BarreAppelMobile />
      </body>
    </html>
  );
}
