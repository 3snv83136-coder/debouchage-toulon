import Link from "next/link";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { SchemaCouches } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { MATERIAUX } from "@/lib/chemisage/materiaux";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ titre: "Chemisage selon le matériau : fonte, grès, fibrociment, PVC, béton", description: "Comment chaque matériau de canalisation vieillit, et comment le chemisage le réhabilite.", chemin: "/chemisage/materiaux" });

export default function PageMateriaux() {
  return (
    <>
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Matériaux", chemin: "/chemisage/materiaux" }]} surtitre="5 matériaux" titre={<>Fonte, grès, PVC… <span className="text-lime">tout se chemise</span></>} texte="Chaque matériau vieillit à sa façon. Le chemisage s'adapte à chacun." visuel={<SchemaCouches />} />
      <section className="py-20"><Conteneur><ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{MATERIAUX.map((m, i) => <li key={m.slug}><Link href={`/chemisage/materiaux/${m.slug}`} className={`block h-full rounded-3xl border-4 border-ink p-6 shadow-flash ${["bg-lime", "bg-cyan", "bg-jaune", "bg-white", "bg-sea-100"][i % 5]}`}><span className="font-display text-xl font-extrabold uppercase text-ink">Chemisage {m.nom.toLowerCase()}</span><span className="mt-2 block font-semibold text-ink-soft">{m.accroche}</span></Link></li>)}</ul></Conteneur></section>
      <BandeauFlash />
    </>
  );
}
