import "./instrument.client";
import "./instrument.analytics";

import * as Sentry from "@sentry/tanstackstart-react";
import { StartClient } from "@tanstack/react-start/client";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<Sentry.ErrorBoundary fallback={<ClientCrash />}>
				<StartClient />
			</Sentry.ErrorBoundary>
		</StrictMode>,
	);
});

function ClientCrash() {
	return (
		<main className="page-wrap px-6 py-24">
			<p className="font-mono text-xs tracking-widest text-[var(--ink-faint)]">
				{"// error"}
			</p>
			<h1 className="display-title mt-3 text-3xl text-[var(--sea-ink)]">
				Something broke
			</h1>
			<p className="mt-3 text-[var(--sea-ink-soft)]">
				The page hit an error. It has been reported.
			</p>
		</main>
	);
}
