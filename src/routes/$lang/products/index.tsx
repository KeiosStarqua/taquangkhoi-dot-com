import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Bot,
	Code,
	Cog,
	FileText,
	FlaskConical,
	Github,
	Globe,
	Headphones,
	type LucideIcon,
	MessagesSquare,
	NotebookPen,
	Package,
	ScanLine,
	Search,
	Server,
	Sprout,
	Star,
	Stethoscope,
	Youtube,
} from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ProjectVisual, {
	type ProjectVisualKind,
} from "#/components/ProjectVisual";
import { type Product, products } from "#/data/products";
import {
	type EngineeringProject,
	engineeringProjects,
	formatStars,
	isProjectCategory,
	matchesQuery,
	type OpenSourceProject,
	openSourceProjects,
	PROJECT_CATEGORIES,
	type ProjectCategory,
} from "#/data/projects";
import { type HighlightedWork, highlightedWork } from "#/data/research";
import en from "#/i18n/locales/en.json";
import vi from "#/i18n/locales/vi.json";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

interface ProjectsSearch {
	category?: ProjectCategory;
	q?: string;
}

export const Route = createFileRoute("/$lang/products/")({
	validateSearch: (search: Record<string, unknown>): ProjectsSearch => ({
		category: isProjectCategory(search.category) ? search.category : undefined,
		q: typeof search.q === "string" && search.q.trim() ? search.q : undefined,
	}),
	head: ({ params }) => {
		const meta = (params.lang === "vi" ? vi : en).meta.projects;
		const url = `${CANONICAL_ORIGIN}/${params.lang}/products`;
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
	component: ProjectsPage,
});

const categoryIcons: Record<ProjectCategory, LucideIcon> = {
	products: Package,
	engineering: Cog,
	"open-source": Code,
	research: FlaskConical,
};

/** Title tile icon and tint per featured card. */
const cardMarks: Record<ProjectVisualKind, { icon: LucideIcon; tint: string }> =
	{
		opensen: {
			icon: MessagesSquare,
			tint: "bg-fuchsia-500/15 text-fuchsia-400",
		},
		"yt-hunter": { icon: Youtube, tint: "bg-red-500/15 text-red-500" },
		"open-farm": { icon: Sprout, tint: "bg-emerald-500/15 text-emerald-500" },
		"pid-digitizer": {
			icon: ScanLine,
			tint: "bg-sky-500/15 text-sky-400",
		},
		"agent-workstation": {
			icon: Bot,
			tint: "bg-[var(--link-bg-hover)] text-[var(--accent)]",
		},
		"home-lab": {
			icon: Server,
			tint: "bg-[var(--link-bg-hover)] text-[var(--sea-ink-soft)]",
		},
	};

const openSourceIcons: Record<OpenSourceProject["id"], LucideIcon> = {
	"web-scrobbler": Headphones,
	"napkin-collect-android": NotebookPen,
	"vina-doctor": Stethoscope,
};

function ProjectsPage() {
	const { t } = useTranslation();
	const { category, q = "" } = Route.useSearch();

	const productItems = products.filter((p) =>
		matchesQuery(
			[t(`products.${p.id}.name`), t(`products.${p.id}.tagline`), ...p.tags],
			q,
		),
	);
	const engineeringItems = engineeringProjects.filter((p) =>
		matchesQuery(
			[
				t(`projects.engineering.${p.id}.name`),
				t(`projects.engineering.${p.id}.desc`),
				...p.tags,
			],
			q,
		),
	);
	const openSourceItems = openSourceProjects.filter((p) =>
		matchesQuery([p.name, t(`projects.openSource.${p.id}`)], q),
	);
	const researchItems = highlightedWork.filter((w) =>
		matchesQuery(
			[
				t(`research.work.entries.${w.id}.title`),
				t(`research.work.entries.${w.id}.desc`),
				...w.tags,
			],
			q,
		),
	);

	const counts: Record<ProjectCategory, number> = {
		products: productItems.length,
		engineering: engineeringItems.length,
		"open-source": openSourceItems.length,
		research: researchItems.length,
	};
	const visible = PROJECT_CATEGORIES.filter(
		(c) => (!category || category === c) && counts[c] > 0,
	);

	return (
		<main className="page-wrap px-4 pt-10 pb-16 xl:pt-14">
			<Hero />
			<Toolbar category={category} query={q} />

			<div className="mt-10 space-y-12">
				{visible.includes("products") ? (
					<Section category="products" showViewAll={!category}>
						<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
							{productItems.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>
					</Section>
				) : null}

				{visible.includes("engineering") ? (
					<Section category="engineering" showViewAll={!category}>
						<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
							{engineeringItems.map((project) => (
								<EngineeringCard key={project.id} project={project} />
							))}
						</div>
					</Section>
				) : null}

				{visible.includes("open-source") ? (
					<Section category="open-source" showViewAll={!category} compact>
						<ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
							{openSourceItems.map((project) => (
								<OpenSourceRow key={project.id} project={project} />
							))}
						</ul>
					</Section>
				) : null}

				{visible.includes("research") ? (
					<Section category="research" showViewAll compact>
						<ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
							{researchItems.map((work) => (
								<ResearchRow key={work.id} work={work} />
							))}
						</ul>
					</Section>
				) : null}

				{visible.length === 0 ? <EmptyState query={q} /> : null}
			</div>
		</main>
	);
}

function Hero() {
	const { t } = useTranslation();

	return (
		<section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)]">
			<div className="rise-in max-w-2xl">
				<p className="island-kicker mb-4">
					<span className="kicker-mark">/</span>
					{t("projects.kicker")}
				</p>
				<h1 className="display-name mb-5">
					{t("projects.titleLead")}{" "}
					<span className="name-accent">{t("projects.titleAccent")}</span>
				</h1>
				<p className="m-0 max-w-xl text-base leading-7 text-[var(--sea-ink-soft)]">
					{t("projects.lede")}
				</p>
			</div>

			<aside className="island-shell rise-in p-6">
				<p className="m-0 mb-5 flex flex-wrap items-center gap-x-2 font-mono text-[0.68rem] tracking-[0.14em] text-[var(--ink-faint)] uppercase">
					<span
						className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
						aria-hidden="true"
					/>
					{t("projects.motto.build")}
					<span aria-hidden="true">·</span>
					{t("projects.motto.explore")}
					<span aria-hidden="true">·</span>
					{t("projects.motto.openSource")}
				</p>
				<blockquote className="display-title m-0 border-l-2 border-[var(--accent)] pl-5 text-xl leading-snug text-[var(--sea-ink)]">
					{t("projects.motto.quote")}
				</blockquote>
				<p className="m-0 mt-4 text-right font-mono text-xs text-[var(--ink-faint)]">
					{t("projects.motto.sign")}
				</p>
			</aside>
		</section>
	);
}

function Toolbar({
	category,
	query,
}: {
	category?: ProjectCategory;
	query: string;
}) {
	const { t } = useTranslation();
	const navigate = useNavigate({ from: Route.fullPath });

	const pill =
		"inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold no-underline transition";
	const idle =
		"border-[var(--line)] text-[var(--sea-ink)] hover:border-[var(--line-strong)] hover:text-[var(--accent)]";
	const active =
		"border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]";

	return (
		<div className="island-shell mt-10 flex flex-wrap items-center gap-3 p-3">
			<nav
				aria-label={t("projects.filters.label")}
				className="flex flex-wrap gap-2"
			>
				<Link
					from={Route.fullPath}
					search={(prev) => ({ ...prev, category: undefined })}
					className={`${pill} ${category ? idle : active}`}
					aria-current={category ? undefined : "page"}
					resetScroll={false}
				>
					{t("projects.filters.all")}
				</Link>
				{PROJECT_CATEGORIES.map((c) => {
					const Icon = categoryIcons[c];
					const isActive = category === c;
					return (
						<Link
							key={c}
							from={Route.fullPath}
							search={(prev) => ({ ...prev, category: c })}
							className={`${pill} ${isActive ? active : idle}`}
							aria-current={isActive ? "page" : undefined}
							resetScroll={false}
						>
							<Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
							{t(`projects.filters.${c}`)}
						</Link>
					);
				})}
			</nav>

			<label className="relative ml-auto w-full sm:w-64">
				<span className="sr-only">{t("projects.search.label")}</span>
				<Search
					className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--sea-ink-soft)]"
					aria-hidden="true"
				/>
				<input
					type="search"
					value={query}
					placeholder={t("projects.search.placeholder")}
					onChange={(event) =>
						navigate({
							search: (prev) => ({
								...prev,
								q: event.target.value || undefined,
							}),
							replace: true,
							resetScroll: false,
						})
					}
					className="w-full rounded-xl border border-[var(--line)] bg-transparent py-2 pr-3 pl-9 text-sm text-[var(--sea-ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] focus:outline-none"
				/>
			</label>
		</div>
	);
}

function Section({
	category,
	showViewAll,
	compact = false,
	children,
}: {
	category: ProjectCategory;
	showViewAll: boolean;
	compact?: boolean;
	children: ReactNode;
}) {
	const { t } = useTranslation();
	const { lang } = Route.useParams();
	const Icon = categoryIcons[category];
	const headingId = `projects-${category}`;
	const viewAllClass =
		"inline-flex items-center gap-1 font-mono text-xs tracking-wide text-[var(--accent)] no-underline";

	return (
		<section aria-labelledby={headingId}>
			<div className="mb-5 flex flex-wrap items-end justify-between gap-3">
				<div
					className={`flex gap-3 ${compact ? "items-center" : "items-start"}`}
				>
					<Icon
						className="mt-0.5 h-5 w-5 shrink-0 text-[var(--sea-ink)]"
						strokeWidth={1.7}
						aria-hidden="true"
					/>
					<div
						className={
							compact ? "flex flex-wrap items-baseline gap-x-4 gap-y-1" : ""
						}
					>
						<h2
							id={headingId}
							className="m-0 font-mono text-sm font-bold tracking-[0.1em] text-[var(--sea-ink)] uppercase"
						>
							<span className="kicker-mark mr-2">/</span>
							{t(`projects.sections.${category}.title`)}
						</h2>
						<p
							className={`m-0 text-sm text-[var(--sea-ink-soft)] ${compact ? "text-xs" : "mt-1"}`}
						>
							{t(`projects.sections.${category}.lede`)}
						</p>
					</div>
				</div>
				{showViewAll ? (
					category === "research" ? (
						<Link
							to="/$lang/research"
							params={{ lang }}
							className={viewAllClass}
						>
							{t(`projects.sections.${category}.viewAll`)}
							<ArrowRight className="h-3 w-3" aria-hidden="true" />
						</Link>
					) : (
						<Link
							from={Route.fullPath}
							search={(prev) => ({ ...prev, category })}
							resetScroll={false}
							className={viewAllClass}
						>
							{t(`projects.sections.${category}.viewAll`)}
							<ArrowRight className="h-3 w-3" aria-hidden="true" />
						</Link>
					)
				) : null}
			</div>
			{children}
		</section>
	);
}

/** Shared shell for the six featured cards: text on the left, art on the right. */
function FeatureCard({
	visual,
	title,
	desc,
	tags,
	footer,
}: {
	visual: ProjectVisualKind;
	title: ReactNode;
	desc: string;
	tags: readonly string[];
	footer: ReactNode;
}) {
	const { icon: Icon, tint } = cardMarks[visual];
	return (
		<article className="island-shell feature-card rise-in flex min-h-56 overflow-hidden">
			<div className="flex min-w-0 flex-1 flex-col p-5">
				<div className="mb-3 flex items-center gap-3">
					<span
						className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tint}`}
						aria-hidden="true"
					>
						<Icon className="h-5 w-5" strokeWidth={1.8} />
					</span>
					<h3 className="m-0 min-w-0 text-lg font-bold text-[var(--sea-ink)]">
						{title}
					</h3>
				</div>
				<p className="m-0 mb-4 text-sm leading-6 text-[var(--sea-ink-soft)]">
					{desc}
				</p>
				<ul className="m-0 mb-4 flex list-none flex-wrap gap-1.5 p-0">
					{tags.slice(0, 4).map((tag) => (
						<li key={tag} className="chip">
							{tag}
						</li>
					))}
				</ul>
				<div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--sea-ink-soft)]">
					{footer}
				</div>
			</div>
			<ProjectVisual kind={visual} />
		</article>
	);
}

function FooterLink({
	href,
	icon: Icon,
	children,
}: {
	href: string;
	icon: LucideIcon;
	children: ReactNode;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="inline-flex items-center gap-1.5 text-[var(--sea-ink-soft)] no-underline hover:text-[var(--accent)]"
		>
			<Icon className="h-3.5 w-3.5" aria-hidden="true" />
			{children}
		</a>
	);
}

function StatusDot({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex items-center gap-1.5">
			<span
				className="h-2 w-2 rounded-full bg-[var(--code-green)]"
				aria-hidden="true"
			/>
			{children}
		</span>
	);
}

function ProductCard({ product }: { product: Product }) {
	const { t } = useTranslation();
	const { lang } = Route.useParams();
	const id = product.id as ProjectVisualKind;

	return (
		<FeatureCard
			visual={id}
			title={
				<Link
					to="/$lang/products/$productId"
					params={{ lang, productId: product.id }}
					className="inline-flex items-center gap-1.5 text-inherit no-underline hover:text-[var(--accent)]"
				>
					{t(`products.${product.id}.name`)}
					<ArrowUpRight
						className="h-4 w-4 text-[var(--sea-ink-soft)]"
						aria-hidden="true"
					/>
				</Link>
			}
			desc={t(`products.${product.id}.tagline`)}
			tags={product.tags}
			footer={
				<>
					{product.demo ? (
						<FooterLink href={product.demo} icon={Globe}>
							{t("projects.links.demo")}
						</FooterLink>
					) : (
						<StatusDot>{t(`products.status.${product.status}`)}</StatusDot>
					)}
					<Link
						to="/$lang/products/$productId"
						params={{ lang, productId: product.id }}
						className="inline-flex items-center gap-1.5 text-[var(--sea-ink-soft)] no-underline hover:text-[var(--accent)]"
					>
						<FileText className="h-3.5 w-3.5" aria-hidden="true" />
						{t("projects.links.details")}
					</Link>
				</>
			}
		/>
	);
}

function EngineeringCard({ project }: { project: EngineeringProject }) {
	const { t } = useTranslation();

	return (
		<FeatureCard
			visual={project.id}
			title={t(`projects.engineering.${project.id}.name`)}
			desc={t(`projects.engineering.${project.id}.desc`)}
			tags={project.tags}
			footer={
				<>
					<StatusDot>{t(`projects.status.${project.status}`)}</StatusDot>
					{project.repo ? (
						<FooterLink href={project.repo} icon={Github}>
							{t("projects.links.github")}
						</FooterLink>
					) : null}
					{project.docs ? (
						<FooterLink href={project.docs} icon={FileText}>
							{t("projects.links.docs")}
						</FooterLink>
					) : null}
				</>
			}
		/>
	);
}

const rowClass =
	"island-shell feature-card flex h-full items-center gap-4 px-5 py-4 no-underline";

/** Icon, title, and blurb for a compact row; `aside` sits on the right. */
function RowBody({
	icon: Icon,
	title,
	desc,
	aside,
}: {
	icon: LucideIcon;
	title: string;
	desc: string;
	aside: ReactNode;
}) {
	return (
		<>
			<Icon
				className="h-7 w-7 shrink-0 text-[var(--sea-ink)]"
				strokeWidth={1.5}
				aria-hidden="true"
			/>
			<span className="min-w-0 flex-1">
				<span className="block text-sm font-semibold text-[var(--sea-ink)]">
					{title}
				</span>
				<span className="mt-0.5 block text-xs leading-5 text-[var(--sea-ink-soft)]">
					{desc}
				</span>
			</span>
			<span className="flex shrink-0 items-center gap-3 text-xs text-[var(--sea-ink-soft)]">
				{aside}
			</span>
		</>
	);
}

function OpenSourceRow({ project }: { project: OpenSourceProject }) {
	const { t } = useTranslation();
	const starsLabel =
		project.stars === undefined
			? ""
			: t("projects.stars", { count: project.stars });

	return (
		<li>
			<a
				href={project.href}
				target="_blank"
				rel="noreferrer"
				className={rowClass}
			>
				<RowBody
					icon={openSourceIcons[project.id]}
					title={project.name}
					desc={t(`projects.openSource.${project.id}`)}
					aside={
						<>
							{project.stars !== undefined ? (
								<span
									className="inline-flex items-center gap-1"
									title={starsLabel}
								>
									<Star className="h-3.5 w-3.5" aria-hidden="true" />
									<span aria-hidden="true">{formatStars(project.stars)}</span>
									<span className="sr-only">{starsLabel}</span>
								</span>
							) : null}
							<Github
								className="h-4 w-4 text-[var(--sea-ink)]"
								aria-hidden="true"
							/>
						</>
					}
				/>
			</a>
		</li>
	);
}

function ResearchRow({ work }: { work: HighlightedWork }) {
	const { t } = useTranslation();
	const { lang } = Route.useParams();

	return (
		<li>
			<Link
				to="/$lang/research"
				params={{ lang }}
				hash={`work-${work.id}`}
				className={rowClass}
			>
				<RowBody
					icon={FlaskConical}
					title={t(`research.work.entries.${work.id}.title`)}
					desc={t(`research.work.entries.${work.id}.desc`)}
					aside={
						<span className="font-mono text-[var(--ink-faint)]">
							{work.year}
						</span>
					}
				/>
			</Link>
		</li>
	);
}

function EmptyState({ query }: { query: string }) {
	const { t } = useTranslation();

	return (
		<div className="island-shell p-8 text-center">
			<p className="m-0 mb-4 text-sm text-[var(--sea-ink-soft)]">
				{t("projects.search.empty", { query })}
			</p>
			<Link from={Route.fullPath} search={{}} className="btn-ghost">
				{t("projects.search.reset")}
			</Link>
		</div>
	);
}
