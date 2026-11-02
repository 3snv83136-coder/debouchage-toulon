export function Sommaire({ items }: { items: { id: string; titre: string }[] }) {
  return (
    <nav aria-label="Sommaire" className="rounded-3xl bg-sand p-6">
      <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Sur cette page</p>
      <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
        {items.map((it, i) => (
          <li key={it.id}><a href={`#${it.id}`} className="text-ink-soft hover:text-sea-700"><span className="mr-2 text-ink-muted">{String(i + 1).padStart(2, "0")}</span>{it.titre}</a></li>
        ))}
      </ol>
    </nav>
  );
}
