const links = [
	{
		label: "GitHub",
		href: "https://github.com/TaQuangKhoi",
		icon: GithubIcon,
	},
	{
		label: "X",
		href: "https://x.com/TaLaTaQuangKhoi",
		icon: XIcon,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/taquangkhoi/",
		icon: LinkedInIcon,
	},
	{
		label: "Ko-fi",
		href: "https://ko-fi.com/taquangkhoi",
		icon: KofiIcon,
	},
] as const;

export default function SocialLinks({
	className = "",
}: {
	className?: string;
}) {
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			{links.map(({ label, href, icon: Icon }) => (
				<a
					key={label}
					href={href}
					target="_blank"
					rel="noreferrer"
					className="icon-btn"
				>
					<span className="sr-only">{label}</span>
					<Icon />
				</a>
			))}
		</div>
	);
}

function GithubIcon() {
	return (
		<svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16">
			<path
				fill="currentColor"
				d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
			/>
		</svg>
	);
}

function XIcon() {
	return (
		<svg viewBox="0 0 16 16" aria-hidden="true" width="15" height="15">
			<path
				fill="currentColor"
				d="M12.6 1h2.2L10 6.48 15.64 15h-4.41L7.78 9.82 3.23 15H1l5.14-5.84L.72 1h4.52l3.12 4.73L12.6 1zm-.77 12.67h1.22L4.57 2.26H3.26l8.57 11.41z"
			/>
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
			<path
				fill="currentColor"
				d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
			/>
		</svg>
	);
}

function KofiIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
			<path
				fill="currentColor"
				d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"
			/>
		</svg>
	);
}
