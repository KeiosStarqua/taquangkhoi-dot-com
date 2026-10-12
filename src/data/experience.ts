/**
 * Non-translatable experience records. Copy (role, org, description,
 * highlights, tags) lives in `experience.entries.<id>` in the locale catalogs.
 */
export type ExperienceLogo =
	| { kind: "image"; src: string }
	| { kind: "truetech" }
	| { kind: "university" };

/** `product` links to `/$lang/products/$productId` (ids from `products.ts`). */
export type HighlightLink =
	| { kind: "external"; href: string }
	| { kind: "product"; productId: string };

export interface ExperienceRecord {
	id: "openfarm" | "truetech" | "bvu";
	logo: ExperienceLogo;
	startYear: number;
	/** `null` means ongoing ("Present"). */
	endYear: number | null;
	/** Optional link per highlight, matched by index with the catalog list. */
	highlightLinks: (HighlightLink | null)[];
}

export const experiences: ExperienceRecord[] = [
	{
		id: "openfarm",
		logo: {
			kind: "image",
			src: "https://openfarmgroup.com/images/brand/open-farm-logo-512.png",
		},
		startYear: 2026,
		endYear: null,
		highlightLinks: [
			{
				kind: "external",
				href: "https://openfarmgroup.com/?utm_source=taquangkhoi.com",
			},
			{ kind: "product", productId: "open-farm" },
			null,
			null,
		],
	},
	{
		id: "truetech",
		logo: { kind: "truetech" },
		startYear: 2022,
		endYear: 2026,
		highlightLinks: [null, null, null, null],
	},
	{
		id: "bvu",
		logo: { kind: "university" },
		startYear: 2020,
		endYear: 2024,
		highlightLinks: [null, null, null, null],
	},
];

/**
 * Evidence-based maturity, not self-rated skill. Copy for each level lives in
 * `experience.skills.levels.<level>` in the locale catalogs.
 * - owned: designed or decided the architecture, runs it, answers for the outcome.
 * - shipped: delivered into real use with tests, error handling, maintenance.
 * - applied: solved a real problem with it and can debug it.
 * - exploring: prototype or experiment only.
 */
export const proficiencyLevels = [
	"owned",
	"shipped",
	"applied",
	"exploring",
] as const;
export type ProficiencyLevel = (typeof proficiencyLevels)[number];

/** Row keys of the home skills section (`home.skills.<key>` in the catalogs). */
export const techCategories = [
	"languages",
	"frontend",
	"backend",
	"ai",
	"tools",
	"mobile",
] as const;
export type TechCategory = (typeof techCategories)[number];

export interface TechSkill {
	name: string;
	category: TechCategory;
	level: ProficiencyLevel;
	/** Product or project names where the technology was used (not translated). */
	evidence: readonly string[];
}

/**
 * Verified against git history of the repos under ~/repos (2026-05 → 2026-10),
 * excluding vendored code, generated files and data dumps. Re-verify before
 * raising a level.
 */
export const techMap: readonly TechSkill[] = [
	{
		name: "TypeScript",
		category: "languages",
		level: "owned",
		evidence: ["KT System", "OPFA OS", "OpenSen", "OPFA DSA"],
	},
	{
		name: "React",
		category: "frontend",
		level: "owned",
		evidence: ["OpenSen", "OpenFarm web", "this site"],
	},
	{
		name: "TanStack Start",
		category: "frontend",
		level: "owned",
		evidence: ["this site", "OPFA OS", "OpenFarm web"],
	},
	{
		name: "Cloudflare Workers",
		category: "tools",
		level: "owned",
		evidence: ["this site", "OPFA web API"],
	},
	{
		name: "Next.js",
		category: "frontend",
		level: "shipped",
		evidence: ["OpenSen", "So Bui", "LDS Heritage"],
	},
	{
		name: "Tailwind CSS",
		category: "frontend",
		level: "shipped",
		evidence: ["this site", "KT System", "OpenFarm web"],
	},
	{
		name: "HTML & CSS",
		category: "frontend",
		level: "shipped",
		evidence: ["this site", "Khoan Giếng Quang Khôi"],
	},
	{
		name: "JavaScript",
		category: "languages",
		level: "shipped",
		evidence: ["this site", "KT System"],
	},
	{
		name: "Node.js",
		category: "backend",
		level: "shipped",
		evidence: ["KT System", "OpenSen"],
	},
	{
		name: "PostgreSQL",
		category: "backend",
		level: "shipped",
		evidence: ["KT System", "OPFA OS", "OpenFarm web"],
	},
	{
		name: "Drizzle ORM",
		category: "backend",
		level: "shipped",
		evidence: ["KT System", "OPFA OS", "OpenFarm web"],
	},
	{
		name: "MCP servers",
		category: "ai",
		level: "shipped",
		evidence: ["openai-image-mcp", "OpenFarm web"],
	},
	{
		name: "Docker",
		category: "tools",
		level: "shipped",
		evidence: ["KT System", "OPFA OS"],
	},
	{
		name: "Linux",
		category: "tools",
		level: "shipped",
		evidence: ["KT System", "home lab"],
	},
	{
		name: "AWS",
		category: "tools",
		level: "shipped",
		evidence: ["OPFA OS", "OPFA AWS"],
	},
	{
		name: "Git & CI/CD",
		category: "tools",
		level: "shipped",
		evidence: ["KT System", "this site"],
	},
	{
		name: "Sentry",
		category: "tools",
		level: "shipped",
		evidence: ["this site", "KT System", "OPFA OS"],
	},
	{
		name: "Flutter",
		category: "mobile",
		level: "shipped",
		evidence: ["OpenSen"],
	},
	{
		name: "Python",
		category: "languages",
		level: "applied",
		evidence: ["P&ID Digitizer", "KT System crawlers"],
	},
	{
		name: "Computer vision (P&ID)",
		category: "ai",
		level: "applied",
		evidence: ["P&ID Digitizer"],
	},
	{
		name: "C#",
		category: "languages",
		level: "applied",
		evidence: ["Piping Data App", "Otherworld Soldier"],
	},
	{
		name: "Rust",
		category: "languages",
		level: "applied",
		evidence: ["Komodoro", "OPFA DSA"],
	},
	{
		name: "Go",
		category: "languages",
		level: "applied",
		evidence: ["OPFA Voyages", "KT System"],
	},
	{
		name: "Hono",
		category: "backend",
		level: "applied",
		evidence: ["OPFA web API", "KT System"],
	},
	{
		name: "Redis",
		category: "backend",
		level: "applied",
		evidence: ["KT System", "OPFA OS"],
	},
	{
		name: "Tauri",
		category: "tools",
		level: "applied",
		evidence: ["Komodoro", "OPFA DSA"],
	},
	{
		name: "Godot",
		category: "tools",
		level: "applied",
		evidence: ["Otherworld Soldier"],
	},
	{
		name: "three.js / WebXR",
		category: "frontend",
		level: "exploring",
		evidence: ["Ray AR"],
	},
];

/**
 * Used earlier (mostly at True Technology) and not verifiable from the current
 * repos. Listed without a level; do not assign one without new evidence.
 */
export const priorStack = [
	"Java",
	"Kotlin",
	"Android",
	"NestJS",
	"Groovy",
] as const;

export function groupByLevel(
	skills: readonly TechSkill[] = techMap,
): Record<ProficiencyLevel, TechSkill[]> {
	const grouped: Record<ProficiencyLevel, TechSkill[]> = {
		owned: [],
		shipped: [],
		applied: [],
		exploring: [],
	};
	for (const skill of skills) grouped[skill.level].push(skill);
	return grouped;
}

/** Skill names of one category at or above `minLevel`, in `techMap` order. */
export function namesInCategory(
	category: TechCategory,
	minLevel: ProficiencyLevel = "shipped",
	skills: readonly TechSkill[] = techMap,
): string[] {
	const cutoff = proficiencyLevels.indexOf(minLevel);
	return skills
		.filter(
			(s) =>
				s.category === category && proficiencyLevels.indexOf(s.level) <= cutoff,
		)
		.map((s) => s.name);
}
