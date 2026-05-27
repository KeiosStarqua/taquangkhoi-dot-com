export interface Product {
	id: string;
	icon: string;
	tags: string[];
	links: { label: string; href: string }[];
	status: "active" | "hackathon" | "open-source";
}

export const products: Product[] = [
	{
		id: "opensen",
		icon: "🗣️",
		tags: ["AI", "Language Learning", "React", "PWA"],
		links: [],
		status: "active",
	},
	{
		id: "yt-hunter",
		icon: "🎬",
		tags: ["YouTube", "Browser Extension", "Mobile", "Open Source"],
		links: [
			{
				label: "TranscriptAPI",
				href: "https://transcriptapi.com",
			},
		],
		status: "open-source",
	},
	{
		id: "open-farm",
		icon: "🌾",
		tags: ["Blockchain", "AI", "Sui", "Agriculture", "Web3"],
		links: [
			{
				label: "Devpost",
				href: "https://devpost.com/software/open-farm-sui",
			},
		],
		status: "hackathon",
	},
];

export function getProduct(id: string): Product | undefined {
	return products.find((p) => p.id === id);
}
