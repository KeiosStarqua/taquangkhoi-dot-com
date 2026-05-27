import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { products } from "#/data/products";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

export const Route = createFileRoute("/$lang/products/")({
	head: ({ params }) => {
		const titles: Record<string, string> = {
			en: "Products — Tạ Quang Khôi",
			vi: "Sản phẩm — Tạ Quang Khôi",
		};
		const descs: Record<string, string> = {
			en: "Products and side projects built by Tạ Quang Khôi — language learning tools, YouTube utilities, and blockchain apps.",
			vi: "Các sản phẩm và dự án cá nhân của Tạ Quang Khôi — công cụ học ngôn ngữ, tiện ích YouTube và ứng dụng blockchain.",
		};

		const lang = params.lang;
		const title = titles[lang] ?? titles.en;
		const description = descs[lang] ?? descs.en;
		const url = `${CANONICAL_ORIGIN}/${lang}/products`;

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:url", content: url },
			],
			links: [{ rel: "canonical", href: url }],
		};
	},
	component: ProductsPage,
});

const statusColors: Record<string, string> = {
	active: "border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)]",
	hackathon: "border-[rgba(106,79,184,0.3)] bg-[rgba(145,115,220,0.1)] text-purple-700 dark:text-purple-300",
	"open-source": "border-[rgba(47,143,74,0.3)] bg-[rgba(79,184,120,0.1)] text-green-700 dark:text-green-300",
};

function ProductsPage() {
	const { t } = useTranslation();
	const { lang } = Route.useParams();

	return (
		<main className="page-wrap space-y-6 px-4 py-12">
			{/* Header */}
			<section className="island-shell rounded-2xl p-6 sm:p-8">
				<p className="island-kicker mb-2">{t("products.kicker")}</p>
				<h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
					{t("products.title")}
				</h1>
				<p className="m-0 max-w-2xl text-base text-[var(--sea-ink-soft)]">
					{t("products.subtitle")}
				</p>
			</section>

			{/* Products Grid */}
			<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((product, index) => (
					<Link
						key={product.id}
						to="/$lang/products/$productId"
						params={{ lang, productId: product.id }}
						className="island-shell feature-card rise-in block rounded-2xl p-6 no-underline"
						style={{ animationDelay: `${index * 90}ms` }}
					>
						<div className="mb-3 flex items-center justify-between">
							<span className="text-3xl">{product.icon}</span>
							<span
								className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusColors[product.status]}`}
							>
								{t(`products.status.${product.status}`)}
							</span>
						</div>
						<h2 className="display-title mb-2 text-xl font-bold text-[var(--sea-ink)]">
							{t(`products.${product.id}.name`)}
						</h2>
						<p className="mb-4 text-sm leading-6 text-[var(--sea-ink-soft)]">
							{t(`products.${product.id}.tagline`)}
						</p>
						<div className="flex flex-wrap gap-1.5">
							{product.tags.slice(0, 3).map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center rounded-full border border-[rgba(50,143,151,0.2)] bg-[rgba(79,184,178,0.08)] px-2.5 py-0.5 text-xs font-medium text-[var(--lagoon-deep)]"
								>
									{tag}
								</span>
							))}
						</div>
					</Link>
				))}
			</section>
		</main>
	);
}
