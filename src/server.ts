import * as Sentry from "@sentry/cloudflare";
import { wrapFetchWithSentry } from "@sentry/tanstackstart-react";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { SENTRY_DSN } from "./lib/sentry";

const serverEntry = createServerEntry(
	wrapFetchWithSentry({
		fetch(request: Request) {
			return handler.fetch(request);
		},
	}),
);

export default Sentry.withSentry(
	() => ({
		dsn: SENTRY_DSN,
		tracesSampleRate: 1.0,
	}),
	serverEntry,
);
