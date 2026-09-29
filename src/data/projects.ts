/**
 * Non-translatable records for the `/$lang/products` projects index.
 * Products come from `products.ts` and research work from `research.ts`;
 * this module adds the engineering and open-source groups plus the pure
 * filter helpers. Copy lives in `projects.*` in the locale catalogs.
 */

export const PROJECT_CATEGORIES = [
	"products",
	"engineering",
	"open-source",
	"research",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type EngineeringProjectId =
	| "pid-digitizer"
	| "agent-workstation"
	| "home-lab";

export interface EngineeringProject {
	id: EngineeringProjectId;
	tags: readonly string[];
	status: "in-progress" | "running";
	repo?: string;
	docs?: string;
}

export const engineeringProjects: readonly EngineeringProject[] = [
	{
		id: "pid-digitizer",
		tags: ["Computer Vision", "OCR", "Graph", "DXF/DEXPI"],
		status: "in-progress",
	},
	{
		id: "agent-workstation",
		tags: ["LLM", "Agents", "RAG", "Tool Use"],
		status: "in-progress",
	},
	{
		id: "home-lab",
		tags: ["Docker", "PostgreSQL", "Linux", "DevOps"],
		status: "running",
	},
] as const;

export type OpenSourceProjectId =
	| "web-scrobbler"
	| "napkin-collect-android"
	| "vina-doctor";

export interface OpenSourceProject {
	id: OpenSourceProjectId;
	/** Repository name, a proper name, so it stays out of the catalogs. */
	name: string;
	href: string;
	/** GitHub stars, checked by hand. Omit when unknown. */
	stars?: number;
}

export const openSourceProjects: readonly OpenSourceProject[] = [
	{
		id: "web-scrobbler",
		name: "Web Scrobbler",
		href: "https://github.com/web-scrobbler/web-scrobbler",
		stars: 3045, // checked 2026-09
	},
	{
		id: "napkin-collect-android",
		name: "Napkin-Collect-Android",
		href: "https://github.com/TaQuangKhoi/Napkin-Collect-Android",
		stars: 12,
	},
	{
		id: "vina-doctor",
		name: "Vina Doctor",
		href: "https://github.com/TaQuangKhoi/vina-doctor",
	},
] as const;

export function isProjectCategory(value: unknown): value is ProjectCategory {
	return (
		typeof value === "string" &&
		(PROJECT_CATEGORIES as readonly string[]).includes(value)
	);
}

/** Lowercase, strip diacritics (incl. Vietnamese `đ`), collapse spaces. */
export function normalizeSearch(text: string): string {
	return text
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.replace(/đ/gi, "d")
		.toLowerCase()
		.replace(/\s+/g, " ")
		.trim();
}

/** True when every word of `query` appears in at least one field. */
export function matchesQuery(
	fields: readonly string[],
	query: string,
): boolean {
	const words = normalizeSearch(query).split(" ").filter(Boolean);
	if (words.length === 0) return true;
	const haystack = normalizeSearch(fields.join(" "));
	return words.every((word) => haystack.includes(word));
}

/** `12` → `"12"`, `3045` → `"3k"`, `2150` → `"2.1k"`. */
export function formatStars(count: number): string {
	if (count < 1000) return String(count);
	const thousands = Math.floor(count / 100) / 10;
	return `${Number.isInteger(thousands) ? thousands : thousands.toFixed(1)}k`;
}
