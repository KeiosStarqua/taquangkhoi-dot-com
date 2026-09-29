import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Unprefixed /connect — redirects to the English locale page.
 */
export const Route = createFileRoute("/connect")({
	loader: () => {
		throw redirect({
			to: "/$lang/connect",
			params: { lang: "en" },
			replace: true,
		});
	},
});
