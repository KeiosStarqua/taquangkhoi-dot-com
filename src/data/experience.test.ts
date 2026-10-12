import { describe, expect, it } from "vitest";
import {
	groupByLevel,
	namesInCategory,
	priorStack,
	proficiencyLevels,
	techCategories,
	techMap,
} from "./experience";

describe("techMap", () => {
	it("has unique names", () => {
		const names = techMap.map((s) => s.name);
		expect(new Set(names).size).toBe(names.length);
	});

	it("uses only known levels and categories", () => {
		for (const s of techMap) {
			expect(proficiencyLevels).toContain(s.level);
			expect(techCategories).toContain(s.category);
		}
	});

	it("requires evidence for every entry", () => {
		for (const s of techMap) expect(s.evidence.length).toBeGreaterThan(0);
	});

	it("keeps unverified earlier stack out of the leveled map", () => {
		const names = new Set(techMap.map((s) => s.name));
		for (const name of priorStack) expect(names.has(name)).toBe(false);
	});
});

describe("groupByLevel", () => {
	it("places every skill in exactly one level", () => {
		const grouped = groupByLevel();
		const total = proficiencyLevels.reduce(
			(n, level) => n + grouped[level].length,
			0,
		);
		expect(total).toBe(techMap.length);
	});
});

describe("namesInCategory", () => {
	it("excludes levels below the cutoff", () => {
		expect(namesInCategory("languages", "shipped")).toEqual([
			"TypeScript",
			"JavaScript",
		]);
		expect(namesInCategory("languages", "applied")).toContain("Rust");
	});
});
