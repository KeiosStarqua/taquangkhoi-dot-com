import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getProduct } from "#/data/products";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

export const Route = createFileRoute("/$lang/products/$productId")({
	loader: ({ params }) => {
		const product = getProduct(params.productId);
		if (!product) throw notFound();
		return { product };
	},
	head: ({ params, loaderData }) => {
		const { product } = loaderData;
		const lang = params.lang;

		const titleEn = `${params.productId} — Tạ Quang Khôi`;
		const titleVi = `${params.productId} — Tạ Quang Khôi`;

		const title = lang === "vi" ? titleVi : titleEn;
		const url = `${CANONICAL_ORIGIN}/${lang}/products/${product.id}`;

		return {
			meta: [
				{ title },
				{ property: "og:title", content: title },
				{ property: "og:url", content: url },
			],
			links: [{ rel: "canonical", href: url }],
		};
	},
	component: ProductDetailPage,
});

const statusColors: Record<string, string> = {
	active: "border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)]",
	hackathon:
		"border-[rgba(106,79,184,0.3)] bg-[rgba(145,115,220,0.1)] text-purple-700 dark:text-purple-300",
	"open-source":
		"border-[rgba(47,143,74,0.3)] bg-[rgba(79,184,120,0.1)] text-green-700 dark:text-green-300",
};

function ProductDetailPage() {
	const { t } = useTranslation();
	const { lang } = Route.useParams();
	const { product } = Route.useLoaderData();

	const features = t(`products.${product.id}.features`, {
		returnObjects: true,
		defaultValue: [],
	}) as string[];

	return (
		<main className="page-wrap space-y-6 px-4 py-12">
			{/* Back */}
			<Link
				to="/$lang/products"
				params={{ lang }}
				className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--sea-ink-soft)] no-underline transition hover:text-[var(--sea-ink)]"
			>
				<svg
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
					width="14"
					height="14"
					aria-hidden="true"
				>
					<title>back</title>
					<path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
				{t("products.back")}
			</Link>

			{/* Hero */}
			<section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
				<div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
				<div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />

				<div className="relative mb-4 flex items-center gap-4">
					<span className="text-5xl">{product.icon}</span>
					<span
						className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[product.status]}`}
					>
						{t(`products.status.${product.status}`)}
					</span>
				</div>

				<h1 className="display-title mb-3 text-4xl font-bold leading-tight text-[var(--sea-ink)] sm:text-5xl">
					{t(`products.${product.id}.name`)}
				</h1>
				<p className="mb-6 max-w-2xl text-base leading-7 text-[var(--sea-ink-soft)] sm:text-lg">
					{t(`products.${product.id}.description`)}
				</p>

				<div className="flex flex-wrap gap-2">
					{product.tags.map((tag) => (
						<span
							key={tag}
							className="inline-flex items-center rounded-full border border-[rgba(50,143,151,0.25)] bg-[rgba(79,184,178,0.1)] px-3 py-1 text-xs font-semibold text-[var(--lagoon-deep)]"
						>
							{tag}
						</span>
					))}
				</div>
			</section>

			{/* Features */}
			{features.length > 0 && (
				<section className="island-shell rounded-2xl p-6 sm:p-8">
					<p className="island-kicker mb-4">{t("products.features")}</p>
					<ul className="m-0 list-none space-y-3 pl-0">
						{features.map((feature) => (
							<li key={feature} className="flex gap-3 text-base text-[var(--sea-ink-soft)]">
								<span className="mt-0.5 flex-shrink-0 text-[var(--lagoon-deep)]">✦</span>
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</section>
			)}

			{/* Links */}
			{product.links.length > 0 && (
				<section className="island-shell rounded-2xl p-6 sm:p-8">
					<p className="island-kicker mb-4">{t("products.links")}</p>
					<div className="flex flex-wrap gap-3">
						{product.links.map(({ label, href }) => (
							<a
								key={href}
								href={href}
								target="_blank"
								rel="noreferrer"
								className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
							>
								{label} ↗
							</a>
						))}
					</div>
				</section>
			)}

			{/* Idea credit */}
			{product.ideaBy && (
				<section className="island-shell rounded-2xl border border-[rgba(106,79,184,0.2)] bg-[rgba(145,115,220,0.07)] p-6 sm:p-8">
					<p className="island-kicker mb-3">{t("products.ideaBy.label")}</p>
					<p className="text-base font-semibold text-[var(--sea-ink)]">
						💡 {product.ideaBy}
					</p>
					<p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
						{t("products.ideaBy.note")}
					</p>
				</section>
			)}
		</main>
	);
}
