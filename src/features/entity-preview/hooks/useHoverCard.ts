import { useCallback, useEffect, useRef, useState } from "react";

export type HoverCardPhase = "closed" | "open" | "closing";

interface Options {
	/** Hover intent before opening, so passing the cursor over text does nothing. */
	openDelay?: number;
	/** Grace period after leaving, so the pointer can travel into the card. */
	closeDelay?: number;
	/** Exit animation length before unmount. Matches `entity-out` in styles.css. */
	exitDuration?: number;
}

/** Only one preview card is open at a time across the page. */
let closeActive: (() => void) | null = null;

/**
 * Hover-card state machine: delayed open, delayed close that any
 * `cancelClose` (pointer entering the card or bridge) interrupts, and a
 * `closing` phase for the exit animation.
 */
export function useHoverCard({
	openDelay = 130,
	closeDelay = 180,
	exitDuration = 170,
}: Options = {}) {
	const [phase, setPhase] = useState<HoverCardPhase>("closed");
	const timer = useRef<number | undefined>(undefined);

	const clear = useCallback(() => {
		if (timer.current !== undefined) window.clearTimeout(timer.current);
		timer.current = undefined;
	}, []);

	const close = useCallback(() => {
		clear();
		setPhase((p) => (p === "closed" ? p : "closing"));
		timer.current = window.setTimeout(() => setPhase("closed"), exitDuration);
	}, [clear, exitDuration]);

	const open = useCallback(() => {
		clear();
		if (closeActive && closeActive !== close) closeActive();
		closeActive = close;
		setPhase("open");
	}, [clear, close]);

	const scheduleOpen = useCallback(() => {
		clear();
		timer.current = window.setTimeout(open, openDelay);
	}, [clear, open, openDelay]);

	const scheduleClose = useCallback(() => {
		clear();
		timer.current = window.setTimeout(close, closeDelay);
	}, [clear, close, closeDelay]);

	/** Pointer re-entered the trigger, bridge, or card: stay open. */
	const cancelClose = useCallback(() => {
		if (phase === "open") clear();
		else if (phase === "closing") open();
	}, [phase, clear, open]);

	useEffect(
		() => () => {
			clear();
			if (closeActive === close) closeActive = null;
		},
		[clear, close],
	);

	return { phase, open, close, scheduleOpen, scheduleClose, cancelClose };
}
