import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import ProjectCard from "#/components/ProjectCard";
import SocialLinks from "#/components/SocialLinks";
import { products } from "#/data/products";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

const skills = {
	languages: ["JavaScript", "Java", "Kotlin", "Python", "C#", "Groovy", "Rust"],
	frontend: ["HTML5", "CSS3", "React"],
	backend: ["NestJS"],
	tools: ["Git", "Docker", "Linux", "AWS"],
	mobile: ["Android", "Flutter"],
} as const;

const railIcons = [CubeIcon, WaveIcon, AudioIcon, ShareIcon] as const;
const statusIcons = [TargetIcon, PinIcon, PulseIcon, PeopleIcon] as const;

export const Route = createFileRoute("/$lang/")({
	head: ({ params }) => {
		const titles: Record<string, string> = {
			en: "Tạ Quang Khôi — Software Developer & Musician",
			vi: "Tạ Quang Khôi — Lập trình viên & Nhạc sĩ",
		};
		const descs: Record<string, string> = {
			en: "Software developer and musician from Vietnam. Building AI agents, exploring quantum computing at TRUE-TECH, and making music with Ardour.",
			vi: "Lập trình viên và nhạc sĩ từ Việt Nam. Xây dựng AI agent, khám phá điện toán lượng tử tại TRUE-TECH, và làm nhạc với Ardour.",
		};

		const lang = params.lang;
		const title = titles[lang] ?? titles.en;
		const description = descs[lang] ?? descs.en;
		const url = `${CANONICAL_ORIGIN}/${lang}`;

		const personSchema = {
			"@context": "https://schema.org",
			"@type": "Person",
			name: "Tạ Quang Khôi",
			alternateName: "Keios Starqua",
			url: CANONICAL_ORIGIN,
			sameAs: [
				"https://github.com/TaQuangKhoi",
				"https://www.linkedin.com/in/taquangkhoi/",
				"https://x.com/TaLaTaQuangKhoi",
				"https://orcid.org/0000-0003-2096-7326",
			],
			jobTitle: "Software Developer",
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
								<a
									key="truetech"
									href="https://github.com/TRUE-TECH"
									target="_blank"
									rel="noreferrer"
									className="font-semibold text-[var(--accent)] no-underline"
								>
									@TRUE-TECH
								</a>,
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
					<SocialLinks />
				</div>

				<AboutCode
					motto={t("home.terminal.motto")}
					hello={t("home.terminal.hello")}
				/>

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

function AboutCode({ motto, hello }: { motto: string; hello: string }) {
	const [ran, setRan] = useState(false);

	return (
		<div className="code-window rise-in" style={{ animationDelay: "80ms" }}>
			<div className="code-chrome">
				<div className="code-dots" aria-hidden="true">
					<span />
					<span />
					<span />
				</div>
				<span className="code-filename">{"// about-me.ts"}</span>
				<button
					type="button"
					className={ran ? "run-btn is-hot" : "run-btn"}
					onClick={() => setRan(true)}
					aria-pressed={ran}
				>
					Run ▶
				</button>
			</div>
			<pre className="code-body">
				<code>
					<Line n={1}>
						<span className="tok-key">const</span> taQuangKhoi = {"{"}
					</Line>
					<Line n={2}>
						{"  "}roles: [<span className="tok-str">"Developer"</span>,{" "}
						<span className="tok-str">"AI Explorer"</span>,{" "}
						<span className="tok-str">"Musician"</span>],
					</Line>
					<Line n={3}>
						{"  "}location: <span className="tok-str">"Vietnam"</span>,
					</Line>
					<Line n={4}>{"  "}currentFocus: [</Line>
					<Line n={5}>
						{"    "}
						<span className="tok-str">"AI Agents"</span>,
					</Line>
					<Line n={6}>
						{"    "}
						<span className="tok-str">"Quantum Programming"</span>,
					</Line>
					<Line n={7}>
						{"    "}
						<span className="tok-str">"Open Source"</span>,
					</Line>
					<Line n={8}>
						{"    "}
						<span className="tok-str">"Music with Ardour"</span>,
					</Line>
					<Line n={9}>{"  ],"}</Line>
					<Line n={10}>
						{"  "}motto: <span className="tok-str">"{motto}"</span>
					</Line>
					<Line n={11}>{"}"}</Line>
				</code>
			</pre>
			<p className={ran ? "code-prompt is-hot" : "code-prompt"}>
				<span className="prompt-mark">&gt;</span>
				{hello} 👋
			</p>
		</div>
	);
}

function Line({ n, children }: { n: number; children: ReactNode }) {
	return (
		<span className="code-line">
			<span className="ln">{n}</span>
			<span>{children}</span>
		</span>
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
