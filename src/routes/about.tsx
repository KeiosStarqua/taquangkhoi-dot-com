import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy /about route — redirects to /en/about for backwards compatibility.
 */
export const Route = createFileRoute("/about")({
	loader: ({ location }) => {
		throw redirect({
			to: "/$lang/about",
			params: { lang: "en" },
			search: location.search,
			replace: true,
		});
	},
});
