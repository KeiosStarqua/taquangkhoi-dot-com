import { createFileRoute } from "@tanstack/react-router";

const CANONICAL_ORIGIN = "https://taquangkhoi.com";

interface SitemapEntry {
	loc: string;
	lastmod?: string;
	changefreq?: string;
	priority?: string;
}

function buildSitemapXml(entries: SitemapEntry[]): string {
	const today = new Date().toISOString().split("T")[0];

	const urls = entries
		.map(({ loc, lastmod, changefreq, priority }) =>
			[
				"  <url>",
				`    <loc>${loc}</loc>`,
				`    <lastmod>${lastmod ?? today}</lastmod>`,
				changefreq ? `    <changefreq>${changefreq}</changefreq>` : "",
				priority ? `    <priority>${priority}</priority>` : "",
				"  </url>",
			]
				.filter(Boolean)
				.join("\n"),
		)
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

export const Route = createFileRoute("/sitemap/xml")({
	server: {
		handlers: {
			GET: async () => {
				const entries: SitemapEntry[] = [
					// English
					{
						loc: `${CANONICAL_ORIGIN}/en`,
						changefreq: "monthly",
						priority: "1.0",
					},
					{
						loc: `${CANONICAL_ORIGIN}/en/about`,
						changefreq: "monthly",
						priority: "0.8",
					},
					{
						loc: `${CANONICAL_ORIGIN}/en/products`,
						changefreq: "monthly",
						priority: "0.8",
					},
					{
						loc: `${CANONICAL_ORIGIN}/en/products/opensen`,
						changefreq: "monthly",
						priority: "0.7",
					},
					{
						loc: `${CANONICAL_ORIGIN}/en/products/yt-hunter`,
						changefreq: "monthly",
						priority: "0.7",
					},
					{
						loc: `${CANONICAL_ORIGIN}/en/products/open-farm`,
						changefreq: "monthly",
						priority: "0.7",
					},
					// Vietnamese
					{
						loc: `${CANONICAL_ORIGIN}/vi`,
						changefreq: "monthly",
						priority: "1.0",
					},
					{
						loc: `${CANONICAL_ORIGIN}/vi/about`,
						changefreq: "monthly",
						priority: "0.8",
					},
					{
						loc: `${CANONICAL_ORIGIN}/vi/products`,
						changefreq: "monthly",
						priority: "0.8",
					},
					{
						loc: `${CANONICAL_ORIGIN}/vi/products/opensen`,
						changefreq: "monthly",
						priority: "0.7",
					},
					{
						loc: `${CANONICAL_ORIGIN}/vi/products/yt-hunter`,
						changefreq: "monthly",
						priority: "0.7",
					},
					{
						loc: `${CANONICAL_ORIGIN}/vi/products/open-farm`,
						changefreq: "monthly",
						priority: "0.7",
					},
				];

				return new Response(buildSitemapXml(entries), {
					headers: {
						"Content-Type": "application/xml; charset=utf-8",
						"Cache-Control": "public, max-age=86400, s-maxage=86400",
					},
				});
			},
		},
	},
});
