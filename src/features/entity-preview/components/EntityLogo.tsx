import TrueTechLogo from "#/components/TrueTechLogo";
import type { EntityLogo as EntityLogoData } from "../types/entity";

/** Brand logos sit on a white tile so dark ink stays legible in dark mode. */
export default function EntityLogo({
	logo,
	name,
}: {
	logo: EntityLogoData;
	name: string;
}) {
	return (
		<span className="entity-logo" aria-hidden="true">
			{logo.kind === "image" && (
				<img
					src={logo.src}
					alt=""
					width={44}
					height={44}
					loading="lazy"
					className="h-full w-full object-contain"
				/>
			)}
			{logo.kind === "truetech" && <TrueTechLogo className="h-auto w-full" />}
			{logo.kind === "monogram" && (
				<span className="font-mono text-sm font-semibold text-[var(--accent)]">
					{logo.text || name.slice(0, 2)}
				</span>
			)}
		</span>
	);
}
