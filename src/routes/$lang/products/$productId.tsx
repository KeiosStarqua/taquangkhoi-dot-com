import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
	active: "chip",
	hackathon: "chip chip-violet",
	"open-source": "chip chip-green",
};

function asStringArray(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	return value.filter((item): item is string => typeof item === "string");
}

function asLabeledList(
	value: unknown,
	itemsKey: "groups" | "items",
): { label: string; items: string[] } | null {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const record = value as Record<string, unknown>;
	if (typeof record.label !== "string") return null;
	const items = asStringArray(record[itemsKey]);
	if (items.length === 0) return null;
	return { label: record.label, items };
}

function ProductDetailPage() {
	const { t } = useTranslation();
	const { lang } = Route.useParams();
	const { product } = Route.useLoaderData();

	const features = asStringArray(
		t(`products.${product.id}.features`, {
			returnObjects: true,
			defaultValue: [],
		}),
	);

	const problem = t(`products.${product.id}.problem`, {
		defaultValue: "",
	}) as string;

	const techStack = asLabeledList(
		t(`products.${product.id}.techStack`, { returnObjects: true }),
		"groups",
	);

	const whatsNext = asLabeledList(
		t(`products.${product.id}.whatsNext`, { returnObjects: true }),
		"items",
	);

	return (
		<main className="page-wrap space-y-6 px-4 py-12">
			{/* Back */}
			<Link
				to="/$lang/products"
				params={{ lang }}
				className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-[var(--sea-ink-soft)] no-underline transition hover:text-[var(--accent)]"
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
					<path
						d="M10 3L5 8l5 5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				{t("products.back")}
			</Link>

			{/* Hero */}
			<section className="island-shell rise-in relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
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
						<span key={tag} className="chip">
							{tag}
						</span>
					))}
				</div>
			</section>

			{/* Features */}
			{features.length > 0 && (
				<section className="island-shell p-6 sm:p-8">
					<p className="island-kicker mb-4">
						<span className="kicker-mark">/</span>
						{t("products.features")}
					</p>
					<ul className="m-0 list-none space-y-3 pl-0">
						{features.map((feature) => (
							<li
								key={feature}
								className="flex gap-3 text-base text-[var(--sea-ink-soft)]"
							>
								<span className="mt-0.5 flex-shrink-0 text-[var(--lagoon-deep)]">
									✦
								</span>
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</section>
			)}

			{problem ? (
				<section className="island-shell p-6 sm:p-8">
					<p className="m-0 text-base leading-7 text-[var(--sea-ink-soft)]">
						{problem}
					</p>
				</section>
			) : null}

			{techStack ? (
				<section className="island-shell p-6 sm:p-8">
					<p className="island-kicker mb-4">
						<span className="kicker-mark">/</span>
						{techStack.label}
					</p>
					<ul className="m-0 list-none space-y-3 pl-0">
						{techStack.items.map((group) => (
							<li
								key={group}
								className="text-sm leading-6 text-[var(--sea-ink-soft)]"
							>
								{group}
							</li>
						))}
					</ul>
				</section>
			) : null}

			{whatsNext ? (
				<section className="island-shell p-6 sm:p-8">
					<p className="island-kicker mb-4">
						<span className="kicker-mark">/</span>
						{whatsNext.label}
					</p>
					<ul className="m-0 list-none space-y-3 pl-0">
						{whatsNext.items.map((item) => (
							<li
								key={item}
								className="text-sm leading-6 text-[var(--sea-ink-soft)]"
							>
								{item}
							</li>
						))}
					</ul>
				</section>
			) : null}

			{/* Video */}
			{product.id === "opensen" && (
				<section className="island-shell p-6 sm:p-8">
					<p className="island-kicker mb-4">
						<span className="kicker-mark">/</span>
						{t("products.opensen.video")}
					</p>
					<div className="aspect-video overflow-hidden rounded-xl border border-[var(--line)]">
						<iframe
							src="https://www.youtube.com/embed/nRouJO5Dhjw"
							title="OpenSen Inspiration"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="h-full w-full"
						/>
					</div>
				</section>
			)}

			{/* Links */}
			{product.links.length > 0 && (
				<section className="island-shell p-6 sm:p-8">
					<p className="island-kicker mb-4">
						<span className="kicker-mark">/</span>
						{t("products.links")}
					</p>
					<div className="flex flex-wrap gap-3">
						{product.links.map(({ label, href }) => (
							<a
								key={href}
								href={href}
								target="_blank"
								rel="noreferrer"
								className="btn-primary"
							>
								{label} ↗
							</a>
						))}
					</div>
				</section>
			)}

			{/* Idea credit */}
			{product.ideaBy && (
				<section className="island-shell p-6 sm:p-8">
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
