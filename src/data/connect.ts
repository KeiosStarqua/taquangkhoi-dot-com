/**
 * Non-translatable contact records for `/$lang/connect`.
 * Translatable copy (link notes, open-to titles and blurbs) lives in
 * `connect.*` in the locale catalogs, keyed by each record's `id`.
 */

export const EMAIL = "hello@taquangkhoi.com";

/** Mail link with a prefilled subject for the "Schedule a call" CTA. */
export function callRequestHref(subject: string): string {
	return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export type ContactLinkId =
	| "email"
	| "codeberg"
	| "github"
	| "orcid"
	| "linkedin"
	| "kofi"
	| "x"
	| "facebook";

export interface ContactLink {
	id: ContactLinkId;
	label: string;
	href: string;
	/** Short handle or URL shown under the label. */
	display: string;
}

/** Row-major order for the two-column grid: email first, then work, then personal. */
export const contactLinks: readonly ContactLink[] = [
	{ id: "email", label: "Email", href: `mailto:${EMAIL}`, display: EMAIL },
	{
		id: "codeberg",
		label: "Codeberg",
		href: "https://codeberg.org/TaQuangKhoi",
		display: "codeberg.org/TaQuangKhoi",
	},
	{
		id: "github",
		label: "GitHub",
		href: "https://github.com/TaQuangKhoi",
		display: "github.com/TaQuangKhoi",
	},
	{
		id: "orcid",
		label: "ORCID",
		href: "https://orcid.org/0000-0003-2096-7326",
		display: "orcid.org/0000-0003-2096-7326",
	},
	{
		id: "linkedin",
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/taquangkhoi/",
		display: "linkedin.com/in/taquangkhoi",
	},
	{
		id: "kofi",
		label: "Ko-fi",
		href: "https://ko-fi.com/taquangkhoi",
		display: "ko-fi.com/taquangkhoi",
	},
	{
		id: "x",
		label: "X / Twitter",
		href: "https://x.com/TaLaTaQuangKhoi",
		display: "x.com/TaLaTaQuangKhoi",
	},
	{
		id: "facebook",
		label: "Facebook",
		href: "https://www.facebook.com/keios.starqua/",
		display: "facebook.com/keios.starqua",
	},
] as const;

export type OpenToId =
	| "research"
	| "technical"
	| "product"
	| "speaking"
	| "problems"
	| "creative";

export const openTo: readonly OpenToId[] = [
	"research",
	"technical",
	"product",
	"speaking",
	"problems",
	"creative",
] as const;
