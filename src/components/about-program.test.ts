import { describe, expect, it } from "vitest";
import { buildAboutProgram } from "./about-program";

describe("buildAboutProgram", () => {
	const program = buildAboutProgram({
		motto: "Stay curious.",
		hello: "Hello, world!",
	});

	it("is long enough that the editor must scroll", () => {
		expect(program.lines.length).toBeGreaterThan(24);
	});

	it("prints the greeting, profile, motto, and focus count", () => {
		expect(
			program.steps.flatMap((step) => (step.output ? [step.output] : [])),
		).toEqual([
			"Hello, world!",
			"Keios Starqua · Vietnam",
			"Software Engineer · AI/R&D · Builder",
			"Stay curious.",
			"4",
		]);
		expect(program.steps.at(-1)?.kind).toBe("result");
	});

	it("highlights a real source line on every step", () => {
		for (const step of program.steps) {
			expect(step.line).toBeGreaterThanOrEqual(1);
			expect(step.line).toBeLessThanOrEqual(program.lines.length);
		}
	});

	it("embeds the motto in copyable source", () => {
		expect(program.source).toContain('"Stay curious."');
		expect(program.source).toContain("introduce(taQuangKhoi)");
		expect(program.source).toContain("function introduce");
		expect(program.source).toContain(
			["$", "{person.alias} · $", "{person.location}"].join(""),
		);
	});
});
