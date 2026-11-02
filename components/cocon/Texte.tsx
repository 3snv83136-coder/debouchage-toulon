import { remplir } from "@/lib/format";

export function Paragraphes({ items, className = "space-y-4 text-lg leading-relaxed text-ink-soft" }: { items: string[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((p) => <p key={p}>{remplir(p)}</p>)}
    </div>
  );
}

export function Bloc({ id, titre, surtitre, children }: { id?: string; titre: string; surtitre?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      {surtitre && <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-sea-600">{surtitre}</p>}
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{titre}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
