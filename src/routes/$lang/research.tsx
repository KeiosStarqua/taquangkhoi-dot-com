import { createFileRoute } from "@tanstack/react-router";
import * as lorenz from "ascii.rest/pieces/lorenz";
import {
	ArrowUpRight,
	Atom,
	Brain,
	Database,
	FileText,
	Github,
	type LucideIcon,
	Workflow,
} from "lucide-react";
import type { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import AsciiArt from "#/components/AsciiArt";
import ResearchCode from "#/components/ResearchCode";
import {
	type HighlightedWork,
	highlightedWork,
	NOTES_URL,
	OPEN_SOURCE_URL,
	playground,
	type ResearchAreaId,
	readingList,
	researchAreas,
	researchNotes,
	type WorkIllustration,
} from "#/data/research";
import en from "#/i18n/locales/en.json";
import vi from "#/i18n/locales/vi.json";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";
const AREAS_ID = "areas";

const areaIcons: Record<ResearchAreaId, LucideIcon> = {
	"ai-agents": Brain,
	"engineering-intelligence": Workflow,
	"quantum-computing": Atom,
	"llm-systems": Database,
};

const areaAnchor = (id: ResearchAreaId) => `area-${id}`;
const workAnchor = (id: HighlightedWork["id"]) => `work-${id}`;

export const Route = createFileRoute("/$lang/research")({
	head: ({ params }) => {
		const meta = (params.lang === "vi" ? vi : en).meta.research;
		const url = `${CANONICAL_ORIGIN}/${params.lang}/research`;
		return {
			meta: [
				{ title: meta.title },
				{ name: "description", content: meta.description },
				{ property: "og:title", content: meta.title },
				{ property: "og:description", content: meta.description },
				{ property: "og:url", content: url },
			],
			links: [{ rel: "canonical", href: url }],
		};
	},
	component: Research,
});

function Research() {
	return (
		<main className="pb-12">
			<Hero />
			<Areas />
			<Work />
			<section className="page-wrap mt-12 grid gap-8 px-4 lg:grid-cols-2">
				<Notes />
				<Reading />
			</section>
			<Playground />
		</main>
	);
}

function Hero() {
	const { t } = useTranslation();

	return (
		<section className="hero-grid page-wrap px-4 pt-10 pb-12 xl:pt-14">
			<div className="rise-in max-w-xl">
				<p className="island-kicker mb-5">
					<span className="kicker-mark">/</span>
					{t("research.kicker")}
				</p>
				<h1 className="display-name mb-5">
					{t("research.title")}
					<span className="name-caret" aria-hidden="true" />
				</h1>
				<p className="mb-4 max-w-lg text-lg leading-snug text-[var(--sea-ink)] sm:text-xl">
					<Trans
						i18nKey="research.tagline"
						components={[
							<span key="accent" className="text-[var(--accent)]" />,
						]}
					/>
				</p>
				<p className="mb-7 max-w-lg text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base">
					{t("research.lede")}
				</p>
				<div className="flex flex-wrap gap-3">
					<a
						href={NOTES_URL}
						target="_blank"
						rel="noreferrer"
						className="btn-primary"
					>
						{t("research.cta.notes")}
						<span aria-hidden="true">→</span>
					</a>
					<a
						href={OPEN_SOURCE_URL}
						target="_blank"
						rel="noreferrer"
						className="btn-ghost"
					>
						{t("research.cta.openSource")}
					</a>
				</div>
			</div>

			<ResearchCode targetId={AREAS_ID} />

			<div className="flex items-stretch gap-4 xl:max-w-[280px]">
				<ol className="rail m-0 min-w-0 flex-1 list-none p-0">
					{researchAreas.map((area, index) => {
						const Icon = areaIcons[area.id];
						return (
							<li key={area.id}>
								<a
									href={`#${areaAnchor(area.id)}`}
									className="rail-card feature-card no-underline"
								>
									<span className="rail-index">
										{String(index + 1).padStart(2, "0")}
									</span>
									<span className="rail-icon" aria-hidden="true">
										<Icon className="h-4 w-4" strokeWidth={1.7} />
									</span>
									<span className="rail-title row-span-2">
										{t(`research.areas.entries.${area.id}.title`)}
									</span>
								</a>
							</li>
						);
					})}
				</ol>
				<p className="pull-quote hidden shrink-0 xl:block">
					{t("research.quote")}
				</p>
			</div>
			<p className="pull-quote xl:hidden">{t("research.quote")}</p>
		</section>
	);
}

function SectionHeader({
	kicker,
	title,
	lede,
	action,
}: {
	kicker: string;
	title: string;
	lede: string;
	action?: ReactNode;
}) {
	return (
		<div className="mb-6 flex flex-wrap items-end justify-between gap-4">
			<div>
				<p className="island-kicker mb-2">
					<span className="kicker-mark">/</span>
					{kicker}
				</p>
				<h2 className="display-title m-0 text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl">
					{title}
				</h2>
				<p className="m-0 mt-2 text-sm text-[var(--sea-ink-soft)] sm:text-base">
					{lede}
				</p>
			</div>
			{action}
		</div>
	);
}

function MonoLink({ href, children }: { href: string; children: ReactNode }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="font-mono text-xs tracking-wide text-[var(--accent)] no-underline"
		>
			{children} →
		</a>
	);
}

function Areas() {
	const { t } = useTranslation();

	return (
		<section
			id={AREAS_ID}
			className="scroll-mt-20 border-t border-[var(--line)] pt-12"
		>
			<div className="page-wrap px-4">
				<SectionHeader
					kicker={t("research.areas.kicker")}
					title={t("research.areas.title")}
					lede={t("research.areas.lede")}
				/>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{researchAreas.map((area, index) => {
						const Icon = areaIcons[area.id];
						const work = highlightedWork.find((w) => w.area === area.id);
						const href = work ? `#${workAnchor(work.id)}` : "#notes";
						return (
							<article
								key={area.id}
								id={areaAnchor(area.id)}
								className="island-shell feature-card rise-in flex scroll-mt-20 flex-col p-5"
								style={{ animationDelay: `${index * 80}ms` }}
							>
								<span
									className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--link-bg-hover)] text-[var(--accent)]"
									aria-hidden="true"
								>
									<Icon className="h-6 w-6" strokeWidth={1.6} />
								</span>
								<h3 className="display-title m-0 mb-3 text-xl font-bold text-[var(--sea-ink)]">
									{t(`research.areas.entries.${area.id}.title`)}
								</h3>
								<p className="m-0 mb-5 text-sm leading-6 text-[var(--sea-ink-soft)]">
									{t(`research.areas.entries.${area.id}.desc`)}
								</p>
								<ul className="m-0 mt-auto mb-5 flex list-none flex-wrap gap-1.5 p-0">
									{area.tags.map((tag) => (
										<li key={tag} className="chip">
											{tag}
										</li>
									))}
								</ul>
								<a
									href={href}
									className="text-sm font-semibold text-[var(--accent)] no-underline"
								>
									{t("research.areas.view")} →
								</a>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function Work() {
	const { t } = useTranslation();

	return (
		<section className="mt-12 border-t border-[var(--line)] pt-12">
			<div className="page-wrap px-4">
				<SectionHeader
					kicker={t("research.work.kicker")}
					title={t("research.work.title")}
					lede={t("research.work.lede")}
				/>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{highlightedWork.map((work, index) => (
						<article
							key={work.id}
							id={workAnchor(work.id)}
							className="island-shell feature-card project-card flex scroll-mt-20 flex-col p-5"
						>
							<p className="project-kicker m-0 mb-4">
								{String(index + 1).padStart(2, "0")} /{" "}
								{t(`research.areas.entries.${work.area}.title`)}
							</p>
							<div className="mb-4 flex gap-4">
								<div className="min-w-0 flex-1">
									<h3 className="display-title m-0 mb-2 text-xl font-bold text-[var(--sea-ink)]">
										{t(`research.work.entries.${work.id}.title`)}
									</h3>
									<p className="m-0 text-sm leading-6 text-[var(--sea-ink-soft)]">
										{t(`research.work.entries.${work.id}.desc`)}
									</p>
								</div>
								<Illustration kind={work.illustration} />
							</div>
							<ul className="m-0 mt-auto mb-4 flex list-none flex-wrap gap-1.5 p-0">
								{work.tags.map((tag) => (
									<li key={tag} className="chip">
										{tag}
									</li>
								))}
							</ul>
							<div className="flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs text-[var(--sea-ink-soft)]">
								<span className="flex items-center gap-2">
									<Github className="h-4 w-4" aria-hidden="true" />
									{t(`research.work.entries.${work.id}.status`)}
								</span>
								<span className="font-mono">{work.year}</span>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

function Notes() {
	const { t } = useTranslation();
	const { lang } = Route.useParams();
	const format = new Intl.DateTimeFormat(lang, {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	});

	return (
		<div id="notes" className="scroll-mt-20">
			<SectionHeader
				kicker={t("research.notes.kicker")}
				title={t("research.notes.title")}
				lede={t("research.notes.lede")}
				action={
					<MonoLink href={NOTES_URL}>{t("research.notes.viewAll")}</MonoLink>
				}
			/>
			<ul className="island-shell m-0 list-none divide-y divide-[var(--line)] p-0">
				{researchNotes.map((note) => {
					const [year, month] = note.month.split("-").map(Number);
					return (
						<li key={note.id} className="flex items-start gap-4 px-5 py-4">
							<ListIcon />
							<div className="min-w-0 flex-1">
								<p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
									{t(`research.notes.entries.${note.id}.title`)}
								</p>
								<p className="m-0 mt-1 text-xs text-[var(--sea-ink-soft)]">
									{t(`research.notes.entries.${note.id}.desc`)}
								</p>
							</div>
							<time
								dateTime={note.month}
								className="shrink-0 font-mono text-xs text-[var(--ink-faint)]"
							>
								{format.format(new Date(Date.UTC(year, month - 1)))}
							</time>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function Reading() {
	const { t } = useTranslation();

	return (
		<div>
			<SectionHeader
				kicker={t("research.reading.kicker")}
				title={t("research.reading.title")}
				lede={t("research.reading.lede")}
			/>
			<ul className="island-shell m-0 list-none divide-y divide-[var(--line)] p-0">
				{readingList.map((item) => (
					<li key={item.title} className="flex items-center gap-4 px-5 py-3.5">
						<ListIcon />
						<div className="min-w-0 flex-1">
							{item.href ? (
								<a
									href={item.href}
									target="_blank"
									rel="noreferrer"
									className="text-sm font-semibold text-[var(--sea-ink)] no-underline hover:text-[var(--accent)]"
								>
									{item.title}
								</a>
							) : (
								<p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
									{item.title}
								</p>
							)}
							<p className="m-0 mt-0.5 text-xs text-[var(--sea-ink-soft)]">
								{item.authors} · {item.year}
							</p>
						</div>
						<span className="chip shrink-0">
							{t(`research.reading.kinds.${item.kind}`)}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function Playground() {
	const { t } = useTranslation();

	return (
		<section className="page-wrap mt-12 px-4">
			<SectionHeader
				kicker={t("research.playground.kicker")}
				title={t("research.playground.title")}
				lede={t("research.playground.lede")}
			/>
			<div className="grid gap-4 md:grid-cols-3">
				{playground.map((item) => {
					const body = (
						<>
							<div className="flex items-start justify-between gap-3">
								<h3 className="m-0 text-base font-semibold text-[var(--sea-ink)]">
									{t(`research.playground.entries.${item.id}.title`)}
								</h3>
								{item.href ? (
									<ArrowUpRight
										className="h-4 w-4 shrink-0 text-[var(--accent)]"
										aria-hidden="true"
									/>
								) : null}
							</div>
							<p className="m-0 mt-1 text-sm leading-6 text-[var(--sea-ink-soft)]">
								{t(`research.playground.entries.${item.id}.desc`)}
							</p>
						</>
					);
					return item.href ? (
						<a
							key={item.id}
							href={item.href}
							className="island-shell feature-card block p-5 no-underline"
						>
							{body}
						</a>
					) : (
						<article key={item.id} className="island-shell p-5">
							{body}
						</article>
					);
				})}
			</div>
			<figure className="island-shell m-0 mt-4 p-5">
				<AsciiArt
					piece={lorenz}
					maxFontPx={11}
					className="mx-auto max-w-2xl text-[var(--accent)]"
				/>
				<figcaption className="mt-3 text-right font-mono text-xs tracking-[0.14em] text-[var(--ink-faint)]">
					{"// lorenz attractor · σ=10 ρ=28 β=8/3"}
				</figcaption>
			</figure>
		</section>
	);
}

function ListIcon() {
	return (
		<span
			className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--sea-ink-soft)]"
			aria-hidden="true"
		>
			<FileText className="h-4 w-4" strokeWidth={1.7} />
		</span>
	);
}

/** Small line-art thumbnail for a highlighted work card. Decorative. */
function Illustration({ kind }: { kind: WorkIllustration }) {
	return (
		<svg
			viewBox="0 0 96 96"
			className="hidden h-24 w-24 shrink-0 text-[var(--ink-faint)] sm:block"
			fill="none"
			stroke="currentColor"
			strokeWidth="1"
			aria-hidden="true"
		>
			{kind === "pid" ? (
				<>
					<path d="M6 20h40v24h30M46 44v30H20M76 44v36" />
					<circle cx="46" cy="20" r="5" />
					<path d="M60 38l6 6-6 6M28 70l-6 4 6 4" />
					<rect x="68" y="12" width="18" height="14" rx="2" />
					<circle cx="20" cy="74" r="6" />
					<path
						d="M8 88h80M10 8h30"
						strokeDasharray="2 3"
						className="text-[var(--line-strong)]"
					/>
				</>
			) : null}
			{kind === "agents" ? (
				<>
					<rect x="36" y="6" width="24" height="12" rx="3" />
					<rect x="6" y="40" width="22" height="14" rx="3" />
					<rect x="68" y="40" width="22" height="14" rx="3" />
					<rect x="36" y="76" width="24" height="12" rx="3" />
					<circle cx="48" cy="47" r="7" className="text-[var(--accent)]" />
					<path d="M48 18v22M28 47h13M55 47h13M48 54v22" />
				</>
			) : null}
			{kind === "circuit" ? (
				<>
					{[16, 32, 48, 64, 80].map((y) => (
						<path key={y} d={`M6 ${y}h84`} />
					))}
					<rect x="18" y="10" width="12" height="12" />
					<rect x="18" y="58" width="12" height="12" />
					<circle cx="48" cy="32" r="3" className="text-[var(--accent)]" />
					<path d="M48 32v16" />
					<circle cx="48" cy="48" r="5" />
					<path d="M44 48h8M48 44v8" />
					<rect x="64" y="74" width="12" height="12" />
					<circle cx="70" cy="16" r="3" className="text-[var(--accent)]" />
					<path d="M70 16v48" />
					<circle cx="70" cy="64" r="5" />
				</>
			) : null}
		</svg>
	);
}
