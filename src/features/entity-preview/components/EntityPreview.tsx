import { UserRound } from "lucide-react";
import {
	type CSSProperties,
	type FocusEvent,
	type KeyboardEvent,
	type MouseEvent,
	type PointerEvent,
	type ReactNode,
	type RefObject,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useRouteLang } from "#/lib/locale";
import { type EntityId, entities } from "../data/entities";
import { useHoverCard } from "../hooks/useHoverCard";
import { computePlacement, type Placement } from "../lib/placement";
import type { EntityCopy, EntityRecord } from "../types/entity";

type Locale = ReturnType<typeof useRouteLang>;

import EntityLink from "./EntityLink";
import EntityLogo from "./EntityLogo";

interface EntityPreviewProps {
	entity: EntityId;
	/** Inline label. `<Trans>` fills this from the catalog; defaults to the entity name. */
	children?: ReactNode;
	/** `accent` renders the label in mint (current relationships). */
	tone?: "ink" | "accent";
}

/**
 * Inline entity with a dashed underline. Hover (after a short intent delay),
 * keyboard focus, or a tap opens a tilted context card above or below the
 * text; the card straightens when the pointer reaches it. Clicking the text
 * navigates to the entity's detail page.
 */
export function EntityPreview({
	entity,
	children,
	tone = "ink",
}: EntityPreviewProps) {
	const record: EntityRecord = entities[entity];
	const { t } = useTranslation();
	const lang = useRouteLang();
	const copy = t(`entities.${entity}`, { returnObjects: true }) as EntityCopy;
	const cardId = useId();

	const triggerRef = useRef<HTMLAnchorElement>(null);
	const cardRef = useRef<HTMLElement>(null);
	const pointerType = useRef<string>("mouse");
	const [placement, setPlacement] = useState<Placement | null>(null);
	const { phase, open, close, scheduleOpen, scheduleClose, cancelClose } =
		useHoverCard();
	const mounted = phase !== "closed";

	const measure = useCallback(() => {
		const trigger = triggerRef.current;
		const card = cardRef.current;
		if (!trigger || !card) return;
		const lines = Array.from(trigger.getClientRects());
		const first = lines[0] ?? trigger.getBoundingClientRect();
		const last = lines[lines.length - 1] ?? first;
		const size = { width: card.offsetWidth, height: card.offsetHeight };
		const viewport = { width: window.innerWidth, height: window.innerHeight };
		// Prefer the first line box; drop to the last one if the card flips below.
		let next = computePlacement({ anchor: first, card: size, viewport });
		if (next.side === "bottom" && last !== first) {
			next = computePlacement({ anchor: last, card: size, viewport });
		}
		setPlacement(next);
	}, []);

	useLayoutEffect(() => {
		if (phase === "open") measure();
		if (phase === "closed") setPlacement(null);
	}, [phase, measure]);

	useEffect(() => {
		if (!mounted) return;
		const onPointerDown = (event: globalThis.PointerEvent) => {
			const target = event.target as Node;
			if (
				triggerRef.current?.contains(target) ||
				cardRef.current?.contains(target)
			)
				return;
			close();
		};
		window.addEventListener("scroll", measure, {
			passive: true,
			capture: true,
		});
		window.addEventListener("resize", measure);
		document.addEventListener("pointerdown", onPointerDown);
		return () => {
			window.removeEventListener("scroll", measure, { capture: true });
			window.removeEventListener("resize", measure);
			document.removeEventListener("pointerdown", onPointerDown);
		};
	}, [mounted, measure, close]);

	const onEnter = (event: PointerEvent) => {
		pointerType.current = event.pointerType;
		if (event.pointerType === "touch") return;
		if (phase === "closed") scheduleOpen();
		else cancelClose();
	};
	const onLeave = (event: PointerEvent) => {
		if (event.pointerType !== "touch") scheduleClose();
	};

	const onTriggerClick = (event: MouseEvent) => {
		// Touch has no hover: first tap opens the card, second tap closes it.
		// The card CTA is the way through to the detail page.
		if (pointerType.current !== "touch") return;
		event.preventDefault();
		if (phase === "open") close();
		else open();
	};

	const onFocus = (event: FocusEvent<HTMLAnchorElement>) => {
		if (event.currentTarget.matches(":focus-visible")) open();
	};
	const onBlur = (event: FocusEvent) => {
		const next = event.relatedTarget as Node | null;
		if (
			next &&
			(triggerRef.current?.contains(next) || cardRef.current?.contains(next))
		)
			return;
		if (phase !== "closed") scheduleClose();
	};
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Escape" && phase !== "closed") {
			event.stopPropagation();
			close();
			triggerRef.current?.focus();
		}
	};

	return (
		<>
			<EntityLink
				ref={triggerRef}
				destination={record.target}
				lang={lang}
				className="entity-trigger"
				data-tone={tone}
				aria-expanded={phase === "open"}
				aria-controls={mounted ? cardId : undefined}
				onPointerEnter={onEnter}
				onPointerLeave={onLeave}
				onPointerDown={(e) => {
					pointerType.current = e.pointerType;
				}}
				onClick={onTriggerClick}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			>
				{children ?? copy.name}
			</EntityLink>
			{mounted &&
				createPortal(
					<PreviewLayer
						cardId={cardId}
						cardRef={cardRef}
						phase={phase}
						placement={placement}
						record={record}
						copy={copy}
						lang={lang}
						onEnter={onEnter}
						onLeave={onLeave}
						onBlur={onBlur}
						onKeyDown={onKeyDown}
					/>,
					document.body,
				)}
		</>
	);
}

interface PreviewLayerProps {
	cardId: string;
	cardRef: RefObject<HTMLElement | null>;
	phase: "open" | "closing" | "closed";
	placement: Placement | null;
	record: EntityRecord;
	copy: EntityCopy;
	lang: Locale;
	onEnter: (event: PointerEvent) => void;
	onLeave: (event: PointerEvent) => void;
	onBlur: (event: FocusEvent) => void;
	onKeyDown: (event: KeyboardEvent) => void;
}

function PreviewLayer({
	cardId,
	cardRef,
	phase,
	placement,
	record,
	copy,
	lang,
	onEnter,
	onLeave,
	onBlur,
	onKeyDown,
}: PreviewLayerProps) {
	const p = placement;
	// Tilt pivots on the connector end so the card swings like a pinned note.
	const popStyle: CSSProperties = p
		? ({
				left: p.left,
				top: p.top,
				"--ox": `${p.cardPoint.x - p.left}px`,
				"--oy": p.side === "top" ? "100%" : "0%",
			} as CSSProperties)
		: { left: 0, top: 0, visibility: "hidden" };

	return (
		<div
			className="entity-layer"
			data-state={phase}
			data-side={p?.side}
			data-placed={p ? "" : undefined}
		>
			{p && (
				<>
					<svg className="entity-connector" aria-hidden="true">
						<line
							x1={p.anchorPoint.x}
							y1={p.anchorPoint.y}
							x2={p.cardPoint.x}
							y2={p.cardPoint.y}
						/>
						<circle
							className="entity-connector-halo"
							cx={p.anchorPoint.x}
							cy={p.anchorPoint.y}
							r={7}
						/>
						<circle cx={p.anchorPoint.x} cy={p.anchorPoint.y} r={3.5} />
					</svg>
					<div
						className="entity-bridge"
						style={{
							left: p.bridge.left,
							top: p.bridge.top,
							width: p.bridge.width,
							height: p.bridge.height,
						}}
						onPointerEnter={onEnter}
						onPointerLeave={onLeave}
					/>
				</>
			)}
			<section
				ref={cardRef}
				id={cardId}
				aria-label={copy.name}
				className="entity-pop"
				style={popStyle}
				onPointerEnter={onEnter}
				onPointerLeave={onLeave}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			>
				<EntityCard record={record} copy={copy} lang={lang} />
			</section>
		</div>
	);
}

function EntityCard({
	record,
	copy,
	lang,
}: {
	record: EntityRecord;
	copy: EntityCopy;
	lang: Locale;
}) {
	return (
		<article className="entity-card">
			<header className="flex items-center justify-between gap-3">
				<p className="entity-kicker m-0">
					<span className="kicker-mark">/</span>
					{copy.kicker}
				</p>
				{copy.status && (
					<span className="entity-status" data-tone={record.statusTone}>
						<span className="entity-status-dot" aria-hidden="true" />
						{copy.status}
					</span>
				)}
			</header>

			<div className="mt-3 flex items-center gap-3">
				<EntityLogo logo={record.logo} name={copy.name} />
				<div className="min-w-0 flex-1">
					<p className="display-title m-0 text-xl leading-tight font-bold text-[var(--sea-ink)]">
						{copy.name}
					</p>
					<p className="m-0 mt-0.5 text-sm text-[var(--sea-ink-soft)]">
						{copy.subtitle}
					</p>
				</div>
				{record.externalUrl && (
					<a
						href={record.externalUrl}
						target="_blank"
						rel="noreferrer"
						className="entity-external"
						aria-label={copy.external ?? copy.name}
						title={copy.external}
					>
						↗
					</a>
				)}
			</div>

			<p className="m-0 mt-3 text-sm leading-6 text-[var(--sea-ink-soft)]">
				{copy.description}
			</p>

			<div className="entity-divider" />

			<div className="flex items-start gap-2.5">
				<UserRound
					className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
					aria-hidden="true"
				/>
				<div>
					<p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
						{copy.role}
					</p>
					<p className="m-0 font-mono text-xs text-[var(--ink-faint)]">
						{copy.period}
					</p>
				</div>
			</div>

			{copy.facts && copy.facts.length > 0 && (
				<dl className="m-0 mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
					{copy.facts.map((fact) => (
						<div key={fact.label}>
							<dt className="entity-kicker">{fact.label}</dt>
							<dd className="m-0 text-sm text-[var(--sea-ink)]">
								{fact.value}
							</dd>
						</div>
					))}
				</dl>
			)}

			<ul className="m-0 mt-3 flex list-none flex-wrap gap-1.5 pl-0">
				{copy.tags.map((tag) => (
					<li key={tag} className="entity-tag">
						{tag}
					</li>
				))}
			</ul>

			<EntityLink
				destination={record.target}
				lang={lang}
				className="entity-cta"
			>
				{copy.cta}
				<span aria-hidden="true" className="entity-cta-arrow">
					→
				</span>
			</EntityLink>
		</article>
	);
}
