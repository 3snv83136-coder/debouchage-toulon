import Link from "next/link";
import { BandeauFlash } from "@/components/chemisage/BandeauFlash";
import { HeroFlash } from "@/components/chemisage/HeroFlash";
import { Etapes } from "@/components/chemisage/Listes";
import { Parcours } from "@/components/chemisage/Parcours";
import { TitreFlash } from "@/components/chemisage/Titre";
import { GaleriePhotos, Photo } from "@/components/photos/Photo";
import { SchemaEtapes, SchemaInversion, SchemaManchette, SchemaRobot } from "@/components/schemas/Schemas";
import { Conteneur } from "@/components/ui/Conteneur";
import { getMateriel } from "@/lib/cocon/materiel";
import { getTechnique } from "@/lib/chemisage/techniques";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ titre: "Les étapes d'un chemisage de canalisation", description: "Débouchage, passage caméra, imprégnation, pose par inversion ou au packer, durcissement, réouverture des raccordements, contrôle : le chemisage étape par étape.", chemin: "/chemisage/etapes" });

const MATERIEL_ETAPES = ["hydrocureuse-camion", "camera-inspection", "gaine-resine", "inverseur", "packer", "robot-fraiseur", "train-uv"] as const;

export default function PageEtapes() {
  const continu = getTechnique("chemisage-continu");
  return (
    <>
      <HeroFlash ariane={[{ nom: "Chemisage", chemin: "/chemisage" }, { nom: "Étapes", chemin: "/chemisage/etapes" }]} surtitre="Pas à pas" titre={<>Un chemisage, <span className="text-lime">étape par étape</span></>} texte="De votre premier appel à la vidéo de contrôle : voici exactement ce qui se passe." visuel={<SchemaEtapes />} />
      <Parcours />
      <section className="py-20"><Conteneur><TitreFlash surtitre="Sur le chantier" titre="Le déroulé technique" />{continu && <div className="mt-8"><Etapes items={continu.etapes} /></div>}</Conteneur></section>
      <section className="pb-20"><Conteneur><TitreFlash couleur="rose" surtitre="En images" titre="Caméra, résine, inversion, durcissement" /><div className="mt-10"><GaleriePhotos ids={["tete-camera", "impregnation-resine", "inversion-air", "gaine-vapeur"]} /></div></Conteneur></section>
      <section className="bg-sand py-20">
        <Conteneur className="grid gap-10 lg:grid-cols-2">
          <div><TitreFlash couleur="cyan" titre="La pose par inversion" /><div className="mt-6"><SchemaInversion /></div></div>
          <div><TitreFlash couleur="rose" titre="La pose d'une manchette" /><div className="mt-6"><SchemaManchette /></div></div>
        </Conteneur>
        <Conteneur className="mt-10"><TitreFlash couleur="jaune" titre="La réouverture des raccordements" /><div className="mt-6"><SchemaRobot /></div></Conteneur>
      </section>
      <section className="py-20">
        <Conteneur>
          <TitreFlash couleur="lime" surtitre="Le matériel" titre="Ce qu'on amène sur le chantier" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MATERIEL_ETAPES.map((id) => { const m = getMateriel(id); return m ? <li key={id}><Link href={`/materiel/${id}`} className="block h-full rounded-3xl border-2 border-ink/10 p-5 hover:border-sea-600"><span className="font-display font-extrabold uppercase text-ink">{m.court}</span><span className="mt-2 block text-sm text-ink-soft">{m.role}</span></Link></li> : null; })}
          </ul>
        </Conteneur>
      </section>
      <BandeauFlash />
    </>
  );
}
