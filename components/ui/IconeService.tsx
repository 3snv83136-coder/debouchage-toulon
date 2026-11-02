import { Building, CalendarCheck, ChefHat, Cylinder, Gauge, ShowerHead, Toilet, TreePine, Utensils, Video, Wrench, type LucideIcon } from "lucide-react";
import type { IconeService as Nom } from "@/lib/data/services";

const ICONES: Record<Nom, LucideIcon> = {
  toilet: Toilet,
  evier: Utensils,
  douche: ShowerHead,
  canalisation: Wrench,
  hydrocurage: Gauge,
  camera: Video,
  racines: TreePine,
  graisse: ChefHat,
  colonne: Building,
  fosse: Cylinder,
  entretien: CalendarCheck,
};

export function IconeService({ nom, className = "h-6 w-6" }: { nom: Nom; className?: string }) {
  const Icone = ICONES[nom];
  return <Icone aria-hidden className={className} />;
}
