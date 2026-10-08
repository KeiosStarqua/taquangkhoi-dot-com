import { Ascii, type MountOptions, type Piece } from "ascii.rest/react";
import { cn } from "#/lib/utils";

/** JetBrains Mono advance width, in em. Used to size a piece to its box. */
const CELL_WIDTH_EM = 0.6;
const LINE_HEIGHT = 1.15;

type AsciiArtProps = {
	/** A piece module, e.g. `import * as lorenz from "ascii.rest/pieces/lorenz"`. */
	piece: Piece;
	options?: MountOptions;
	/**
	 * Columns that should fill the box width. Defaults to the piece width.
	 * Pass fewer to crop the right side and keep the text larger.
	 */
	fitCols?: number;
	/** Rows to show. Defaults to the piece height. Pass fewer to crop blank rows at the bottom. */
	fitRows?: number;
	/** Upper bound for the font size so wide boxes do not blow the art up. */
	maxFontPx?: number;
	/** Draw a coloured piece (a scene) as text in one ink, in a `<pre>`. Ink comes from `className`. */
	mono?: boolean;
	className?: string;
};

/**
 * Decorative ascii.rest animation. Text pieces render in a `<pre>` in the
 * current text color, so color comes from the `className` token. Scenes
 * (`cell: 1`) with `mono` use square cells, so their line height matches the
 * glyph width. The font scales with the container width, and the box height
 * is reserved before the first frame so the page does not jump. Hidden from
 * assistive tech; the surrounding copy carries the meaning. ascii.rest keeps
 * the first frame when the reader prefers reduced motion and pauses while off
 * screen.
 */
export default function AsciiArt({
	piece,
	options,
	fitCols,
	fitRows,
	maxFontPx = 14,
	mono = false,
	className,
}: AsciiArtProps) {
	const cols = fitCols ?? piece.meta.cols;
	const fontSize = `min(calc(100cqw / ${cols * CELL_WIDTH_EM}), ${maxFontPx}px)`;
	const lineHeight =
		mono && piece.meta.cell === 1 ? CELL_WIDTH_EM : LINE_HEIGHT;

	return (
		<div
			aria-hidden="true"
			className={cn(
				"@container pointer-events-none w-full overflow-hidden select-none",
				className,
			)}
		>
			<Ascii
				piece={piece}
				options={options}
				mono={mono}
				className="mx-auto my-0 w-fit overflow-hidden font-mono whitespace-pre"
				style={{
					fontSize,
					lineHeight,
					height: `${(fitRows ?? piece.meta.rows) * lineHeight}em`,
				}}
			/>
		</div>
	);
}
