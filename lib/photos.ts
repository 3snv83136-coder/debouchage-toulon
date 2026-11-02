import type { StaticImageData } from "next/image";
import gaineEnPlace from "@/public/photos/gaine-en-place.jpg";
import gaineVapeur from "@/public/photos/gaine-vapeur.jpg";
import impregnationResine from "@/public/photos/impregnation-resine.jpg";
import inversionAir from "@/public/photos/inversion-air.jpg";
import teteCamera from "@/public/photos/tete-camera.jpg";
import tranchee from "@/public/photos/tranchee.jpg";

export type PhotoId = "gaine-vapeur" | "gaine-en-place" | "inversion-air" | "impregnation-resine" | "tete-camera" | "tranchee";

export type Photo = {
  id: PhotoId;
  src: StaticImageData;
  alt: string;
  legende: string;
  auteur: string;
  licence: string;
  licenceUrl?: string;
  source: string;
};

/**
 * Photos d'illustration libres de droits (Wikimedia Commons).
 * Elles illustrent la technique et ne montrent pas nos propres chantiers.
 */
export const PHOTOS: Record<PhotoId, Photo> = {
  "gaine-vapeur": {
    id: "gaine-vapeur",
    src: gaineVapeur,
    alt: "Gaine de chemisage gonflée et durcie à la vapeur depuis un regard, sur un chantier de nuit",
    legende: "Durcissement d'une gaine de chemisage à la vapeur, depuis un regard.",
    auteur: "B637275",
    licence: "CC0",
    licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: "https://commons.wikimedia.org/wiki/File:Cured-in-place_pipe_lining_inflation_in_Cambridge,_Massachusetts.jpg",
  },
  "gaine-en-place": {
    id: "gaine-en-place",
    src: gaineEnPlace,
    alt: "Gaine de chemisage durcie visible à l'extrémité d'une canalisation réhabilitée",
    legende: "La gaine durcie forme un nouveau tube à l'intérieur de l'ancienne canalisation.",
    auteur: "Rachkay333",
    licence: "CC BY 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:Pipe_Relining_Service.jpg",
  },
  "inversion-air": {
    id: "inversion-air",
    src: inversionAir,
    alt: "Équipe en train d'inverser une gaine de chemisage à l'air comprimé à l'entrée d'une canalisation",
    legende: "Inversion d'une gaine à l'air comprimé : elle se retourne et se déroule dans la canalisation.",
    auteur: "Federal Highway Administration",
    licence: "Domaine public",
    source: "https://commons.wikimedia.org/wiki/File:Compressed_Air_Application_and_Fully_Inverted_Liner_MT_(8474585952).jpg",
  },
  "impregnation-resine": {
    id: "impregnation-resine",
    src: impregnationResine,
    alt: "Résine versée sur une natte de fibre de verre avant la pose d'une manchette",
    legende: "Imprégnation d'une natte de fibre de verre avec la résine, avant la pose d'une manchette.",
    auteur: "Bdnbndr2020",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Tr%C3%A4nken_der_Glasfasermatte_mit_multi_PL-Harz.jpg",
  },
  "tete-camera": {
    id: "tete-camera",
    src: teteCamera,
    alt: "Tête de caméra d'inspection de canalisation avec éclairages LED",
    legende: "Tête de caméra d'inspection : c'est elle qui décide si le chemisage est possible.",
    auteur: "Abraham Poseidon",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Manhole-inspection-camera-head.jpg",
  },
  tranchee: {
    id: "tranchee",
    src: tranchee,
    alt: "Ouvriers dans une tranchée creusée pour remplacer une canalisation",
    legende: "La méthode classique : une tranchée, des engins, des jours de travaux. C'est ce que le chemisage évite.",
    auteur: "Federal Highway Administration",
    licence: "Domaine public",
    source: "https://commons.wikimedia.org/wiki/File:Cleaning_and_Removal_of_Debris_MT_(8473497921).jpg",
  },
};

export const PHOTOS_TECHNIQUE: Record<string, PhotoId> = {
  "chemisage-continu": "gaine-en-place",
  "chemisage-partiel-manchette": "impregnation-resine",
  "chemisage-par-inversion": "inversion-air",
  "chemisage-par-tractage": "gaine-vapeur",
  "polymerisation-eau-chaude-vapeur": "gaine-vapeur",
  "chemisage-colonne-immeuble": "gaine-en-place",
  "chemisage-branchement": "inversion-air",
  "chemisage-sous-dalle": "gaine-en-place",
};

export const PHOTOS_MATERIEL: Record<string, PhotoId> = {
  "camera-inspection": "tete-camera",
  "gaine-resine": "impregnation-resine",
  inverseur: "inversion-air",
};
