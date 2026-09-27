import * as Sentry from "@sentry/tanstackstart-react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	type ErrorComponentProps,
	HeadContent,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import StoreDevtools from "../lib/demo-store-devtools";

import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'dark';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',resolved==='dark'?'#05080d':'#f3f7f6');}catch(e){}})();`;

const CANONICAL_ORIGIN = "https://taquangkhoi.com";
const OG_IMAGE = `${CANONICAL_ORIGIN}/og-card.png`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Tạ Quang Khôi — Software Developer & Musician" },
			{
				name: "description",
				content:
					"Software developer and musician from Vietnam. Building AI agents, exploring quantum computing at TRUE-TECH, and making music with Ardour.",
			},
			{ name: "author", content: "Tạ Quang Khôi" },
			{ name: "theme-color", content: "#05080d" },
			// Open Graph
			{ property: "og:site_name", content: "Tạ Quang Khôi" },
			{ property: "og:type", content: "website" },
			{ property: "og:image", content: OG_IMAGE },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{
				property: "og:image:alt",
				content: "Tạ Quang Khôi — Software Developer & Musician",
			},
			// Twitter Card
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:creator", content: "@TaLaTaQuangKhoi" },
			{ name: "twitter:site", content: "@TaLaTaQuangKhoi" },
			{ name: "twitter:image", content: OG_IMAGE },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.ico", sizes: "any" },
		],
	}),
	shellComponent: RootDocument,
	errorComponent: RootError,
});

function RootError({ error }: ErrorComponentProps) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	if (import.meta.env.SSR) {
		Sentry.captureException(error);
	}

	const message = error instanceof Error ? error.message : "Unexpected error";

	return (
		<main className="page-wrap px-6 py-24">
			<p className="font-mono text-xs tracking-widest text-[var(--ink-faint)]">
				{"// error"}
			</p>
			<h1 className="display-title mt-3 text-3xl text-[var(--sea-ink)]">
				Something broke
			</h1>
			<p className="mt-3 text-[var(--sea-ink-soft)]">{message}</p>
		</main>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	// Derive lang from current route matches — falls back to 'en'
	const matches = useRouterState({ select: (s) => s.matches });
	const lang =
		matches
			.map((m) => (m.params as Record<string, string>).lang)
			.find(Boolean) ?? "en";

	return (
		<html lang={lang} suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(62,232,196,0.28)]">
				<Header />
				{children}
				<Footer />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						StoreDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
