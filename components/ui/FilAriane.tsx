import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { jsonLdFilAriane } from "@/lib/seo";

export function FilAriane({ items }: { items: { nom: string; chemin: string }[] }) {
  const complet = [{ nom: "Accueil", chemin: "/" }, ...items];
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-ink-muted">
      <JsonLd data={jsonLdFilAriane(complet)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {complet.map((it, i) => (
          <li key={it.chemin} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {i === complet.length - 1 ? (
              <span aria-current="page" className="text-ink-soft">{it.nom}</span>
            ) : (
              <Link href={it.chemin} className="hover:text-ink">{it.nom}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
