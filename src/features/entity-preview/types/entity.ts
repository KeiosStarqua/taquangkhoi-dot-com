/**
 * Entity model for inline preview cards. Structural fields live here;
 * visible copy lives in `entities.<id>` in the locale catalogs.
 */
export type EntityType = "company" | "experience" | "project" | "research";

/** `live` pulses a mint dot ("Building"); `past` shows a still, faint dot. */
export type EntityStatusTone = "live" | "past";

export type EntityLogo =
	| { kind: "image"; src: string }
	| { kind: "truetech" }
	| { kind: "monogram"; text: string };

/** Where a click on the entity (or the card CTA) navigates. */
export type EntityTarget =
	| { kind: "product"; productId: string }
	| { kind: "experience"; hash: string }
	| { kind: "research" };

export interface EntityRecord {
	type: EntityType;
	logo: EntityLogo;
	statusTone?: EntityStatusTone;
	target: EntityTarget;
	/** Optional outbound site, shown as a small ↗ in the card header. */
	externalUrl?: string;
}

/** Shape of `entities.<id>` in `src/i18n/locales/*.json`. */
export interface EntityCopy {
	kicker: string;
	name: string;
	subtitle: string;
	status?: string;
	description: string;
	role: string;
	period: string;
	facts?: { label: string; value: string }[];
	tags: string[];
	cta: string;
	external?: string;
}
