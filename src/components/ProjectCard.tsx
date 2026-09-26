import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { Product } from "#/data/products";

export default function ProjectCard({
	product,
	index,
	lang,
}: {
	product: Product;
	index: number;
	lang: "en" | "vi";
}) {
	const { t } = useTranslation();
	const code = String(index + 1).padStart(2, "0");
	const slug = product.id.replace(/-/g, " ");

	return (
		<Link
			to="/$lang/products/$productId"
			params={{ lang, productId: product.id }}
			className="island-shell feature-card project-card rise-in flex h-full flex-col p-5 no-underline"
			style={{ animationDelay: `${index * 80}ms` }}
		>
			<div className="mb-4 flex items-center justify-between gap-3">
				<span className="project-kicker">
					{code} / {slug}
				</span>
				<span className="project-arrow" aria-hidden="true">
					↗
				</span>
			</div>
			<h2 className="display-title mb-2 text-xl font-semibold text-[var(--sea-ink)]">
				{t(`products.${product.id}.name`)}
			</h2>
			<p className="project-blurb mb-4 text-sm leading-6 text-[var(--sea-ink-soft)]">
				{t(`products.${product.id}.tagline`)}
			</p>
			<div className="mt-auto flex flex-wrap gap-1.5">
				{product.tags.slice(0, 4).map((tag) => (
					<span key={tag} className="chip">
						{tag}
					</span>
				))}
			</div>
		</Link>
	);
}
