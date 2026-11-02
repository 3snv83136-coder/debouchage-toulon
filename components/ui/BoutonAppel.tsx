import { Phone } from "lucide-react";
import { PARAMETRE } from "@/lib/config";
import { telHref } from "@/lib/format";

type Props = {
  variante?: "plein" | "clair" | "contour";
  taille?: "md" | "lg";
  libelle?: string;
  className?: string;
};

const VARIANTES = {
  plein: "bg-sun-500 text-white hover:bg-sun-600 shadow-[0_10px_30px_-10px_rgba(242,107,29,.7)]",
  clair: "bg-white text-ink hover:bg-sea-50",
  contour: "border border-ink/15 text-ink hover:border-ink/40 bg-white",
} as const;

const TAILLES = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
} as const;

export function BoutonAppel({ variante = "plein", taille = "md", libelle, className = "" }: Props) {
  return (
    <a
      href={telHref()}
      className={`inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun-500 ${VARIANTES[variante]} ${TAILLES[taille]} ${className}`}
    >
      <Phone aria-hidden className="h-[1.1em] w-[1.1em]" />
      <span>{libelle ?? PARAMETRE.TEL_PRINCIPAL}</span>
    </a>
  );
}
