import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	AudioLines,
	Brain,
	CalendarClock,
	Check,
	ChevronLeft,
	FileDown,
	Globe,
	Library,
	type LucideIcon,
	MessagesSquare,
	Mic,
	Minus,
	Plus,
	RefreshCw,
	Repeat2,
	Send,
	Sparkles,
	Turtle,
	Volume2,
	X,
	Youtube,
	Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "#/data/products";
import {
	getOpenSenCopy,
	type OpenSenCopy,
	type OpenSenLocale,
} from "../api/copy";
import {
	LESSON_STEP,
	OPENSEN_ASSETS,
	SENTENCE_CHUNKS,
	SLOT_VARIANTS,
} from "../data/app-preview";
import { AppPreview } from "./AppPreview";

interface Props {
	lang: OpenSenLocale;
	product: Product;
}

/** Long-form case study for `/$lang/products/opensen`. */
export function OpenSenCaseStudy({ lang, product }: Props) {
	const { t } = useTranslation();
	const copy = getOpenSenCopy(lang);
	const website = product.demo;
	const video = product.links.find((link) => link.href.includes("youtube.com"));

	return (
		<main className="page-wrap px-4 pb-16 pt-8">
			<Link
				to="/$lang/products"
				params={{ lang }}
				className="inline-flex items-center gap-1 font-mono text-xs tracking-wide text-[var(--sea-ink-soft)] no-underline hover:text-[var(--accent)]"
			>
				<ChevronLeft size={14} aria-hidden="true" />
				{t("products.back")}
			</Link>

			<Hero
				copy={copy.hero}
				status={t(`products.status.${product.status}`)}
				tags={product.tags}
			/>

			<Section index="01" copy={copy.problem}>
				<ProblemCompare copy={copy.problem} />
			</Section>
			<Section index="02" copy={copy.idea}>
				<ChunkSplit copy={copy.idea} />
			</Section>
			<Section index="03" copy={copy.system}>
				<SystemFlow copy={copy.system} />
			</Section>
			<Section index="04" copy={copy.features}>
				<FeatureGrid items={copy.features.items} />
			</Section>
			<Section index="05" copy={copy.action}>
				<ActionFlow copy={copy.action} />
			</Section>
			<Section index="06" copy={copy.experiment}>
				<QuestionGrid questions={copy.experiment.questions} />
			</Section>
			<Section index="07" copy={copy.learned}>
				<Outcomes copy={copy.learned} />
			</Section>
			<Section
				index="08"
				copy={copy.next}
				aside={
					<div className="mt-6 flex flex-wrap gap-3">
						{website ? (
							<a
								href={website}
								target="_blank"
								rel="noreferrer"
								className="btn-primary"
							>
								{copy.next.cta.website}
								<ArrowRight size={16} aria-hidden="true" />
							</a>
						) : null}
						{video ? (
							<a
								href={video.href}
								target="_blank"
								rel="noreferrer"
								className="btn-ghost"
							>
								<Youtube size={16} aria-hidden="true" />
								{copy.next.cta.video}
							</a>
						) : null}
						<Link to="/$lang/connect" params={{ lang }} className="btn-ghost">
							<Send size={15} aria-hidden="true" />
							{copy.next.cta.connect}
						</Link>
					</div>
				}
			>
				<Roadmap copy={copy.next} />
			</Section>
		</main>
	);
}

/* ── Layout ─────────────────────────────────────────────────────────── */

function Section({
	index,
	copy,
	aside,
	children,
}: {
	index: string;
	copy: { kicker: string; title: string; lede: string };
	aside?: ReactNode;
	children: ReactNode;
}) {
	const headingId = `opensen-${index}`;
	return (
		<section
			aria-labelledby={headingId}
			className="grid gap-8 border-t border-[var(--line)] py-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] lg:gap-12"
		>
			<div>
				<p className="island-kicker m-0 mb-3">
					<span className="kicker-mark">/</span>
					{index}. {copy.kicker}
				</p>
				<h2
					id={headingId}
					className="display-title m-0 text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-[1.08] text-[var(--sea-ink)]"
				>
					{copy.title}
				</h2>
				<p className="m-0 mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--sea-ink-soft)]">
					{copy.lede}
				</p>
				{aside}
			</div>
			<div className="min-w-0 self-center">{children}</div>
		</section>
	);
}

function Panel({
	className = "",
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return <div className={`island-shell p-5 ${className}`}>{children}</div>;
}

function FlowArrow({ className = "" }: { className?: string }) {
	return (
		<ArrowRight
			size={18}
			aria-hidden="true"
			className={`shrink-0 text-[var(--ink-faint)] ${className}`}
		/>
	);
}

/* ── Hero ───────────────────────────────────────────────────────────── */

function Hero({
	copy,
	status,
	tags,
}: {
	copy: OpenSenCopy["hero"];
	status: string;
	tags: string[];
}) {
	return (
		<header className="rise-in grid items-center gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
			<div>
				<span className="chip">{status}</span>
				<h1 className="display-title m-0 mt-5 text-[clamp(2.4rem,4.6vw,3.9rem)] font-semibold leading-[1.02] text-[var(--sea-ink)]">
					{copy.titleLead}{" "}
					<span className="name-accent">{copy.titleAccent}</span>
				</h1>
				<p className="m-0 mt-5 max-w-xl text-base leading-relaxed text-[var(--sea-ink-soft)] sm:text-lg">
					{copy.lede}
				</p>
				<ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
					{[...tags, ...copy.extraTags].map((tag) => (
						<li key={tag} className="chip">
							{tag}
						</li>
					))}
				</ul>
			</div>

			<div className="relative pt-16 sm:pt-20">
				<div
					className="absolute right-2 top-0 flex items-start gap-2 sm:right-6"
					aria-hidden="true"
				>
					<svg
						viewBox="0 0 80 60"
						width="64"
						height="48"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
						className="mt-6 text-[var(--accent)]"
					>
						<title>arrow</title>
						<path d="M76 6C50 6 22 18 12 52" />
						<path d="M4 42l8 12 10-9" />
					</svg>
					<p className="margin-note m-0 -rotate-6 text-sm sm:text-base">
						{copy.note.map((line) => (
							<span key={line} className="block">
								{line}
							</span>
						))}
					</p>
				</div>
				<AppPreview label={copy.previewLabel} />
			</div>
		</header>
	);
}

/* ── 01 Problem ─────────────────────────────────────────────────────── */

function StepTrail({ steps }: { steps: string[] }) {
	return (
		<ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
			{steps.map((step, i) => (
				<li key={step} className="flex items-center gap-1.5">
					<span className="rounded-md border border-[var(--line)] px-2 py-1 font-mono text-[0.7rem] text-[var(--sea-ink-soft)]">
						{step}
					</span>
					{i < steps.length - 1 ? (
						<span aria-hidden="true" className="text-[var(--ink-faint)]">
							›
						</span>
					) : null}
				</li>
			))}
		</ol>
	);
}

function ProblemCompare({ copy }: { copy: OpenSenCopy["problem"] }) {
	return (
		<div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
			<Panel className="flex-1">
				<p className="m-0 mb-4 flex items-center gap-2 text-sm font-bold text-[var(--sea-ink)]">
					<span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--sea-ink-soft)]">
						<Minus size={13} aria-hidden="true" />
					</span>
					{copy.traditional.label}
				</p>
				<StepTrail steps={copy.traditional.steps} />
				<p className="m-0 mt-4 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
					{copy.traditional.note}
				</p>
			</Panel>
			<FlowArrow className="self-center rotate-90 md:rotate-0" />
			<Panel className="flex-1 border-[var(--line-strong)] bg-[color-mix(in_oklab,var(--accent)_7%,var(--surface))]">
				<p className="m-0 mb-4 flex items-center gap-2 text-sm font-bold text-[var(--sea-ink)]">
					<span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--accent)] text-[var(--accent)]">
						<Check size={13} aria-hidden="true" />
					</span>
					{copy.opensen.label}
				</p>
				<StepTrail steps={copy.opensen.steps} />
				<p className="m-0 mt-4 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
					{copy.opensen.note}
				</p>
			</Panel>
		</div>
	);
}

/* ── 02 Core idea ───────────────────────────────────────────────────── */

function ChunkSplit({ copy }: { copy: OpenSenCopy["idea"] }) {
	return (
		<div className="relative">
			<p className="margin-note m-0 mb-4 max-w-[15rem] -rotate-3 text-sm lg:absolute lg:-left-4 lg:-top-6 lg:mb-0 lg:max-w-[12rem]">
				{copy.annotation}
			</p>

			<div className="grid grid-cols-3 gap-2 sm:gap-3 lg:ml-[12rem]">
				{SENTENCE_CHUNKS.map((chunk, i) => (
					<div
						key={chunk.text}
						className="flex flex-col items-center gap-2 text-center"
					>
						<span
							className="chunk-tone w-full rounded-xl px-2 py-2 display-title text-[clamp(1rem,2.4vw,1.6rem)] leading-tight"
							data-tone={chunk.tone}
						>
							{chunk.text}
							{i === SENTENCE_CHUNKS.length - 1 ? "?" : ""}
						</span>
						<span aria-hidden="true" className="text-[var(--ink-faint)]">
							↓
						</span>
						<span className="rounded-md border border-[var(--line)] px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--sea-ink-soft)]">
							{copy.parts[i]}
						</span>
					</div>
				))}
			</div>

			<Panel className="mt-6 lg:ml-[12rem]">
				<p className="island-kicker m-0 mb-3">
					<Repeat2
						size={13}
						aria-hidden="true"
						className="text-[var(--accent)]"
					/>
					{copy.swapLabel}
				</p>
				<p className="m-0 font-mono text-sm text-[var(--sea-ink)]">
					Could you help me find{" "}
					<span
						className="chunk-tone rounded-md px-1.5 py-0.5"
						data-tone="slot"
					>
						[PLACE]
					</span>
					?
				</p>
				<ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
					{SLOT_VARIANTS.map((variant) => (
						<li
							key={variant}
							className="chunk-tone rounded-full px-2.5 py-1 text-xs font-semibold"
							data-tone="slot"
						>
							{variant}
						</li>
					))}
				</ul>
			</Panel>
		</div>
	);
}

/* ── 03 System ──────────────────────────────────────────────────────── */

const systemIcons: LucideIcon[] = [
	Globe,
	MessagesSquare,
	Library,
	Mic,
	CalendarClock,
	Zap,
];

function SystemFlow({ copy }: { copy: OpenSenCopy["system"] }) {
	const last = copy.steps.length - 1;
	return (
		<div>
			<ol className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 xl:flex xl:items-stretch xl:gap-0">
				{copy.steps.map((step, i) => {
					const Icon = systemIcons[i] ?? Globe;
					return (
						<li key={step.title} className="flex items-center xl:flex-1">
							<div
								className={`island-shell flex h-full w-full flex-col items-center gap-2 px-3 py-4 text-center ${
									i === last
										? "border-[var(--line-strong)] bg-[color-mix(in_oklab,var(--accent)_9%,var(--surface))]"
										: ""
								}`}
							>
								<Icon
									size={20}
									aria-hidden="true"
									className="text-[var(--accent)]"
								/>
								<span className="text-[0.8rem] font-bold leading-tight text-[var(--sea-ink)]">
									{step.title}
								</span>
								<span className="text-[0.72rem] leading-snug text-[var(--sea-ink-soft)]">
									{step.caption}
								</span>
							</div>
							{i < last ? (
								<FlowArrow className="mx-1.5 hidden xl:block" />
							) : null}
						</li>
					);
				})}
			</ol>
			<div className="relative mx-[8%] mt-3 hidden h-6 rounded-b-2xl border-x border-b border-dashed border-[var(--line-strong)] xl:block">
				<span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 bg-[var(--bg-base)] px-3 font-mono text-[0.7rem] text-[var(--sea-ink-soft)]">
					<RefreshCw
						size={11}
						aria-hidden="true"
						className="mr-1.5 inline text-[var(--accent)]"
					/>
					{copy.loop}
				</span>
			</div>
			<p className="m-0 mt-4 flex items-center gap-2 font-mono text-[0.7rem] text-[var(--sea-ink-soft)] xl:hidden">
				<RefreshCw
					size={11}
					aria-hidden="true"
					className="text-[var(--accent)]"
				/>
				{copy.loop}
			</p>
		</div>
	);
}

/* ── 04 Features ────────────────────────────────────────────────────── */

const featureIcons: LucideIcon[] = [
	Globe,
	MessagesSquare,
	Library,
	Repeat2,
	CalendarClock,
	FileDown,
];

function FeatureGrid({ items }: { items: OpenSenCopy["features"]["items"] }) {
	return (
		<ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
			{items.map((item, i) => {
				const Icon = featureIcons[i] ?? Globe;
				return (
					<li key={item.title} className="island-shell p-5">
						<Icon
							size={20}
							aria-hidden="true"
							className="text-[var(--accent)]"
						/>
						<h3 className="m-0 mt-3 text-[0.95rem] font-bold text-[var(--sea-ink)]">
							{item.title}
						</h3>
						<p className="m-0 mt-1.5 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
							{item.body}
						</p>
					</li>
				);
			})}
		</ul>
	);
}

/* ── 05 Product in action ───────────────────────────────────────────── */

const waveHeights = [
	"h-2",
	"h-4",
	"h-6",
	"h-3",
	"h-5",
	"h-7",
	"h-4",
	"h-2",
	"h-5",
	"h-3",
] as const;

function ActionStep({
	n,
	title,
	children,
}: {
	n: number;
	title: string;
	children: ReactNode;
}) {
	return (
		<div className="island-shell flex h-full min-w-0 flex-1 flex-col gap-3 p-4">
			<p className="m-0 text-[0.8rem] font-bold text-[var(--sea-ink)]">
				<span className="mr-1.5 font-mono text-[var(--accent)]">{n}.</span>
				{title}
			</p>
			{children}
		</div>
	);
}

function ActionFlow({ copy }: { copy: OpenSenCopy["action"] }) {
	const steps = [
		<ActionStep key="situation" n={1} title={copy.situation.title}>
			<img
				src={OPENSEN_ASSETS.askHelpScene}
				alt={copy.situation.alt}
				width={960}
				height={540}
				loading="lazy"
				className="aspect-video w-full rounded-lg object-cover"
			/>
			<p className="m-0 text-xs text-[var(--sea-ink-soft)]">
				{copy.situation.body}
			</p>
		</ActionStep>,
		<ActionStep key="sentence" n={2} title={copy.sentence.title}>
			<p
				className="chunk-tone m-0 rounded-lg px-3 py-2 text-sm font-semibold"
				data-tone="request"
			>
				{LESSON_STEP.sentence}
			</p>
			<div className="flex gap-1.5 text-[0.7rem] font-semibold">
				<span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[var(--accent-ink)]">
					<Turtle size={12} aria-hidden="true" />
					{copy.sentence.slow}
				</span>
				<span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2.5 py-1 text-[var(--sea-ink-soft)]">
					<Volume2 size={12} aria-hidden="true" />
					{copy.sentence.natural}
				</span>
			</div>
		</ActionStep>,
		<ActionStep key="pattern" n={3} title={copy.pattern.title}>
			<ul className="m-0 flex list-none flex-col gap-1.5 p-0">
				{SENTENCE_CHUNKS.map((chunk) => (
					<li
						key={chunk.text}
						className="chunk-tone flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold"
						data-tone={chunk.tone}
					>
						{chunk.tone === "slot" ? "[PLACE]" : chunk.text}
						<Plus size={12} aria-hidden="true" />
					</li>
				))}
			</ul>
		</ActionStep>,
		<ActionStep key="speak" n={4} title={copy.speak.title}>
			<div className="flex items-center gap-2" aria-hidden="true">
				<span className="flex flex-1 items-center gap-[3px] text-[var(--accent)]">
					{waveHeights.map((h, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars
						<span key={i} className={`w-[3px] rounded-full bg-current ${h}`} />
					))}
				</span>
				<span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_0_18px_var(--glow)]">
					<Mic size={16} />
				</span>
			</div>
			<p className="m-0 text-xs leading-relaxed text-[var(--sea-ink-soft)]">
				{copy.speak.body}
			</p>
		</ActionStep>,
	];

	return (
		<ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2 xl:flex xl:items-stretch">
			{steps.map((step, i) => (
				<li
					key={step.key}
					className="flex min-w-0 items-stretch gap-3 xl:flex-1"
				>
					{step}
					{i < steps.length - 1 ? (
						<FlowArrow className="hidden self-center xl:block" />
					) : null}
				</li>
			))}
		</ol>
	);
}

/* ── 06 Experiment ──────────────────────────────────────────────────── */

const questionIcons: LucideIcon[] = [Brain, Zap, Sparkles];

function QuestionGrid({ questions }: { questions: string[] }) {
	return (
		<ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
			{questions.map((question, i) => {
				const Icon = questionIcons[i] ?? Brain;
				return (
					<li key={question} className="island-shell flex flex-col gap-4 p-5">
						<div className="flex items-center justify-between">
							<span className="font-mono text-sm text-[var(--ink-faint)]">
								{String(i + 1).padStart(2, "0")}
							</span>
							<Icon
								size={20}
								aria-hidden="true"
								className="text-[var(--accent)]"
							/>
						</div>
						<p className="m-0 text-[0.95rem] leading-snug text-[var(--sea-ink)]">
							{question}
						</p>
					</li>
				);
			})}
		</ol>
	);
}

/* ── 07 What I learned ──────────────────────────────────────────────── */

function Outcomes({ copy }: { copy: OpenSenCopy["learned"] }) {
	const cards = [
		{ key: "worked", tone: "action", Icon: Check, ...copy.worked },
		{ key: "didnt", tone: "error", Icon: X, ...copy.didnt },
		{ key: "changed", tone: "request", Icon: ArrowRight, ...copy.changed },
	] as const;
	return (
		<ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
			{cards.map(({ key, tone, Icon, title, body }) => (
				<li key={key} className="chunk-tone rounded-2xl p-5" data-tone={tone}>
					<p className="m-0 flex items-center gap-2 text-sm font-bold">
						<span className="grid h-6 w-6 place-items-center rounded-full border border-current">
							<Icon size={13} aria-hidden="true" />
						</span>
						{title}
					</p>
					<p className="m-0 mt-3 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
						{body}
					</p>
				</li>
			))}
		</ul>
	);
}

/* ── 08 Next steps ──────────────────────────────────────────────────── */

function Roadmap({ copy }: { copy: OpenSenCopy["next"] }) {
	return (
		<div>
			<ol className="relative m-0 grid list-none grid-cols-2 gap-6 p-0 sm:grid-cols-4">
				<span
					aria-hidden="true"
					className="absolute left-2 right-2 top-[1.85rem] hidden h-px bg-[var(--line-strong)] sm:block"
				/>
				{copy.roadmap.map((item, i) => (
					<li key={item.label} className="relative">
						<p className="m-0 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
							{item.stage}
						</p>
						<span
							aria-hidden="true"
							className={`relative mt-2 block h-3 w-3 rounded-full border-2 border-[var(--accent)] ${
								i === 0 ? "bg-[var(--accent)]" : "bg-[var(--bg-base)]"
							}`}
						/>
						<p className="m-0 mt-2 text-sm text-[var(--sea-ink)]">
							{item.label}
						</p>
					</li>
				))}
			</ol>
			<div
				className="chunk-tone mt-8 rounded-r-2xl border-y-0 border-r-0 border-l-[3px] px-5 py-4"
				data-tone="slot"
			>
				<p className="m-0 flex items-center gap-1.5 text-sm font-bold">
					<AudioLines size={14} aria-hidden="true" />
					{copy.question.label}
				</p>
				<p className="m-0 mt-1 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
					{copy.question.body}
				</p>
			</div>
		</div>
	);
}
