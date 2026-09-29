import { Link } from "@tanstack/react-router";
import en from "../i18n/locales/en.json";
import vi from "../i18n/locales/vi.json";
import { useRouteLang, useSwapLangPath } from "../lib/locale";
import ThemeToggle from "./ThemeToggle";

const copy = { en, vi } as const;

export default function Header() {
	const lang = useRouteLang();
	const toLang = useSwapLangPath();
	const t = copy[lang];

	const items = [
		{ to: "/$lang" as const, label: t.nav.home, index: "01", exact: true },
		{
			to: "/$lang/about" as const,
			label: t.nav.about,
			index: "02",
			exact: false,
		},
		{
			to: "/$lang/experience" as const,
			label: t.nav.experience,
			index: "03",
			exact: false,
		},
		{
			to: "/$lang/products" as const,
			label: t.nav.projects,
			index: "04",
			exact: false,
		},
		{
			to: "/$lang/research" as const,
			label: t.nav.research,
			index: "05",
			exact: false,
		},
	];

	return (
		<header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
			<nav className="page-wrap flex flex-wrap items-center gap-x-5 gap-y-2 py-3">
				<Link to="/$lang" params={{ lang }} className="brand">
					<span className="brand-underscore">_</span>
					TQK
					<span className="brand-cursor" aria-hidden="true" />
				</Link>

				<div className="order-3 flex w-full items-center gap-x-4 overflow-x-auto pb-1 md:order-none md:w-auto md:pb-0">
					{items.map((item) => (
						<Link
							key={item.index}
							to={item.to}
							params={{ lang }}
							className="nav-link"
							activeOptions={{ exact: item.exact }}
							activeProps={{ className: "nav-link is-active" }}
						>
							<span className="idx">[{item.index}]</span>
							<span className="label">{item.label}</span>
						</Link>
					))}
				</div>

				<div className="ml-auto flex items-center gap-2 sm:gap-3">
					<ThemeToggle />
					<div className="lang-switch">
						{(["en", "vi"] as const).map((l) => (
							<Link
								key={l}
								to={toLang(l)}
								aria-current={lang === l ? "true" : undefined}
							>
								{l.toUpperCase()}
							</Link>
						))}
					</div>
					<span className="collab-flag hidden lg:inline">
						{"// "}
						{t.home.collab}
					</span>
				</div>
			</nav>
		</header>
	);
}
