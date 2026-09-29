export interface Rect {
	left: number;
	top: number;
	width: number;
	height: number;
}

export interface PlacementInput {
	/** The line box of the entity text the card attaches to. */
	anchor: Rect;
	card: { width: number; height: number };
	viewport: { width: number; height: number };
	/** Space between the text and the card; also the hover-safe bridge. */
	gap?: number;
	/** Minimum distance from the viewport edges. */
	margin?: number;
}

export interface Placement {
	side: "top" | "bottom";
	/** Card top-left, viewport coordinates. */
	left: number;
	top: number;
	/** Point on the underline where the connector starts. */
	anchorPoint: { x: number; y: number };
	/** Point on the card edge where the connector ends and the tilt pivots. */
	cardPoint: { x: number; y: number };
	/** Transparent area between text and card that keeps the card open. */
	bridge: Rect;
}

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), Math.max(min, max));

/**
 * Places a preview card above the entity when it fits, otherwise below.
 * The card leans toward the right of the anchor (like a note pinned beside
 * the word) and is clamped inside the viewport.
 */
export function computePlacement({
	anchor,
	card,
	viewport,
	gap = 18,
	margin = 12,
}: PlacementInput): Placement {
	const needed = card.height + gap + margin;
	const spaceAbove = anchor.top;
	const spaceBelow = viewport.height - (anchor.top + anchor.height);
	const side: Placement["side"] =
		spaceAbove >= needed || spaceAbove >= spaceBelow ? "top" : "bottom";

	const anchorX = anchor.left + anchor.width / 2;
	const left = clamp(
		anchorX - card.width * 0.25,
		margin,
		viewport.width - card.width - margin,
	);

	const top =
		side === "top"
			? anchor.top - gap - card.height
			: anchor.top + anchor.height + gap;

	const anchorY = side === "top" ? anchor.top : anchor.top + anchor.height;
	const cardEdgeY = side === "top" ? top + card.height : top;
	const cardX = clamp(anchorX + 36, left + 28, left + card.width - 28);

	// Overlap both ends a little so no sub-pixel hole closes the card.
	const bridgeLeft = Math.min(anchor.left, left);
	const bridgeRight = Math.max(anchor.left + anchor.width, left + card.width);
	const bridgeTop = Math.min(anchorY, cardEdgeY) - 4;
	const bridgeBottom = Math.max(anchorY, cardEdgeY) + 4;

	return {
		side,
		left,
		top,
		anchorPoint: { x: anchorX, y: anchorY },
		cardPoint: { x: cardX, y: cardEdgeY },
		bridge: {
			left: bridgeLeft,
			top: bridgeTop,
			width: bridgeRight - bridgeLeft,
			height: bridgeBottom - bridgeTop,
		},
	};
}
