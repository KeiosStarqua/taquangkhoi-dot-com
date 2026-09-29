import { describe, expect, it } from "vitest";
import { computePlacement } from "./placement";

const card = { width: 360, height: 300 };
const viewport = { width: 1280, height: 800 };

describe("computePlacement", () => {
	it("opens above the entity when there is room", () => {
		const p = computePlacement({
			anchor: { left: 300, top: 500, width: 100, height: 24 },
			card,
			viewport,
		});
		expect(p.side).toBe("top");
		expect(p.top + card.height).toBeLessThan(500);
		expect(p.cardPoint.y).toBe(p.top + card.height);
		expect(p.anchorPoint).toEqual({ x: 350, y: 500 });
	});

	it("flips below when the top is too tight", () => {
		const p = computePlacement({
			anchor: { left: 300, top: 120, width: 100, height: 24 },
			card,
			viewport,
		});
		expect(p.side).toBe("bottom");
		expect(p.top).toBeGreaterThan(144);
		expect(p.cardPoint.y).toBe(p.top);
	});

	it("clamps the card inside the viewport", () => {
		const right = computePlacement({
			anchor: { left: 1240, top: 500, width: 30, height: 24 },
			card,
			viewport,
			margin: 12,
		});
		expect(right.left + card.width).toBeLessThanOrEqual(1280 - 12);

		const left = computePlacement({
			anchor: { left: 0, top: 500, width: 30, height: 24 },
			card,
			viewport,
			margin: 12,
		});
		expect(left.left).toBe(12);
	});

	it("bridges the gap between text and card", () => {
		const p = computePlacement({
			anchor: { left: 300, top: 500, width: 100, height: 24 },
			card,
			viewport,
			gap: 18,
		});
		expect(p.bridge.top).toBeLessThanOrEqual(p.cardPoint.y);
		expect(p.bridge.top + p.bridge.height).toBeGreaterThanOrEqual(500);
		expect(p.bridge.left).toBeLessThanOrEqual(300);
	});

	it("keeps the connector end on the card", () => {
		const p = computePlacement({
			anchor: { left: 1240, top: 500, width: 30, height: 24 },
			card,
			viewport,
		});
		expect(p.cardPoint.x).toBeGreaterThanOrEqual(p.left);
		expect(p.cardPoint.x).toBeLessThanOrEqual(p.left + card.width);
	});
});
