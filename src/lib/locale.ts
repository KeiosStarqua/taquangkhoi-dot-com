import { useRouterState } from "@tanstack/react-router";

export function useRouteLang(): "en" | "vi" {
	const matches = useRouterState({ select: (s) => s.matches });
	const lang = matches
		.map((m) => (m.params as Record<string, string>).lang)
		.find(Boolean);
	return lang === "vi" ? "vi" : "en";
}

export function useSwapLangPath() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const lang = useRouteLang();
	return (target: "en" | "vi") =>
		pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${target}`) ||
		`/${target}`;
}
