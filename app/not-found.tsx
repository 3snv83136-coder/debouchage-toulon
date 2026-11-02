import Link from "next/link";
import { BoutonAppel } from "@/components/ui/BoutonAppel";
import { Conteneur } from "@/components/ui/Conteneur";

export default function NotFound() {
  return (
    <section className="bg-sand py-24">
      <Conteneur className="max-w-xl text-center">
        <p className="font-display text-7xl font-extrabold text-sea-100">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink">Cette page est introuvable</h1>
        <p className="mt-4 text-ink-soft">Elle a peut-être été déplacée. Si c&apos;est une urgence, appelez-nous directement.</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <BoutonAppel taille="lg" />
          <Link href="/" className="font-semibold text-sea-700 hover:underline">Retour à l&apos;accueil</Link>
        </div>
      </Conteneur>
    </section>
  );
}
