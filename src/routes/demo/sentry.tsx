import * as Sentry from "@sentry/tanstackstart-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/demo/sentry")({
	head: () => ({
		meta: [{ title: "Sentry verification" }],
	}),
	component: SentryVerification,
});

function SentryVerification() {
	const [message, setMessage] = useState<string | null>(null);

	return (
		<main className="page-wrap flex min-h-[50vh] max-w-xl flex-col gap-4 px-6 py-16">
			<p className="font-mono text-xs tracking-widest text-[var(--ink-faint)]">
				{"// sentry"}
			</p>
			<h1 className="display-title text-3xl text-[var(--sea-ink)]">
				Verification
			</h1>
			<p className="text-[var(--sea-ink-soft)]">
				Sends a log, a metric, a trace, a server error from{" "}
				<code>/api/sentry-example</code>, and a browser error.
			</p>
			<button
				type="button"
				className="btn-primary w-fit"
				onClick={() => {
					void verifySentry().catch((error: unknown) => {
						Sentry.captureException(error);
						setMessage(
							error instanceof Error ? error.message : "Sentry test failed",
						);
					});
				}}
			>
				Break the world
			</button>
			{message ? (
				<p className="font-mono text-sm text-[var(--sea-ink)]">{message}</p>
			) : null}
		</main>
	);
}

async function verifySentry() {
	Sentry.logger.info("User triggered test error", {
		action: "test_error_button_click",
	});
	Sentry.metrics.count("test_counter", 1);
	await Sentry.startSpan(
		{
			name: "Example Frontend Span",
			op: "test",
		},
		async () => {
			const res = await fetch("/api/sentry-example");
			if (!res.ok) {
				throw new Error("Sentry Example Frontend Error");
			}
		},
	);
}
