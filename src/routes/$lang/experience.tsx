import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowUpRight,
	BookOpen,
	CalendarDays,
	Code,
	GraduationCap,
	MapPin,
	Quote,
} from "lucide-react";
import type { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import TrueTechLogo from "#/components/TrueTechLogo";
import {
	coreSkills,
	type ExperienceLogo,
	type ExperienceRecord,
	experiences,
	type HighlightLink,
} from "#/data/experience";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

/** Shape of `experience.entries.<id>` in the locale catalogs. */
interface ExperienceCopy {
	role: string;
	org: string;
	location: string;
	period: string;
	desc: string;
	tags: string[];
	highlightsLabel: string;
	highlights: string[];
}

export const Route = createFileRoute("/$lang/experience")({
	head: ({ params }) => {
		const titles: Record<string, string> = {
			en: "Experience — Tạ Quang Khôi",
			vi: "Kinh nghiệm — Tạ Quang Khôi",
		};
		const descs: Record<string, string> = {
			en: "Career timeline of Tạ Quang Khôi — Co-Founder at OpenFarm, Software Engineer at True Technology Co., Ltd., and graduate of Ba Ria - Vung Tau University.",
			vi: "Lộ trình sự nghiệp của Tạ Quang Khôi — Đồng sáng lập tại OpenFarm, Kỹ sư phần mềm tại True Technology Co., Ltd., và tốt nghiệp Đại học Bà Rịa - Vũng Tàu.",
		};

		const lang = params.lang;
		const title = titles[lang] ?? titles.en;
		const description = descs[lang] ?? descs.en;
		const url = `${CANONICAL_ORIGIN}/${lang}/experience`;

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:url", content: url },
			],
			links: [{ rel: "canonical", href: url }],
		};
	},
	component: Experience,
});

function Experience() {
	const { t } = useTranslation();

	return (
		<main className="page-wrap px-4 py-12">
			<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
				<section>
					<p className="island-kicker mb-3">
						<span className="kicker-mark">/</span>
						{t("experience.kicker")}
					</p>
					<h1 className="display-title mb-4 text-5xl font-bold text-[var(--sea-ink)] sm:text-6xl">
						{t("experience.title")}
					</h1>
					<p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
						<Trans
							i18nKey="experience.subtitle"
							components={[
								<strong key="em" className="text-[var(--sea-ink)]">
									research
								</strong>,
							]}
						/>
						<br />
						{t("experience.subtitle2")}
					</p>
				</section>

				<QuoteCard />

				<Timeline />

				<aside className="space-y-6">
					<CareerSummary />
					<CoreSkills />
				</aside>
			</div>
		</main>
	);
}

function QuoteCard() {
	const { t } = useTranslation();
	return (
		<figure className="island-shell m-0 flex gap-4 self-start p-6">
			<span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--link-bg-hover)] text-[var(--accent)]">
				<Quote className="h-4 w-4" aria-hidden="true" />
			</span>
			<div>
				<blockquote className="m-0 text-[0.95rem] leading-7 text-[var(--sea-ink)]">
					{t("experience.quote")}
				</blockquote>
				<figcaption className="mt-3 text-right font-mono text-xs tracking-[0.14em] text-[var(--ink-faint)] uppercase">
					— {t("experience.quoteAuthor")}
				</figcaption>
			</div>
		</figure>
	);
}

function Timeline() {
	const { t } = useTranslation();

	return (
		<ol className="m-0 list-none space-y-5 pl-0">
			{experiences.map((record, index) => {
				const copy = t(`experience.entries.${record.id}`, {
					returnObjects: true,
				}) as ExperienceCopy;
				const years = `${record.startYear} - ${record.endYear ?? t("experience.present")}`;
				const isLast = index === experiences.length - 1;

				return (
					<li
						key={record.id}
						className="grid grid-cols-1 gap-3 md:grid-cols-[92px_24px_minmax(0,1fr)] md:gap-0"
					>
						<div className="pt-6 font-mono text-xs text-[var(--sea-ink)] md:text-right">
							<p className="m-0">{years}</p>
							<p className="m-0 mt-2 hidden text-[var(--ink-faint)] md:block">
								{String(index + 1).padStart(2, "0")}
							</p>
						</div>

						<div className="relative hidden md:block" aria-hidden="true">
							<span
								className={`absolute left-1/2 w-px -translate-x-1/2 bg-[var(--line-strong)] ${
									index === 0 ? "top-7" : "-top-5"
								} ${isLast ? "h-12" : "bottom-0"}`}
							/>
							<span className="absolute top-7 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--glow)]" />
						</div>

						<ExperienceCard record={record} copy={copy} />
					</li>
				);
			})}
		</ol>
	);
}

function ExperienceCard({
	record,
	copy,
}: {
	record: ExperienceRecord;
	copy: ExperienceCopy;
}) {
	return (
		<article className="island-shell grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_260px]">
			<div className="flex flex-col gap-4 sm:flex-row">
				<LogoTile logo={record.logo} name={copy.org} />
				<div className="min-w-0">
					<p className="m-0 font-mono text-xs font-medium tracking-[0.14em] text-[var(--kicker)] uppercase">
						{copy.role}
					</p>
					<h2 className="display-title m-0 mt-1 text-2xl font-bold text-[var(--sea-ink)]">
						{copy.org}
					</h2>
					<p className="m-0 mt-1 text-sm text-[var(--ink-faint)]">
						{copy.location}
					</p>
					<p className="m-0 mt-0.5 font-mono text-xs text-[var(--ink-faint)]">
						{copy.period}
					</p>
					<p className="m-0 mt-4 text-sm leading-6 text-[var(--sea-ink-soft)]">
						{copy.desc}
					</p>
					<ul className="m-0 mt-4 flex list-none flex-wrap gap-2 pl-0">
						{copy.tags.map((tag) => (
							<li
								key={tag}
								className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1 text-xs text-[var(--kicker)]"
							>
								{tag}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="rounded-xl bg-[var(--link-bg-hover)] p-4">
				<p className="m-0 mb-2 font-mono text-[0.68rem] tracking-[0.14em] text-[var(--ink-faint)] uppercase">
					{copy.highlightsLabel}
				</p>
				<ul className="m-0 list-none divide-y divide-[var(--line)] pl-0">
					{copy.highlights.map((label, i) => (
						<li key={label}>
							<HighlightRow
								label={label}
								link={record.highlightLinks[i] ?? null}
							/>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
}

function HighlightRow({
	label,
	link,
}: {
	label: string;
	link: HighlightLink | null;
}) {
	const { lang } = Route.useParams();
	const rowClass =
		"flex items-center gap-3 py-2 text-sm text-[var(--sea-ink)] no-underline";
	const content = (
		<>
			<span
				className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]"
				aria-hidden="true"
			/>
			<span className="flex-1">{label}</span>
			{link && (
				<ArrowUpRight
					className="h-4 w-4 text-[var(--ink-faint)]"
					aria-hidden="true"
				/>
			)}
		</>
	);

	if (link?.kind === "external") {
		return (
			<a
				href={link.href}
				target="_blank"
				rel="noreferrer"
				className={`${rowClass} hover:text-[var(--accent)]`}
			>
				{content}
			</a>
		);
	}
	if (link?.kind === "product") {
		return (
			<Link
				to="/$lang/products/$productId"
				params={{ lang, productId: link.productId }}
				className={`${rowClass} hover:text-[var(--accent)]`}
			>
				{content}
			</Link>
		);
	}
	return <div className={rowClass}>{content}</div>;
}

function LogoTile({ logo, name }: { logo: ExperienceLogo; name: string }) {
	// Always a light tile: brand logos carry dark ink that vanishes on the dark theme.
	const tile =
		"flex h-[76px] w-[76px] flex-shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-white p-2";

	if (logo.kind === "image") {
		return (
			<div className={tile}>
				<img
					src={logo.src}
					alt={`${name} logo`}
					width={60}
					height={60}
					loading="lazy"
					className="h-full w-full object-contain"
				/>
			</div>
		);
	}
	if (logo.kind === "truetech") {
		return (
			<div className={tile}>
				<TrueTechLogo className="h-auto w-full" />
			</div>
		);
	}
	return (
		<div className={tile}>
			<BookOpen
				className="h-9 w-9 text-[#1f4fa3]"
				aria-label={`${name} logo`}
			/>
		</div>
	);
}

function CareerSummary() {
	const { t } = useTranslation();
	const rows: { key: string; icon: ReactNode }[] = [
		{ key: "years", icon: <CalendarDays className="h-5 w-5" /> },
		{ key: "companies", icon: <Code className="h-5 w-5" /> },
		{ key: "degree", icon: <GraduationCap className="h-5 w-5" /> },
		{ key: "location", icon: <MapPin className="h-5 w-5" /> },
	];

	return (
		<section className="island-shell p-5">
			<h2 className="display-title m-0 mb-4 text-lg font-bold text-[var(--sea-ink)]">
				{t("experience.summary.title")}
			</h2>
			<ul className="m-0 list-none space-y-4 pl-0">
				{rows.map(({ key, icon }) => (
					<li key={key} className="flex items-center gap-4">
						<span
							className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--accent)]"
							aria-hidden="true"
						>
							{icon}
						</span>
						<div>
							<p className="m-0 font-semibold text-[var(--sea-ink)]">
								{t(`experience.summary.${key}.value`)}
							</p>
							<p className="m-0 text-sm text-[var(--ink-faint)]">
								{t(`experience.summary.${key}.label`)}
							</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

function CoreSkills() {
	const { t } = useTranslation();
	const groups = [
		{ key: "languages", items: coreSkills.languages },
		{ key: "frameworks", items: coreSkills.frameworks },
		{ key: "tools", items: coreSkills.tools },
	] as const;

	return (
		<section className="island-shell p-5">
			<h2 className="m-0 mb-3 text-lg font-bold text-[var(--sea-ink)]">
				{t("experience.skills.title")}
			</h2>
			<div className="space-y-4">
				{groups.map(({ key, items }) => (
					<div key={key}>
						<h3 className="m-0 mb-2 text-sm font-medium text-[var(--sea-ink-soft)]">
							{t(`experience.skills.${key}`)}
						</h3>
						<ul className="m-0 flex list-none flex-wrap gap-2 pl-0">
							{items.map((skill) => (
								<li
									key={skill}
									className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1 text-xs text-[var(--kicker)]"
								>
									{skill}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}
