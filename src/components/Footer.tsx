import * as dividers from "ascii.rest/pieces/dividers";
import en from "../i18n/locales/en.json";
import vi from "../i18n/locales/vi.json";
import { useRouteLang } from "../lib/locale";
import SocialLinks from "./SocialLinks";

const copy = { en, vi } as const;

/**
 * One rule from ascii.rest's `dividers` sheet (`── · ° · ──`). The piece is a
 * still, so the line is computed once at module load and rendered on the
 * server; no animation loop runs. Rows in the sheet are odd lines; row 11 is
 * the centred-ornament rule.
 */
const FOOTER_RULE = (
	dividers.default({ width: 45 })(0).split("\n")[11] ?? ""
).trim();

export default function Footer() {
	const year = new Date().getFullYear();
	const lang = useRouteLang();
	const t = copy[lang];

	return (
		<footer className="site-footer mt-16 px-4 py-8 text-[var(--sea-ink-soft)]">
			<p
				aria-hidden="true"
				className="m-0 mb-6 overflow-hidden text-center font-mono text-xs whitespace-pre text-[var(--line-strong)] select-none"
			>
				{FOOTER_RULE}
			</p>
			<div className="page-wrap flex flex-col items-center justify-between gap-4 sm:flex-row">
				<p className="m-0 font-mono text-xs tracking-wide">
					© {year} Tạ Quang Khôi · {t.footer.rights}
				</p>
				<SocialLinks />
			</div>
		</footer>
	);
}
