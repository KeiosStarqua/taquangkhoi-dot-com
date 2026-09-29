import { describe, expect, it } from "vitest";
import {
	formatStars,
	isProjectCategory,
	matchesQuery,
	normalizeSearch,
} from "./projects";

describe("normalizeSearch", () => {
	it("strips Vietnamese diacritics and case", () => {
		expect(normalizeSearch("  Học  Tiếng Anh ")).toBe("hoc tieng anh");
		expect(normalizeSearch("Đồ án")).toBe("do an");
	});
});

describe("matchesQuery", () => {
	const fields = ["OpenSen", "Learn English through chunking", "PWA"];

	it("matches everything on an empty query", () => {
		expect(matchesQuery(fields, "   ")).toBe(true);
	});

	it("requires every word to appear somewhere", () => {
		expect(matchesQuery(fields, "english pwa")).toBe(true);
		expect(matchesQuery(fields, "english sui")).toBe(false);
	});

	it("ignores diacritics in the query", () => {
		expect(matchesQuery(["Học tiếng Anh"], "hoc tieng")).toBe(true);
	});
});

describe("formatStars", () => {
	it("abbreviates thousands", () => {
		expect(formatStars(12)).toBe("12");
		expect(formatStars(3045)).toBe("3k");
		expect(formatStars(2150)).toBe("2.1k");
	});
});

describe("isProjectCategory", () => {
	it("accepts only known categories", () => {
		expect(isProjectCategory("engineering")).toBe(true);
		expect(isProjectCategory("all")).toBe(false);
		expect(isProjectCategory(3)).toBe(false);
	});
});
