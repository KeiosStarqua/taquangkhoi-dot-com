import { createFileRoute } from "@tanstack/react-router";
import * as nightCoast from "ascii.rest/pieces/night-coast";
import {
	BookOpen,
	Bot,
	Box,
	CalendarDays,
	Code,
	ExternalLink,
	FileText,
	type LucideIcon,
	Mail,
	Music,
} from "lucide-react";
import type { ComponentType } from "react";
import { Trans, useTranslation } from "react-i18next";
import AsciiArt from "#/components/AsciiArt";
import {
	CodebergIcon,
	FacebookIcon,
	GithubIcon,
	KofiIcon,
	LinkedInIcon,
	OrcidIcon,
	XIcon,
} from "#/components/BrandIcons";
import ConnectTerminal from "#/components/ConnectTerminal";
import {
	type ContactLinkId,
	callRequestHref,
	contactLinks,
	EMAIL,
	type OpenToId,
	openTo,
} from "#/data/connect";
import en from "#/i18n/locales/en.json";
import vi from "#/i18n/locales/vi.json";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

function MailIcon({ size = 20 }: { size?: number }) {
	return <Mail width={size} height={size} strokeWidth={1.8} aria-hidden />;
}

/**
 * Icon and tint per contact row. Brand marks keep their brand hue; marks
 * whose brand color is black or white (GitHub, X) follow the ink token so
 * they stay legible in both themes.
 */
const linkIcons: Record<
	ContactLinkId,
	{ icon: ComponentType<{ size?: number }>; tint: string }
> = {
	email: { icon: MailIcon, tint: "text-[var(--accent)]" },
	codeberg: { icon: CodebergIcon, tint: "text-[#2185d0]" },
	github: { icon: GithubIcon, tint: "text-[var(--sea-ink)]" },
	orcid: { icon: OrcidIcon, tint: "text-[#a6ce39]" },
	linkedin: { icon: LinkedInIcon, tint: "text-[#0a66c2]" },
	kofi: { icon: KofiIcon, tint: "text-[#ff5e5b]" },
	x: { icon: XIcon, tint: "text-[var(--sea-ink)]" },
	facebook: { icon: FacebookIcon, tint: "text-[#1877f2]" },
};

const openToIcons: Record<OpenToId, LucideIcon> = {
	research: Bot,
	technical: Code,
	product: Box,
	speaking: BookOpen,
	problems: FileText,
	creative: Music,
};

export const Route = createFileRoute("/$lang/connect")({
	head: ({ params }) => {
		const meta = (params.lang === "vi" ? vi : en).meta.connect;
		const url = `${CANONICAL_ORIGIN}/${params.lang}/connect`;
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
	component: Connect,
});

function Connect() {
	return (
		<main className="pb-4">
			<Hero />
			<div className="page-wrap space-y-6 px-4">
				<GetInTouch />
				<OpenTo />
				<LetsTalk />
			</div>
		</main>
	);
}

/** Primary and secondary contact buttons, reused by the hero and the closing card. */
function ContactButtons() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-wrap gap-3">
			<a href={`mailto:${EMAIL}`} className="btn-primary">
				<Mail className="h-4 w-4" aria-hidden="true" />
				{t("connect.cta.email")}
				<span aria-hidden="true">→</span>
			</a>
			<a
				href={callRequestHref(t("connect.cta.callSubject"))}
				className="btn-ghost"
			>
				<CalendarDays className="h-4 w-4" aria-hidden="true" />
				{t("connect.cta.call")}
			</a>
		</div>
	);
}

function Kicker({ children }: { children: string }) {
	return (
		<p className="island-kicker mb-2">
			<span className="kicker-mark">/</span>
			{children}
		</p>
	);
}

function Hero() {
	const { t } = useTranslation();
	const note = t("connect.note", { returnObjects: true }) as string[];

	return (
		<section className="hero-grid page-wrap px-4 pt-10 pb-12 xl:pt-14">
			<div className="rise-in max-w-xl">
				<p className="island-kicker mb-5">
					<span className="kicker-mark">/</span>
					{t("connect.kicker")}
				</p>
				<h1 className="display-name mb-6">
					<Trans
						i18nKey="connect.title"
						components={[<em key="accent" className="accent-em" />]}
					/>
				</h1>
				<p className="mb-7 max-w-lg text-base leading-7 text-[var(--sea-ink-soft)] sm:text-lg">
					{t("connect.lede")}
				</p>
				<ContactButtons />
			</div>

			<ConnectTerminal />

			<div
				className="hidden items-end gap-2 self-center xl:flex"
				aria-hidden="true"
			>
				<svg
					aria-hidden="true"
					viewBox="0 0 60 60"
					className="h-14 w-14 shrink-0 text-[var(--ink-faint)]"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.4"
					strokeLinecap="round"
				>
					<path d="M56 6C56 34 40 50 8 50" />
					<path d="m16 43-8 7 9 5" />
				</svg>
				<ul className="m-0 mb-10 -rotate-6 list-none space-y-1 p-0 display-title text-lg italic text-[var(--sea-ink-soft)]">
					{note.map((line, index) => (
						<li key={line} className={index % 2 ? "pl-2" : undefined}>
							{line}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

function GetInTouch() {
	const { t } = useTranslation();

	return (
		<section className="island-shell p-6 sm:p-8" aria-labelledby="get-in-touch">
			<Kicker>{t("connect.touch.kicker")}</Kicker>
			<h2
				id="get-in-touch"
				className="display-title m-0 mb-3 text-3xl font-bold text-[var(--sea-ink)]"
			>
				{t("connect.touch.title")}
			</h2>
			<p className="m-0 mb-6 max-w-2xl text-sm leading-6 text-[var(--sea-ink-soft)] sm:text-base">
				<Trans
					i18nKey="connect.touch.lede"
					components={[
						<strong key="reply" className="text-[var(--sea-ink)]" />,
					]}
				/>
			</p>
			<ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
				{contactLinks.map((link) => {
					const { icon: Icon, tint } = linkIcons[link.id];
					const external = !link.href.startsWith("mailto:");
					return (
						<li key={link.id}>
							<a
								href={link.href}
								{...(external ? { target: "_blank", rel: "noreferrer" } : {})}
								className="island-shell feature-card flex items-center gap-4 rounded-xl px-4 py-3 no-underline"
							>
								<span
									className={`flex h-9 w-9 shrink-0 items-center justify-center ${tint}`}
								>
									<Icon size={24} />
								</span>
								<span className="min-w-0 flex-1">
									<span className="block text-sm font-semibold text-[var(--sea-ink)]">
										{link.label}
									</span>
									<span className="block truncate text-sm text-[var(--sea-ink-soft)]">
										{link.display}
									</span>
								</span>
								<span className="hidden shrink-0 text-xs text-[var(--sea-ink-soft)] sm:inline">
									{t(`connect.touch.notes.${link.id}`)}
								</span>
								<ExternalLink
									className="h-4 w-4 shrink-0 text-[var(--ink-faint)]"
									aria-hidden="true"
								/>
								{external ? (
									<span className="sr-only">{t("connect.newTab")}</span>
								) : null}
							</a>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

function OpenTo() {
	const { t } = useTranslation();

	return (
		<section
			className="island-shell grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
			aria-labelledby="open-to"
		>
			<div>
				<Kicker>{t("connect.openTo.kicker")}</Kicker>
				<h2
					id="open-to"
					className="display-title m-0 mb-3 text-3xl font-bold text-[var(--sea-ink)]"
				>
					{t("connect.openTo.title")}
				</h2>
				<p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base">
					<Trans
						i18nKey="connect.openTo.lede"
						components={[
							<strong key="impact" className="text-[var(--sea-ink)]" />,
						]}
					/>
				</p>
			</div>
			<ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
				{openTo.map((id) => {
					const Icon = openToIcons[id];
					return (
						<li
							key={id}
							className="flex gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4"
						>
							<Icon
								className="mt-0.5 h-6 w-6 shrink-0 text-[var(--accent)]"
								strokeWidth={1.6}
								aria-hidden="true"
							/>
							<div>
								<h3 className="m-0 mb-1 text-sm font-semibold text-[var(--sea-ink)]">
									{t(`connect.openTo.entries.${id}.title`)}
								</h3>
								<p className="m-0 text-xs leading-5 text-[var(--sea-ink-soft)]">
									{t(`connect.openTo.entries.${id}.desc`)}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

function LetsTalk() {
	const { t } = useTranslation();

	return (
		<section
			className="island-shell relative overflow-hidden p-6 sm:p-8"
			aria-labelledby="lets-talk"
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 hidden text-[var(--accent)] opacity-35 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] lg:block"
			>
				<AsciiArt
					piece={nightCoast}
					mono
					options={{ fps: 8 }}
					fitRows={56}
					maxFontPx={9}
					className="w-full"
				/>
			</div>
			<div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
				<div className="max-w-xl">
					<Kicker>{t("connect.talk.kicker")}</Kicker>
					<h2
						id="lets-talk"
						className="display-title m-0 mb-2 text-2xl font-bold text-[var(--sea-ink)]"
					>
						{t("connect.talk.title")}
					</h2>
					<p className="m-0 text-sm leading-6 text-[var(--sea-ink-soft)]">
						{t("connect.talk.lede")}
					</p>
				</div>
				<ContactButtons />
			</div>
		</section>
	);
}
