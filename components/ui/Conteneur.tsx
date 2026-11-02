import type { ReactNode } from "react";

export function Conteneur({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function EnTete({ surtitre, titre, texte, centre = false }: { surtitre?: string; titre: string; texte?: string; centre?: boolean }) {
  return (
    <div className={`max-w-2xl ${centre ? "mx-auto text-center" : ""}`}>
      {surtitre && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sea-600">{surtitre}</p>}
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{titre}</h2>
      {texte && <p className="mt-4 text-lg text-ink-soft">{texte}</p>}
    </div>
  );
}
