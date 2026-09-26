import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import ProjectCard from "#/components/ProjectCard";
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

function ProductsPage() {
	const { t } = useTranslation();
	const { lang } = Route.useParams();

	return (
		<main className="page-wrap space-y-8 px-4 py-12">
			<section>
				<p className="island-kicker mb-3">
					<span className="kicker-mark">/</span>
					{t("products.kicker")}
				</p>
				<h1 className="display-title mb-3 text-4xl font-semibold text-[var(--sea-ink)] sm:text-5xl">
					{t("products.title")}
				</h1>
				<p className="m-0 max-w-2xl text-base text-[var(--sea-ink-soft)]">
					{t("products.subtitle")}
				</p>
			</section>

			<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((product, index) => (
					<ProjectCard
						key={product.id}
						product={product}
						index={index}
						lang={lang}
					/>
				))}
			</section>
		</main>
	);
}
