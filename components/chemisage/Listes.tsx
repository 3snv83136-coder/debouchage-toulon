import { Check, X } from "lucide-react";
import { remplir } from "@/lib/format";

export function ListePlus({ items }: { items: string[] }) {
  return <ul className="space-y-3">{items.map((x) => <li key={x} className="flex gap-3 rounded-2xl bg-lime-soft p-4 font-semibold text-ink"><Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sea-600" />{remplir(x)}</li>)}</ul>;
}

export function ListeMoins({ items }: { items: string[] }) {
  return <ul className="space-y-3">{items.map((x) => <li key={x} className="flex gap-3 rounded-2xl bg-sun-50 p-4 font-semibold text-ink"><X aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sun-600" />{remplir(x)}</li>)}</ul>;
}

export function Etapes({ items }: { items: { titre: string; texte: string }[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {items.map((e, i) => (
        <li key={e.titre} className="flex gap-4 rounded-3xl border-2 border-ink/10 bg-white p-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink font-display text-xl font-extrabold text-lime">{i + 1}</span>
          <span><span className="block font-display font-extrabold uppercase text-ink">{e.titre}</span><span className="mt-1 block text-ink-soft">{e.texte}</span></span>
        </li>
      ))}
    </ol>
  );
}
