import * as cpuMeters from "ascii.rest/pieces/cpu-meters";
import { Captions, FileText, ListChecks, NotebookPen } from "lucide-react";
import type { ReactNode } from "react";
import AsciiArt from "./AsciiArt";

const HOME_LAB_SERVICES = [
	"web",
	"admin",
	"auth",
	"worker",
	"postgres",
	"redis",
] as const;

export type ProjectVisualKind =
	| "opensen"
	| "yt-hunter"
	| "open-farm"
	| "pid-digitizer"
	| "agent-workstation"
	| "home-lab";

/**
 * Decorative right-hand illustration for a project card on `/$lang/products`.
 * Built from markup and SVG so it follows the theme tokens. Hidden from
 * assistive tech; the card text carries the meaning.
 */
export default function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
	return (
		<div
			className="pointer-events-none relative hidden h-full min-h-44 w-40 shrink-0 overflow-hidden select-none sm:block xl:w-44"
			aria-hidden="true"
		>
			{visuals[kind]()}
		</div>
	);
}

const visuals: Record<ProjectVisualKind, () => ReactNode> = {
	opensen: OpenSenPhone,
	"yt-hunter": TranscriptPanel,
	"open-farm": FarmScan,
	"pid-digitizer": PidSheet,
	"agent-workstation": AgentGraph,
	"home-lab": ServicesTerminal,
};

function OpenSenPhone() {
	const rows = ["Daily Conversation", "Business English", "Travel"];
	return (
		<div className="absolute top-4 -right-3 w-36 rotate-6 rounded-[1.4rem] border-4 border-[var(--sea-ink)] bg-[var(--bg-base)] p-2 shadow-lg">
			<div className="mx-auto mb-2 h-1 w-8 rounded-full bg-[var(--line-strong)]" />
			<p className="m-0 mb-1 text-center font-mono text-[0.55rem] font-bold text-[var(--accent)]">
				OpenSen
			</p>
			<div className="mb-2 space-y-1">
				<div className="h-1 w-full rounded bg-[var(--line)]" />
				<div className="h-1 w-4/5 rounded bg-[var(--line)]" />
			</div>
			<p className="m-0 mb-1 text-[0.5rem] font-semibold text-[var(--sea-ink)]">
				Today's Practice
			</p>
			<ul className="m-0 list-none space-y-1 p-0">
				{rows.map((row) => (
					<li
						key={row}
						className="flex items-center gap-1 rounded-md border border-[var(--line)] px-1 py-1"
					>
						<span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
						<span className="truncate text-[0.45rem] text-[var(--sea-ink-soft)]">
							{row}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function TranscriptPanel() {
	const rows = [
		{ icon: Captions, label: "Transcript" },
		{ icon: FileText, label: "Summary" },
		{ icon: ListChecks, label: "Key Points" },
		{ icon: NotebookPen, label: "Export to Notion" },
	];
	return (
		<div className="absolute top-5 -right-2 w-40 space-y-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] p-2 shadow-lg">
			<p className="m-0 truncate rounded-md border border-[var(--line)] px-1.5 py-1 font-mono text-[0.5rem] text-[var(--sea-ink-soft)]">
				youtube.com/watch?v=…
			</p>
			{rows.map(({ icon: Icon, label }) => (
				<div
					key={label}
					className="flex items-center gap-1.5 rounded-md border border-[var(--line)] px-1.5 py-1.5"
				>
					<Icon className="h-3 w-3 text-[var(--accent)]" strokeWidth={1.8} />
					<span className="text-[0.55rem] text-[var(--sea-ink)]">{label}</span>
				</div>
			))}
		</div>
	);
}

// Fixed 9×9 QR-like pattern. Decorative only; it does not encode a URL.
const QR_BITS = [
	"111010111",
	"101001101",
	"111011111",
	"000110000",
	"110101011",
	"001010100",
	"111001101",
	"101110010",
	"111010111",
] as const;

const QR_CELL = 4.7;
const QR_PATH = QR_BITS.flatMap((row, y) =>
	[...row].flatMap((bit, x) =>
		bit === "1"
			? [
					`M${59 + x * QR_CELL} ${57 + y * QR_CELL}h${QR_CELL}v${QR_CELL}h-${QR_CELL}z`,
				]
			: [],
	),
).join("");

const SPROUTS = [
	{ x: 20, y: 60 },
	{ x: 140, y: 72 },
	{ x: 32, y: 84 },
	{ x: 128, y: 96 },
] as const;

function FarmScan() {
	return (
		<svg
			viewBox="0 0 160 190"
			className="h-full w-full"
			fill="none"
			aria-hidden="true"
		>
			{/* field rows */}
			{[120, 138, 156, 174].map((y, i) => (
				<path
					key={y}
					d={`M0 ${y} Q80 ${y - 18 - i * 4} 160 ${y}`}
					stroke="var(--code-green)"
					strokeOpacity="0.35"
					strokeWidth="6"
					strokeLinecap="round"
				/>
			))}
			{/* sprouts */}
			{SPROUTS.map(({ x, y }) => (
				<path
					key={x}
					d={`M${x} ${y}v-14m0 6c-6 0-8-6-8-6s6-1 8 6m0-2c6 0 8-6 8-6s-6-1-8 6`}
					stroke="var(--code-green)"
					strokeWidth="1.4"
					strokeLinecap="round"
				/>
			))}
			{/* phone */}
			<g transform="rotate(-8 80 90)">
				<rect
					x="44"
					y="18"
					width="72"
					height="136"
					rx="12"
					fill="var(--bg-base)"
					stroke="var(--sea-ink)"
					strokeWidth="4"
				/>
				<rect
					x="52"
					y="30"
					width="56"
					height="112"
					rx="6"
					fill="var(--surface-strong)"
				/>
				<text
					x="80"
					y="46"
					textAnchor="middle"
					fontSize="6"
					fontFamily="var(--font-mono)"
					fill="var(--sea-ink-soft)"
				>
					Scan to trace
				</text>
				<rect x="56" y="54" width="48" height="48" rx="3" fill="#ffffff" />
				<path d={QR_PATH} fill="#102126" />
				<circle
					cx="80"
					cy="120"
					r="9"
					stroke="var(--code-green)"
					strokeWidth="1.6"
				/>
				<path
					d="M80 125v-8m0 3c-3 0-4-3-4-3s3 0 4 3m0-1c3 0 4-3 4-3s-3 0-4 3"
					stroke="var(--code-green)"
					strokeWidth="1.2"
					strokeLinecap="round"
				/>
			</g>
		</svg>
	);
}

function PidSheet() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 160 190"
			className="h-full w-full text-[var(--sea-ink-soft)]"
			fill="none"
			stroke="currentColor"
			strokeWidth="1"
		>
			<path
				d="M0 10h160M0 180h160M10 0v190"
				strokeDasharray="2 3"
				className="text-[var(--line-strong)]"
			/>
			{/* piping */}
			<path d="M10 60h40v50h60v40M50 60h70v-30M110 110h40M30 150h80" />
			<circle cx="80" cy="60" r="9" />
			<path d="M74 60h12M80 54v12" />
			<rect x="104" y="18" width="24" height="18" rx="2" />
			<circle cx="40" cy="150" r="10" />
			<path d="M34 144l12 12M46 144l-12 12" />
			<path d="M100 104l10 6-10 6zM120 104l-10 6 10 6z" />
			<rect x="126" y="140" width="22" height="26" rx="3" />
			{/* detections */}
			<rect
				x="66"
				y="46"
				width="28"
				height="28"
				className="text-rose-400"
				strokeWidth="1.6"
			/>
			<rect
				x="26"
				y="136"
				width="28"
				height="28"
				className="text-sky-400"
				strokeWidth="1.6"
			/>
			<rect
				x="94"
				y="98"
				width="32"
				height="24"
				className="text-[var(--accent)]"
				strokeWidth="1.6"
			/>
			<rect
				x="122"
				y="136"
				width="30"
				height="34"
				className="text-amber-400"
				strokeWidth="1.6"
			/>
		</svg>
	);
}

/**
 * Always-dark panel. Reuses `.code-window` chrome, and its inner colors are
 * the fixed code-window palette so it stays dark in light mode.
 */
function DarkPanel({ children }: { children: ReactNode }) {
	return (
		<div className="code-window absolute inset-y-0 right-0 left-2">
			{children}
		</div>
	);
}

function AgentGraph() {
	const nodes = [
		{ x: 22, label: "Memory" },
		{ x: 80, label: "Tools" },
		{ x: 138, label: "Action" },
	];
	return (
		<DarkPanel>
			<svg
				viewBox="0 0 160 190"
				className="h-full w-full"
				fill="none"
				aria-hidden="true"
			>
				<rect
					x="56"
					y="30"
					width="48"
					height="44"
					rx="6"
					stroke="#3ee8c4"
					strokeOpacity="0.6"
				/>
				<circle cx="80" cy="46" r="6" stroke="#3ee8c4" />
				<text
					x="80"
					y="66"
					textAnchor="middle"
					fontSize="8"
					fill="#d7fff4"
					fontFamily="var(--font-mono)"
				>
					Agent
				</text>
				<path
					d="M80 74v22M22 96h116M22 96v16M80 96v16M138 96v16"
					stroke="#3ee8c4"
					strokeOpacity="0.5"
					strokeDasharray="3 3"
				/>
				{nodes.map(({ x, label }) => (
					<g key={label}>
						<rect
							x={x - 20}
							y="112"
							width="40"
							height="42"
							rx="5"
							stroke="#3ee8c4"
							strokeOpacity="0.45"
						/>
						<circle cx={x} cy="126" r="5" stroke="#3ee8c4" />
						<text
							x={x}
							y="146"
							textAnchor="middle"
							fontSize="7"
							fill="#93aeb3"
							fontFamily="var(--font-mono)"
						>
							{label}
						</text>
					</g>
				))}
			</svg>
		</DarkPanel>
	);
}

/**
 * Home-lab card: ascii.rest's htop-style meters, cropped to the left meter
 * column so the text stays legible in the narrow panel. Colors are the fixed
 * code-window palette so it stays dark in light mode.
 */
function ServicesTerminal() {
	return (
		<DarkPanel>
			<div className="p-3">
				<p className="m-0 mb-1 font-mono text-[0.55rem] text-[#d7fff4]">htop</p>
				<AsciiArt
					piece={cpuMeters}
					options={{ commands: HOME_LAB_SERVICES }}
					fitCols={33}
					maxFontPx={8}
					className="text-[#93aeb3]"
				/>
			</div>
		</DarkPanel>
	);
}
