import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Unprefixed /research — redirects to the English locale page.
 */
export const Route = createFileRoute("/research")({
	loader: () => {
		throw redirect({
			to: "/$lang/research",
			params: { lang: "en" },
			replace: true,
		});
	},
});
