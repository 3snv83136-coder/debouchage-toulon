"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAVIGATION } from "@/components/sections/navigation";

export function MenuMobile() {
  const [ouvert, setOuvert] = useState(false);
  const chemin = usePathname();

  useEffect(() => setOuvert(false), [chemin]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        aria-controls="menu-mobile"
        aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
        className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-ink/5"
      >
        {ouvert ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {ouvert && (
        <nav id="menu-mobile" className="absolute inset-x-0 top-full border-b border-ink/10 bg-white px-4 pb-6 pt-2 shadow-card">
          <ul className="flex flex-col">
            {NAVIGATION.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block border-b border-ink/5 py-4 text-lg font-semibold text-ink">
                  {l.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
