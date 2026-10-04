import en from "#/i18n/locales/en.json";
import vi from "#/i18n/locales/vi.json";

/**
 * Typed copy for the OpenSen case study, read straight from the locale
 * catalogs so the deeply nested section structure stays type-checked
 * (i18next `returnObjects` would hand back `unknown`).
 */
/** Locales with a catalog; matches `SUPPORTED_LOCALES` in `src/routes/$lang.tsx`. */
export type OpenSenLocale = "en" | "vi";

export type OpenSenCopy = typeof en.products.opensen.caseStudy;

export function getOpenSenCopy(lang: OpenSenLocale): OpenSenCopy {
	return (lang === "vi" ? vi : en).products.opensen.caseStudy;
}
