import { PARAMETRE, PRIX_MIN, TARIF, type TarifKey } from "@/lib/config";

export function telHref(tel: string = PARAMETRE.TEL_PRINCIPAL): string {
  const digits = tel.replace(/\D/g, "");
  return `tel:+33${digits.replace(/^0/, "")}`;
}

export function telE164(tel: string = PARAMETRE.TEL_PRINCIPAL): string {
  return telHref(tel).replace("tel:", "");
}

export function euros(montant: number): string {
  return `${montant} € TTC`;
}

export function prix(key: TarifKey): string {
  return euros(TARIF[key].prix);
}

/**
 * Remplace les jetons des textes éditoriaux par les valeurs de config :
 * {prix:manuel} {prix:mecanique} {prix:hydrocurage} {prix:min} {delai} {horaires} {tel}
 */
export function remplir(texte: string): string {
  return texte
    .replace(/\{prix:(manuel|mecanique|hydrocurage)\}/g, (_, k: TarifKey) => prix(k))
    .replace(/\{prix:min\}/g, euros(PRIX_MIN))
    .replace(/\{delai\}/g, PARAMETRE.DELAI_INTERVENTION)
    .replace(/\{horaires\}/g, PARAMETRE.HORAIRES)
    .replace(/\{tel\}/g, PARAMETRE.TEL_PRINCIPAL);
}
