import { createFileRoute, Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { products } from "#/data/products";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

const skills = {
	languages: ["JavaScript", "Java", "Kotlin", "Python", "C#", "Groovy", "Rust"],
	frontend: ["HTML5", "CSS3", "React"],
	backend: ["NestJS"],
	mobile: ["Android", "Flutter"],
};

export const Route = createFileRoute("/$lang/")({
	head: ({ params }) => {
		const isMeta = (key: string, lang: string) => {
			const titles: Record<string, string> = {
				en: "Tạ Quang Khôi — Software Developer & Musician",
				vi: "Tạ Quang Khôi — Lập trình viên & Nhạc sĩ",
			};
			const descs: Record<string, string> = {
				en: "Software developer and musician from Vietnam. Building AI agents, exploring quantum computing at TRUE-TECH, and making music with Ardour.",
				vi: "Lập trình viên và nhạc sĩ từ Việt Nam. Xây dựng AI agent, khám phá điện toán lượng tử tại TRUE-TECH, và làm nhạc với Ardour.",
			};
			return key === "title"
				? (titles[lang] ?? titles.en)
				: (descs[lang] ?? descs.en);
		};

		const lang = params.lang;
		const title = isMeta("title", lang);
		const description = isMeta("desc", lang);
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

function SkillBadge({ label }: { label: string }) {
	return (
		<span className="inline-flex items-center rounded-full border border-[rgba(50,143,151,0.25)] bg-[rgba(79,184,178,0.1)] px-3 py-1 text-xs font-semibold text-[var(--lagoon-deep)]">
			{label}
		</span>
	);
}

function Home() {
	const { t } = useTranslation();
	const { lang } = Route.useParams();

	return (
		<main className="page-wrap px-4 pb-8 pt-14">
			{/* Hero */}
			<section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
				<div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
				<div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />

				<p className="island-kicker mb-3">{t("home.kicker")}</p>
				<h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
					{t("home.title")}
				</h1>
				<p className="mb-2 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
					{t("home.tagline")}
				</p>
				<p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
					<Trans
						i18nKey="home.bio"
						components={[
							<a
								href="https://github.com/TRUE-TECH"
								target="_blank"
								rel="noreferrer"
							/>,
						]}
					/>
				</p>

				<div className="flex flex-wrap gap-3">
					<a
						href="https://github.com/TaQuangKhoi"
						target="_blank"
						rel="noreferrer"
						className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
					>
						{t("home.cta.github")}
					</a>
					<a
						href={`/${lang}/about`}
						className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
					>
						{t("home.cta.about")}
					</a>
					<a
						href="https://ko-fi.com/taquangkhoi"
						target="_blank"
						rel="noreferrer"
						className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
					>
						{t("home.cta.coffee")}
					</a>
				</div>
			</section>

			{/* Status */}
			<section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{(
					[
						{ key: "ai", icon: "🤖" },
						{ key: "quantum", icon: "⚛️" },
						{ key: "music", icon: "🎵" },
					] as const
				).map(({ key, icon }, index) => (
					<article
						key={key}
						className="island-shell feature-card rise-in rounded-2xl p-5"
						style={{ animationDelay: `${index * 90 + 80}ms` }}
					>
						<div className="mb-2 text-2xl">{icon}</div>
						<h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
							{t(`home.focus.${key}.title`)}
						</h2>
						<p className="m-0 text-sm text-[var(--sea-ink-soft)]">
							{t(`home.focus.${key}.desc`)}
						</p>
					</article>
				))}
			</section>

			{/* Skills */}
			<section className="island-shell mt-8 rounded-2xl p-6 sm:p-8">
				<p className="island-kicker mb-4">{t("home.skills.kicker")}</p>
				<div className="space-y-4">
					{(
						[
							{ key: "languages", items: skills.languages },
							{ key: "frontend", items: skills.frontend },
							{ key: "backend", items: skills.backend },
							{ key: "mobile", items: skills.mobile },
						] as const
					).map(({ key, items }) => (
						<div key={key}>
							<h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]">
								{t(`home.skills.${key}`)}
							</h3>
							<div className="flex flex-wrap gap-2">
								{items.map((s) => (
									<SkillBadge key={s} label={s} />
								))}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Featured Projects */}
			<section className="mt-8">
				<div className="mb-4 flex items-center justify-between">
					<p className="island-kicker">{t("home.featured.kicker")}</p>
					<Link
						to="/$lang/products"
						params={{ lang }}
						className="text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:underline"
					>
						{t("home.featured.viewAll")} →
					</Link>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{products.map((product, index) => (
						<Link
							key={product.id}
							to="/$lang/products/$productId"
							params={{ lang, productId: product.id }}
							className="island-shell feature-card rise-in block rounded-2xl p-6 no-underline"
							style={{ animationDelay: `${index * 90}ms` }}
						>
							<div className="mb-3 flex items-center justify-between">
								<span className="text-3xl">{product.icon}</span>
								<span className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.1)] px-2.5 py-0.5 text-xs font-semibold text-[var(--lagoon-deep)]">
									{t(`products.status.${product.status}`)}
								</span>
							</div>
							<h2 className="display-title mb-2 text-lg font-bold text-[var(--sea-ink)]">
								{t(`products.${product.id}.name`)}
							</h2>
							<p className="mb-4 text-sm leading-6 text-[var(--sea-ink-soft)]">
								{t(`products.${product.id}.tagline`)}
							</p>
							<div className="flex flex-wrap gap-1.5">
								{product.tags.slice(0, 3).map((tag) => (
									<span
										key={tag}
										className="inline-flex items-center rounded-full border border-[rgba(50,143,151,0.2)] bg-[rgba(79,184,178,0.08)] px-2.5 py-0.5 text-xs font-medium text-[var(--lagoon-deep)]"
									>
										{tag}
									</span>
								))}
							</div>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
