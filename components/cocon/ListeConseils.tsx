import { Lightbulb } from "lucide-react";
import { remplir } from "@/lib/format";

export function ListeConseils({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((c) => (
        <li key={c} className="flex gap-3 rounded-2xl bg-sea-50 p-4 text-ink">
          <Lightbulb aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sea-600" /> {remplir(c)}
        </li>
      ))}
    </ul>
  );
}
