import { createFileRoute, Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import AboutCode from "#/components/AboutCode";
import ProjectCard from "#/components/ProjectCard";
import SocialLinks from "#/components/SocialLinks";
import { products } from "#/data/products";
import { EntityPreview } from "#/features/entity-preview";
import en from "#/i18n/locales/en.json";
import vi from "#/i18n/locales/vi.json";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";
const OPENFARM_URL = "https://openfarmgroup.com/?utm_source=taquangkhoi.com";
/** `head()` runs outside the i18next provider, so it reads the catalogs directly. */
const catalogs = { en, vi } as const;

const skills = {
	languages: ["JavaScript", "Java", "Kotlin", "Python", "C#", "Groovy", "Rust"],
	frontend: ["HTML5", "CSS3", "React"],
	backend: ["NestJS"],
	tools: ["Git", "Docker", "Linux", "AWS"],
	mobile: ["Android", "Flutter"],
} as const;

// Order matches `home.rails`: OpenFarm, AI agents, drawings, quantum.
const railIcons = [CubeIcon, ShareIcon, WaveIcon, AudioIcon] as const;
const statusIcons = [TargetIcon, PinIcon, PulseIcon, PeopleIcon] as const;

export const Route = createFileRoute("/$lang/")({
	head: ({ params }) => {
		const lang = params.lang === "vi" ? "vi" : "en";
		const { title, description } = catalogs[lang].meta.home;
		const url = `${CANONICAL_ORIGIN}/${lang}`;

		const personSchema = {
			"@context": "https://schema.org",
			"@type": "Person",
			name: "Tạ Quang Khôi",
			alternateName: "Keios Starqua",
			url: CANONICAL_ORIGIN,
			sameAs: [
				"https://github.com/TaQuangKhoi",
				"https://codeberg.org/TaQuangKhoi",
				"https://www.linkedin.com/in/taquangkhoi/",
				"https://x.com/TaLaTaQuangKhoi",
				"https://orcid.org/0000-0003-2096-7326",
			],
			jobTitle: "Co-Founder",
			worksFor: {
				"@type": "Organization",
				name: "OpenFarm",
				url: OPENFARM_URL,
			},
			nationality: "Vietnamese",
		};

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:url", content: url },
			],
			links: [{ rel: "canonical", href: url }],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(personSchema),
				},
			],
		};
	},
	component: Home,
});

function Home() {
	const { t } = useTranslation();
	const { lang } = Route.useParams();
	const rails = t("home.rails", { returnObjects: true }) as {
		verb: string;
		title: string;
	}[];
	const statusBar = t("home.statusBar", { returnObjects: true }) as {
		label: string;
		value: string;
	}[];

	return (
		<main className="pb-8">
			<section className="hero-grid page-wrap px-4 pb-10 pt-10 xl:pt-14">
				<div className="rise-in max-w-xl">
					<p className="island-kicker mb-5">
						<span className="kicker-mark">{"//"}</span>
						{t("home.kicker")}
					</p>
					<h1 className="display-name mb-5">
						{t("home.titleLead")}{" "}
						<span className="name-accent">{t("home.titleAccent")}</span>
						<span className="name-caret" aria-hidden="true" />
					</h1>
					<p className="mb-4 max-w-lg text-lg leading-snug text-[var(--sea-ink)] sm:text-xl">
						<Trans
							i18nKey="home.tagline"
							components={[<em key="accent" className="accent-em" />]}
						/>
					</p>
					<p className="mb-7 max-w-lg text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base">
						<Trans
							i18nKey="home.bio"
							components={[
								<EntityPreview
									key="openfarm"
									entity="openfarm"
									tone="accent"
								/>,
								<EntityPreview key="truetech" entity="true-technology" />,
							]}
						/>
					</p>
					<div className="mb-6 flex flex-wrap gap-3">
						<Link
							to="/$lang/products"
							params={{ lang }}
							className="btn-primary"
						>
							{t("home.cta.work")}
							<span aria-hidden="true">→</span>
						</Link>
						<Link to="/$lang/about" params={{ lang }} className="btn-ghost">
							{t("home.cta.about")}
						</Link>
					</div>
					<div className="flex flex-wrap items-center gap-x-5 gap-y-3">
						<SocialLinks />
						<Link
							to="/$lang/connect"
							params={{ lang }}
							className="font-mono text-xs tracking-wide text-[var(--accent)] no-underline"
						>
							{t("home.cta.connect")} →
						</Link>
					</div>
				</div>

				<AboutCode />

				<div className="flex items-stretch gap-4 xl:max-w-[280px]">
					<ol className="rail m-0 min-w-0 flex-1 list-none p-0">
						{rails.map((item, index) => {
							const Icon = railIcons[index] ?? CubeIcon;
							return (
								<li key={item.title} className="rail-card">
									<span className="rail-index">
										{String(index + 1).padStart(2, "0")}
									</span>
									<span className="rail-icon" aria-hidden="true">
										<Icon />
									</span>
									<span className="rail-verb">{item.verb}</span>
									<span className="rail-title">{item.title}</span>
								</li>
							);
						})}
					</ol>
					<p className="pull-quote hidden shrink-0 xl:block">
						{t("home.quote")}
					</p>
				</div>
				<p className="pull-quote xl:hidden">{t("home.quote")}</p>
			</section>

			<section className="status-strip">
				<div className="page-wrap grid gap-x-6 px-4 sm:grid-cols-2 xl:grid-cols-4">
					{statusBar.map((item, index) => {
						const Icon = statusIcons[index] ?? TargetIcon;
						return (
							<div key={item.label} className="status-cell">
								<span
									className="mt-0.5 text-[var(--accent)]"
									aria-hidden="true"
								>
									<Icon />
								</span>
								<div>
									<p className="status-label m-0">{item.label}</p>
									<p className="status-value m-0">{item.value}</p>
								</div>
							</div>
						);
					})}
				</div>
			</section>

			<section className="page-wrap mt-12 px-4">
				<div className="mb-5 flex items-end justify-between gap-4">
					<p className="island-kicker m-0">
						<span className="kicker-mark">/</span>
						{t("home.featured.kicker")}
					</p>
					<Link
						to="/$lang/products"
						params={{ lang }}
						className="font-mono text-xs tracking-wide text-[var(--accent)] no-underline"
					>
						{t("home.featured.viewAll")} →
					</Link>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{products.map((product, index) => (
						<ProjectCard
							key={product.id}
							product={product}
							index={index}
							lang={lang}
						/>
					))}
				</div>
			</section>

			<section className="page-wrap mt-12 px-4">
				<p className="island-kicker mb-5">
					<span className="kicker-mark">/</span>
					{t("home.skills.kicker")}
				</p>
				<div className="flex flex-col gap-4">
					{(
						[
							["languages", skills.languages],
							["frontend", skills.frontend],
							["backend", skills.backend],
							["tools", skills.tools],
							["mobile", skills.mobile],
						] as const
					).map(([key, items]) => (
						<div
							key={key}
							className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
						>
							<h2 className="skill-label m-0">{t(`home.skills.${key}`)}</h2>
							<div className="flex flex-wrap gap-2">
								{items.map((label) => (
									<span key={label} className="chip">
										{label}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}

function CubeIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			aria-hidden="true"
		>
			<path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3z" />
			<path d="M12 12 20 7.5M12 12v9M12 12 4 7.5" />
		</svg>
	);
}

function WaveIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			aria-hidden="true"
		>
			<path strokeLinecap="round" d="M3 12h2l2-5 3 10 3-8 2 3h6" />
		</svg>
	);
}

function AudioIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			aria-hidden="true"
		>
			<path strokeLinecap="round" d="M6 10v4M10 7v10M14 5v14M18 9v6" />
		</svg>
	);
}

function ShareIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			aria-hidden="true"
		>
			<circle cx="6" cy="12" r="2" />
			<circle cx="17" cy="6" r="2" />
			<circle cx="17" cy="18" r="2" />
			<path d="m8 11 7-4M8 13l7 4" />
		</svg>
	);
}

function TargetIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="18"
			height="18"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="7" />
			<circle cx="12" cy="12" r="3" />
			<path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2" />
		</svg>
	);
}

function PinIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="18"
			height="18"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="7" />
			<circle cx="12" cy="12" r="2" />
			<path strokeLinecap="round" d="M12 5v2M12 17v2M5 12h2" />
		</svg>
	);
}

function PulseIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="18"
			height="18"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			aria-hidden="true"
		>
			<path strokeLinecap="round" d="M3 12h3l2-4 3 8 2-4h8" />
		</svg>
	);
}

function PeopleIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="18"
			height="18"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			aria-hidden="true"
		>
			<circle cx="9" cy="9" r="2.5" />
			<circle cx="16" cy="10" r="2" />
			<path
				strokeLinecap="round"
				d="M4.5 18c.6-2.2 2.4-3.5 4.5-3.5s3.9 1.3 4.5 3.5M14 14.5c1.4-.3 2.8.2 3.6 1.5"
			/>
		</svg>
	);
}
