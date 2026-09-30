import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Unprefixed /connect — redirects to the English locale page.
 */
export const Route = createFileRoute("/connect")({
	loader: ({ location }) => {
		throw redirect({
			to: "/$lang/connect",
			params: { lang: "en" },
			search: location.search,
			replace: true,
		});
	},
});
