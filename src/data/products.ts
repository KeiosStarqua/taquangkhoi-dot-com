export interface Product {
	id: string;
	icon: string;
	tags: string[];
	links: { label: string; href: string }[];
	status: "active" | "hackathon" | "open-source";
	ideaBy?: string;
}

export const products: Product[] = [
	{
		id: "opensen",
		icon: "🗣️",
		tags: ["AI", "Language Learning", "React", "PWA"],
		links: [
			{
				label: "Inspiration Video",
				href: "https://www.youtube.com/watch?v=nRouJO5Dhjw",
			},
		],
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
		tags: ["Sui", "AI", "Walrus", "zkLogin", "Next.js", "AgriTech"],
		links: [
			{
				label: "Website",
				href: "https://openfarmgroup.com/",
			},
			{
				label: "Devpost",
				href: "https://devpost.com/software/open-farm-sui",
			},
			{
				label: "Follow on X",
				href: "https://x.com/OpenFarmSUI",
			},
			{
				label: "Demo Video",
				href: "https://www.youtube.com/watch?v=ROXPz9D5m_4",
			},
		],
		status: "hackathon",
		ideaBy: "Henry Nguyen",
	},
];

export function getProduct(id: string): Product | undefined {
	return products.find((p) => p.id === id);
}
