import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

interface ExperienceItem {
	role: string;
	org: string;
	period: string;
	location: string;
	desc: string;
	tags: string[];
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
	const items = t("experience.items", {
		returnObjects: true,
	}) as ExperienceItem[];

	return (
		<main className="page-wrap space-y-6 px-4 py-12">
			<section>
				<p className="island-kicker mb-3">
					<span className="kicker-mark">/</span>
					{t("experience.kicker")}
				</p>
				<h1 className="display-title mb-4 text-4xl font-semibold text-[var(--sea-ink)] sm:text-5xl">
					{t("experience.title")}
				</h1>
				<p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
					{t("experience.subtitle")}
				</p>
			</section>

			<section className="relative">
				<ol className="relative m-0 list-none space-y-6 border-l border-[var(--line)] pl-0">
					{items.map((item) => (
						<li key={`${item.org}-${item.role}`} className="relative pl-8">
							<span
								className="absolute top-2 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-[var(--accent)] bg-[var(--surface)]"
								aria-hidden="true"
							/>
							<div className="island-shell p-6 sm:p-8">
								<p className="island-kicker mb-2">
									<span className="kicker-mark">/</span>
									{item.role}
								</p>
								<h2 className="display-title mb-1 text-2xl font-bold text-[var(--sea-ink)]">
									{item.org}
								</h2>
								<p className="m-0 text-sm text-[var(--sea-ink-soft)]">
									{item.period}
								</p>
								<p className="m-0 mb-3 text-sm text-[var(--sea-ink-soft)]">
									{item.location}
								</p>
								<p className="m-0 mb-4 text-base leading-7 text-[var(--sea-ink-soft)]">
									{item.desc}
								</p>
								<div className="flex flex-wrap gap-2">
									{item.tags.map((tag) => (
										<span
											key={tag}
											className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--sea-ink-soft)]"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</li>
					))}
				</ol>
			</section>
		</main>
	);
}
