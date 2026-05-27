import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";
import { useMemo } from "react";
import en from "../i18n/locales/en.json";
import vi from "../i18n/locales/vi.json";

export const SUPPORTED_LOCALES = ["en", "vi"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

const resources = {
	en: { translation: en },
	vi: { translation: vi },
} as const;

export const Route = createFileRoute("/$lang")({
	params: {
		parse: (params) => {
			if (!SUPPORTED_LOCALES.includes(params.lang as SupportedLocale)) {
				throw notFound();
			}
			return { lang: params.lang as SupportedLocale };
		},
		stringify: (params) => ({ lang: params.lang }),
	},
	head: ({ params }) => ({
		links: [
			{
				rel: "alternate",
				hreflang: "en",
				href: `${CANONICAL_ORIGIN}/en`,
			},
			{
				rel: "alternate",
				hreflang: "vi",
				href: `${CANONICAL_ORIGIN}/vi`,
			},
			{
				rel: "alternate",
				hreflang: "x-default",
				href: `${CANONICAL_ORIGIN}/en`,
			},
		],
	}),
	component: LangLayout,
});

function LangLayout() {
	const { lang } = Route.useParams();

	const i18n = useMemo(() => {
		const instance = createInstance();
		// initImmediate: false → synchronous init, safe for SSR
		instance.use(initReactI18next).init({
			resources,
			lng: lang,
			fallbackLng: "en",
			interpolation: { escapeValue: false },
			initImmediate: false,
		});
		return instance;
	}, [lang]);

	return (
		<I18nextProvider i18n={i18n}>
			<Outlet />
		</I18nextProvider>
	);
}
