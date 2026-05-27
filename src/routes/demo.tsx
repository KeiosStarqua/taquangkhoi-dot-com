import { Outlet, createFileRoute } from "@tanstack/react-router";

/**
 * Layout route for all /demo/* pages.
 * Sets noindex, nofollow on every child automatically —
 * no per-file change needed when adding new demo routes.
 */
export const Route = createFileRoute("/demo")({
	head: () => ({
		meta: [{ name: "robots", content: "noindex, nofollow" }],
	}),
	component: () => <Outlet />,
});
