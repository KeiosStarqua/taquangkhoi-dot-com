/**
 * Content mirrored from the real OpenSen web app (KeiosStarqua/opensen,
 * `web/src/lib/studio/content.ts` and `web/src/lib/app-routes.ts`).
 * The app teaches English, so these strings stay English in every locale:
 * they depict the product UI, not this site's copy.
 */

export const OPENSEN_ASSETS = {
	logo: "/products/opensen/logo.webp",
	askHelpScene: "/products/opensen/ask-help.webp",
} as const;

/** Primary shell tabs of the app, in order. */
export const APP_NAV = [
	"Home",
	"Learn",
	"Practice",
	"Explore",
	"Library",
] as const;
export type AppNavItem = (typeof APP_NAV)[number];
export const APP_NAV_ACTIVE: AppNavItem = "Learn";

/** Lesson "At the Airport", step "Ask for help", first sentence. */
export const LESSON_STEP = {
	lesson: "At the Airport",
	step: "Ask for help",
	position: "1 / 8",
	sentence: "Could you help me find the station?",
	meaning: "Ask someone to help you find a place.",
} as const;

export type ChunkTone = "request" | "action" | "slot";

/** The sentence above split into a frame plus one swappable slot. */
export const SENTENCE_CHUNKS: readonly { text: string; tone: ChunkTone }[] = [
	{ text: "Could you help me", tone: "request" },
	{ text: "find", tone: "action" },
	{ text: "the station", tone: "slot" },
];

/** Places from the same airport lesson that fit the `[PLACE]` slot. */
export const SLOT_VARIANTS = [
	"the station",
	"the check-in counter",
	"gate 12",
	"baggage claim",
] as const;
