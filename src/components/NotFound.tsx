import { Link } from "@tanstack/react-router";
import * as notFoundPiece from "ascii.rest/pieces/not-found";
import en from "#/i18n/locales/en.json";
import vi from "#/i18n/locales/vi.json";
import { useRouteLang } from "#/lib/locale";
import AsciiArt from "./AsciiArt";

const copy = { en, vi } as const;

/**
 * Site-wide 404, used as the root `notFoundComponent`. It renders outside the
 * `$lang` i18n provider, so copy comes straight from the catalogs. The
 * ascii.rest piece draws only the digits and ghost; the title and message are
 * real text so they stay translatable and readable by screen readers.
 */
export default function NotFound() {
	const lang = useRouteLang();
	const t = copy[lang].notFound;

	return (
		<main className="page-wrap px-4 py-16 sm:py-24">
			<p className="m-0 font-mono text-xs tracking-widest text-[var(--ink-faint)]">
				{t.kicker}
			</p>
			<AsciiArt
				piece={notFoundPiece}
				options={{ title: "", message: "" }}
				fitRows={17}
				maxFontPx={12}
				className="mx-auto mt-6 max-w-2xl text-[var(--accent)]"
			/>
			<h1 className="display-title m-0 mt-4 text-center text-3xl text-[var(--sea-ink)]">
				{t.title}
			</h1>
			<p className="m-0 mt-3 text-center text-[var(--sea-ink-soft)]">
				{t.message}
			</p>
			<p className="m-0 mt-8 text-center">
				<Link
					to="/$lang"
					params={{ lang }}
					className="font-mono text-xs tracking-wide text-[var(--accent)] no-underline"
				>
					{`→ ${t.home}`}
				</Link>
			</p>
		</main>
	);
}
