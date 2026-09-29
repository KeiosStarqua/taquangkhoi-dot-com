import { GithubIcon, KofiIcon, LinkedInIcon, XIcon } from "./BrandIcons";

const links = [
	{
		label: "GitHub",
		href: "https://github.com/TaQuangKhoi",
		icon: GithubIcon,
		size: 16,
	},
	{
		label: "X",
		href: "https://x.com/TaLaTaQuangKhoi",
		icon: XIcon,
		size: 15,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/taquangkhoi/",
		icon: LinkedInIcon,
		size: 16,
	},
	{
		label: "Ko-fi",
		href: "https://ko-fi.com/taquangkhoi",
		icon: KofiIcon,
		size: 16,
	},
] as const;

export default function SocialLinks({
	className = "",
}: {
	className?: string;
}) {
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			{links.map(({ label, href, icon: Icon, size }) => (
				<a
					key={label}
					href={href}
					target="_blank"
					rel="noreferrer"
					className="icon-btn"
				>
					<span className="sr-only">{label}</span>
					<Icon size={size} />
				</a>
			))}
		</div>
	);
}
