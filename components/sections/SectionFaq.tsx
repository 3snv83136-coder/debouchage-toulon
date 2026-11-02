import { Conteneur, EnTete } from "@/components/ui/Conteneur";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListeFaq } from "@/components/ui/ListeFaq";
import type { Faq } from "@/lib/data/types";
import { jsonLdFaq } from "@/lib/seo";

export function SectionFaq({ faqs, titre = "Questions fréquentes" }: { faqs: Faq[]; titre?: string }) {
  if (faqs.length === 0) return null;
  return (
    <section className="bg-sand py-20">
      <JsonLd data={jsonLdFaq(faqs)} />
      <Conteneur className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <EnTete surtitre="FAQ" titre={titre} />
        <ListeFaq faqs={faqs} />
      </Conteneur>
    </section>
  );
}
