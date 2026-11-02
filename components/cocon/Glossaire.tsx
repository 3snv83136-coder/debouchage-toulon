export function Glossaire({ items }: { items: { terme: string; definition: string }[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((g) => (
        <div key={g.terme} className="rounded-2xl border border-ink/10 bg-white p-5">
          <dt className="font-bold text-ink">{g.terme}</dt>
          <dd className="mt-1 text-sm text-ink-soft">{g.definition}</dd>
        </div>
      ))}
    </dl>
  );
}
