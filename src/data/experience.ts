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

export const coreSkills = {
	languages: [
		"JavaScript",
		"TypeScript",
		"Python",
		"Java",
		"Kotlin",
		"C#",
		"Rust",
	],
	frameworks: ["React", "Next.js", "NestJS", "Flutter", "Android", "Node.js"],
	tools: [
		"Docker",
		"Linux",
		"AWS",
		"Git",
		"PostgreSQL",
		"Redis",
		"CI/CD",
		"Cloudflare",
	],
} as const;
