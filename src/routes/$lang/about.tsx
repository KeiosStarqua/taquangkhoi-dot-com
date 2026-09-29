import { createFileRoute, Link } from "@tanstack/react-router";
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
	const { lang } = Route.useParams();

	return (
		<main className="page-wrap space-y-6 px-4 py-12">
			<section>
				<p className="island-kicker mb-3">
					<span className="kicker-mark">/</span>
					{t("about.kicker")}
				</p>
				<h1 className="display-title mb-4 text-4xl font-semibold text-[var(--sea-ink)] sm:text-5xl">
					{t("about.title")}
				</h1>
				<p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
					<Trans
						i18nKey="about.bio"
						components={[
							<a
								key="github"
								href="https://github.com/TaQuangKhoi"
								target="_blank"
								rel="noreferrer"
								className="inline-link"
							>
								TaQuangKhoi
							</a>,
							<strong key="alias" className="text-[var(--sea-ink)]">
								Keios Starqua
							</strong>,
						]}
					/>
				</p>
			</section>

			{/* Education */}
			<section className="island-shell p-6 sm:p-8">
				<p className="island-kicker mb-2">
					<span className="kicker-mark">/</span>
					{t("about.education.kicker")}
				</p>
				<h2 className="display-title mb-3 text-2xl font-bold text-[var(--sea-ink)]">
					{t("about.education.university")}
				</h2>
				<p className="m-0 text-base leading-8 text-[var(--sea-ink-soft)]">
					<Trans
						i18nKey="about.education.desc"
						components={[
							<span
								key="degree"
								className="font-semibold text-[var(--sea-ink)]"
							>
								{t("about.education.degree")}
							</span>,
						]}
					/>
				</p>
			</section>

			{/* Current Focus */}
			<section className="island-shell p-6 sm:p-8">
				<p className="island-kicker mb-4">
					<span className="kicker-mark">/</span>
					{t("about.focus.kicker")}
				</p>
				<ul className="m-0 list-none space-y-3 pl-0 text-base text-[var(--sea-ink-soft)]">
					<li className="flex gap-3">
						<span className="flex-shrink-0 text-xl">🤖</span>
						<span>
							<Trans
								i18nKey="about.focus.ai"
								components={[
									<strong key="focus" className="text-[var(--sea-ink)]">
										focus
									</strong>,
								]}
							/>
						</span>
					</li>
					<li className="flex gap-3">
						<span className="flex-shrink-0 text-xl">⚛️</span>
						<span>
							<Trans
								i18nKey="about.focus.quantum"
								components={[
									<strong key="focus" className="text-[var(--sea-ink)]">
										focus
									</strong>,
								]}
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
										key="remnote"
										href="https://www.remnote.com/"
										target="_blank"
										rel="noreferrer"
										className="inline-link"
									>
										RemNote
									</a>,
								]}
							/>
						</span>
					</li>
					<li className="flex gap-3">
						<span className="flex-shrink-0 text-xl">🎵</span>
						<span>
							<Trans
								i18nKey="about.focus.music"
								components={[
									<strong key="focus" className="text-[var(--sea-ink)]">
										focus
									</strong>,
								]}
							/>
						</span>
					</li>
				</ul>
			</section>

			{/* Open Source */}
			<section className="island-shell p-6 sm:p-8">
				<p className="island-kicker mb-4">
					<span className="kicker-mark">/</span>
					{t("about.oss.kicker")}
				</p>
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

			{/* Connect CTA — contact and social links live on /$lang/connect */}
			<section className="island-shell flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
				<div>
					<h2 className="display-title m-0 mb-1 text-2xl font-bold text-[var(--sea-ink)]">
						{t("about.cta.title")}
					</h2>
					<p className="m-0 text-sm text-[var(--sea-ink-soft)]">
						{t("about.cta.lede")}
					</p>
				</div>
				<Link to="/$lang/connect" params={{ lang }} className="btn-primary">
					{t("about.cta.link")}
					<span aria-hidden="true">→</span>
				</Link>
			</section>
		</main>
	);
}
