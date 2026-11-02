import Image from "next/image";
import { PHOTOS, type PhotoId } from "@/lib/photos";

type Props = { id: PhotoId; priorite?: boolean; className?: string; ratio?: "auto" | "paysage" | "carre"; tailles?: string };

const RATIOS = { auto: "", paysage: "aspect-[4/3]", carre: "aspect-square" } as const;

/** Photo d'illustration avec légende et crédit (licence libre). */
export function Photo({ id, priorite = false, className = "", ratio = "paysage", tailles = "(min-width: 1024px) 50vw, 100vw" }: Props) {
  const p = PHOTOS[id];
  return (
    <figure className={`overflow-hidden rounded-3xl border-4 border-ink bg-ink shadow-flash ${className}`}>
      <div className={`relative ${RATIOS[ratio]}`}>
        <Image
          src={p.src}
          alt={p.alt}
          placeholder="blur"
          priority={priorite}
          sizes={tailles}
          className={ratio === "auto" ? "h-auto w-full" : "h-full w-full object-cover"}
          {...(ratio === "auto" ? {} : { fill: true })}
        />
        <span className="absolute left-3 top-3 rounded-full bg-lime px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ink">Photo d&apos;illustration</span>
      </div>
      <figcaption className="border-t-4 border-ink bg-white px-4 py-3">
        <p className="text-sm font-bold text-ink">{p.legende}</p>
        <p className="mt-1 text-[11px] text-ink-muted">
          © {p.auteur} · <a href={p.source} rel="noopener" className="underline">Wikimedia Commons</a> · {p.licenceUrl ? <a href={p.licenceUrl} rel="noopener license" className="underline">{p.licence}</a> : p.licence}
        </p>
      </figcaption>
    </figure>
  );
}

export function GaleriePhotos({ ids }: { ids: PhotoId[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {ids.map((id) => <li key={id}><Photo id={id} tailles="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" /></li>)}
    </ul>
  );
}
