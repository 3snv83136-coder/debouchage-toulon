import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/data/types";
import { remplir } from "@/lib/format";

export function ListeFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 py-4 sm:px-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <ChevronDown aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-ink-soft">{remplir(f.a)}</p>
        </details>
      ))}
    </div>
  );
}
