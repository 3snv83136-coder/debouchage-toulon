export function TitreFlash({ surtitre, titre, texte, couleur = "lime", clair = false }: { surtitre?: string; titre: string; texte?: string; couleur?: "lime" | "rose" | "cyan" | "jaune"; clair?: boolean }) {
  const pastille = { lime: "bg-lime text-ink", rose: "bg-sun-500 text-white", cyan: "bg-cyan text-ink", jaune: "bg-jaune text-ink" }[couleur];
  return (
    <div className="max-w-3xl">
      {surtitre && <p className={`inline-block -rotate-1 rounded-lg px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider ${pastille}`}>{surtitre}</p>}
      <h2 className={`mt-4 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl ${clair ? "text-white" : "text-ink"}`}>{titre}</h2>
      {texte && <p className={`mt-4 text-lg ${clair ? "text-white/80" : "text-ink-soft"}`}>{texte}</p>}
    </div>
  );
}
