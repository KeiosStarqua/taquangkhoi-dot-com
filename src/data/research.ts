/**
 * Non-translatable research records for `/$lang/research`.
 * Translatable copy (titles, blurbs, status labels) lives in
 * `research.*` in the locale catalogs, keyed by each record's `id`.
 * Paper titles and authors are proper names and stay here.
 */

export type ResearchAreaId =
	| "ai-agents"
	| "engineering-intelligence"
	| "quantum-computing"
	| "llm-systems";

export interface ResearchArea {
	id: ResearchAreaId;
	tags: readonly string[];
}

export const researchAreas: readonly ResearchArea[] = [
	{ id: "ai-agents", tags: ["Agents", "RAG", "Tools"] },
	{
		id: "engineering-intelligence",
		tags: ["P&ID", "Computer Vision", "Graph"],
	},
	{ id: "quantum-computing", tags: ["Qubits", "Algorithms", "IonQ"] },
	{ id: "llm-systems", tags: ["RAG", "LLM", "Knowledge Graph"] },
] as const;

export type WorkIllustration = "pid" | "agents" | "circuit";

export interface HighlightedWork {
	id: "pid-digitizer" | "agent-framework" | "quantum-experiments";
	area: ResearchAreaId;
	illustration: WorkIllustration;
	tags: readonly string[];
	year: number;
}

export const highlightedWork: readonly HighlightedWork[] = [
	{
		id: "pid-digitizer",
		area: "engineering-intelligence",
		illustration: "pid",
		tags: ["Computer Vision", "OCR", "Graph", "DEXPI"],
		year: 2026,
	},
	{
		id: "agent-framework",
		area: "ai-agents",
		illustration: "agents",
		tags: ["Agents", "Tool Use", "Multi-Agent"],
		year: 2026,
	},
	{
		id: "quantum-experiments",
		area: "quantum-computing",
		illustration: "circuit",
		tags: ["Qubits", "Qiskit", "IonQ", "Algorithms"],
		year: 2026,
	},
] as const;

export interface ResearchNote {
	id: "dino-detr" | "rag-design" | "quantum-basics" | "agent-memory";
	/** Year and month, `YYYY-MM`. Formatted per locale at render time. */
	month: string;
}

export const researchNotes: readonly ResearchNote[] = [
	{ id: "dino-detr", month: "2026-09" },
	{ id: "rag-design", month: "2026-09" },
	{ id: "quantum-basics", month: "2026-08" },
	{ id: "agent-memory", month: "2026-08" },
] as const;

export type ReadingKind = "paper" | "article" | "book";

export interface ReadingItem {
	title: string;
	authors: string;
	year: number;
	kind: ReadingKind;
	href?: string;
}

export const readingList: readonly ReadingItem[] = [
	{
		title: "DINO: DETR with Improved DeNoising Anchor Boxes",
		authors: "Zhang et al.",
		year: 2022,
		kind: "paper",
		href: "https://arxiv.org/abs/2203.03605",
	},
	{
		title: "An Image is Worth 16x16 Words: Vision Transformer (ViT)",
		authors: "Dosovitskiy et al.",
		year: 2021,
		kind: "paper",
		href: "https://arxiv.org/abs/2010.11929",
	},
	{
		title: "Graph Neural Networks for Engineering Applications",
		authors: "Wu et al.",
		year: 2023,
		kind: "paper",
	},
	{
		title: "LLM Powered Autonomous Agents",
		authors: "Lilian Weng",
		year: 2023,
		kind: "article",
		href: "https://lilianweng.github.io/posts/2023-06-23-agent/",
	},
	{
		title: "Quantum Computation and Quantum Information",
		authors: "Nielsen & Chuang",
		year: 2010,
		kind: "book",
	},
] as const;

export interface PlaygroundItem {
	id: "llm-rag" | "quantum-circuit" | "pid-symbols";
	href?: string;
}

export const playground: readonly PlaygroundItem[] = [
	{ id: "llm-rag" },
	{ id: "quantum-circuit" },
	{ id: "pid-symbols" },
] as const;

/** Where "View all notes" points. Notes are published on the blog. */
export const NOTES_URL = "https://blog.taquangkhoi.tech";
/** Where "Open Source" and "view all research" point. */
export const OPEN_SOURCE_URL = "https://github.com/TaQuangKhoi";
