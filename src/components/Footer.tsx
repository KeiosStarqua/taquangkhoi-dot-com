import en from "../i18n/locales/en.json";
import vi from "../i18n/locales/vi.json";
import { useRouteLang } from "../lib/locale";
import SocialLinks from "./SocialLinks";

const copy = { en, vi } as const;

export default function Footer() {
	const year = new Date().getFullYear();
	const lang = useRouteLang();
	const t = copy[lang];

	return (
		<footer className="site-footer mt-16 px-4 py-8 text-[var(--sea-ink-soft)]">
			<div className="page-wrap flex flex-col items-center justify-between gap-4 sm:flex-row">
				<p className="m-0 font-mono text-xs tracking-wide">
					© {year} Tạ Quang Khôi · {t.footer.rights}
				</p>
				<SocialLinks />
			</div>
		</footer>
	);
}
