import { createFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

export const Route = createFileRoute("/$lang/about")({
	head: ({ params }) => {
		const titles: Record<string, string> = {
			en: "About — Tạ Quang Khôi",
			vi: "Giới thiệu — Tạ Quang Khôi",
		};
		const descs: Record<string, string> = {
			en: "About Tạ Quang Khôi — Vietnamese software developer, musician, and open source contributor. Graduate of Ba Ria Vung Tau University.",
			vi: "Giới thiệu về Tạ Quang Khôi — lập trình viên, nhạc sĩ và người đóng góp mã nguồn mở từ Việt Nam. Tốt nghiệp Đại học Bà Rịa - Vũng Tàu.",
		};

		const lang = params.lang;
		const title = titles[lang] ?? titles.en;
		const description = descs[lang] ?? descs.en;
		const url = `${CANONICAL_ORIGIN}/${lang}/about`;

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
	component: About,
});

function About() {
	const { t } = useTranslation();

	const socialLinks = [
		{
			label: "GitHub",
			href: "https://github.com/TaQuangKhoi",
			desc: t("about.connect.github"),
		},
		{
			label: "Codeberg",
			href: "https://codeberg.org/TaQuangKhoi",
			desc: t("about.connect.codeberg"),
		},
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/taquangkhoi/",
			desc: t("about.connect.linkedin"),
		},
		{
			label: "X / Twitter",
			href: "https://x.com/TaLaTaQuangKhoi",
			desc: t("about.connect.twitter"),
		},
		{
			label: "Ko-fi",
			href: "https://ko-fi.com/taquangkhoi",
			desc: t("about.connect.kofi"),
		},
		{
			label: "ORCID",
			href: "https://orcid.org/0000-0003-2096-7326",
			desc: t("about.connect.orcid"),
		},
		{
			label: "Facebook",
			href: "https://www.facebook.com/keios.starqua/",
			desc: t("about.connect.facebook"),
		},
	];

	return (
		<main className="page-wrap space-y-6 px-4 py-12">
			{/* Intro */}
			<section className="island-shell rounded-2xl p-6 sm:p-8">
				<p className="island-kicker mb-2">{t("about.kicker")}</p>
				<h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
					{t("about.title")}
				</h1>
				<p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
					<Trans
						i18nKey="about.bio"
						components={[
							<a
								href="https://github.com/TaQuangKhoi"
								target="_blank"
								rel="noreferrer"
							/>,
							<strong />,
						]}
					/>
				</p>
			</section>

			{/* Education */}
			<section className="island-shell rounded-2xl p-6 sm:p-8">
				<p className="island-kicker mb-2">{t("about.education.kicker")}</p>
				<h2 className="display-title mb-3 text-2xl font-bold text-[var(--sea-ink)]">
					{t("about.education.university")}
				</h2>
				<p className="m-0 text-base leading-8 text-[var(--sea-ink-soft)]">
					<Trans
						i18nKey="about.education.desc"
						components={[
							<span className="font-semibold text-[var(--sea-ink)]" />,
						]}
					/>
				</p>
			</section>

			{/* Current Focus */}
			<section className="island-shell rounded-2xl p-6 sm:p-8">
				<p className="island-kicker mb-4">{t("about.focus.kicker")}</p>
				<ul className="m-0 list-none space-y-3 pl-0 text-base text-[var(--sea-ink-soft)]">
					<li className="flex gap-3">
						<span className="flex-shrink-0 text-xl">🤖</span>
						<span>
							<Trans
								i18nKey="about.focus.ai"
								components={[<strong className="text-[var(--sea-ink)]" />]}
							/>
						</span>
					</li>
					<li className="flex gap-3">
						<span className="flex-shrink-0 text-xl">⚛️</span>
						<span>
							<Trans
								i18nKey="about.focus.quantum"
								components={[<strong className="text-[var(--sea-ink)]" />]}
							/>
						</span>
					</li>
					<li className="flex gap-3">
						<span className="flex-shrink-0 text-xl">📝</span>
						<span>
							<Trans
								i18nKey="about.focus.remnote"
								components={[
									<a
										href="https://www.remnote.com/"
										target="_blank"
										rel="noreferrer"
									/>,
								]}
							/>
						</span>
					</li>
					<li className="flex gap-3">
						<span className="flex-shrink-0 text-xl">🎵</span>
						<span>
							<Trans
								i18nKey="about.focus.music"
								components={[<strong className="text-[var(--sea-ink)]" />]}
							/>
						</span>
					</li>
				</ul>
			</section>

			{/* Open Source */}
			<section className="island-shell rounded-2xl p-6 sm:p-8">
				<p className="island-kicker mb-4">{t("about.oss.kicker")}</p>
				<p className="mb-4 text-base text-[var(--sea-ink-soft)]">
					{t("about.oss.intro")}
				</p>
				<div className="space-y-3">
					{[
						{
							href: "https://github.com/web-scrobbler/web-scrobbler",
							icon: "🎧",
							titleKey: "about.oss.webscrobbler.title",
							descKey: "about.oss.webscrobbler.desc",
						},
						{
							href: "https://github.com/TaQuangKhoi/vina-doctor",
							icon: "🏥",
							titleKey: "about.oss.vinadoctor.title",
							descKey: "about.oss.vinadoctor.desc",
						},
						{
							href: "https://github.com/TaQuangKhoi/Napkin-Collect-Android",
							icon: "📒",
							titleKey: "about.oss.napkin.title",
							descKey: "about.oss.napkin.desc",
						},
					].map(({ href, icon, titleKey, descKey }) => (
						<a
							key={titleKey}
							href={href}
							target="_blank"
							rel="noreferrer"
							className="island-shell feature-card flex items-center gap-4 rounded-xl p-4 no-underline"
						>
							<span className="text-2xl">{icon}</span>
							<div>
								<p className="m-0 font-semibold text-[var(--sea-ink)]">
									{t(titleKey)}
								</p>
								<p className="m-0 text-sm text-[var(--sea-ink-soft)]">
									{t(descKey)}
								</p>
							</div>
						</a>
					))}
				</div>
			</section>

			{/* Connect */}
			<section className="island-shell rounded-2xl p-6 sm:p-8">
				<p className="island-kicker mb-4">{t("about.connect.kicker")}</p>
				<div className="grid gap-3 sm:grid-cols-2">
					{socialLinks.map(({ label, href, desc }) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noreferrer"
							className="island-shell feature-card flex items-center justify-between rounded-xl px-4 py-3 no-underline"
						>
							<span className="font-semibold text-[var(--sea-ink)]">
								{label}
							</span>
							<span className="text-sm text-[var(--sea-ink-soft)]">{desc}</span>
						</a>
					))}
				</div>
			</section>
		</main>
	);
}
