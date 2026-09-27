import * as Sentry from "@sentry/tanstackstart-react";
import { SENTRY_DSN } from "./lib/sentry";

Sentry.init({
	dsn: SENTRY_DSN,
	integrations: [Sentry.replayIntegration()],
	tracesSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});
