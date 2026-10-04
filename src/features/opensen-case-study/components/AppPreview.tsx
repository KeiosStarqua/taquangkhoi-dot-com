import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	Compass,
	Dumbbell,
	House,
	Library,
	type LucideIcon,
	Star,
	Turtle,
	Volume2,
} from "lucide-react";
import {
	APP_NAV,
	APP_NAV_ACTIVE,
	type AppNavItem,
	LESSON_STEP,
	OPENSEN_ASSETS,
} from "../data/app-preview";

const navIcons: Record<AppNavItem, LucideIcon> = {
	Home: House,
	Learn: BookOpen,
	Practice: Dumbbell,
	Explore: Compass,
	Library,
};

/**
 * Static recreation of the OpenSen sentence screen (lesson step view).
 * Decorative: the whole window is one labelled image for assistive tech.
 */
export function AppPreview({ label }: { label: string }) {
	return (
		<div className="opensen-app" role="img" aria-label={label}>
			<div className="os-chrome" aria-hidden="true">
				<div className="code-dots">
					<span />
					<span />
					<span />
				</div>
				<span className="os-url">opensen.taquangkhoi.com/learn</span>
			</div>

			<div
				className="grid sm:grid-cols-[8.5rem_minmax(0,1fr)]"
				aria-hidden="true"
			>
				<aside className="hidden flex-col gap-1 border-r border-[var(--os-line)] bg-[var(--os-card)] p-3 sm:flex">
					<div className="mb-3 flex items-center gap-2 px-1">
						<img
							src={OPENSEN_ASSETS.logo}
							alt=""
							width={22}
							height={22}
							className="h-[22px] w-[22px]"
						/>
						<span className="text-sm font-extrabold tracking-tight">
							OpenSen
						</span>
					</div>
					{APP_NAV.map((item) => {
						const Icon = navIcons[item];
						return (
							<span
								key={item}
								className="os-nav-item"
								aria-current={item === APP_NAV_ACTIVE ? "page" : undefined}
							>
								<Icon size={14} strokeWidth={2.2} />
								{item}
							</span>
						);
					})}
				</aside>

				<div className="flex min-w-0 flex-col gap-3 p-3 sm:p-4">
					<div className="flex items-center justify-between gap-2">
						<div className="flex min-w-0 items-center gap-2">
							<span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--os-card)] shadow-sm">
								<ArrowLeft size={13} strokeWidth={2.4} />
							</span>
							<span className="truncate text-sm font-extrabold">
								{LESSON_STEP.lesson}
							</span>
						</div>
						<span className="os-pill hidden md:inline">{LESSON_STEP.step}</span>
						<div className="flex items-center gap-2">
							<span className="os-primary-text text-xs font-extrabold">
								{LESSON_STEP.position}
							</span>
							<span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--os-card)] shadow-sm">
								<Star size={13} className="os-star" fill="currentColor" />
							</span>
						</div>
					</div>

					<div className="grid gap-3 md:grid-cols-[1fr_1.05fr]">
						<img
							src={OPENSEN_ASSETS.askHelpScene}
							alt=""
							width={960}
							height={540}
							className="aspect-video h-full w-full rounded-[16px] object-cover md:aspect-auto"
						/>
						<div className="os-card flex flex-col gap-3 p-4">
							<div className="flex items-center justify-between gap-3">
								<p className="m-0 text-lg font-extrabold leading-tight tracking-tight">
									{LESSON_STEP.sentence}
								</p>
								<span className="os-primary h-9 w-9 shrink-0">
									<Volume2 size={16} />
								</span>
							</div>
							<div className="os-toggle self-center">
								<span data-active="true">
									<Turtle size={12} />
									Slow
								</span>
								<span>
									<Volume2 size={12} />
									Natural
								</span>
							</div>
							<div className="os-meaning">
								<p className="os-primary-text m-0 text-[0.7rem] font-extrabold">
									Meaning
								</p>
								<p className="m-0 mt-0.5 text-xs font-semibold">
									{LESSON_STEP.meaning}
								</p>
							</div>
							<span className="os-primary mt-auto flex gap-1.5 py-2 text-xs">
								<span className="inline-flex items-center gap-1.5">
									Next <ArrowRight size={13} />
								</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
