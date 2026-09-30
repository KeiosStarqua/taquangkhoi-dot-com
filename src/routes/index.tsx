import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Root route — redirects to the appropriate locale.
 * Defaults to /en. For Accept-Language detection, enhance this
 * with getWebRequest() from @tanstack/react-start/server.
 */
export const Route = createFileRoute("/")({
	loader: ({ location }) => {
		throw redirect({
			to: "/$lang",
			params: { lang: "en" },
			search: location.search,
			replace: true,
		});
	},
});
